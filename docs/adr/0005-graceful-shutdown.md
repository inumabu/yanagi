# 📝 ADR 0005：Graceful Shutdown

## 📌 背景

常駐 Bot は Deploy や Restart の際に新しい処理を止め、Discord Client と Redis Connection を安全に終了する必要があります。

## ✅ 決定

SIGINT と SIGTERM を処理し、Discord Client を Destroy、Redis を Quit してから終了します。Docker では Init と Stop Grace Period を使用します。

## 📌 結果

Deploy の安全性が高まり、Connection Leak を減らせます。将来の Worker も同じ Lifecycle Contract に従います。
