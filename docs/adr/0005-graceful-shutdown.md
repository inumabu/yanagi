# ADR 0002: Graceful Shutdown

## Context

A long-running Bot must stop accepting work, close the Discord client, and release Redis connections during deploys and restarts.

## Decision

Handle SIGINT and SIGTERM, destroy the Discord client, quit Redis, and then exit. Docker uses init and a stop grace period.

## Consequences

Deploys are safer and connection leaks are reduced. Future workers must adopt the same lifecycle contract.
