# 🍎 Timefruit - 時間投資記録アプリ

日々の時間の使い方を記録し、積み重ねた成果を可視化するシンプルなWebアプリケーション

## 📋 機能

### ✨ MVP機能
- **カテゴリ選択**: 仕事/勉強/運動/副業/その他から選択
- **時間入力**: 0.5時間単位で入力（0.5時間〜12時間）
- **メモ機能**: 任意でメモを500文字まで入力可能
- **記録保存**: ワンクリックでデータベースに保存
- **今日の記録表示**: 今日の記録一覧と合計時間を表示
- **記録削除**: 不要な記録の削除機能

## 🏗️ システム構成

```
┌─────────────────┐   ┌─────────────────┐   ┌─────────────────┐
│    Frontend     │   │     Backend     │   │    Database     │
│                 │   │                 │   │                 │
│ Nuxt.js + TS    │◄──┤ Node.js + TS    │◄──┤     MySQL       │
│     Vue 3       │   │    Express      │   │       8.0       │
│   Port: 3000    │   │   Port: 3001    │   │   Port: 3306    │
└─────────────────┘   └─────────────────┘   └─────────────────┘
```

### 技術スタック
- **Frontend**: Nuxt.js + Vue 3 + TypeScript
- **Backend**: Node.js + Express + TypeScript + TypeORM
- **Database**: MySQL 8.0
- **Container**: Docker Compose

## 🚀 セットアップ方法

### 前提条件
- Docker & Docker Compose がインストールされていること

### 1. リポジトリのクローン
```bash
git clone https://github.com/k-masasa/timefruit.git
cd timefruit
```

### 2. アプリケーションの起動
```bash
# Docker Composeでフルスタック起動
docker compose up --build
```

### 3. アクセス
- **フロントエンド**: http://localhost:3000
- **バックエンドAPI**: http://localhost:3001
- **ヘルスチェック**: http://localhost:3001/health

## 🔌 API エンドポイント

| Method | Endpoint | 説明 |
|--------|----------|------|
| GET | `/health` | ヘルスチェック |
| GET | `/api/time-records/today` | 今日の記録取得 |
| GET | `/api/time-records` | 全記録取得 |
| POST | `/api/time-records` | 新規記録作成 |
| DELETE | `/api/time-records/:id` | 記録削除 |


## 🔧 環境変数

### Backend
- `DB_HOST`: データベースホスト（デフォルト: localhost）
- `DB_PORT`: データベースポート（デフォルト: 3306）
- `DB_NAME`: データベース名（デフォルト: timefruit）
- `DB_USER`: データベースユーザー（デフォルト: timefruit_user）
- `DB_PASSWORD`: データベースパスワード（デフォルト: timefruit_password）
- `PORT`: サーバーポート（デフォルト: 3001）

### Frontend
- `NUXT_PUBLIC_BACKEND_URL`: バックエンドURL（デフォルト: http://localhost:3001）

## 📝 ライセンス

このプロジェクトはMITライセンスの下で公開されています。
