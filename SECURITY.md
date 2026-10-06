# Security

## Secrets

`DISCORD_TOKEN`、Redis credentials、API keys は `.env` または Secret Manager で管理し、Git、Docker image、ログ、PR に含めません。漏洩時は Discord Developer Portal で revoke / rotate します。

## Discord boundary

Gateway Intent は `Guilds` など必要最小限に限定します。Bot token は Frontend や command response に出しません。将来の管理 UI は Bot と直接接続せず、認証済み API を経由させます。

## Redis boundary

Redis は Docker Compose の内部ネットワークだけで利用し、ホストへ不要なポート公開をしません。rate limit は Redis に保存し、障害時は fail closed します。Redis の値を永続的な正本データとして扱いません。

```ts
const allowed = await consumeRateLimit(`rate:${userId}`, 10, 10);
if (!allowed) return ephemeral('Rate limit exceeded.');
```

## Error handling

ユーザーには一般化したエラーを返し、ログには request / command context だけを残します。token、password、接続 URL の credential、stack trace をユーザー応答に含めません。

## Container

Runtime image は multi-stage build を使用し、非 root の `node` ユーザーで起動します。Redis は healthcheck 後に Bot を起動します。
