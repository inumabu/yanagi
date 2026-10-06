# 🧪 テストガイド

## 📦 コマンド

| コマンド | 目的 |
|---|---|
| `npm run typecheck` | TypeScript の Strict 型検査 |
| `npm run verify:all` | 基盤 と管理基盤の統合検証 |
| `npm run build` | 全 Workspace の Production Build |
| `npm run package` | Build と npm Package の Smoke Test |
| `npm run test` | 型検査と統合検証 |

```bash
npm ci
npm run typecheck
npm run verify:all
npm run build
npm run package
```

## 🔦 手動スモークテスト

1. `docker compose -f infra/docker-compose.yml up -d` で Redis を起動します。
2. `.env` に検証用の Discord Credential を設定します。
3. Bot が Gateway に接続し、準備完了ログを出すことを確認します。
4. Dashboard の API 状態が `healthy` になることを確認します。
5. 同じ Idempotency Key で TTS Job を再送し、重複 Job が作成されないことを確認します。
6. SIGTERM 後に接続が終了することを確認します。

実際の Discord 接続テストでは Token をログ、Issue、CI Output に出しません。

## 📊 負荷・障害テスト

本番前に複数 Shard、同時 Command、Redis 再起動、Network 遅延、Redis 不通、Discord API Rate Limit を確認します。環境、同時数、Latency、Error Rate、復旧時間を記録します。
