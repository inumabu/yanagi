# ADR 0001: Runtime Boundaries

## Context

Discord Gateway、Cloudflare Workers、React Dashboard、TTS、VOICEVOX は技術・実行環境・Deploy 単位が異なります。

## Decision

Common、Server API、Main Bot、TTS Worker、Dashboard、Voicevox、Infra、Docs を責任境界として分離します。ユーザーには一つの Yanagi として提供します。

## Consequences

Secret と障害の影響範囲を分離できます。一方、API contract と version 管理が必要になります。
