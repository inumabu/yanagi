# API Contracts

## TTS job request

```json
{
  "idempotencyKey": "guild-user-unique-request-001",
  "guildId": "guild-id",
  "userId": "user-id",
  "text": "こんにちは、夜凪です。",
  "voiceId": 1
}
```

`text` は1〜500文字、`voiceId` は0以上の整数です。API は validation error、認証エラー、rate limit を共通 Error Code で返します。

## Job state

```text
queued -> processing -> completed
                    └─> failed
queued  -> cancelled
queued  -> expired
```

Queue message には `kind`、Job、requestId を含め、同じ Idempotency Key の二重処理を拒否します。
