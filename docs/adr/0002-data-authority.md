# 📝 ADR 0002：データの正本

## 📌 背景

Points、Guild、Lottery、TTS Metadata は複数の Runtime から利用されます。

## ✅ 決定

D1 を正本、Redis を Cache / Runtime State、Queue を非同期 Job、R2 を File Storage、Durable Objects を同時制御として利用します。

## 📌 結果

Bot や Dashboard が DB 実装を持たず、API に Business Logic を集約できます。障害時は Cache 再構築と Queue 再処理を設計する必要があります。
