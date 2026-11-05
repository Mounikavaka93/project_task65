import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { discountOf, money } from '../lib/format';
import { useMall } from '../context/MallContext';
import { IconStar } from './Icons';
import Photo from './Photo';

function tiltMove(event) {
  if (!window.matchMedia('(pointer: fine)').matches) return;
  const card = event.currentTarget;
  const bounds = card.getBoundingClientRect();
  const x = (event.clientX - bounds.left) / bounds.width - 0.5;
  const y = (event.clientY - bounds.top) / bounds.height - 0.5;
  card.style.transform = `rotateY(${(x * 10).toFixed(2)}deg) rotateX(${(-y * 10).toFixed(2)}deg)`;
}

function tiltLeave(event) {
  event.currentTarget.style.transform = 'rotateY(0deg) rotateX(0deg)';
}

export default function ProductCard({ product, wide = false, priority = false }) {
  const { addToCart } = useMall();
  const [added, setAdded] = useState(false);
  const timer = useRef(null);
  const discount = discountOf(product);

  useEffect(() => () => clearTimeout(timer.current), []);

  function onAdd() {
    addToCart(product);
    setAdded(true);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setAdded(false), 1000);
  }

  return (
    <div className="h-full [perspective:900px]">
      <article
        onMouseMove={tiltMove}
        onMouseLeave={tiltLeave}
        className="flex h-full flex-col overflow-hidden rounded-[1.6rem] bg-white shadow-card transition-transform duration-200 [transform-style:preserve-3d]"
      >
        <Link to={`/product/${product.id}`} className="group relative block overflow-hidden">
          <div className={`relative bg-paper2 ${wide ? 'aspect-[4/3] sm:aspect-[16/10]' : 'aspect-[4/5]'}`}>
            <Photo
              src={product.images[0]}
              alt={product.name}
              fallback={product.name}
              priority={priority}
              className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105"
            />
            <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent transition duration-700 group-hover:translate-x-full" />
          </div>
          {discount > 0 ? (
            <span className="absolute left-3 top-3 rounded-full bg-ember px-2.5 py-1 text-xs font-medium text-white">
              -{discount}%
            </span>
          ) : null}
          {product.badge ? (
            <span className="absolute right-3 top-3 rounded-full bg-paper/90 px-2.5 py-1 text-[11px] uppercase tracking-[0.14em] text-ink">
              {product.badge}
            </span>
          ) : null}
        </Link>
        <div className="flex flex-1 flex-col p-4">
          <p className="text-[11px] uppercase tracking-[0.18em] text-gold">{product.brand}</p>
          <Link to={`/product/${product.id}`} className="mt-1 font-display text-2xl leading-tight hover:text-ember">
            {product.name}
          </Link>
          <p className="mt-2 flex items-center gap-1 text-xs text-ink/60">
            <IconStar className="h-3.5 w-3.5 text-ember" />
            {product.rating.toFixed(1)}
            <span>({product.reviews})</span>
          </p>
          <div className="mt-auto flex items-end justify-between gap-3 pt-4">
            <div>
              <p className="font-medium">{money(product.price)}</p>
              {discount > 0 ? <p className="text-xs text-ink/45 line-through">{money(product.compareAt)}</p> : null}
            </div>
            <button
              type="button"
              onClick={onAdd}
              className="whitespace-nowrap rounded-full bg-ink px-3 py-2 text-xs font-medium text-paper transition hover:bg-ember"
            >
              {added ? 'Added' : 'Add to cart'}
            </button>
          </div>
        </div>
      </article>
    </div>
  );
}
