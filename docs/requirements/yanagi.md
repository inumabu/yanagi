# 📋 Yanagi 要件

## 🎯 対象範囲

Yanagi は Welcome、Audit Log、Voice Log、VC 自動生成、TTS、Points、Omikuji、Prize、Lottery、AI、Dashboard、監視 を提供する Discord Bot Ecosystem です。

## 🗄️ データ規則

D1 は正本データ、Redis は Cache / Runtime State、Queue は非同期 Job、R2 は File / Audio、Durable Objects は Lock / 同時制御に使用します。Redis に正本データを置かず、Main Bot や Dashboard から D1 を直接操作しません。

## 🕒 保持期間

| Data | 保持期間 |
|---|---:|
| Audit Detail | 90日 |
| Voice Log | 180日 |
| Point Transaction | 365日 |
| Lottery History | 365日 |
| TTS Metadata / Audio | 30日 |
| AI Conversation | 30日 |
| OAuth Session | 最大7日 |
| OAuth State | 10分 |

## 📊 負荷・障害テスト

本番前に同時100 User、同時50 TTS Job、同時100 AI Request、同時100 API Request を想定した負荷試験を行います。Redis、API、D1、R2、Queue、VOICEVOX、TTS Worker、Workers AI、Discord API の障害時に、影響範囲と復旧方法を記録します。
