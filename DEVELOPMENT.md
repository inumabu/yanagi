# 🛠️ 開発ガイド

## 📋 必要環境

Node.js 22 LTS、npm、Git を使用します。常駐実行と本番相当の検証には Docker が必要です。

```bash
node --version
npm --version
git --version
docker --version
```

## 🚀 セットアップ

```bash
git clone <repository-url>
cd yanagi
cp .env.example .env
npm ci
npm run typecheck
npm run verify:all
npm run build
```

`DISCORD_TOKEN`、`DISCORD_CLIENT_ID`、`YANAGI_API_TOKEN` は `.env` にのみ設定し、Git に Commit しません。

## 🌿 Branch

`main` への直接 Push は禁止します。

```text
feature/<name> fix/<name> refactor/<name> test/<name>
docs/<name> ci/<name> chore/<name>
```

## 🧪 ローカルコマンド

```bash
npm run typecheck
npm run verify:all
npm run build
npm run package
npm run test
```

検証 Script は Node.js を直接 Spawn し、npm の入れ子実行に依存しません。失敗時は検証名と Exit Code を表示します。

## 🔁 機能追加の流れ

Issue → Branch → Implementation → Local 検証 → Pull Request → CI → Review → Merge の順で進めます。新しい Discord Command は登録と Handler の両方を更新し、入力検証、Rate Limit、エラー表示、ログ、テストを確認します。
