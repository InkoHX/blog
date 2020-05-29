---
title: git log で自分自身を除外したいときには
description: git log を使用して自分自身を除外する方法
tags:
  - Git
---

`git log`は便利だけど、自分自身を除外するときには `--perl-regexp` を使用して**正規表現**を使う必要がある。

## 作成者の名前で除外したい場合

```bash
git log --perl-regexp --author='^((?!自分自身の名前).*)$'
```

## コミッターの名前で除外したい場合

```bash
git log --perl-regexp --committer='^((?!自分自身の名前).*)$'
```

## 面倒だからエイリアスを設定しておこう

いちいち長いコマンドを打ちたくはないのでエイリアス設定しておきましょう。

```bash
git config --global alias.log-E4M-author "log --perl-regexp --author='^((?!自分自身の名前).*)$'"
git config --global alias.log-E4M-committer "log --perl-regexp --committer='^((?!自分自身の名前).*)$'"

git log-E4M-author # 作成者の名前で除外
git log-E4M-committer # コミッターの名前で除外

# オプションも追加できる
git log-E4M-author -1 --diff-filter=MA
git log-E4M-committer 1 --diff-filter=MA
```
