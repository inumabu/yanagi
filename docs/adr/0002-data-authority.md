# ADR 0002: Data Authority

## Context

Points、Guild、Lottery、TTS metadata は複数 Runtime から利用されます。

## Decision

D1 を正本、Redis を Cache / Runtime State、Queue を非同期 Job、R2 を file storage、Durable Objects を同時制御として利用します。

## Consequences

Bot や Dashboard が DB 実装を持たず、API に business logic を集約できます。障害時は Cache 再構築と Queue 再処理を設計する必要があります。
