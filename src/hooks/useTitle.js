import { useEffect } from 'react';

export function useTitle(title) {
  useEffect(() => {
    document.title = title ? `${title} · Velthara` : 'Velthara — The Spiral Galleria';
  }, [title]);
}
