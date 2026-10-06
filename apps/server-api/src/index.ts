import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { TtsJobSchema } from '@yanagi/common';

type Env = { Bindings: { DB: D1Database; TTS_QUEUE: Queue; YANAGI_API_TOKEN?: string } };
type ExistingJob = { id: string; status: string };
const app = new Hono<Env>();
app.use('*', cors());
const requestId = () => crypto.randomUUID();

app.use('/api/*', async (c, next) => {
  const expected = c.env.YANAGI_API_TOKEN;
  const actual = c.req.header('authorization');
  if (!expected || actual !== `Bearer ${expected}`) return c.json({ code: 'UNAUTHORIZED', message: 'Unauthorized', requestId: requestId() }, 401);
  await next();
});
app.get('/health', (c) => c.json({ ok: true, service: 'yanagi-server-api', time: new Date().toISOString() }));

app.post('/api/v1/tts/jobs', async (c) => {
  const parsed = TtsJobSchema.safeParse(await c.req.json().catch(() => null));
  if (!parsed.success) return c.json({ code: 'VALIDATION_ERROR', message: 'Invalid TTS job', requestId: requestId() }, 400);
  const job = parsed.data;
  const existing = await c.env.DB.prepare('SELECT id, status FROM tts_jobs WHERE idempotency_key = ?1').bind(job.idempotencyKey).first<ExistingJob>();
  if (existing) return c.json({ id: existing.id, status: existing.status, replay: true }, 200);
  const id = requestId();
  const now = new Date().toISOString();
  await c.env.DB.prepare(`INSERT INTO tts_jobs (id, idempotency_key, guild_id, user_id, status, created_at, updated_at) VALUES (?1, ?2, ?3, ?4, 'queued', ?5, ?5)`).bind(id, job.idempotencyKey, job.guildId, job.userId, now).run();
  await c.env.TTS_QUEUE.send({ kind: 'tts.generate', job, requestId: id });
  return c.json({ id, status: 'queued', replay: false }, 202);
});
app.all('*', (c) => c.json({ code: 'NOT_FOUND', message: 'Not found', requestId: requestId() }, 404));
export default { fetch: app.fetch, async scheduled(_event: ScheduledEvent, _env: Env, _ctx: ExecutionContext) { /* retention, backup, cleanup */ } };
