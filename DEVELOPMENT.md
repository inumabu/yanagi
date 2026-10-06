# Development

## Requirements

Node.js 22 LTS、npm、Git を使用します。常駐実行と本番相当の検証には Docker が必要です。

```bash
node --version
npm --version
git --version
docker --version
```

## Setup

```bash
git clone <repository-url>
cd yanagi-bot
cp .env.example .env
npm ci
npm run typecheck
npm run verify:all
npm run build
```

`DISCORD_TOKEN` と `DISCORD_CLIENT_ID` は `.env` にだけ設定し、Git にコミットしません。

## Branches

`main` への直接 push は禁止します。次のブランチ形式を使用します。

```text
feature/<name> fix/<name> refactor/<name> test/<name>
docs/<name> ci/<name> chore/<name>
```

## Local commands

```bash
npm run dev
npm run typecheck
npm run verify:all
npm run build
npm run package
npm run test
```

検証スクリプトは Node.js を直接 spawn し、npm の入れ子実行に依存しません。失敗時は検証名と exit code を表示します。

## Feature workflow

Issue、Branch、Implementation、Local Verification、Pull Request、CI、Review、Merge の順で進めます。新しい Discord command は `src/commands.ts` の登録と handler の両方を更新し、入力検証、Rate Limit、エラー表示、ログ、テストを確認します。
