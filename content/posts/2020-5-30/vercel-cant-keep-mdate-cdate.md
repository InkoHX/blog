---
title: Vercelのビルドパイプラインに渡されるファイルは作成日や変更日を保つことはできない
description: Vercelのビルドパイプラインに渡されるファイルは作成日や変更日を保つことができない問題にぶつかり、解決したお話
tags:
  - Vercel
modifiedDate: 2020-05-30T13:44:32.000Z
createdDate: 2020-05-30T12:44:05.000Z
---

[Next.js](/tags/nextjs)のSSGサポートを見て、[Vercel](/tags/vercel)と一緒に[Next.js](/tags/nextjs)を使用してこのブログを作ってみたのだが、[Vercel](/tags/vercel)のビルドパイプラインに渡ったファイルの変更日と作成日がデプロイした日付と同じになるという問題に遭遇した。

## ことの始まり

このブログの記事やタグは全て**Markdown**で[GitHub](/tags/github)にて管理しているのだが、作成日と変更日を[Node.js](/tags/nodejs)のビルトインモジュールにある**fs.Stat**を使用して取得しようと考え実装したのだが、ローカルで問題がないことを確認しデプロイしてプレビューを見たときに問題が起きた。

「あれ、ファイルの作成日と変更日がローカルと全然違うし全て同じになっている！ ？」

デプロイすると全てのファイルの作成日、変更日がデプロイされた日付であることにここで気付く、原因が一切分からず、とりあえず[Vercel](/tags/vercel)側の仕様みたいなものだと察する。

まだサポートに聞くのは抑え、別の方法を試してみた。

## Git log 使って作成日と変更日を取り出す

全て[GitHub](/tags/github)で管理しており、`git log` を使用すれば作成日から変更日まで何でも取得できるので、`child_process` を使用してビルド時にデータを取り出して、`Date` オブジェクトに変換するプログラムを作成し試してみたが、ここでまた問題が発生した。

「Vercel、`git clone` 使ってファイルアップロードしてないやん」

まぁ、そうですよね～、`git clone` を使用してファイルをダウンロードしているわけではないので、ビルド中に `git log` を使用してデータを得ることは不可能だった。

## ここでサポートに問い合わせてみる

この問題に関係するissuesや記事、対処法も無く、困ったので、[Vercel](/tags/vercel)のサポートにコンタクトを取ると、やはり、作成日と変更日は保つことができないとのこと。

[Vercel](/tags/vercel)の方でなんとかできると幸いなんですが... と送ったら「残念ながら無理です」と言われてしまった。

やはりCMSとかに頼るしかないのかなー、と思って考えていたとき、「MarkdownのYAMLヘッダーに作成日と変更日書けばいけるんじゃね？」という考えになり、試してみたら上手くできた。

## MarkdownのYAMLヘッダーに作成日と変更日を書くことでビルド時に取り出せた

MarkdownにはYAMLヘッダーというものがあり、そこに情報を書き込めたりできるので、`git log` コマンドを使用して変更日と作成日を取得し、Markdownファイルに書き込むプログラムを作って、**GitHub Actions** でMarkdownが更新されたときにそのプログラムを実行し、変更をコミットさせ[Vercel](/tags/vercel)にデプロイ、ビルド時に `gray-matter` を使用してYAMLヘッダーをオブジェクトに変換して `Date` オブジェクトを取得するという流れでなんとか変更日と作成日を取り出すことができた。

### child_process を使用して Git log の実行結果を取得する

[Node.js](/tags/nodejs) のビルトインモジュールには **child_process** というものがあり、任意のコマンドを実行できる便利な `exec` というメソッドがあります。

#### 作成日を取得するコマンド

下記のコマンドで作成日だけを取り出すことができます。

`--diff-filter=A` で作成日だけに絞っています。`A` は `Added` という意味です。

```bash
git log -1 --diff-filter=A --follow --format=%ad <絶対パス>
```

#### 変更日を取得するコマンド

下記のコマンドで変更日だけを取り出すことができます。`--diff-filter=A` に `M` を加えるだけですね。

`M` は `Modified` という意味です。

```bash
git log -1 --diff-filter=MA --follow --format=%ad <絶対パス>
```

編集日だけを取り出すなら `M` のみでいいんじゃない？ と思った人がいるかもしれませんが、変更日がない場合だと空の文字列が返ってきて厄介なので、変更日が無い場合は作成日を返すようにするためです。

#### child_process で実行しよう

これらのコマンドを実行するには下記のようなコードになります。

```js
const { exec } = require('child_process')
const { promisify } = require('util')
const { resolve } = require('path')

const execAsync = promisify(exec)

const getCreatedDate = (path) => execAsync([
  'git',
  'log',
  '-1',
  '--diff-filter=A',
  '--follow',
  '--format=%ad',
  resolve(path)
].join(' '))
  .then(result => new Date(result.stdout))

const getModifiedDate = (path) => execAsync([
  'git',
  'log',
  '-1',
  '--diff-filter=MA',
  '--follow',
  '--format=%ad',
  resolve(path)
].join(' '))
  .then(result => new Date(result.stdout))

(async () => {
  console.log('createdDate', await getCreatedDate('./yarn.lock'))
  console.log('modifiedDate', await getModifiedDate('./yarn.lock'))
})()
```

