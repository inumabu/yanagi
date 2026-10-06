import { createRoot } from 'react-dom/client';
import { useEffect, useState } from 'react';
import './style.css';

function App() {
  const [health, setHealth] = useState('確認中');
  useEffect(() => {
    const baseUrl = import.meta.env.VITE_API_URL ?? 'http://localhost:8787';
    fetch(`${baseUrl.replace(/\/$/, '')}/health`).then((response) => setHealth(response.ok ? '正常' : '利用不可')).catch(() => setHealth('利用不可'));
  }, []);
  return <main><header><span>🌙 Yanagi</span><small>🛠️ 運用ダッシュボード基盤</small></header><section><h1>📊 運用ダッシュボード</h1><div className={`card ${health}`}><b>🔌 API 状態</b><strong>{health}</strong></div><p>管理画面のデータは API 経由で取得します。D1、Redis、OAuth Token をブラウザから直接扱いません。</p></section></main>;
}
createRoot(document.getElementById('root')!).render(<App />);
