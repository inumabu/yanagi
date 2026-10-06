# 🌙 Yanagi

夜凪（やなぎ）鯖の Discord Bot ecosystem Foundation です。ユーザーには一つの Yanagi として見せながら、内部では Runtime、Deploy、Secret、Scaling の境界ごとに責務を分離します。

## Repository / service map

| Service | Runtime | Responsibility |
|---|---|---|
| `packages/common` | TypeScript package | Type、Zod schema、API contract、Error code、Queue message |
| `apps/server-api` | Cloudflare Workers / Hono | API、Auth、D1、R2、Queue、AI、Cron |
| `apps/main-bot` | Node.js / discord.js | Discord Gateway、Commands、Events、Bot UI |
| `workers/tts-worker` | Node.js Worker | Queue consumer、VOICEVOX、Retry、Job state |
| `apps/dashboard` | React / Vite | 管理 UI。API 経由でのみデータ取得 |
| `apps/voicevox` | Docker | VOICEVOX Engine 実行環境 |
| `infra` | Docker Compose | Redis、Grafana、Loki、運用基盤 |

## Quick start

```bash
cp .env.example .env
npm install
npm run typecheck
npm run verify:all
npm run build
```

Discord Bot を実際に起動する場合は `.env` に `DISCORD_TOKEN` と `DISCORD_CLIENT_ID` を設定し、API と Redis / VOICEVOX の接続先を用意してください。

```bash
npm --workspace apps/main-bot run build
npm --workspace apps/main-bot run start
```

## Security boundary

Bot token と OAuth token は Frontend に渡しません。Dashboard は D1 / Redis を直接操作せず API 経由でアクセスします。TTS Worker との通信は HMAC / 認証、TTS job は Idempotency Key、内部サービスは原則 loopback または private network に限定します。

## TTS contract

TTS は同期処理ではなく Queue 経由です。1リクエスト最大500文字、timeout 30秒、retry 最大3回、Idempotency Key 必須、status は `queued`、`processing`、`completed`、`failed`、`cancelled`、`expired` を使用します。

## Documentation

- [Architecture](docs/architecture/repositories.md)
- [Requirements](docs/requirements/yanagi.md)
- [Security](docs/security/security.md)
- [Operations](docs/operations/operations.md)
- [API contracts](docs/api/contracts.md)
- [Roadmap](docs/ROADMAP.md)
## Code management

This repository follows the Touwa-derived engineering rules: `main` is protected, large changes start from an Issue, integration happens through Pull Requests, and commits use Conventional Commits.

```bash
npm ci
npm run typecheck
npm run verify:all
npm run build
npm run package
```

Management documents: [Development](DEVELOPMENT.md), [Contributing](CONTRIBUTING.md), [Testing](TESTING.md), [Security](SECURITY.md), [Release](RELEASE.md), [Changelog](CHANGELOG.md). GitHub automation is in `.github/workflows/`.
