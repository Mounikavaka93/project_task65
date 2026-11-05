import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { categoryBySlug, getProduct, relatedProducts } from '../data/catalog';
import { discountOf, money } from '../lib/format';
import { useMall } from '../context/MallContext';
import { useTitle } from '../hooks/useTitle';
import { IconMinus, IconPlus, IconStar } from '../components/Icons';
import Photo from '../components/Photo';
import ProductCard from '../components/ProductCard';

export default function ProductDetails() {
  const { id } = useParams();
  const product = getProduct(id);
  const { addToCart } = useMall();
  const [shot, setShot] = useState(0);
  const [qty, setQty] = useState(1);
  const [option, setOption] = useState(product?.options?.values?.[0] || null);
  const [added, setAdded] = useState(false);
  const [openNote, setOpenNote] = useState(true);
  useTitle(product ? product.name : 'Missing piece');

  useEffect(() => {
    setShot(0);
    setQty(1);
    setOption(product?.options?.values?.[0] || null);
    setAdded(false);
  }, [product?.id]);

  if (!product) {
    return (
      <div className="wrap py-16">
        <h1 className="font-display text-5xl">That piece has left the floor.</h1>
        <Link to="/category/all" className="btn-ember mt-6">
          Browse the galleria
        </Link>
      </div>
    );
  }

  const category = categoryBySlug(product.category);
  const discount = discountOf(product);
  const related = relatedProducts(product);

  function add() {
    addToCart(product, { option, qty });
    setAdded(true);
    setTimeout(() => setAdded(false), 1200);
  }

  return (
    <div className="wrap py-10">
      <nav aria-label="Breadcrumb" className="text-sm text-ink/55">
        <Link to="/" className="hover:text-ember">Home</Link>
        <span> / </span>
        <Link to={`/category/${product.category}`} className="hover:text-ember">{category?.name}</Link>
        <span> / </span>
        <span className="text-ink">{product.name}</span>
      </nav>

      <div className="mt-6 grid items-start gap-8 lg:grid-cols-2">
        <div>
          <div className="overflow-hidden rounded-[1.8rem] bg-white shadow-card">
            <Photo
              key={product.images[shot]}
              src={product.images[shot]}
              alt={shot === 0 ? product.name : `${product.name}, alternate view`}
              fallback={product.name}
              priority
              className="ken aspect-[4/5] w-full object-cover"
            />
          </div>
          <div className="mt-3 grid grid-cols-2 gap-3">
            {product.images.map((src, index) => (
              <button
                key={src}
                type="button"
                onClick={() => setShot(index)}
                className={`overflow-hidden rounded-2xl ${index === shot ? 'ring-2 ring-ember' : 'ring-1 ring-line'}`}
                aria-label={`Show image ${index + 1}`}
              >
                <Photo src={src} alt="" fallback={product.name} className="aspect-[4/3] w-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        <div>
          <p className="eyebrow">{product.brand}</p>
          <h1 className="mt-2 font-display text-5xl leading-tight">{product.name}</h1>
          <p className="mt-3 flex items-center gap-2 text-sm text-ink/70">
            <IconStar className="h-4 w-4 text-ember" />
            {product.rating.toFixed(1)} · {product.reviews} notes from the floor
          </p>
          <div className="mt-5 flex items-end gap-3">
            <p className="font-display text-4xl">{money(product.price)}</p>
            {discount > 0 ? (
              <>
                <p className="text-lg text-ink/40 line-through">{money(product.compareAt)}</p>
                <span className="rounded-full bg-ember/10 px-2 py-1 text-xs font-medium text-ember">Save {discount}%</span>
              </>
            ) : null}
          </div>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-ink/80">{product.description}</p>
          <p className="mt-3 text-sm text-ink/60">
            Sold by {product.brand} on {product.floor}. {product.stock < 6 ? 'Only a few left on the rail.' : `${product.stock} on the rail.`}
          </p>

          {product.options ? (
            <fieldset className="mt-6">
              <legend className="text-sm font-medium">{product.options.label}</legend>
              <div className="mt-3 flex flex-wrap gap-2">
                {product.options.values.map((value) => {
                  const swatch = product.swatches?.[value];
                  const selected = option === value;
                  return (
                    <button
                      key={value}
                      type="button"
                      onClick={() => setOption(value)}
                      className={`inline-flex items-center gap-2 rounded-full border px-3 py-2 text-sm ${
                        selected ? 'border-ink bg-ink text-paper' : 'border-line bg-white text-ink'
                      }`}
                      aria-pressed={selected}
                    >
                      {swatch ? (
                        <span className="h-3.5 w-3.5 rounded-full border border-black/10" style={{ background: swatch }} />
                      ) : null}
                      {value}
                    </button>
                  );
                })}
              </div>
              {product.options.label === 'Size' ? (
                <p className="mt-2 text-xs text-ink/50">Between sizes? Take the one above.</p>
              ) : null}
            </fieldset>
          ) : null}

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <div className="flex items-center rounded-full border border-line bg-white">
              <button
                type="button"
                className="grid h-11 w-11 place-items-center"
                onClick={() => setQty((value) => Math.max(1, value - 1))}
                aria-label="Decrease quantity"
                disabled={qty <= 1}
              >
                <IconMinus className="h-4 w-4" />
              </button>
              <span className="w-8 text-center text-sm" aria-live="polite">{qty}</span>
              <button
                type="button"
                className="grid h-11 w-11 place-items-center"
                onClick={() => setQty((value) => Math.min(product.stock, value + 1))}
                aria-label="Increase quantity"
                disabled={qty >= product.stock}
              >
                <IconPlus className="h-4 w-4" />
              </button>
            </div>
            <button type="button" className="btn-ember" onClick={add}>
              {added ? 'Added to cart' : `Add to cart · ${money(product.price * qty)}`}
            </button>
          </div>
          <p className="mt-3 text-xs text-ink/50">Pickup at the Level 0 desk, or spiral courier inside the district over $150.</p>

          <div className="mt-8 divide-y divide-line rounded-[1.4rem] border border-line bg-white">
            <button type="button" className="flex w-full items-center justify-between px-4 py-3 text-left text-sm" onClick={() => setOpenNote((value) => !value)} aria-expanded={openNote}>
              From the house
              <span>{openNote ? '–' : '+'}</span>
            </button>
            {openNote ? <p className="px-4 pb-4 text-sm leading-relaxed text-ink/70">{product.note}</p> : null}
            <div className="px-4 py-3 text-sm text-ink/70">
              Held for four hours once you reserve a pickup slip. No payment is taken in this demo.
            </div>
          </div>

          <Link to={`/stores?q=${encodeURIComponent(product.brand)}`} className="mt-4 inline-flex text-sm text-ember underline-offset-4 hover:underline">
            Find {product.brand} in the directory
          </Link>
        </div>
      </div>

      <section className="mt-16">
        <h2 className="font-display text-4xl">Others on {product.floor}</h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {related.map((item) => (
            <ProductCard key={item.id} product={item} />
          ))}
        </div>
      </section>
    </div>
  );
}
