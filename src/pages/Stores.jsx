import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { categories, stores } from '../data/catalog';
import { useTitle } from '../hooks/useTitle';
import StoreCard from '../components/StoreCard';

export default function Stores() {
  const [params] = useSearchParams();
  const initial = params.get('q') || '';
  const [query, setQuery] = useState(initial);
  const [cat, setCat] = useState('all');
  useTitle('Store directory');

  useEffect(() => {
    setQuery(params.get('q') || '');
  }, [params]);

  const shown = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return stores.filter((store) => {
      const haystack = `${store.name} ${store.category} ${store.blurb} ${store.level}`.toLowerCase();
      const catOk = cat === 'all' || store.categorySlug === cat;
      return catOk && (!needle || haystack.includes(needle));
    });
  }, [cat, query]);

  return (
    <div className="wrap py-10">
      <p className="eyebrow">Store directory</p>
      <h1 className="mt-2 font-display text-5xl">Twelve houses, six temperatures of light.</h1>
      <p className="mt-3 max-w-2xl text-ink/70">
        Filter by floor category or search a house name. Hours follow the atrium: 10:00 to 22:00.
      </p>

      <div className="mt-8 flex flex-col gap-4">
        <label className="sr-only" htmlFor="store-search">Search stores</label>
        <input
          id="store-search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search houses, floors, or what they keep"
          className="field max-w-xl"
        />
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setCat('all')}
            className={`rounded-full px-3 py-1.5 text-sm ${cat === 'all' ? 'bg-ink text-paper' : 'bg-white text-ink'}`}
          >
            All houses
          </button>
          {categories.map((category) => (
            <button
              key={category.slug}
              type="button"
              onClick={() => setCat(category.slug)}
              className={`rounded-full px-3 py-1.5 text-sm ${cat === category.slug ? 'bg-ink text-paper' : 'bg-white text-ink'}`}
            >
              {category.name}
            </button>
          ))}
        </div>
      </div>

      <p className="mt-5 text-sm text-ink/55">{shown.length} {shown.length === 1 ? 'house' : 'houses'}</p>

      {shown.length === 0 ? (
        <div className="mt-6 rounded-[1.6rem] bg-white p-8 shadow-card">
          <p className="font-display text-3xl">No house by that name on this floor.</p>
          <button
            type="button"
            className="btn-ink mt-4"
            onClick={() => {
              setQuery('');
              setCat('all');
            }}
          >
            Show every house
          </button>
        </div>
      ) : (
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {shown.map((store) => (
            <StoreCard key={store.id} store={store} />
          ))}
        </div>
      )}
    </div>
  );
}
