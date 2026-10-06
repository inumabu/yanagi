# 🌙 Yanagi

夜凪（やなぎ）鯖の Discord Bot Ecosystem 基盤 です。利用者には一つの Yanagi として見せながら、内部では Runtime、Deploy、Secret、Scaling の境界ごとに責務を分離します。

## 🧭 サービス構成

| Service | Runtime | 責務 |
|---|---|---|
| `packages/common` | TypeScript Package | Type、Zod Schema、API Contract、Error Code、Queue Message |
| `apps/server-api` | Cloudflare Workers / Hono | API、Auth、D1、R2、Queue、AI、Cron |
| `apps/main-bot` | Node.js / discord.js | Discord Gateway、Command、Event、Bot UI |
| `workers/tts-worker` | Node.js Worker | Queue Consumer、VOICEVOX、Retry、Job State |
| `apps/dashboard` | React / Vite | 管理 UI。API 経由でのみデータ取得 |
| `apps/voicevox` | Docker | VOICEVOX Engine 実行環境 |
| `infra` | Docker Compose | Redis、Grafana、Loki、運用基盤 |

## 🚀 クイックスタート

```bash
cp .env.example .env
npm ci
npm run typecheck
npm run verify:all
npm run build
```

Discord Bot を起動する場合は `.env` に `DISCORD_TOKEN` と `DISCORD_CLIENT_ID` を設定し、API、Redis、VOICEVOX の接続先を用意します。

```bash
npm --workspace apps/main-bot run build
npm --workspace apps/main-bot run start
```

## 🔐 セキュリティ境界

Bot Token と OAuth Token は Frontend に渡しません。Dashboard は D1 / Redis を直接操作せず API 経由でアクセスします。TTS Worker との通信は HMAC / 認証、TTS Job は Idempotency Key、内部 Service は Loopback または Private Network に限定します。

## 🔊 TTS 仕様

TTS は同期処理ではなく Queue 経由です。1 Request 最大500文字、Timeout 30秒、Retry 最大3回、Idempotency Key 必須、Status は `queued`、`processing`、`completed`、`failed`、`cancelled`、`expired` を使用します。

## 📚 ドキュメント

- [🏗️ Architecture](docs/architecture/repositories.md)
- [📋 Requirements](docs/requirements/yanagi.md)
- [🔐 セキュリティ](docs/security/security.md)
- [🛠️ Operations](docs/operations/operations.md)
- [🔗 API Contracts](docs/api/contracts.md)
- [🗺️ Roadmap](docs/ROADMAP.md)

## 🧰 コード管理

`main` を保護し、大きな変更は Issue から開始します。Pull Request で統合し、Commit は Conventional Commits を使用します。

```bash
npm ci
npm run typecheck
npm run verify:all
npm run build
npm run package
```

管理文書は [開発ガイド](DEVELOPMENT.md)、[貢献ガイド](CONTRIBUTING.md)、[テストガイド](TESTING.md)、[セキュリティ](SECURITY.md)、[リリース](RELEASE.md)、[変更履歴](CHANGELOG.md) を参照してください。GitHub 自動化は `.github/workflows/` にあります。
