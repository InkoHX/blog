---
title: Next.js使って自分用のブログを作った感想とか
description: 勉強用にNext.js使って自分用のブログを作った感想
tags:
  - TypeScript
  - Next.js
  - React
  - Vercel
modifiedDate: 2020-05-27T10:20:14.000Z
createdDate: 2020-05-25T15:36:16.000Z
---

Reactも使ったのこれがほぼ初めてといっていいくらい無知の状態で作ったので、学習しながら開発しました。

前から[CSS](/tags/css)に慣れなくてずっとWebから逃げていました。[JavaScript](/tags/javascript)やってるのにほぼWebに触れたことがなく、ほぼ初心者です。このブログを作成する前まで[Node.js](/tags/nodejs)使って[Discord](/tags/discord)ボットばっかり開発していたので、今回の開発で少しWebを知るいい機会になりました。

それにしても[React](/tags/reactjs)めっちゃ良いですね～、今回[TypeScript](/tags/typescript)を使用したのですが、型のサポートが[Vue.js](/tags/vuejs)より強いと感じました。それと関数型コンポーネントの書きやすさにびっくりしました。

ドキュメントを読んでいてもクラスコンポーネントよりシンプルでめっちゃ書きやすい! ただReact Hooksはもう少し勉強しないとちょっと良くわからない部分があるのでこれからこのブログを改善していくと共に、学習していこうと思います。

実際このブログのコードでも誤ったHooksの使い方をしていそうで怖い

## 費用はどうしてるの

お金パワーは使ってないです。[GitHub](/tags/github)と[Vercel](/tags/vercel)で完結しており無料でサイト作りました。

## 記事、タグはどうやって書いてるの

[GitHub](/tags/github)で管理でき、Markdownで書けるようにしました! ビルド時にMarkdownをHTMLに変換してページを生成します。変換には**markdown-it**を使用して、コードブロック内のハイライトは**highlight.js**のテーマを使用しました。

MDXっていう、JSXの記法とMarkdownが書けるやつもあったのですが、MDX使うほどじゃないかなーって思ってMarkdownにしました。

### Markdownに含まれる内部リンクをprefetchするのに苦労した

正直一番これがめんどくさかったかもしれません。

Markdownからmarkdown-itを使用して変換されたHTMLは文字列で返ってくるので、どうやってaタグの内部リンクをpre-fetchするか結構悩みました。

解決方法はかなりゴリ押し感凄いです。

```ts
import * as React from 'react'
import { NextRouter } from 'next/router'

export const INTERNAL_LINK_PATTERN = /^(?:http(?:s)?:\/\/)?(?:.+\.)?(?:(?:inkohx)\.(?:me|now\.sh)|localhost:.{1,5})\/(?<type>(tags|posts))\/(?<id>.+)$/su

export const internalLinkClickHandler = (event: React.MouseEvent<HTMLElement>, router: NextRouter): Promise<boolean> | undefined => {
  const elements = event.currentTarget.getElementsByTagName('a')
  const target = event.target

  for (const element of elements) {
    if (element !== target) continue

    const result = INTERNAL_LINK_PATTERN.exec(element.href)?.groups
    if (!result) return

    event.preventDefault()

    return router.push(`/${result.type}/[id]`, `/${result.type}/${result.id}`)
  }
}
```

```ts
<ArticleMain onClick={handleInternalLink} dangerouslySetInnerHTML={{ __html: tag.html }} />
```

今後これは直さないといけない問題だと思ってます。かなり恥ずかしい><

仕組みは `ArticleMain` でクリックイベントが起きたとき `internalLinkClickHandler` に引数を渡して、`ArticleMain` にある**aタグ**を `getElementsByTagName` で全部取得して、`for` で要素が入った配列を回し、クリックされた要素が**aタグ**であり、その**aタグ**に設定されている `href` のURLが内部リンクだったら、イベントをキャンセルし `router.push` で対象のページに飛ばすというもの

どうしてこうなってしまったのだろう... これは早く解決したいところ、何かいい案があればissuesやPR送ってほしいです。

`2020/5/25` の時点ではこの方法で `dangerouslySetInnerHTML` に設定されているaタグの内部リンクを処理しています。

## Next.jsを選んだ理由

- SSR (サーバーサイドレンダリング) に興味があった
- [Next.js](/tags/nextjs) v9.4 の SSG (Beta) を使いたかった
- めんどくさい設定を書かなくてもいい
- [Vercel](/tags/vercel)に簡単で高速、無料でデプロイできるから
  - 同じ会社が開発していてめっちゃ相性がいいらしいから
