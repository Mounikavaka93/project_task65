import { useEffect, useMemo, useRef, useState } from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { categories, searchProducts } from '../data/catalog';
import { money } from '../lib/format';
import { useMall } from '../context/MallContext';
import { IconCart, IconSearch, LogoMark } from './Icons';
import Photo from './Photo';

function ResultList({ items, query, onPick }) {
  if (!query.trim()) return null;
  if (!items.length) {
    return <p className="px-3 py-3 text-sm text-ink/60">Nothing is wearing that name.</p>;
  }
  return (
    <ul>
      {items.map((product) => (
        <li key={product.id}>
          <Link
            to={`/product/${product.id}`}
            onMouseDown={(event) => event.preventDefault()}
            onClick={onPick}
            className="flex items-center gap-3 rounded-2xl px-2 py-2 hover:bg-paper2"
          >
            <Photo
              src={product.images[0]}
              alt=""
              fallback={product.name}
              className="h-12 w-12 shrink-0 rounded-xl object-cover"
            />
            <span>
              <span className="block text-sm font-medium text-ink">{product.name}</span>
              <span className="block text-xs text-ink/55">
                {product.brand} · {money(product.price)}
              </span>
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
}

export default function Navbar() {
  const { count, user, signOut } = useMall();
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const [menu, setMenu] = useState(false);
  const [drop, setDrop] = useState(false);
  const [query, setQuery] = useState('');
  const [focus, setFocus] = useState(false);
  const searchRef = useRef(null);

  const results = useMemo(() => searchProducts(query).slice(0, 6), [query]);
  const onDark = pathname === '/' && !scrolled && !menu;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMenu(false);
    setDrop(false);
    setFocus(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = menu ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [menu]);

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 1024) setMenu(false);
    };
    const onKey = (event) => {
      if (event.key === 'Escape') {
        setMenu(false);
        setDrop(false);
        setFocus(false);
      }
    };
    window.addEventListener('resize', onResize);
    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('resize', onResize);
      window.removeEventListener('keydown', onKey);
    };
  }, []);

  function submitSearch(event) {
    event.preventDefault();
    const term = query.trim();
    if (!term) return;
    navigate(`/search?q=${encodeURIComponent(term)}`);
    setFocus(false);
    setMenu(false);
  }

  function openSearch() {
    setMenu(true);
    setTimeout(() => searchRef.current?.focus(), 40);
  }

  const linkClass = ({ isActive }) =>
    `text-sm tracking-wide transition hover:opacity-100 ${
      isActive ? 'opacity-100 underline decoration-ember underline-offset-8' : 'opacity-75'
    }`;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition ${
        onDark ? 'text-paper' : 'border-b border-line bg-paper/90 text-ink backdrop-blur'
      }`}
    >
      <div className="wrap flex h-16 items-center gap-3 md:h-20">
        <Link to="/" className="flex items-center gap-2" aria-label="Velthara home" onClick={() => setMenu(false)}>
          <LogoMark />
          <span>
            <span className="block font-display text-2xl leading-none">Velthara</span>
            <span className="hidden text-[10px] uppercase tracking-[0.22em] opacity-60 sm:block">Spiral galleria</span>
          </span>
        </Link>

        <nav className="ml-6 hidden items-center gap-6 lg:flex" aria-label="Primary">
          <NavLink to="/" end className={linkClass}>
            Home
          </NavLink>
          <div className="relative" onMouseEnter={() => setDrop(true)} onMouseLeave={() => setDrop(false)}>
            <button
              type="button"
              className="text-sm tracking-wide opacity-75 hover:opacity-100"
              aria-expanded={drop}
              onClick={() => setDrop((open) => !open)}
            >
              Atelier
            </button>
            {drop ? (
              <div className="absolute left-0 top-full z-20 w-80 pt-3 text-ink">
                <div className="rounded-3xl border border-line bg-paper p-2 shadow-card">
                  <Link
                    to="/category/all"
                    onClick={() => setDrop(false)}
                    className="block rounded-2xl px-3 py-2 hover:bg-paper2"
                  >
                    <span className="block text-sm font-medium">Entire galleria</span>
                    <span className="block text-xs text-ink/60">Every piece currently on the floor</span>
                  </Link>
                  {categories.map((category) => (
                    <Link
                      key={category.slug}
                      to={`/category/${category.slug}`}
                      onClick={() => setDrop(false)}
                      className="block rounded-2xl px-3 py-2 hover:bg-paper2"
                    >
                      <span className="block text-sm font-medium">
                        {category.name}
                        <span className="ml-2 text-[11px] uppercase tracking-[0.14em] text-gold">{category.level}</span>
                      </span>
                      <span className="block text-xs text-ink/60">{category.line}</span>
                    </Link>
                  ))}
                </div>
              </div>
            ) : null}
          </div>
          <NavLink to="/stores" className={linkClass}>
            Stores
          </NavLink>
          <NavLink to="/offers" className={linkClass}>
            Offers
          </NavLink>
          <NavLink to="/contact" className={linkClass}>
            Visit
          </NavLink>
        </nav>

        <div className="ml-auto flex items-center gap-2">
          <form onSubmit={submitSearch} className="relative hidden lg:block">
            <label className="sr-only" htmlFor="desk-search">
              Search the galleria
            </label>
            <IconSearch className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 opacity-60" />
            <input
              id="desk-search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              onFocus={() => setFocus(true)}
              onBlur={() => setFocus(false)}
              placeholder="Search pieces"
              className="w-52 rounded-full border border-current/20 bg-white/80 py-2 pl-9 pr-3 text-sm text-ink outline-none"
            />
            {focus && query.trim() ? (
              <div className="absolute right-0 top-full z-20 mt-2 w-80 rounded-3xl border border-line bg-paper p-2 text-ink shadow-card">
                <ResultList items={results} query={query} onPick={() => setFocus(false)} />
              </div>
            ) : null}
          </form>

          <button type="button" className="grid h-10 w-10 place-items-center rounded-full border border-current/20 lg:hidden" onClick={openSearch} aria-label="Open search">
            <IconSearch className="h-5 w-5" />
          </button>

          {user ? (
            <button type="button" className="hidden items-center gap-2 text-sm lg:flex" onClick={signOut}>
              <span className="max-w-[8rem] truncate">{user.name}</span>
              <span className="opacity-60">Sign out</span>
            </button>
          ) : (
            <Link to="/signin" className="hidden text-sm tracking-wide opacity-80 hover:opacity-100 lg:inline">
              Sign in
            </Link>
          )}

          <Link
            to="/cart"
            aria-label={`Shopping cart, ${count} ${count === 1 ? 'item' : 'items'}`}
            className="relative grid h-10 w-10 place-items-center rounded-full border border-current/20"
          >
            <IconCart className="h-5 w-5" />
            {count > 0 ? (
              <span className="absolute -right-1 -top-1 grid h-5 min-w-5 place-items-center rounded-full bg-ember px-1 text-[11px] text-white">
                {count > 9 ? '9+' : count}
              </span>
            ) : null}
          </Link>

          <button
            type="button"
            className="grid h-10 w-10 place-items-center rounded-full border border-current/20 lg:hidden"
            aria-label={menu ? 'Close menu' : 'Open menu'}
            aria-expanded={menu}
            onClick={() => setMenu((open) => !open)}
          >
            <span className="relative block h-3.5 w-5">
              <span className={`absolute left-0 h-px w-5 bg-current transition ${menu ? 'top-1.5 rotate-45' : 'top-0'}`} />
              <span className={`absolute left-0 top-1.5 h-px w-5 bg-current transition ${menu ? 'opacity-0' : ''}`} />
              <span className={`absolute left-0 h-px w-5 bg-current transition ${menu ? 'top-1.5 -rotate-45' : 'top-3'}`} />
            </span>
          </button>
        </div>
      </div>

      {menu ? (
        <div className="absolute inset-x-0 top-full z-40 h-[calc(100dvh-4rem)] overflow-y-auto bg-paper text-ink shadow-card md:h-[calc(100dvh-5rem)] lg:hidden">
          <div className="wrap space-y-6 py-6">
            <form onSubmit={submitSearch}>
              <label className="sr-only" htmlFor="mobile-search">
                Search the galleria
              </label>
              <input
                id="mobile-search"
                ref={searchRef}
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search pieces, houses, floors"
                className="field"
              />
            </form>
            <ResultList items={results} query={query} onPick={() => setMenu(false)} />
            <nav className="grid gap-2 text-3xl font-display" aria-label="Mobile">
              <Link to="/" onClick={() => setMenu(false)}>Home</Link>
              <Link to="/category/all" onClick={() => setMenu(false)}>Entire galleria</Link>
              <Link to="/stores" onClick={() => setMenu(false)}>Stores</Link>
              <Link to="/offers" onClick={() => setMenu(false)}>Offers & events</Link>
              <Link to="/contact" onClick={() => setMenu(false)}>Visit</Link>
              <Link to="/cart" onClick={() => setMenu(false)}>Cart</Link>
            </nav>
            <div>
              <p className="eyebrow">Floors</p>
              <div className="mt-3 grid grid-cols-2 gap-2">
                {categories.map((category) => (
                  <Link
                    key={category.slug}
                    to={`/category/${category.slug}`}
                    onClick={() => setMenu(false)}
                    className="rounded-2xl bg-white px-3 py-3 text-sm"
                  >
                    <span className="block font-medium">{category.name}</span>
                    <span className="text-xs text-ink/55">{category.level}</span>
                  </Link>
                ))}
              </div>
            </div>
            {user ? (
              <button type="button" className="btn-ink" onClick={() => { signOut(); setMenu(false); }}>
                Sign out, {user.name}
              </button>
            ) : (
              <div className="flex gap-3">
                <Link to="/signin" className="btn-ink" onClick={() => setMenu(false)}>Sign in</Link>
                <Link to="/signup" className="btn-line" onClick={() => setMenu(false)}>Create account</Link>
              </div>
            )}
          </div>
        </div>
      ) : null}
    </header>
  );
}
