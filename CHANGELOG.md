# Changelog

## [Unreleased]

### Added

- Touwa code-management requirements integrated into Yanagi Bot
- CI、Scheduled CI、Release、Dependabot、lockfile update workflow
- Issue / Pull Request templates and ADR structure

## [0.1.0] - 2026-10-06

### Added

- Node.js + TypeScript + discord.js Bot foundation
- Redis rate limit and resilience settings
- Pino structured logging
- Dockerfile and Redis Compose service
- `/ping` and `/health` commands

### Security

- Minimal Discord Gateway Intent
- Environment-based secret loading
- Non-root Docker runtime
- Redis internal network and fail-closed rate limit

### Known limitations

- Discord credentials and production Gateway connection are not verified in this environment.
- Feature modules, sharding policy, metrics, and external workers are future phases.
