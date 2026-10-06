import { readFile } from 'node:fs/promises';

const required = [
  'packages/common/src/index.ts',
  'apps/server-api/src/index.ts',
  'apps/main-bot/src/index.ts',
  'workers/tts-worker/src/index.ts',
  'apps/dashboard/src/main.tsx',
  'apps/voicevox/docker-compose.yml',
  'infra/docker-compose.yml',
];
for (const file of required) {
  const text = await readFile(file, 'utf8');
  if (!text.trim()) throw new Error(`${file} is empty`);
}
const api = await readFile('apps/server-api/src/index.ts', 'utf8');
for (const token of ['!expected', 'TtsJobSchema', 'idempotency_key', 'TTS_QUEUE.send', 'crypto.randomUUID']) {
  if (!api.includes(token)) throw new Error(`API contract missing: ${token}`);
}
const worker = await readFile('workers/tts-worker/src/index.ts', 'utf8');
for (const token of ['createHmac', 'timingSafeEqual', 'MAX_RETRIES', 'REQUEST_TIMEOUT_MS', 'synthesis']) {
  if (!worker.includes(token)) throw new Error(`TTS security/reliability contract missing: ${token}`);
}
const dashboard = await readFile('apps/dashboard/src/main.tsx', 'utf8');
for (const token of ['VITE_API_URL', '/health', 'Operations Dashboard']) {
  if (!dashboard.includes(token)) throw new Error(`Dashboard contract missing: ${token}`);
}
console.log(`Yanagi verification passed (${required.length} foundation areas)`);
