# 🤝 コントリビューションガイド

## 📝 Issue を先に作る

大きな変更は Issue から開始します。背景、問題、目的、期待結果、対象範囲、対象外、検証方法を記載します。

## ✍️ Commit

Conventional Commits を使用し、秘密情報を含めません。Commit 名に絵文字は使用せず、文書や UI では絵文字を活用します。

```text
feat(commands): add welcome command
fix(redis): handle reconnect failure
refactor(bot): separate interaction handlers
test(rate-limit): cover window expiry
docs: update operations guide
ci: add scheduled verification
```

## 🔍 Pull Request

PR Template の Summary、Why、Changes、検証、セキュリティ、UI Changes、既知の制限 を埋めます。CI が失敗した場合は原因を確認し、未検証の機能を完成済みとして報告しません。

## ✅ レビューチェックリスト

| 領域 | 確認内容 |
|---|---|
| Discord | Intent と権限が必要最小限か |
| Redis | Retry、Timeout、Rate Limit、Shutdown を考慮したか |
| セキュリティ | Token、Stack Trace、内部情報を露出していないか |
| Reliability | Graceful Shutdown と再接続を壊していないか |
| Operations | Docker、ログ、監視、復旧手順を更新したか |
| Docs | Markdown、CHANGELOG、ADR を更新したか |
