# 📝 ADR 0003：非同期 TTS

## 📌 背景

VOICEVOX の音声生成は遅延、失敗、重複が発生し得ます。Discord Gateway の同期処理に置くと、Bot 全体が不安定になります。

## ✅ 決定

Main Bot は API に TTS Job を起票し、Queue、TTS Worker、VOICEVOX、R2 の順に非同期処理します。500文字上限、30秒 Timeout、最大3 Retry、Idempotency Key、Job Status を必須にします。

## 📌 結果

Bot の応答性と障害分離が向上します。Job 状態、再試行、期限切れ、ユーザーへの完了通知を別途管理する必要があります。
