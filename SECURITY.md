# 🔐 セキュリティガイド

## 🔑 Secret 管理

`DISCORD_TOKEN`、Redis Credential、API Key は `.env` または Secret Manager で管理し、Git、Docker Image、ログ、PR に含めません。漏洩時は Discord Developer Portal で Revoke / Rotate します。

## 🤖 Discord 境界

Gateway Intent は必要最小限に限定します。Bot Token は Frontend や Command Response に出しません。管理 UI は Bot と直接接続せず、認証済み API を経由させます。

## 🗄️ Redis 境界

Redis は内部 Network のみで利用し、不要な Host Port 公開を行いません。Rate Limit は Redis に保存し、障害時は Fail Closed にします。Redis を永続データの正本として扱いません。

## ⚠️ エラー処理

ユーザーには一般化したエラーを返し、ログには Request / Command 背景 のみを残します。Token、Password、Credential、Stack Trace をユーザー応答に含めません。

## 📦 Container 運用

Runtime Image は Multi-stage Build を使用し、非 root の `node` User で起動します。Redis と VOICEVOX は内部または Loopback に限定します。
