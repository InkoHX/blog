---
title: Discord.jsを使ってメッセージリンクからメッセージの情報を取得して、瞬時に内容を表示するDiscordボットを作った。
description: Discord.jsを使ってメッセージリンクからメッセージの情報を取得して、瞬時に内容を表示するDiscordボットを作った。
tags:
  - JavaScript
  - Docker
  - Discord
modifiedDate: 2020-06-16T06:09:13.000Z
createdDate: 2020-06-16T06:02:05.000Z
---

[Discord](/tags/discord)には、メッセージをリンク（`https://discordapp.com/channels/サーバーID/チャンネルID/メッセージID`）としてコピーできるのだが、このリンクから、チャンネルIDとメッセージIDを取り出し、そのIDからメッセージの内容を取得して、メッセージリンクにアクセスせずとも、ボットがメッセージの内容を瞬時に表示するプログラムを書いたので、使い方の紹介

- メッセージリンクからチャンネルIDとメッセージIDを取得するには正規表現を使用
  - `/http(?:s)?:\/\/(?:.*)?discord(?:app)?\.com\/channels\/(?:\d{17,19})\/(?<channelId>\d{17,19})\/(?<messageId>\d{17,19})/g`
- リンク先の内容を表示する際に、メンションしないように `cleanContent` を使用する

## コード

```js
const Discord = require('discord.js')
const client = new Discord.Client({
  disableMentions: 'everyone'
})

client.once('ready', () => console.log('READY'))

client.on('message', message => {
  const URL_PATTERN = /http(?:s)?:\/\/(?:.*)?discord(?:app)?\.com\/channels\/(?:\d{17,19})\/(?<channelId>\d{17,19})\/(?<messageId>\d{17,19})/g
  let result

  while ((result = URL_PATTERN.exec(message.content)) !== null) {
    const group = result.groups

    client.channels.fetch(group.channelId)
      .then(channel => channel.messages.fetch(group.messageId))
      .then(targetMessage => message.channel.send(targetMessage.cleanContent, [ ...targetMessage.attachments.values(), ...targetMessage.embeds ]))
      .catch(error => message.reply(error)
        .then(message => message.delete({ timeout: 10000 }))
        .catch(console.error)
      )
  }
})

client.login()
  .catch(console.error)
```

## Docker で動かす

誰でも簡単に試したり、使用できるように、[Docker](/tags/docker)イメージを公開してありますので、できればそちらの使用を推奨します。

### docker run

`************.*****.***************` の部分は[Discord](/tags/discord)ボットのトークンへ置き換えてください。

```bash
docker run -d -e DISCORD_TOKEN="************.*****.***************" --name link-viewer-discordbot inkohx/link-viewer-discordbot:latest
```

### docker start

コンテナを動かすときに使用するコマンド

```bash
docker start link-viewer-discordbot
```

### docker stop

コンテナを停止するときに使用するコマンド

```bash
docker stop link-viewer-discordbot
```

## リンク

- [リポジトリ](https://github.com/InkoHX/discord-link-viewer)
- [Docker Hub](https://hub.docker.com/r/inkohx/link-viewer-discordbot)
