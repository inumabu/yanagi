# 📝 ADR 0001：Runtime 境界

## 📌 背景

Discord Gateway、Cloudflare Workers、React Dashboard、TTS、VOICEVOX は技術、実行環境、Deploy 単位が異なります。

## ✅ 決定

Common、Server API、Main Bot、TTS Worker、Dashboard、VOICEVOX、Infra、Docs を責任境界として分離します。利用者には一つの Yanagi として提供します。

## 📌 結果

Secret と障害の影響範囲を分離できます。一方、API Contract と Version 管理が必要になります。
