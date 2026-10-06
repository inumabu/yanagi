# Testing

## Commands

| Command | Purpose |
|---|---|
| `npm run typecheck` | strict TypeScript check |
| `npm run verify:security` | token、Intent、secret 境界の検証 |
| `npm run verify:redis` | Redis resilience と rate limit 検証 |
| `npm run verify:all` | すべての verification を Node.js から実行 |
| `npm run build` | production TypeScript build |
| `npm run package` | build と npm package smoke test |

```bash
npm ci
npm run typecheck
npm run verify:all
npm run build
npm run package
```

## Manual smoke test

1. Redis を `docker compose up -d redis` で起動する。
2. `.env` に検証用 Discord credentials を設定する。
3. Bot が Gateway に接続し `Discord client ready` を出力する。
4. `/ping` と `/health` が応答する。
5. 短時間に同一ユーザーでコマンドを実行し Rate Limit が機能する。
6. SIGTERM 後に Redis connection が終了する。

実際の Discord 接続テストでは token をログ、Issue、CI output に出しません。

## Load and failure tests

本番前に複数 shard、同時 command、Redis 再起動、ネットワーク遅延、Redis unavailable、Discord API rate limit を確認します。高負荷試験の結果には環境、同時数、レイテンシ、エラー率、復旧時間を記録します。
