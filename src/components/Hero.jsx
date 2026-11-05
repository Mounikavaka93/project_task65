import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { heroSlides, levels, products, stores } from '../data/catalog';
import { useCycle } from '../hooks/useCycle';
import Atrium from './Atrium';
import Photo from './Photo';

function useOpenNow() {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const check = () => {
      const hour = new Date().getHours();
      setOpen(hour >= 10 && hour < 22);
    };
    check();
    const id = setInterval(check, 60000);
    return () => clearInterval(id);
  }, []);
  return open;
}

export default function Hero() {
  const open = useOpenNow();
  const { index, setIndex, setPaused, step } = useCycle(heroSlides.length, 6000);
  const slide = heroSlides[index];

  return (
    <section id="atrium" className="relative overflow-hidden bg-ink text-paper">
      {heroSlides.map((item, itemIndex) => (
        <Photo
          key={item.title}
          src={item.image}
          alt=""
          priority={itemIndex === 0}
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ${
            itemIndex === index ? 'opacity-40' : 'opacity-0'
          }`}
        />
      ))}
      <div className="absolute inset-0 bg-gradient-to-b from-ink/80 via-ink/82 to-ink" />
      <div className="grain-layer" />

      <div className="relative z-10 wrap grid items-center gap-8 pb-8 pt-28 lg:grid-cols-[1.12fr_.88fr] lg:pt-32">
        <div>
          <p className="text-[11px] uppercase tracking-[0.22em] text-goldbright">
            Velthara · {open ? 'Atrium open now' : 'Opens at 10:00'}
          </p>
          <h1 className="mt-3 max-w-xl font-display text-5xl leading-[0.95] sm:text-6xl lg:text-7xl">
            Six floors around a turning glass stair.
          </h1>
          <p className="mt-5 max-w-lg text-base leading-relaxed text-paper/75 sm:text-lg">
            You shop the helix. Tailoring on four, sound on three, fruit crates on one, while the light moves with you.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <a href="#categories" className="btn-ember">Choose a floor</a>
            <Link to="/offers" className="btn-light">Sunday offers</Link>
          </div>
          <dl className="mt-8 grid max-w-md grid-cols-3 gap-3">
            {[
              ['Pieces', products.length],
              ['Houses', stores.length],
              ['Levels', levels.length],
            ].map(([label, value]) => (
              <div key={label} className="border-t border-white/15 pt-3">
                <dt className="text-[11px] uppercase tracking-[0.16em] text-paper/50">{label}</dt>
                <dd className="font-display text-3xl">{value}</dd>
              </div>
            ))}
          </dl>
        </div>
        <Atrium />
      </div>

      <div
        className="relative z-10 wrap pb-10"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <div className="flex flex-col gap-4 rounded-[1.6rem] border border-white/15 bg-white/10 p-4 backdrop-blur md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-[11px] uppercase tracking-[0.2em] text-goldbright">Mall banner · {slide.kicker}</p>
            <h2 className="mt-1 font-display text-3xl">{slide.title}</h2>
            <p className="mt-1 max-w-xl text-sm text-paper/75">{slide.text}</p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <Link to={slide.href} className="btn-light">View banner</Link>
            <button type="button" className="btn-light px-3" onClick={() => step(-1)} aria-label="Previous mall banner">
              Prev
            </button>
            <button type="button" className="btn-light px-3" onClick={() => step(1)} aria-label="Next mall banner">
              Next
            </button>
            <div className="flex gap-1.5 px-1">
              {heroSlides.map((item, itemIndex) => (
                <button
                  key={item.title}
                  type="button"
                  aria-label={`Show ${item.title}`}
                  onClick={() => setIndex(itemIndex)}
                  className={`h-1.5 rounded-full ${itemIndex === index ? 'w-8 bg-ember' : 'w-3 bg-white/40'}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
