CREATE TABLE IF NOT EXISTS tts_jobs (id TEXT PRIMARY KEY, idempotency_key TEXT NOT NULL UNIQUE, guild_id TEXT NOT NULL, user_id TEXT NOT NULL, status TEXT NOT NULL, created_at TEXT NOT NULL, updated_at TEXT NOT NULL, error TEXT);
CREATE INDEX IF NOT EXISTS idx_tts_jobs_status ON tts_jobs(status);
