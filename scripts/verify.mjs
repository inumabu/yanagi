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
  if (!text.trim()) throw new Error(`❌ ${file} が空です`);
}
const api = await readFile('apps/server-api/src/index.ts', 'utf8');
for (const token of ['!expected', 'TtsJobSchema', 'idempotency_key', 'TTS_QUEUE.send', 'crypto.randomUUID']) {
  if (!api.includes(token)) throw new Error(`❌ API Contract が不足しています：${token}`);
}
const worker = await readFile('workers/tts-worker/src/index.ts', 'utf8');
for (const token of ['createHmac', 'timingSafeEqual', 'MAX_RETRIES', 'REQUEST_TIMEOUT_MS', 'synthesis']) {
  if (!worker.includes(token)) throw new Error(`❌ TTS の Security / Reliability Contract が不足しています：${token}`);
}
const dashboard = await readFile('apps/dashboard/src/main.tsx', 'utf8');
for (const token of ['VITE_API_URL', '/health', '運用ダッシュボード']) {
  if (!dashboard.includes(token)) throw new Error(`❌ Dashboard Contract が不足しています：${token}`);
}
console.log(`✅ Yanagi の Foundation 検証に合格しました (${required.length} 基盤領域)`);
