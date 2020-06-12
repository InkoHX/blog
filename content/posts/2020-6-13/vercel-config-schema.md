---
title: vercel.json 用の JSON Schema を作ったので VS Code での使い方を紹介する。
description: vercel.json 用の JSON Schema を作ったので VS Code での使い方を紹介する。
tags:
  - Vercel
  - Visual Studio Code
modifiedDate: 2020-06-12T17:24:20.000Z
createdDate: 2020-06-12T17:10:31.000Z
---

## 今回作ったもの

- [リポジトリ](https://github.com/InkoHX/vercel-config-schema)
- [Schema URL](https://vcs.now.sh/)

[Vercel](/tags/vercel)を使用する際に、`vercel.json` という[Vercel](/tags/vercel)のコンフィグファイルを書くことがあると思います。

ルート、ヘッダー、リダイレクト、Serverless Function、リージョンの設定をする際に使いますが、補充が効かず、いちいちドキュメントを確認しながら書くのもめんどくさいと思います。

そこで、`vercel.json` を書く際に、補充、検証ができるように **JSON Schema** を作ってみました。

## $schema で vercel.json にSchemaを設定することは不可能

どういうことかというと下記のような書き方で、Schemaを指定できません。。

```json
// vercel.json

{
  "$schema": "https://vcs.now.sh"
}
```

この状態で、`vercel` または `vc` コマンドを使用すると、エラーが発生します。

## VS Code の json.schemas を使用する

`$schema` を使用せずとも、[VS Code](/tags/visual-studio-code)の設定には、`json.schemas` という項目があり、`fileMatch`で一致したファイルに指定したSchemaを適用できます。

```json
// .vscode/settings.json

{
  "json.schemas": [
    {
      "fileMatch": [
        "/vercel.json"
      ],
      "url": "https://vcs.now.sh"
    }
  ]
}
```

## VS Code 以外のエディタ

[VS Code](/tags/visual-studio-code)以外のエディタにほぼ触れたことがないので、私には分からないです...

ご自身で調べてください、すいません。

## 注意

- `routes` を使用しても `cleanUrls`, `trailingSlash`, `redirects`, `rewrites`, `headers` を設定していた場合、**エラーにならない**
  - そのうち対応するつもりです
