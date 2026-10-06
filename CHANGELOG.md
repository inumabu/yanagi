# 📝 変更履歴

## [未リリース]

### ✨ 追加

- Yanagi のコード管理要件を統合
- CI、Scheduled CI、Release、Dependabot、Lockfile Update Workflow
- Issue / Pull Request Template と ADR 構成
- 全文書、UI、ログ、運用表示の日本語化と絵文字対応

## [0.1.0] - 2026-10-06

### ✨ 追加

- Node.js + TypeScript + discord.js Bot 基盤
- Redis Rate Limit と Resilience 設定
- Pino Structured Logging
- Dockerfile と Redis Compose Service
- `/ping` と `/health` Command

### 🔐 セキュリティ

- 最小限の Discord Gateway Intent
- Environment-based Secret Loading
- Non-root Docker Runtime
- Redis 内部 Network と Fail-closed Rate Limit

### ⚠️ 既知の制限

- Discord Credential を使った本番 Gateway 接続は未検証です。
- Feature Module、Sharding Policy、Metrics、External Worker は今後の Phase です。
