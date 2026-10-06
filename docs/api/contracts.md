# 🔗 API 仕様

## 🔊 TTS Job リクエスト

```json
{
  "idempotencyKey": "guild-user-unique-request-001",
  "guildId": "guild-id",
  "userId": "user-id",
  "text": "こんにちは、夜凪です。",
  "voiceId": 1
}
```

`text` は1〜500文字、`voiceId` は0以上の整数です。API は入力検証エラー、認証エラー、Rate Limit を共通 Error Code で返します。

## 📊 Job 状態

```text
queued → processing → completed
                   └→ failed
queued  → cancelled
queued  → expired
```

Queue Message には `kind`、Job、`requestId` を含め、同じ Idempotency Key の二重処理を拒否します。
