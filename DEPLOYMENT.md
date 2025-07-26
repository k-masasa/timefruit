# Timefruit Deployment Guide

## 環境変数の管理

### 開発環境
```bash
# .envファイルを作成
cp .env.example .env

# 開発環境で起動
docker-compose up
```

### ステージング環境
```bash
# .env.stagingファイルを作成
cp .env.example .env.staging

# ステージング環境で起動
docker-compose --env-file .env.staging up
```

### 本番環境
```bash
# .env.productionファイルを作成
cp .env.example .env.production

# 本番環境で起動
docker-compose --env-file .env.production -f docker-compose.yml -f docker-compose.prod.yml up -d
```

## 環境変数の設定

各環境で以下の変数を適切に設定してください：

```bash
# Database
DB_HOST=mysql
DB_PORT=3306
DB_NAME=timefruit
DB_USER=timefruit_user
DB_PASSWORD=<strong-password>
MYSQL_ROOT_PASSWORD=<strong-root-password>

# Backend
NODE_ENV=production
PORT=3001
FRONTEND_URL=https://your-domain.com

# Frontend
NUXT_PUBLIC_BACKEND_URL=https://api.your-domain.com
```

## 本番環境へのデプロイ

1. **本番用イメージのビルド**
   ```bash
   docker-compose -f docker-compose.yml -f docker-compose.prod.yml build
   ```

2. **データベースのマイグレーション**
   ```bash
   # 必要に応じてデータベースのバックアップを取得
   docker exec timefruit-db mysqldump -u root -p timefruit > backup.sql
   ```

3. **サービスの起動**
   ```bash
   docker-compose --env-file .env.production -f docker-compose.yml -f docker-compose.prod.yml up -d
   ```

4. **ログの確認**
   ```bash
   docker-compose logs -f
   ```

## セキュリティの考慮事項

- 本番環境では必ず強力なパスワードを使用
- .envファイルは絶対にGitにコミットしない
- HTTPS/TLSを使用（Nginxやロードバランサーで設定）
- 定期的なバックアップの実施