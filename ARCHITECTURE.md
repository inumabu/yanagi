# 🏗️ アーキテクチャ

## 🔗 Runtime 境界

```text
Discord Gateway → Node.js / discord.js → 機能モジュール
                                      ├── Redis：Cache / Rate Limit / Runtime State
                                      └── 外部サービス：明示的な Adapter
```

Bot は Discord Gateway、Slash Command、Interaction、権限確認、表示を担当します。Redis は永続的な正本ではなく、短期 State、Rate Limit Counter、Lock、Cache を保持します。

## 🧩 モジュール規約

`src/index.ts` はプロセスのライフサイクルと Event Wiring、`src/commands.ts` は Command 登録、`src/redis.ts` は Redis 接続と復旧を担当します。機能モジュールが環境変数を直接読まず、型付き Configuration または Service Dependency を受け取る構成にします。

## 📈 スケールと障害分離

複数 Process / Shard でも Rate Limit と Idempotency Key は Redis で共有します。Redis 障害時は Rate Limit 対象の Interaction を Fail Closed にします。長時間の TTS、AI、Media 処理は Gateway Event Loop をブロックしない非同期 Worker で実行します。
