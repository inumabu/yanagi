# Operations

## Monitoring

Grafana + Loki を中心に、Bot の CPU / RAM / Gateway、Redis の Memory / Hit Rate、API の Request / Latency / Error、Queue の Depth / Delay、TTS の Processing Time / Failure、AI の Request / Error、VOICEVOX の Health を監視します。

## Backup

D1 の重要データを Daily、Weekly、Monthly の世代で R2 にバックアップします。復元手順と復元テストの結果を記録し、バックアップ成功だけでなく復元可能性を確認します。

## Failure response

障害時は影響範囲、開始時刻、依存サービス、ユーザー影響、暫定対応、恒久対応を記録します。AI や TTS の障害で Discord Bot 全体を停止させない設計にします。
