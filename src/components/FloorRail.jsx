import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const floors = [
  { id: 'atrium', label: 'Atrium' },
  { id: 'categories', label: 'Floors' },
  { id: 'collections', label: 'Pieces' },
  { id: 'offers', label: 'Tickets' },
  { id: 'stores', label: 'Houses' },
  { id: 'events', label: 'Nights' },
];

export default function FloorRail() {
  const { pathname } = useLocation();
  const [active, setActive] = useState('atrium');

  useEffect(() => {
    if (pathname !== '/') return undefined;
    const nodes = floors.map((floor) => document.getElementById(floor.id)).filter(Boolean);
    if (!nodes.length || !('IntersectionObserver' in window)) return undefined;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: '-40% 0px -50% 0px', threshold: 0 }
    );
    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, [pathname]);

  if (pathname !== '/') return null;

  return (
    <nav
      className="fixed left-5 top-1/2 z-30 hidden w-[4.75rem] -translate-y-1/2 rounded-full bg-paper/90 px-1 py-3 text-center shadow-card backdrop-blur min-[1520px]:block"
      aria-label="Page floors"
    >
      <ol className="space-y-2">
        {floors.map((floor) => (
          <li key={floor.id}>
            <a
              href={`#${floor.id}`}
              className={`block rounded-full px-1 py-1 text-center text-[10px] uppercase tracking-[0.14em] ${
                active === floor.id ? 'text-ember' : 'text-ink/45 hover:text-ink'
              }`}
            >
              {floor.label}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
