import { createRoot } from 'react-dom/client';
import { useEffect, useState } from 'react';
import './style.css';

function App() {
  const [health, setHealth] = useState('checking');
  useEffect(() => {
    const baseUrl = import.meta.env.VITE_API_URL ?? 'http://localhost:8787';
    fetch(`${baseUrl.replace(/\/$/, '')}/health`).then((response) => setHealth(response.ok ? 'healthy' : 'unavailable')).catch(() => setHealth('unavailable'));
  }, []);
  return <main><header><span>🌙 Yanagi</span><small>Operations Dashboard Foundation</small></header><section><h1>Operations Dashboard</h1><div className={`card ${health}`}><b>API status</b><strong>{health}</strong></div><p>管理画面のデータは API 経由で取得します。D1、Redis、OAuth token をブラウザから直接扱いません。</p></section></main>;
}
createRoot(document.getElementById('root')!).render(<App />);
