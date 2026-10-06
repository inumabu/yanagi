# ADR 0003: Asynchronous TTS

## Context

VOICEVOX の音声生成は遅延・失敗・重複が発生し得るため、Discord Gateway の同期処理に置くと Bot 全体を不安定にします。

## Decision

Main Bot は API に TTS job を起票し、Queue、TTS Worker、VOICEVOX、R2 の順に非同期処理します。500文字上限、30秒 timeout、最大3 retry、Idempotency Key、Job status を必須にします。

## Consequences

Bot の応答性と障害分離が向上します。Job 状態、再試行、期限切れ、ユーザーへの完了通知を別途管理する必要があります。
