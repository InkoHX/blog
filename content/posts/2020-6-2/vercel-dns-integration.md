---
title: Vercelに登録したドメインにGUIでレコードを追加できるインテグレーションがあった。
description: Vercelに登録したドメインをCLIからではなくインテグレーションを使用して、Webから操作できるやつを見つけたので紹介
tags:
  - Vercel
modifiedDate: 2020-05-27T10:23:35.000Z
createdDate: 2020-05-13T11:29:53.000Z
---

この記事を読んでいるということは、[Vercel](/tags/vercel)を使用している人で、独自ドメインに[Vercel](/tags/vercel)のネームサーバーを割り当てていると思うのですが、**DNSレコードをいちいちコマンドで打ち込むの、めんどくさい**

そう思いますよね？ Cloudflare ばっかり使ってる私からすると超めんどくさいです。

そこで色々検索してみたのですが、良いものを見つけたので、共有しときます。

## DNS Editor for ZEIT domains

[Vercel](/tags/vercel)が公開しているインテグレーションで、WebからDNSレコードを設定できるというもの

[このページ](https://vercel.com/integrations/dns)から**Add**を押して、個人アカウントに追加するだけでいい

## 設定できるレコード

- A
- AAAA
- ALIAS
- CNAME
- TXT
- CAA
- MX
- SRV

## あとがき

設定できるレコード結構少ないよね。今後増えたりするのかな

とにかくGUIで設定できるやつが欲しかったので、これでめんどくさいということはなくなりそう。
