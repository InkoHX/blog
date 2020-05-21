---
title: Next.js使ってブログ作りました。
description: Next.js使ってブログみたいなのを作ってみました。今後ここに何か書いていきます。
tags: []
---

ReactとNext.js使ってブログみたいなのを作ってみました。

- 記事とタグはGitHubで**Markdown**として管理しています。
- 今後デザインの修正等を行っていきもっと使いやすくする予定
- Lighthouseのスコアもなかなかいい感じ
- PWAにも対応したい
- RSSも配信したい

## 記事とタグの管理について

GitHubで管理しています。
他のユーザーからのPRも受け付けてるので、ミスや提案があれば気軽にissuesやPR送ってください。
地味に記事やタグの一番最後にGitHubへのリンクを配置してあるので、そこから飛ぶことができます。

マークダウンからHTMLへの変換は**markdown-it**を使用しました。

## デザイン

安定の**マテリアルデザイン**です。自分でやろうかと思ったんですが、ださくなったのでやめました。
一体いつになったらマテリアルから離れることができるのだろう。

まだまだ修正箇所が大量にあるので、今後修正して使いやすくしていきます。

## Lighthouse

満点です。

![Lighthouse](/images/posts/2020-5-12/hello-everyone/lighthouse.png)

## OG画像

[og-generator](https://github.com/InkoHX/og-generator) を作りました。ページごとに生成してくれます。

真っ白な背景に文字だけも悲しいので、今後なんとかします。

## コードブロック

```typescript
import * as React from 'react'

const Component: React.FC = () => {}

export default Component
```

色付けは**highlight.js**使用、テーマは**a11y-dark**、なかなか良い。

## ここに書くもの

適当にポイポイ技術的なことについて書いていく予定です。主にJavaScript関係について語る場所にする予定です。
