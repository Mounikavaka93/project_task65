import { useEffect, useState } from 'react';

export default function Loader() {
  const [phase, setPhase] = useState('show');

  useEffect(() => {
    const hide = setTimeout(() => setPhase('leave'), 1000);
    const done = setTimeout(() => setPhase('done'), 1600);
    return () => {
      clearTimeout(hide);
      clearTimeout(done);
    };
  }, []);

  if (phase === 'done') return null;

  return (
    <div
      className={`fixed inset-0 z-[80] grid place-items-center bg-ink text-paper transition-opacity duration-500 ${
        phase === 'leave' ? 'pointer-events-none opacity-0' : 'opacity-100'
      }`}
      data-loader="true"
      role="status"
      aria-live="polite"
    >
      <div className="text-center">
        <div className="v-loader" aria-hidden="true">
          <span />
          <span />
          <span />
        </div>
        <p className="mt-6 font-display text-4xl">Velthara</p>
        <p className="mt-2 text-[11px] uppercase tracking-[0.28em] text-goldbright">Opening the atrium</p>
      </div>
    </div>
  );
}
