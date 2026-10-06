# Repository Architecture

## Boundary rule

Repository は機能数ではなく、Technology、Runtime、Deploy、Secret、Scaling、Build の境界で分けます。同じ Node.js アプリの単純な Discord command は Main Bot に追加し、独立 deploy が必要になったときだけ新しい service を検討します。

```text
yanagi-common
   ├── server-api ── D1 / R2 / Queue / Workers AI / Durable Objects
   ├── main-bot ──── Discord Gateway / Redis / API
   ├── dashboard ─── API / OAuth
   └── tts-worker ── VOICEVOX / R2
```

## Forbidden dependencies

Common は D1、Redis、discord.js、VOICEVOX API に依存しません。Main Bot は正本 DB を持ちません。Dashboard は D1 / Redis を直接操作しません。Main Bot は VOICEVOX と同期接続せず、TTS Worker は Bot 全体の business logic を持ちません。

## Implementation order

Common、Server API、Main Bot、Voicevox runtime、TTS Worker、Dashboard、Infra、Docs の順で実装します。
