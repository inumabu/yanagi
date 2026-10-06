# Contributing

## Issue first

大きな変更は Issue から開始します。背景、問題、目的、期待する結果、対象範囲、非対象範囲、検証方法を明記します。

## Commit

Conventional Commits を使用し、絵文字や秘密情報を含めません。

```text
feat(commands): add welcome command
fix(redis): handle reconnect failure
refactor(bot): separate interaction handlers
test(rate-limit): cover window expiry
docs: update operations guide
ci: add scheduled verification
```

## Pull Request

PR template の Summary、Why、Changes、Verification、Security、UI Changes、Known Limitations を埋めます。CI が失敗した PR は原因を確認してから更新し、未検証の機能を完成済みとして報告しません。

## Review checklist

| Area | Check |
|---|---|
| Discord | Intent と権限が必要最小限か |
| Redis | retry、timeout、rate limit、shutdown を考慮したか |
| Security | token、stack trace、内部情報を露出していないか |
| Reliability | graceful shutdown と再接続を壊していないか |
| Operations | Docker、ログ、監視、復旧手順を更新したか |
| Docs | Markdown、CHANGELOG、ADR を更新したか |
