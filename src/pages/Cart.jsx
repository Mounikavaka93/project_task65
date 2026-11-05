import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { money } from '../lib/format';
import { useMall } from '../context/MallContext';
import { useTitle } from '../hooks/useTitle';
import { IconMinus, IconPlus, IconTrash } from '../components/Icons';
import Photo from '../components/Photo';

function readSlip() {
  try {
    return JSON.parse(sessionStorage.getItem('velthara-slip') || 'null');
  } catch {
    return null;
  }
}

export default function Cart() {
  const { cart, updateQty, removeFromCart, clearCart, user } = useMall();
  const [order, setOrder] = useState(readSlip);
  const [slipName, setSlipName] = useState(user?.name || '');
  useTitle('Shopping cart');

  useEffect(() => {
    if (user?.name) setSlipName((current) => current || user.name);
  }, [user]);

  useEffect(() => {
    if (order) sessionStorage.setItem('velthara-slip', JSON.stringify(order));
    else sessionStorage.removeItem('velthara-slip');
  }, [order]);

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  const courier = subtotal === 0 || subtotal >= 150 ? 0 : 12;
  const total = subtotal + courier;
  const remaining = Math.max(0, 150 - subtotal);

  function reserve() {
    if (!cart.length) return;
    const id = `VEL-${Math.floor(1000 + Math.random() * 9000)}`;
    setOrder({
      id,
      name: slipName.trim() || 'Guest',
      items: cart,
      subtotal,
      courier,
      total,
    });
    clearCart();
  }

  if (order && cart.length === 0) {
    return (
      <div className="wrap py-12">
        <p className="eyebrow">Pickup slip</p>
        <h1 className="mt-2 font-display text-5xl">{order.id}</h1>
        <p className="mt-4 max-w-xl text-ink/75">
          {order.name}, the Level 0 desk will hold this for four hours. This slip lives in your browser. No payment is taken.
        </p>
        <ul className="mt-8 divide-y divide-line rounded-[1.6rem] bg-white shadow-card">
          {order.items.map((item) => (
            <li key={item.key} className="flex items-center justify-between gap-4 px-4 py-3 text-sm">
              <span>
                {item.name}
                {item.option ? ` · ${item.option}` : ''} × {item.qty}
              </span>
              <span>{money(item.price * item.qty)}</span>
            </li>
          ))}
        </ul>
        <p className="mt-4 font-display text-3xl">Total {money(order.total)}</p>
        <button
          type="button"
          className="btn-ink mt-6"
          onClick={() => setOrder(null)}
        >
          Start another bag
        </button>
      </div>
    );
  }

  return (
    <div className="wrap py-10">
      <p className="eyebrow">Shopping cart</p>
      <h1 className="mt-2 font-display text-5xl">Your bag on Level 0.</h1>

      {order ? (
        <p className="mt-4 text-sm text-ink/70">
          Pickup slip {order.id} is still saved for {order.name}.
        </p>
      ) : null}

      {cart.length === 0 ? (
        <div className="mt-10 max-w-xl rounded-[1.8rem] bg-ink px-6 py-10 text-paper">
          <p className="font-display text-4xl">The bag is empty.</p>
          <p className="mt-3 text-paper/75">The stair is open. Start on a floor, or walk the whole galleria.</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link to="/category/all" className="btn-ember">Browse pieces</Link>
            <Link to="/offers" className="btn-light">See offers</Link>
          </div>
        </div>
      ) : (
        <div className="mt-8 grid items-start gap-8 lg:grid-cols-[1.4fr_.8fr]">
          <ul className="space-y-4">
            {cart.map((item) => (
              <li key={item.key} className="flex gap-4 rounded-[1.4rem] bg-white p-3 shadow-card">
                <Link to={`/product/${item.id}`} className="h-28 w-24 shrink-0 overflow-hidden rounded-2xl">
                  <Photo src={item.image} alt={item.name} fallback={item.name} className="h-full w-full object-cover" />
                </Link>
                <div className="flex flex-1 flex-col">
                  <p className="text-[11px] uppercase tracking-[0.16em] text-gold">{item.brand}</p>
                  <Link to={`/product/${item.id}`} className="font-display text-2xl leading-tight hover:text-ember">
                    {item.name}
                  </Link>
                  {item.option ? (
                    <p className="text-sm text-ink/60">
                      {item.optionLabel}: {item.option}
                    </p>
                  ) : null}
                  <div className="mt-auto flex flex-wrap items-center justify-between gap-3 pt-3">
                    <div className="flex items-center rounded-full border border-line">
                      <button
                        type="button"
                        className="grid h-9 w-9 place-items-center"
                        disabled={item.qty <= 1}
                        onClick={() => updateQty(item.key, item.qty - 1)}
                        aria-label={`Decrease ${item.name}`}
                      >
                        <IconMinus className="h-4 w-4" />
                      </button>
                      <span className="w-6 text-center text-sm">{item.qty}</span>
                      <button
                        type="button"
                        className="grid h-9 w-9 place-items-center"
                        disabled={item.qty >= item.stock}
                        onClick={() => updateQty(item.key, item.qty + 1)}
                        aria-label={`Increase ${item.name}`}
                      >
                        <IconPlus className="h-4 w-4" />
                      </button>
                    </div>
                    <p className="font-medium">{money(item.price * item.qty)}</p>
                    <button type="button" onClick={() => removeFromCart(item.key)} className="text-ink/50 hover:text-ember" aria-label={`Remove ${item.name}`}>
                      <IconTrash className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>

          <aside className="rounded-[1.6rem] bg-white p-5 shadow-card lg:sticky lg:top-24">
            <h2 className="font-display text-3xl">Pickup</h2>
            <div className="mt-4 h-1 overflow-hidden rounded-full bg-paper2">
              <div className="h-full rounded-full bg-ember" style={{ width: `${Math.min(100, (subtotal / 150) * 100)}%` }} />
            </div>
            <p className="mt-2 text-xs text-ink/60">
              {remaining > 0 ? `${money(remaining)} until spiral courier is included.` : 'Spiral courier is included.'}
            </p>
            <dl className="mt-5 space-y-2 text-sm">
              <div className="flex justify-between">
                <dt>Subtotal</dt>
                <dd>{money(subtotal)}</dd>
              </div>
              <div className="flex justify-between">
                <dt>Courier</dt>
                <dd>{courier === 0 ? 'Included' : money(courier)}</dd>
              </div>
              <div className="flex justify-between border-t border-line pt-2 font-medium">
                <dt>Total</dt>
                <dd>{money(total)}</dd>
              </div>
            </dl>
            <label className="mt-5 block text-sm" htmlFor="slip-name">
              Name for the pickup slip
            </label>
            <input
              id="slip-name"
              value={slipName}
              onChange={(event) => setSlipName(event.target.value)}
              placeholder="Guest"
              className="field mt-2"
            />
            <button type="button" className="btn-ember mt-4 w-full" onClick={reserve}>
              Reserve atrium pickup
            </button>
            <p className="mt-3 text-xs leading-relaxed text-ink/50">
              A demo slip only. Nothing is charged, and the order stays in this browser.
            </p>
            {!user ? (
              <Link to="/signin" className="mt-3 inline-flex text-sm text-ember underline-offset-4 hover:underline">
                Sign in to put your name on the slip
              </Link>
            ) : null}
          </aside>
        </div>
      )}
    </div>
  );
}
