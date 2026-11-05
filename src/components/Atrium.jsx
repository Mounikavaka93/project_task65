import { products } from '../data/catalog';
import Photo from './Photo';

const floats = ['helix-trench', 'quiet-orbit', 'orbit-tote']
  .map((id) => products.find((product) => product.id === id))
  .filter(Boolean);

const spots = [
  { left: '0%', top: '10%' },
  { right: '0%', top: '18%' },
  { left: '8%', bottom: '2%' },
];

export default function Atrium() {
  function move(event) {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (!window.matchMedia('(pointer: fine)').matches) return;
    const bounds = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width - 0.5;
    const y = (event.clientY - bounds.top) / bounds.height - 0.5;
    event.currentTarget.style.transform = `rotateX(${(-y * 8).toFixed(2)}deg) rotateY(${(x * 12).toFixed(2)}deg)`;
  }

  function leave(event) {
    event.currentTarget.style.transform = 'rotateX(0deg) rotateY(0deg)';
  }

  return (
    <div className="v-scene" onMouseMove={move} onMouseLeave={leave} aria-hidden="true">
      <div className="v-blob" />
      <div className="v-beam" />
      <div className="v-shadow" />
      <div className="v-tower">
        {Array.from({ length: 6 }).map((_, index) => (
          <div key={index} className="v-ring" style={{ '--i': index }} />
        ))}
      </div>
      {floats.map((product, index) => (
        <div
          key={product.id}
          className={`v-float ${index === 2 ? 'hidden xl:block' : 'hidden lg:block'}`}
          style={{ ...spots[index], animationDelay: `${index * -1.6}s` }}
        >
          <Photo src={product.images[0]} alt="" fallback={product.name} className="h-16 w-full rounded-xl object-cover" />
          <p className="mt-2 truncate text-xs">{product.name}</p>
          <p className="truncate text-[10px] uppercase tracking-[0.14em] text-goldbright">{product.brand}</p>
        </div>
      ))}
    </div>
  );
}
