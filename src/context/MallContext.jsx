import { createContext, useContext, useEffect, useRef, useState } from 'react';

const MallContext = createContext(null);

function read(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw);
  } catch {
    return fallback;
  }
}

export function MallProvider({ children }) {
  const storedCart = read('velthara-cart', []);
  const storedUser = read('velthara-user', null);
  const [cart, setCart] = useState(Array.isArray(storedCart) ? storedCart : []);
  const [user, setUser] = useState(storedUser && storedUser.email ? storedUser : null);
  const [toast, setToast] = useState(null);
  const cartRef = useRef(cart);
  const toastTimer = useRef(null);
  cartRef.current = cart;

  useEffect(() => {
    localStorage.setItem('velthara-cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    if (user) localStorage.setItem('velthara-user', JSON.stringify(user));
    else localStorage.removeItem('velthara-user');
  }, [user]);

  useEffect(() => () => clearTimeout(toastTimer.current), []);

  function notify(message) {
    setToast({ id: Date.now(), message });
    clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast(null), 2600);
  }

  function commit(next) {
    cartRef.current = next;
    setCart(next);
  }

  function addToCart(product, { option, qty = 1 } = {}) {
    const chosen = option ?? product.options?.values?.[0] ?? null;
    const key = `${product.id}__${chosen || 'base'}`;
    const prev = cartRef.current;
    const found = prev.find((item) => item.key === key);
    const current = found ? found.qty : 0;
    const nextQty = Math.min(product.stock, current + qty);

    if (nextQty === current) {
      notify(`That is the last ${product.name} on the floor.`);
      return;
    }

    const line = {
      key,
      id: product.id,
      name: product.name,
      brand: product.brand,
      price: product.price,
      image: product.images[0],
      option: chosen,
      optionLabel: product.options?.label || null,
      qty: nextQty,
      stock: product.stock,
    };

    commit(found ? prev.map((item) => (item.key === key ? line : item)) : [...prev, line]);
    notify(`${product.name} added to cart`);
  }

  function updateQty(key, qty) {
    commit(
      cartRef.current.map((item) => {
        if (item.key !== key) return item;
        return { ...item, qty: Math.max(1, Math.min(item.stock, qty)) };
      })
    );
  }

  function removeFromCart(key) {
    commit(cartRef.current.filter((item) => item.key !== key));
  }

  function clearCart() {
    commit([]);
  }

  function signUp({ name, email, password }) {
    const users = read('velthara-users', []);
    const list = Array.isArray(users) ? users : [];
    const cleanEmail = email.trim().toLowerCase();
    if (list.some((entry) => entry.email === cleanEmail)) {
      return { ok: false, message: 'That email already holds a house account.' };
    }
    const next = { name: name.trim(), email: cleanEmail, password };
    localStorage.setItem('velthara-users', JSON.stringify([...list, next]));
    setUser({ name: next.name, email: next.email });
    notify(`Welcome to the atrium, ${next.name}.`);
    return { ok: true };
  }

  function signIn({ email, password }) {
    const users = read('velthara-users', []);
    const list = Array.isArray(users) ? users : [];
    const found = list.find(
      (entry) => entry.email === email.trim().toLowerCase() && entry.password === password
    );
    if (!found) return { ok: false, message: 'Those details do not match a house account.' };
    setUser({ name: found.name, email: found.email });
    notify(`Good to see you, ${found.name}.`);
    return { ok: true };
  }

  function signOut() {
    setUser(null);
    notify('Signed out. The bag stays on this device.');
  }

  const count = cart.reduce((sum, item) => sum + item.qty, 0);

  return (
    <MallContext.Provider
      value={{
        cart,
        count,
        user,
        toast,
        addToCart,
        updateQty,
        removeFromCart,
        clearCart,
        signUp,
        signIn,
        signOut,
        notify,
      }}
    >
      {children}
    </MallContext.Provider>
  );
}

export function useMall() {
  const value = useContext(MallContext);
  if (!value) throw new Error('useMall must be used within MallProvider');
  return value;
}
