---
name: TypeScript
description: TypeScriptは、Microsoftが開発している「静的型付け言語」
---

TypeScriptはMicrosoftが開発している**静的型付け言語**です。もっと簡単に言うと **「JavaScriptに型を追加した言語」**
今のJavaScripterなら名は聞くであろう[AltJS](/tags/altjs)の一つです。

- おそらく[AltJS](/tags/altjs)の中で一番人気が高い言語
- 型があることにより
  - 規模がデカいプロジェクトでも高い安全性を維持することができる。
  - [JavaScript](/tags/javascript)を実行する前にエラーを見つけることができる。
    - JavaScriptは実行するまで結果が分からないが、TypeScriptの型によってコンパイル時に間違いを瞬時に見つけることができる。
    - コードエディタを使えばコンパイルしなくても原因がすぐ判明する。
  - コードエディタの補充機能が強化される。
    - TypeScriptを使うなら[Visual Studio Code](/tags/visual-studio-code)がオススメ
  - **クラス構文**を古いバージョンに変換することもできる。
    - よって**クラス構文**を使用したオブジェクト指向プログラミングも可能

## コードサンプル

```ts
interface Parrot {
  name: string
  age: number
}

const parrot: Parrot = {
  name: 'InkoHX',
  age: 123456789
}

const badParrot: Parrot = {
  name: 'BadHX',
  age: '123456789' // 型エラー
}

console.log(`Name: ${parrot.name} | ${age} years old.`)
```
