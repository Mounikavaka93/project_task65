import { Link } from 'react-router-dom';
import { useCycle } from '../hooks/useCycle';
import Photo from './Photo';

export default function BannerSlider({ slides }) {
  const { index, setIndex, setPaused, step } = useCycle(slides.length, 5600);
  const slide = slides[index];

  function onKeyDown(event) {
    if (event.key === 'ArrowRight') step(1);
    if (event.key === 'ArrowLeft') step(-1);
  }

  return (
    <div
      className="relative h-[440px] overflow-hidden rounded-[1.8rem] bg-ink text-paper sm:h-[480px]"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onKeyDown={onKeyDown}
      tabIndex={0}
      role="region"
      aria-roledescription="carousel"
      aria-label="Promotional banners"
    >
      {slides.map((item, itemIndex) => (
        <div
          key={item.title}
          className={`absolute inset-0 transition-opacity duration-700 ${itemIndex === index ? 'opacity-100' : 'pointer-events-none opacity-0'}`}
          aria-hidden={itemIndex !== index}
        >
          <Photo
            src={item.image}
            alt=""
            priority={itemIndex === 0}
            className={`h-full w-full object-cover ${itemIndex === index ? 'ken' : ''}`}
          />
        </div>
      ))}
      <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/75 to-ink/10" />
      <div className="relative flex h-full flex-col justify-end p-6 sm:p-10">
        <p className="text-[11px] uppercase tracking-[0.22em] text-goldbright">{slide.kicker}</p>
        <h3 className="mt-2 max-w-xl font-display text-4xl leading-tight sm:text-6xl">{slide.title}</h3>
        <p className="mt-3 max-w-md text-paper/80">{slide.text}</p>
        <div className="mt-6 flex flex-wrap items-center gap-3">
          <Link to={slide.href} className="btn-ember">
            {slide.cta}
          </Link>
          <div className="flex items-center gap-2">
            <button type="button" className="btn-light px-3" onClick={() => step(-1)} aria-label="Previous banner">
              Prev
            </button>
            <button type="button" className="btn-light px-3" onClick={() => step(1)} aria-label="Next banner">
              Next
            </button>
          </div>
        </div>
        <div className="mt-6 flex gap-2">
          {slides.map((item, itemIndex) => (
            <button
              key={item.title}
              type="button"
              aria-label={`Show banner ${itemIndex + 1}: ${item.title}`}
              onClick={() => setIndex(itemIndex)}
              className={`h-1.5 rounded-full transition-all ${itemIndex === index ? 'w-10 bg-ember' : 'w-4 bg-white/40'}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
