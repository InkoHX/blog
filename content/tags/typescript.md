---
name: TypeScript
description: TypeScriptは、Microsoftが開発している「静的型付け言語」
modifiedDate: 2020-05-27T10:13:26.000Z
createdDate: 2020-05-12T14:13:40.000Z
---

TypeScript は Microsoft が開発している**静的型付け言語**です。もっと簡単に言うと **「JavaScriptに型を追加した言語」**
今の JavaScripter なら名は聞くであろう [AltJS](/tags/altjs) の1つです。

- おそらく [AltJS](/tags/altjs) の中で一番人気が高い言語
- 規模がデカいプロジェクトでも高い安全性を維持できる
- [JavaScript](/tags/javascript) を実行する前にエラーを見つけることができる
  - JavaScript は実行するまで結果が分からないが、TypeScript の型によってコンパイル時に間違いを瞬時に見つけることができる
  - コードエディタを使えばコンパイルしなくても原因がすぐ判明する
- コードエディタの補充機能が強化される
  - TypeScript を使うなら [Visual Studio Code](/tags/visual-studio-code) がオススメ
- **クラス構文**を古いバージョンに変換できる
  - よって**クラス構文**を使用したオブジェクト指向プログラミングも可能

## コードサンプル

```ts
interface Parrot {
  nickname: string,
  age: number,
  attack: number,
  defence: number
}

const fastBlizzard: Readonly<Parrot> = {
  nickname: 'FastBlizzard',
  age: 123456789,
  attack: 99999,
  defence: 99999
}

const showParrot (parrot: Readonly<Parrot>): void => console.log([
  `Nickname: ${parrot.nickname ?? 'Anonymous'}`,
  `Age: ${parrot.age ?? 20}`,
  `Attack: ${parrot.attack}`,
  `Defence: ${parrot.defence}`
])

showParrot(fastBlizzard)
```

## 関連リンク

- [TypeScriptの公式サイト](https://www.typescriptlang.org/)
