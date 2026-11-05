import { useEffect, useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { searchProducts } from '../data/catalog';
import { useTitle } from '../hooks/useTitle';
import ProductCard from '../components/ProductCard';

export default function Search() {
  const [params] = useSearchParams();
  const query = params.get('q') || '';
  const [value, setValue] = useState(query);
  const navigate = useNavigate();
  const results = searchProducts(query);
  useTitle(query ? `Search ${query}` : 'Search');

  useEffect(() => {
    setValue(query);
  }, [query]);

  function submit(event) {
    event.preventDefault();
    navigate(`/search?q=${encodeURIComponent(value.trim())}`);
  }

  return (
    <div className="wrap py-10">
      <p className="eyebrow">Search</p>
      <h1 className="mt-2 font-display text-5xl">{query ? `Results for “${query}”` : 'Search the galleria.'}</h1>
      <form onSubmit={submit} className="mt-6 flex max-w-xl gap-2">
        <label className="sr-only" htmlFor="page-search">Search</label>
        <input id="page-search" value={value} onChange={(event) => setValue(event.target.value)} className="field" placeholder="A coat, a house, a floor" />
        <button type="submit" className="btn-ink shrink-0">Search</button>
      </form>

      {!query ? (
        <p className="mt-8 text-ink/70">
          Try “trench”, “Halcyon”, or “honey”. Or walk <Link to="/category/all" className="text-ember underline-offset-4 hover:underline">every floor</Link>.
        </p>
      ) : results.length === 0 ? (
        <div className="mt-8 rounded-[1.6rem] bg-white p-8 shadow-card">
          <p className="font-display text-3xl">Nothing is wearing that name.</p>
          <Link to="/category/all" className="btn-ink mt-4">Browse all pieces</Link>
        </div>
      ) : (
        <>
          <p className="mt-6 text-sm text-ink/60">{results.length} {results.length === 1 ? 'piece' : 'pieces'}</p>
          <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {results.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
