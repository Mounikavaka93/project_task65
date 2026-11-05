import { useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { categories, categoryBySlug, products } from '../data/catalog';
import { discountOf } from '../lib/format';
import { useTitle } from '../hooks/useTitle';
import Photo from '../components/Photo';
import ProductCard from '../components/ProductCard';

const bands = [
  { id: 'all', label: 'Any price' },
  { id: 'under', label: 'Under $50' },
  { id: 'mid', label: '$50 – $150' },
  { id: 'over', label: 'Over $150' },
];

export default function Category() {
  const { slug = 'all' } = useParams();
  const category = categoryBySlug(slug);
  const [sort, setSort] = useState('featured');
  const [band, setBand] = useState('all');
  const [sale, setSale] = useState(false);
  useTitle(category ? category.name : 'Missing floor');

  const shown = useMemo(() => {
    if (!category) return [];
    let list = slug === 'all' ? [...products] : products.filter((product) => product.category === slug);
    if (sale) list = list.filter((product) => discountOf(product) > 0);
    if (band === 'under') list = list.filter((product) => product.price < 50);
    if (band === 'mid') list = list.filter((product) => product.price >= 50 && product.price <= 150);
    if (band === 'over') list = list.filter((product) => product.price > 150);
    list.sort((a, b) => {
      if (sort === 'price-asc') return a.price - b.price;
      if (sort === 'price-desc') return b.price - a.price;
      if (sort === 'discount') return discountOf(b) - discountOf(a);
      if (sort === 'name') return a.name.localeCompare(b.name);
      return 0;
    });
    return list;
  }, [band, category, sale, slug, sort]);

  if (!category) {
    return (
      <div className="wrap py-16">
        <h1 className="font-display text-5xl">That floor is not on the stair.</h1>
        <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((item) => (
            <Link key={item.slug} to={`/category/${item.slug}`} className="rounded-2xl bg-white p-4 shadow-card">
              {item.name}
            </Link>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="wrap py-10">
      <div className="relative h-56 overflow-hidden rounded-[1.8rem] bg-ink text-paper sm:h-64">
        <Photo src={category.image} alt="" className="absolute inset-0 h-full w-full object-cover opacity-60" />
        <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/75 to-transparent" />
        <div className="relative flex h-full flex-col justify-end p-6">
          <p className="text-[11px] uppercase tracking-[0.2em] text-goldbright">{category.level}</p>
          <h1 className="font-display text-5xl">{category.name}</h1>
          <p className="mt-2 max-w-xl text-paper/80">{category.line}</p>
        </div>
      </div>

      <div className="mt-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-wrap gap-2">
          {bands.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setBand(item.id)}
              className={`rounded-full px-3 py-1.5 text-sm ${band === item.id ? 'bg-ink text-paper' : 'bg-white text-ink'}`}
            >
              {item.label}
            </button>
          ))}
          <button
            type="button"
            onClick={() => setSale((value) => !value)}
            className={`rounded-full px-3 py-1.5 text-sm ${sale ? 'bg-ember text-white' : 'bg-white text-ink'}`}
          >
            On sale
          </button>
        </div>
        <label className="flex items-center gap-2 text-sm">
          <span className="text-ink/60">Sort</span>
          <select
            value={sort}
            onChange={(event) => setSort(event.target.value)}
            className="rounded-full border border-line bg-white px-3 py-2 text-sm"
          >
            <option value="featured">Featured</option>
            <option value="price-asc">Price, low to high</option>
            <option value="price-desc">Price, high to low</option>
            <option value="discount">Biggest discount</option>
            <option value="name">Name</option>
          </select>
        </label>
      </div>

      <p className="mt-4 text-sm text-ink/60">
        {shown.length} {shown.length === 1 ? 'piece' : 'pieces'}
      </p>

      {shown.length === 0 ? (
        <div className="mt-8 rounded-[1.6rem] bg-white p-8 shadow-card">
          <p className="font-display text-3xl">Nothing in that slice.</p>
          <button
            type="button"
            className="btn-ink mt-4"
            onClick={() => {
              setBand('all');
              setSale(false);
              setSort('featured');
            }}
          >
            Clear filters
          </button>
        </div>
      ) : (
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {shown.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
