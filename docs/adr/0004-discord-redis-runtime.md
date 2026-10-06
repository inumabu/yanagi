# 📝 ADR 0004：Discord と Redis の Runtime 境界

## 📌 背景

Discord Gateway には常駐 Node.js Process が必要です。一方、Rate Limit と Runtime Coordination は Process 再起動や将来の Shard をまたいで動作する必要があります。

## ✅ 決定

Gateway Process には discord.js を使用し、短期 Rate Limit、Cache、Lock、Runtime State には Redis を使用します。Redis は永続データの正本にしません。

## 🔄 代替案

In-memory State は再起動で失われ、複数 Process の Coordination ができないため採用しません。永続 DB は 基盤 で必要な範囲を超えるため、Business Data 用として別途導入します。

## 📌 結果

Bot は水平拡張しやすくなりますが、Rate Limit 対象 Command では Redis 可用性が Runtime Dependency になります。
