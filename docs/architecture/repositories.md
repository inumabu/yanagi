# 🏗️ Repository アーキテクチャ

## 🔗 境界ルール

Repository は機能数ではなく、Technology、Runtime、Deploy、Secret、Scaling、Build の境界で分けます。同じ Node.js App の単純な Discord Command は Main Bot に追加し、独立 Deploy が必要になったときだけ新しい Service を検討します。

```text
yanagi-common
   ├── server-api ── D1 / R2 / Queue / Workers AI / Durable Objects
   ├── main-bot ──── Discord Gateway / Redis / API
   ├── dashboard ─── API / OAuth
   └── tts-worker ── VOICEVOX / R2
```

## 🚫 禁止する依存関係

Common は D1、Redis、discord.js、VOICEVOX API に依存しません。Main Bot は正本 DB を持ちません。Dashboard は D1 / Redis を直接操作しません。Main Bot は VOICEVOX と同期接続せず、TTS Worker は Bot 全体の Business Logic を持ちません。

## 🧭 実装順序

Common → Server API → Main Bot → Voicevox Runtime → TTS Worker → Dashboard → Infra → Docs の順で実装します。