- ルーティングが楽そう
- ブログの例があった

これらが一番デカイ理由かなー

## サーバーサイドレンダリングに興味があった

今まで、Vue.jsを利用していてSPAのサイトは何回か作ったことはあるのですが、SSRを使う機会は無かったので、かなり興味があったんですよね。

色々調べてかなりめんどくさいのかなーって思ってたら、想像以上に楽で簡単でした。

さすが SSR に特化したReactフレームワークだと思いましたね。[Vercel](/tags/vercel)のおかげでめんどくさいサーバーのセットアップも要らないですし、感謝しかない。

## SSGを使いたかった

2週間前にNext.js v9.4が発表されましたよね。それでSSGのサポートっていうのを見つけたんです。

ビルド時に静的なファイルを作成し配信するので、アクセスするたびに再生成する必要がなく、データベースやバックエンドの負担を減らし高速にコンテンツを配信できるというもの。

こういうブログに向いた凄く向いた機能で、サンプルもあったのですぐにどのような感じか掴めました。

## めんどくさい設定を書かなくてもいい

Next.jsの特徴である**Zero Configuration**のおかげです。

[Webpack](/tags/webpack)とか[Babel](/tags/babel)の設定とか色々めんどくさいとよく聞きます。

[Next.js](/tags/nextjs)を使えば上記のようなめんどくさい設定を飛ばすことができて、必要なときだけ簡単にカスタマイズできたり、使用するモジュールが必要とする設定を追加すればいいだけで済みますからめっちゃ楽でした。ほぼ未経験でここまでできたのはまさにNext.jsの**Zero Configuration**もかなりデカイと思います。

Material UI とか styled-component を使わずに内蔵されている styled-jsx だけを利用してサイトを作れば本当の**Zero Configuration**で超軽量なサイトが作れそうですね。

いつか Material UI に頼らずとも自分でデザインできるようになりたいものだ。もっと勉強しないと

## Vercelを使用するとコマンドひとつでデプロイできる

もともと**ZEIT Now**と言われていたサービスです。ついこの前会社の名前が[Vercel](/tags/vercel)に変わり、2021年1月1日で[npm](/tags/npm)パッケージの `now` のサポートが終了し、 `vercel` というパッケージの方で更新が進むようです。この記事で気付いた人は今すぐ乗り換えたほうがいいでしょう (新しいコマンドに慣れるためにも)

- [公式のツイート](https://twitter.com/vercel/status/1262910242783932416?s=20)

さて、この[Vercel](/tags/vercel)というサービスですが、めちゃくちゃ強力で無料です。コマンド一つで設定ファイルを作る必要もなく高速にデプロイしサイトを展開してくれます。独自ドメインも制限なく割り当てることができます。

このブログを開発するにあたって基本使用しているコマンドは以下のものだけです。

- `vercel` または `vc`
- `vercel dev` または `vc dev`

`vercel` または `vc` でデプロイできます。フラグで `--prod` を付ければ本番環境にデプロイできます。

ローカルで開発するときには `vercel dev` または `vc dev` を使用します。ローカルホストで開発用のサーバーを展開してくれます。ちなみにこのコマンドはまだベータだそうです。

## ルーティングが楽

[公式のドキュメント](https://nextjs.org/docs/routing/introduction)を見ると分かるのですが、めっちゃ楽です。

特にめんどくさい設定を書くことなく、`pages` フォルダーにファイル名でぱぱっと決めるだけ！

## デザインはマテリアルに

CSS書くのは苦手なので**Material UI**使いました! 少し手を加えるときは**styled-components**を使って拡張しています。

## PWAに対応

PWAに対応するにあたって、`next-pwa` という**Zero Configuration**のプラグインを見つけたのでそれを使用しました。

- [NPM](https://www.npmjs.com/package/next-pwa)
- [GitHub](https://github.com/shadowwalker/next-pwa)

## OG画像

[og-generator](https://github.com/InkoHX/og-generator)というものを作りました。

てか[Vercel](/tags/vercel)って[Chrome](/tags/google-chrome)も操れるのか、すげー

## あとがき

短いですが終わりです。もっと他の人の記事見て書き方学んでいっぱい書かなくては、慣れるまでこんな文なのでよろしくおねがいします。
