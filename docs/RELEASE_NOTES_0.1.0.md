# 🚀 Yanagi 0.1.0 リリースノート

## 📌 概要

discord.js、Redis、Docker を使う常駐型 Bot の 基盤 です。

## ✨ 追加

- `/ping` と `/health`
- Redis Rate Limit、Retry、Graceful Shutdown
- Pino Structured Logging
- Docker Multi-stage Build と Compose Healthcheck
- TypeScript、検証、CI/CD、運用ドキュメント

## ✅ 検証

- `npm ci`
- `npm run typecheck`
- `npm run verify:all`
- `npm run build`
- `npm run package`

## ⚠️ 既知の問題

実際の Discord 接続と Docker Daemon 上の起動は Credential と環境に依存するため未検証です。
