# 🔐 Yanagi セキュリティ

Secret を Git に入れず、Bot Token を Frontend に渡さず、OAuth Token を Frontend に保存しません。API は Permission 確認内容 と Rate Limit を行い、TTS Worker との内部通信は HMAC / 認証を使います。

```text
Discord → Main Bot → API → Queue → TTS Worker → VOICEVOX
                         └→ D1 / R2 / Workers AI
```

内部 Service を不要に Internet へ公開しません。Redis と VOICEVOX は Loopback または Private Network に限定し、重要操作は Audit Log に残します。
