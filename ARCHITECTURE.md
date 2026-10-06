# Architecture

## Runtime boundary

```text
Discord Gateway -> Node.js / discord.js -> Feature modules
                                      ├── Redis: cache, rate limit, runtime state
                                      └── external services: explicit adapters
```

The Bot owns Discord Gateway, Slash Commands, Interactions, permission checks, and presentation. Redis is not a source of permanent business truth; it stores short-lived state, rate-limit counters, locks, and cache entries.

## Module rules

`src/index.ts` owns process lifecycle and event wiring. `src/commands.ts` owns command registration. `src/redis.ts` owns Redis connection and resilience. Feature modules must not read environment variables directly; they receive typed configuration or service dependencies.

## Scaling and failure isolation

For multiple processes or shards, rate limits and idempotency keys remain Redis-backed. Redis failures fail closed for rate-limited interactions. Long-running TTS, AI, and media processing belongs in asynchronous workers and must not block the Gateway event loop.
