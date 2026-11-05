import { Link } from 'react-router-dom';
import Photo from './Photo';

export default function StoreCard({ store }) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-[1.6rem] bg-white shadow-card">
      <div className="relative aspect-[4/3] overflow-hidden">
        <Photo
          src={store.image}
          alt={`${store.name} inside Velthara`}
          fallback={store.name}
          className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105"
        />
        <span className="absolute left-3 top-3 rounded-full bg-paper/90 px-2.5 py-1 text-[11px] uppercase tracking-[0.14em]">
          {store.level}
        </span>
      </div>
      <div className="flex flex-1 flex-col p-4">
        <p className="text-[11px] uppercase tracking-[0.18em] text-gold">{store.category}</p>
        <h3 className="mt-1 font-display text-2xl">{store.name}</h3>
        <p className="mt-2 text-sm leading-relaxed text-ink/70">{store.blurb}</p>
        <p className="mt-3 text-xs text-ink/50">{store.hours}</p>
        <Link
          to={`/category/${store.categorySlug}`}
          className="mt-auto inline-flex pt-4 text-sm font-medium text-ember underline-offset-4 hover:underline"
        >
          Shop this floor
        </Link>
      </div>
    </article>
  );
}
