import { useState } from 'react';
import { Link } from 'react-router-dom';
import { categories } from '../data/catalog';
import { LogoMark } from './Icons';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [joined, setJoined] = useState(() => {
    try {
      return localStorage.getItem('velthara-notes') === 'yes';
    } catch {
      return false;
    }
  });

  function join(event) {
    event.preventDefault();
    if (!email.trim()) return;
    try {
      localStorage.setItem('velthara-notes', 'yes');
    } catch {
      /* The note still confirms on this page if storage is blocked. */
    }
    setJoined(true);
    setEmail('');
  }

  return (
    <footer className="bg-ink text-paper">
      <div className="wrap grid gap-10 py-14 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <div className="flex items-center gap-2">
            <LogoMark />
            <span className="font-display text-3xl">Velthara</span>
          </div>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-paper/70">
            The spiral galleria of the Aurora District. Six floors around one turning glass stair.
          </p>
          <p className="mt-4 text-sm text-paper/70">18 Helix Lane, Aurora District</p>
          <p className="text-sm text-paper/70">Open daily 10:00 – 22:00</p>
        </div>
        <div>
          <p className="text-[11px] uppercase tracking-[0.2em] text-goldbright">Floors</p>
          <ul className="mt-4 space-y-2 text-sm">
            <li><Link to="/category/all" className="hover:text-ember">Entire galleria</Link></li>
            {categories.map((category) => (
              <li key={category.slug}>
                <Link to={`/category/${category.slug}`} className="hover:text-ember">
                  {category.name}
                  <span className="ml-2 text-paper/40">{category.level}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="text-[11px] uppercase tracking-[0.2em] text-goldbright">House</p>
          <ul className="mt-4 space-y-2 text-sm">
            <li><Link to="/stores" className="hover:text-ember">Store directory</Link></li>
            <li><Link to="/offers" className="hover:text-ember">Offers & events</Link></li>
            <li><Link to="/cart" className="hover:text-ember">Shopping cart</Link></li>
            <li><Link to="/signin" className="hover:text-ember">Sign in</Link></li>
            <li><Link to="/contact" className="hover:text-ember">Contact the desk</Link></li>
          </ul>
        </div>
        <div>
          <p className="text-[11px] uppercase tracking-[0.2em] text-goldbright">Sunday notes</p>
          <p className="mt-4 text-sm text-paper/70">A short note when Spiral Sunday opens. Kept on this device.</p>
          {joined ? (
            <p className="mt-4 text-sm text-aurora">You are on the Sunday list.</p>
          ) : (
            <form onSubmit={join} className="mt-4 flex gap-2">
              <label className="sr-only" htmlFor="notes-email">Email</label>
              <input
                id="notes-email"
                type="email"
                required
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="Email"
                className="w-full rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm outline-none placeholder:text-paper/40"
              />
              <button type="submit" className="btn-ember shrink-0">Join</button>
            </form>
          )}
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="wrap flex flex-col gap-2 py-5 text-xs text-paper/50 sm:flex-row sm:justify-between">
          <p>© {new Date().getFullYear()} Velthara. A fictional spiral galleria.</p>
          <p>House accounts and the cart stay in this browser. Nothing is sent to a server.</p>
        </div>
      </div>
    </footer>
  );
}
