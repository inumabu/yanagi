# Yanagi Security

Secret を Git に入れず、Bot token を Frontend に渡さず、OAuth token を Frontend に保存しません。API は permission check と rate limit を行い、TTS Worker との内部通信は HMAC / 認証を使います。

```text
Discord -> Main Bot -> API -> Queue -> TTS Worker -> VOICEVOX
                         └-> D1 / R2 / Workers AI
```

内部サービスを無意味に Internet へ公開しません。Redis と VOICEVOX は loopback または private network に限定し、重要操作は Audit Log に残します。
