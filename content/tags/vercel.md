---
name: Vercel
description: Webサイトを高速にビルドして公開してくれるサービス
modifiedDate: 2020-05-28T02:14:54.000Z
createdDate: 2020-05-26T05:48:13.000Z
---

Vercel はWebサイトを高速にビルドして公開してくれるサービス

`vercel` というパッケージを[npm](/tags/npm)からインストールして、デプロイしたいサイトのフォルダで `vercel` というコマンドを実行するだけで高速にWebサイトをホスティングしてくれます。しかも設定ファイルは要らない

`vc` というエイリアスも追加されているので、`vercel` が長いという人はそちらを使うと良いでしょう。

## 古いパッケージについて

2020年4月21日に会社の名前が**ZEIT**から**Vercel**に改名されました。これに伴い `now` という名前で[npm](/tags/npm)に公開されているVercelのCLIパッケージが2021年1月1日以降一切サポートされなくなるようです。

そこでVercelは[npm](/tags/npm)から `vercel` というパッケージをインストールして使用することを推奨しています。

- [Download Vercel](https://vercel.com/download)
  - `npm i -g vercel` でインストールできます、`now` はアンインストールしてしまいましょう

## 料金プランの変更

2020年4月9日に料金プランが変更され、以前はデプロイの回数などに制限があったのですが、個人プランではそういった強い制限がなくなりました。

ただチームで利用すると有料になります。

## 関連リンク

- [公式サイト](https://vercel.com)
- [Vercel CLI](https://vercel.com/download)
- [GitHub](https://github.com/zeit)
