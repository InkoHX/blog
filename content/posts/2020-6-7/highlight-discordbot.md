---
title: コードブロックを使用せずにコードを送信してきたユーザーのメッセージをハイライトするDiscordボット
description: コードブロックを使用せずにコードを送信してきたユーザーのメッセージをハイライトするDiscordボットを作ったので紹介
tags:
  - Discord
  - TypeScript
---

[Discord.js Japan User Group](https://discordjs-japan.org)用に作成した[Discord](/tags/discord)ボットを開発したのでそれの紹介

コードブロックを使用せずにコードをまるごと送信してくる人、iOSだと `\`` の入力が分かりにくくて、打つのがめんどくさい人っていう人がいるものです。

これはその問題を解決してくれる[Discord](/tags/discord)ボット

ソースコードは[こちら](https://github.com/InkoHX/highlight-discordbot)

## このボットは何をするのか

コードをコードブロックを使用せずに送信してきたユーザーのメッセージ内容を読み取って、ハイライト、フォーマットを行い、送信する。

フォーマット機能については組織メンバーの[mouse484](https://github.com/mouse484)氏が[プルリクエスト](https://github.com/mouse484)をくださいました。ありがとう！

## 使用したパッケージ

- [Discord.js](https://www.npmjs.com/package/discord.js)
- [Prettier](https://www.npmjs.com/package/prettier)
  - コードをフォーマットするために必要
- [Highlight.js](https://www.npmjs.com/package/highlight.js)
  - コードの言語を調べるのに必要

## 使い方

`>highlight` または ボットをメンションすることで、一つ上のメッセージをハイライトできる。

![メンションまたは、>highlightを使用したときに返ってくるメッセージの画像](/images/posts/highlight-discordbot/highlight-command.png)

また、メッセージIDで指定して、ハイライトとフォーマットを実行できます。

![メッセージIDを指定して、ハイライトする場合に送ってくるメッセージの画像](/images/posts/highlight-discordbot/message-id-highlight.png)
