import { createHmac, timingSafeEqual } from 'node:crypto';
import type { QueueMessage } from '@yanagi/common';
const MAX_TEXT_LENGTH = 500;
const MAX_RETRIES = 3;
const REQUEST_TIMEOUT_MS = 30_000;
export function verifySignature(payload: string, signature: string, secret: string): boolean { const expected = createHmac('sha256', secret).update(payload).digest('hex'); const actual = Buffer.from(signature); const expectedBuffer = Buffer.from(expected); return actual.length === expectedBuffer.length && timingSafeEqual(actual, expectedBuffer); }
async function fetchWithTimeout(url: string, init: RequestInit, timeoutMs: number): Promise<Response> { const controller = new AbortController(); const timer = setTimeout(() => controller.abort(), timeoutMs); try { return await fetch(url, { ...init, signal: controller.signal }); } finally { clearTimeout(timer); } }
export async function processTts(message: QueueMessage, voicevoxUrl: string): Promise<void> {
  if (message.job.text.length > MAX_TEXT_LENGTH) throw new Error('⚠️ TTS の本文は500文字以内にしてください');
  let lastError: unknown;
  for (let attempt = 1; attempt <= MAX_RETRIES; attempt += 1) {
    try {
      const query = await fetchWithTimeout(`${voicevoxUrl}/audio_query?text=${encodeURIComponent(message.job.text)}&speaker=${message.job.voiceId}`, { method: 'POST' }, REQUEST_TIMEOUT_MS);
      if (!query.ok) throw new Error(`⚠️ VOICEVOX の音声クエリに失敗しました：${query.status}`);
      const synthesis = await fetchWithTimeout(`${voicevoxUrl}/synthesis?speaker=${message.job.voiceId}`, { method: 'POST', headers: { 'content-type': 'application/json' }, body: await query.text() }, REQUEST_TIMEOUT_MS);
      if (!synthesis.ok) throw new Error(`⚠️ VOICEVOX の音声合成に失敗しました：${synthesis.status}`);
      return;
    } catch (error) { lastError = error; if (attempt === MAX_RETRIES) throw lastError; }
  }
}
