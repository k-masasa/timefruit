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
│  React + TS     │◄──┤ Node.js + TS    │◄──┤   PostgreSQL    │
│     Vite        │   │    Express      │   │       15        │
│   Port: 3000    │   │   Port: 3001    │   │   Port: 5432    │
└─────────────────┘   └─────────────────┘   └─────────────────┘
```

### 技術スタック
- **Frontend**: React + TypeScript + Vite
- **Backend**: Node.js + Express + TypeScript
- **Database**: PostgreSQL 15
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

## 🛠️ 開発環境

### 個別起動（開発時）

#### データベース
```bash
docker run -d --name timefruit-db \
  -e POSTGRES_DB=timefruit \
  -e POSTGRES_USER=timefruit_user \
  -e POSTGRES_PASSWORD=timefruit_password \
  -p 5432:5432 \
  postgres:15
```

#### バックエンド
```bash
cd backend
npm install
npm run dev
```

#### フロントエンド
```bash
cd frontend
npm install
npm run dev
```

## 📊 データベーススキーマ

```sql
CREATE TABLE time_records (
  id SERIAL PRIMARY KEY,
  category VARCHAR(20) NOT NULL,
  hours DECIMAL(3,1) NOT NULL,
  memo TEXT,
  date DATE NOT NULL DEFAULT CURRENT_DATE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## 🔌 API エンドポイント

| Method | Endpoint | 説明 |
|--------|----------|------|
| GET | `/health` | ヘルスチェック |
| GET | `/api/time-records/today` | 今日の記録取得 |
| GET | `/api/time-records` | 全記録取得 |
| POST | `/api/time-records` | 新規記録作成 |
| DELETE | `/api/time-records/:id` | 記録削除 |

### APIリクエスト例

#### 記録作成
```bash
curl -X POST http://localhost:3001/api/time-records \
  -H "Content-Type: application/json" \
  -d '{
    "category": "仕事",
    "hours": 2.5,
    "memo": "プロジェクトの会議"
  }'
```

#### 今日の記録取得
```bash
curl http://localhost:3001/api/time-records/today
```

## 🎨 UI/UX

- **レスポンシブデザイン**: モバイル・デスクトップ対応
- **美しいグラデーション**: 紫系のモダンなデザイン
- **日本語対応**: フル日本語インターフェース
- **リアルタイム更新**: 記録追加/削除時の即座の画面更新
- **バリデーション**: フォーム入力の検証機能

## 📁 プロジェクト構成

```
timefruit/
├── docker-compose.yml      # Docker Compose設定
├── backend/                # バックエンド
│   ├── src/
│   │   ├── controllers/    # コントローラー
│   │   ├── models/         # データモデル
│   │   ├── routes/         # ルート定義
│   │   ├── utils/          # ユーティリティ
│   │   └── server.ts       # サーバーエントリーポイント
│   ├── package.json
│   └── Dockerfile
├── frontend/               # フロントエンド
│   ├── src/
│   │   ├── components/     # Reactコンポーネント
│   │   ├── services/       # API通信
│   │   ├── types/          # TypeScript型定義
│   │   └── App.tsx         # アプリケーション本体
│   ├── package.json
│   └── Dockerfile
└── db/                     # データベース
    └── init/
        └── 01-create-tables.sql
```

## 🧪 動作確認済み機能

- ✅ フォーム入力バリデーション
- ✅ リアルタイム合計時間計算
- ✅ レスポンシブデザイン
- ✅ エラーハンドリング・ローディング状態
- ✅ フォーム送信後の自動リセット
- ✅ 記録削除機能
- ✅ 日本語テキストサポート
- ✅ Dockerコンテナヘルスチェック

## 🔧 環境変数

### Backend
- `DB_HOST`: データベースホスト（デフォルト: localhost）
- `DB_PORT`: データベースポート（デフォルト: 5432）
- `DB_NAME`: データベース名（デフォルト: timefruit）
- `DB_USER`: データベースユーザー（デフォルト: timefruit_user）
- `DB_PASSWORD`: データベースパスワード（デフォルト: timefruit_password）
- `PORT`: サーバーポート（デフォルト: 3001）

### Frontend
- `VITE_BACKEND_URL`: バックエンドURL（デフォルト: http://localhost:3001）

## 📝 ライセンス

このプロジェクトはMITライセンスの下で公開されています。

## 🤝 コントリビューション

プルリクエストやイシューの報告を歓迎します！
