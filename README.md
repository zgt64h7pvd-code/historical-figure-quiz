# 戦国武将当てゲーム

戦国武将のヒントを見ながら、誰なのかを当てるブラウザゲームです。

## ゲーム概要

- ヒントを見て戦国武将を当てる
- 正解でポイント獲得
- 連続正解ボーナスあり
- 不正解や時間切れで減点
- 2回ミスするとゲームオーバー
- 世界共通オンラインランキング対応

## 使用技術

### フロントエンド
- HTML
- CSS
- JavaScript

### バックエンド
- Node.js
- Express

### データベース
- better-sqlite3

### デプロイ
- GitHub Pages
- Render

## 機能

- ニックネーム登録
- 30秒タイマー
- 効果音
- ランダム出題
- スコアシステム
- オンラインランキング
- Enterキー回答対応

## ディレクトリ構成

```text
historical-figure-quiz/
├── index.html
├── style.css
├── script.js
├── questions.js
├── correct.mp3
├── wrong.mp3
└── backend/
    ├── server.js
    ├── package.json
    └── scores.db