めっちゃシンプルですね～

### YAMLヘッダーを上書きする

YAMLを取り出すのには**正規表現**を使用し、取り出したYAML文字列を `js-yaml` を使用して読み込み、変換をしました。

さっきのコードと組み合わせると下記のようになります。

```js
const fs = require('fs/promises')
const { safeDump, safeLoad } = require('js-yaml')

const MARKDOWN_YAML_PATTERN = /^-{3}\n(?<code>[\s\S]+)\n-{3}$/um

const overwriteMarkdownYAML = async (path) => {
  const data = await fs.readFile(path, 'utf8')
  const metadata = Object.assign(parseMarkdownYAML(data), {
    modifiedDate: await getModifiedDate(path),
    createdDate: await getCreatedDate(path)
  })

  return fs.writeFile(path, data.replace(MARKDOWN_YAML_PATTERN, `---\n${safeDump(metadata)}---`), 'utf8')
}

const parseMarkdownYAML = (data) => {
  const yamlHeader = MARKDOWN_YAML_PATTERN.exec(data)?.groups?.code

  if (!yamlHeader) throw new Error('The YAML header was not found.')

  return safeLoad(yamlHeader)
}
```

シンプルですな～

### @zeit/ncc でコンパイル

GitHub Actions 用のプログラムですが、一々依存関係インストールさせるのも遅いので[Vercel](/tags/vercel)が公開している `@zeit/ncc` を使用して依存関係ごと一つのJSファイルにコンパイルして素早くダウンロード、実行できるようにしちゃおう。

1. 開発用の依存として `@zeit/ncc` をインストール
1. `npx ncc build <file>` をターミナルで実行
1. `dist` フォルダにファイルが出力される

詳しい説明は[GitHubのリポジトリ](https://github.com/vercel/ncc)を参考にしよう。

- [TypeScript](/tags/typescript)にも対応しています

### GitHub Actions で更新を自動化する

記事更新するごとにプログラム実行するなんてめんどくさすぎて私にはできないので、GitHub Actions を使って自動化しました。

記事とタグのMarkdownファイルが更新されたときのみ実行されます。

1. `actions/checkout@v2` を使用してリポジトリをクローンする際に、`fetch-depth` を `0` に設定しておくことで、全ての履歴を取得できます（とても重要）
1. [Node.js](/tags/nodejs)のバージョンはv14を使用しました
1. `wget` でコンパイルしたスクリプトをダウンロードして、`updater.js` として保存
1. ダウンロードしたスクリプトを実行してMarkdownファイルの編集日と作成日を更新
1. 変更をコミット
1. `ad-m/github-push-action` を使用して変更をプッシュ

という順番になっています。

下記は実際のコンフィグ

```yaml
name: Markdown Date Updater

on:
  push:
    paths:
      - "content/posts/**/*.md"
      - "content/tags/**/*.md"

jobs:
  update:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v2
        with:
          fetch-depth: 0
      - name: Use Node.js v14
        uses: actions/setup-node@v1
        with:
          node-version: 14
      - name: Download InkoHX/blog-date-updater
        run: wget https://raw.githubusercontent.com/InkoHX/blog-date-updater/master/dist/index.js -O ./updater.js
      - name: Update Markdown file creation and modification dates
        run: node ./updater.js
      - name: Commit changes
        run: |
          git config user.name "blog-date-updater-action"
          git config user.email "action@github.com"
          git add content
          git commit -m "content: update modifiedDate & createdDate"
      - name: Push this repo
        uses: ad-m/github-push-action@v0.6.0
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          branch: ${{ github.ref }}
```

ここで注意なのですが、さっき `git log` を使用して作成日と変更日を書き換えるコードを紹介しましたが、`exec` で実行するコマンドに[こちら](/posts/21a7c4f8be5249f55fcd4528f85ad0a8)を参考に、名前がボットであるコミッター、または作成者を除外してください（無限にボット自身が変更した日付を元に `modifiedDate` を更新してしまうので）

### gray-matter を使用して作成日と変更日を取り出す

下記のコードだけで取得できます。

```js
const fs = require('fs/promises')
const matter = require('gray-matter')

(async () => {
  const { data } = matter(await fs.readFile('path', 'utf8'))

  console.log('createdDate', data.createdDate)
  console.log('modifiedDate', data.modifiedDate)
})()
```

めっちゃ簡単

## おわり

厄介だけど、なんとかこれで自動化とVercelのビルドパイプラインに作成日と変更日を渡すことができます。

この方法、かなりめんどくさいので

ただ、`git` を使用していない場合だとまた別の方法を考えないといけないですね。[Vercel](/tags/vercel)側で解決してくれるのが一番良いと思いますが、いつか修正してくれることを願いましょう！ それかCMSを使用するしかないですね。

説明下手なので、分かりにくい部分があるかもしれないです。修正点があれば是非PRしてください！
