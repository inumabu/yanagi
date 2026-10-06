# ADR 0001: Discord and Redis Runtime Boundary

## Context

Discord Gateway requires a long-running Node.js process, while rate limits and runtime coordination must work across process restarts and future shards.

## Decision

Use discord.js for the Gateway process and Redis for short-lived rate limits, cache, locks, and runtime state. Redis is not the permanent source of business truth.

## Alternatives

In-memory state was rejected because it is lost during restart and cannot coordinate multiple processes. A database was deferred because the Foundation only requires ephemeral coordination.

## Consequences

The Bot remains horizontally extensible, but Redis availability becomes a runtime dependency for rate-limited commands.
