# 🚀 リリースガイド

Semantic Versioning を使用します。MAJOR は破壊的変更、MINOR は後方互換の機能、PATCH はバグ修正です。Tag は `vMAJOR.MINOR.PATCH` とします。

## ✅ リリース前検証

```bash
npm ci
npm run typecheck
npm run verify:all
npm run build
npm run package
```

## 🤖 リリース Workflow

`v*.*.*` Tag の Push で GitHub Actions が起動します。Version 確認、npm ci、型検査、統合検証、Build、Package、SHA256 Checksum、GitHub Release を実行します。

## 📋 リリース確認リスト

- [ ] Bot 起動と基本 Command
- [ ] Redis Healthcheck と Graceful Shutdown
- [ ] Typecheck
- [ ] `verify:all`
- [ ] Build / Package
- [ ] CHANGELOG
- [ ] リリースノート
- [ ] 既知の制限
- [ ] CI Success
