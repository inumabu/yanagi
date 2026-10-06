# Release

Semantic Versioning を使用します。MAJOR は breaking change、MINOR は後方互換の機能、PATCH はバグ修正です。Tag は `vMAJOR.MINOR.PATCH` とします。

## Verification

```bash
npm ci
npm run typecheck
npm run verify:all
npm run build
npm run package
```

## Release workflow

`v*.*.*` tag の push で GitHub Actions が起動します。Workflow は version 確認、npm ci、typecheck、verify:all、build、package、SHA256 checksum、GitHub Release を実行します。公開 Release はローカルから直接作成しません。

## Checklist

- [ ] Bot 起動と基本 command
- [ ] Redis healthcheck と graceful shutdown
- [ ] typecheck
- [ ] verify:all
- [ ] build / package
- [ ] CHANGELOG
- [ ] Release Notes
- [ ] Known Limitations
- [ ] CI success
