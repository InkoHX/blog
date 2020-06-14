---
title: Discord.jsで作ったグローバルチャットっぽいDiscordボット用のプログラムをDockerで動かす
description: Discord.jsで作ったグローバルチャットっぽいDiscordボット用のプログラムをDockerで動かす。
tags:
  - Docker
  - Discord
modifiedDate: 2020-06-14T13:24:27.000Z
createdDate: 2020-06-14T13:19:39.000Z
---

2020/06/13に投稿した、[Discord.jsを使用してグローバルチャットっぽいものを作ってみた。](/posts/09371d80716826347e7e7706f5ef787b)のプログラムをDockerを使用して動かす方法について書いてあります。

## 必要なもの

- [Docker](/tags/docker)
  - この記事を作るときに使用したバージョンは、**19.03.8**です
  - [Docker](/tags/docker)に関する知識も少しないと難しいかもしれません
- [Discord](/tags/discord)ボットのトークン

## docker run を使用した方法

`docker` コマンドを使用してコンテナを起動、停止したりする場合

### コンテナの作成 - docker

`************.*****.***************` の部分をボットのトークンに置き換えて下記のコマンドを実行するだけです。

```bash
docker run -d -e DISCORD_TOKEN="************.*****.***************" --name share-chat-discordbot inkohx/share-chat-discordbot:latest
```

### コンテナの起動 - docker

```bash
docker start share-chat-discordbot
```

### コンテナの停止 - docker

```bash
docker stop share-chat-discordbot
```

## Docker Compose を使用した方法

データ（共有化されているチャンネルのIDとWebhookのIDが入ったJSONデータ）をホストとコンテナで共有したいときに便利です。

### docker-compose.yml を作成する

`docker-compose.yml` を作成し、YAMLファイルに下記の内容を書き込んでください。

```yml
version: '3'

services:
  bot:
    image: inkohx/share-chat-discordbot:latest
    environment:
      - "DISCORD_TOKEN=ボットのトークン"
    volumes:
      - ./app:/inkohx/app/discordjs-share-chat/data
```

### コンテナの起動 - docker-compose

`docker-compose.yml` があるフォルダで下記のコマンドを実行

```bash
docker-compose up -d
```

### コンテナの停止 - docker-compose

`docker-compose.yml` があるフォルダで下記のコマンドを実行

```bash
docker-compose down
```
