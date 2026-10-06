# Yanagi Bot 0.1.0 Release Notes

## Overview

discord.js、Redis、Docker を使う常駐型 Bot の Foundation です。

## Added

- `/ping` と `/health`
- Redis rate limit、retry、graceful shutdown
- Pino structured logging
- Docker multi-stage build と Compose healthcheck
- TypeScript、verification、CI/CD、運用ドキュメント

## Verification

- `npm ci`
- `npm run typecheck`
- `npm run verify:all`
- `npm run build`
- `npm run package`

## Known Issues

実際の Discord 接続と Docker daemon 上の起動は認証情報・環境依存のため未検証です。
