import { useEffect, useState } from 'react';

function snapshot(now) {
  const day = now.getDay();
  if (day === 0) {
    const end = new Date(now);
    end.setHours(23, 59, 59, 0);
    const diff = end - now;
    if (diff > 0) return { live: true, diff };
  }
  const start = new Date(now);
  const ahead = (7 - now.getDay()) % 7 || 7;
  start.setDate(now.getDate() + ahead);
  start.setHours(10, 0, 0, 0);
  return { live: false, diff: Math.max(0, start - now) };
}

function partsOf(diff) {
  const hours = Math.floor(diff / 3600000);
  const minutes = Math.floor((diff % 3600000) / 60000);
  const seconds = Math.floor((diff % 60000) / 1000);
  const pad = (value) => String(value).padStart(2, '0');
  return [pad(hours), pad(minutes), pad(seconds)];
}

export default function SundayClock() {
  const [state, setState] = useState(() => {
    const next = snapshot(new Date());
    return { live: next.live, parts: partsOf(next.diff) };
  });

  useEffect(() => {
    const tick = () => {
      const next = snapshot(new Date());
      setState({ live: next.live, parts: partsOf(next.diff) });
    };
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  const labels = ['hrs', 'min', 'sec'];

  return (
    <div className="rounded-[1.6rem] border border-white/15 bg-white/5 p-5">
      <p className="text-[11px] uppercase tracking-[0.2em] text-goldbright">
        {state.live ? 'Spiral Sunday is live' : 'Next Spiral Sunday'}
      </p>
      <div className="mt-3 flex items-start gap-2 font-display text-4xl tabular-nums text-paper">
        {state.parts.map((part, index) => (
          <div key={labels[index]} className="flex items-start gap-2">
            <div className="text-center">
              <div className="min-w-[3.2ch] rounded-2xl bg-white/10 px-2 py-1">{part}</div>
              <div className="mt-1 text-[10px] uppercase tracking-[0.16em] text-paper/50">{labels[index]}</div>
            </div>
            {index < 2 ? <span className="pt-1 text-goldbright">:</span> : null}
          </div>
        ))}
      </div>
    </div>
  );
}
