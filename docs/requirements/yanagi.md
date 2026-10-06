# Yanagi Requirements

## Product scope

Yanagi は Welcome、Audit Log、Voice Log、VC 自動生成、TTS、Points、Omikuji、Prize、Lottery、AI、Dashboard、Monitoring を提供する Discord Bot ecosystem です。

## Data rules

D1 は正本データ、Redis は Cache / Runtime State、Queue は非同期 Job、R2 はファイル・音声、Durable Objects は Lock / 同時制御に使用します。Redis に正本データを置かず、Main Bot や Dashboard から D1 を直接操作しません。

## Retention

| Data | Retention |
|---|---:|
| Audit detail | 90 days |
| Voice log | 180 days |
| Point transaction | 365 days |
| Lottery history | 365 days |
| TTS metadata / audio | 30 days |
| AI conversation | 30 days |
| OAuth session | 7 days maximum |
| OAuth state | 10 minutes |

## Load and failure tests

本番前に 100 concurrent users、50 concurrent TTS jobs、100 concurrent AI requests、100 concurrent API requests を想定した負荷試験を行います。Redis、API、D1、R2、Queue、VOICEVOX、TTS Worker、Workers AI、Discord API の障害時に、影響範囲と復旧方法を記録します。
