import { Link } from 'react-router-dom';
import { ads, categories, events, offers, products, stores } from '../data/catalog';
import { useTitle } from '../hooks/useTitle';
import BannerSlider from '../components/BannerSlider';
import Hero from '../components/Hero';
import Photo from '../components/Photo';
import ProductCard from '../components/ProductCard';
import Reveal from '../components/Reveal';
import SectionHeading from '../components/SectionHeading';
import StoreCard from '../components/StoreCard';
import SundayClock from '../components/SundayClock';
import Ticket from '../components/Ticket';

export default function Home() {
  useTitle('');
  const featured = products.filter((product) => product.featured);
  const names = stores.map((store) => store.name);

  return (
    <>
      <Hero />

      <section id="brands" className="bg-ink text-paper">
        <h2 className="sr-only">Featured brands</h2>
        <ul className="sr-only">
          {names.map((name) => (
            <li key={name}>{name}</li>
          ))}
        </ul>
        <div className="marquee" aria-hidden="true">
          <div className="marquee-track items-center py-5">
            {[...names, ...names].map((name, index) => (
              <span key={`${name}-${index}`} className="flex items-center gap-8 px-4">
                <span className="font-display text-2xl italic">{name}</span>
                <span className="v-mini-ring" />
              </span>
            ))}
          </div>
        </div>
      </section>

      <section id="categories" className="wrap py-20">
        <Reveal>
          <SectionHeading
            eyebrow="Shopping categories"
            title="Choose a floor."
            text="Fashion, electronics, footwear, beauty, groceries, and accessories. Each one keeps its own light."
            action={
              <Link to="/category/all" className="btn-line">
                Entire galleria
              </Link>
            }
          />
        </Reveal>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((category, index) => (
            <Reveal key={category.slug} delay={index * 60}>
              <Link
                to={`/category/${category.slug}`}
                className="group relative flex min-h-[230px] overflow-hidden rounded-[1.6rem] bg-ink text-paper"
              >
                <Photo
                  src={category.image}
                  alt=""
                  fallback={category.name}
                  className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105"
                />
                <span className="absolute inset-0 bg-gradient-to-t from-ink via-ink/75 to-ink/45" />
                <span className="relative flex w-full flex-col justify-between p-5">
                  <span className="font-display text-4xl text-goldbright">0{index + 1}</span>
                  <span>
                    <span className="text-[11px] uppercase tracking-[0.18em] text-goldbright">{category.level}</span>
                    <span className="mt-1 block font-display text-3xl">{category.name}</span>
                    <span className="mt-1 block text-sm text-paper/75">{category.line}</span>
                  </span>
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      <section id="collections" className="wrap pb-20">
        <Reveal>
          <SectionHeading
            eyebrow="Latest collections"
            title="Just hung in the atrium."
            text="A short rail of what the houses put out this week. The large coat is the one they dressed the stair with."
            action={
              <Link to="/category/all" className="btn-line">
                All pieces
              </Link>
            }
          />
        </Reveal>
        <div className="mt-8 grid grid-cols-1 items-stretch gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((product, index) => (
            <div key={product.id} className={index === 0 ? 'h-full sm:col-span-2' : 'h-full'}>
              <ProductCard product={product} wide={index === 0} priority={index === 0} />
            </div>
          ))}
        </div>
      </section>

      <section id="offers" className="bg-ink py-20 text-paper">
        <div className="wrap">
          <div className="grid items-end gap-8 lg:grid-cols-[1.15fr_.85fr]">
            <SectionHeading
              light
              eyebrow="Special offers"
              title="Paper tickets."
              text="Sunday takes a third off marked tags. The other tickets belong to a floor, a night, or a crate."
              action={
                <Link to="/offers" className="btn-light">
                  All offers & events
                </Link>
              }
            />
            <SundayClock />
          </div>
          <div className="mt-10 grid items-stretch gap-5 px-2 md:grid-cols-3">
            {offers.slice(0, 3).map((offer) => (
              <Ticket key={offer.id} offer={offer} />
            ))}
          </div>
        </div>
      </section>

      <section id="banners" className="wrap py-20">
        <Reveal>
          <SectionHeading
            eyebrow="Promotional banners"
            title="Posted on the concourse."
            text="Three advertisements currently on the Level 0 rail. They change when the houses do."
          />
        </Reveal>
        <div className="mt-8">
          <BannerSlider slides={ads} />
        </div>
      </section>

      <section id="stores" className="wrap pb-20">
        <Reveal>
          <SectionHeading
            eyebrow="Popular stores"
            title="Doors worth opening."
            text="Twelve houses. Search and filter the full directory when you know the floor you want."
            action={
              <Link to="/stores" className="btn-line">
                Store directory
              </Link>
            }
          />
        </Reveal>
        <div className="scroller mt-8 flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2">
          {stores.map((store) => (
            <div key={store.id} className="w-full shrink-0 snap-start sm:w-[calc((100%-1rem)/2)] lg:w-[calc((100%-2rem)/3)]">
              <StoreCard store={store} />
            </div>
          ))}
        </div>
      </section>

      <section id="events" className="border-t border-line">
        <div className="wrap py-20">
          <Reveal>
            <SectionHeading
              eyebrow="Upcoming events"
              title="Nights on the calendar."
              text="A weekly late opening, then three evenings worth dressing for."
              action={
                <Link to="/offers#events" className="btn-line">
                  Save a seat
                </Link>
              }
            />
          </Reveal>
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {events.slice(0, 2).map((event) => (
              <article key={event.id} className="rounded-[1.6rem] border border-line bg-white p-6 shadow-card">
                <p className="text-[11px] uppercase tracking-[0.18em] text-gold">{event.tone}</p>
                <h3 className="mt-2 font-display text-3xl">{event.title}</h3>
                <p className="mt-2 text-sm text-ink/70">
                  {event.date} · {event.time}
                </p>
                <p className="text-sm text-ink/70">{event.place}</p>
                <p className="mt-3 text-sm leading-relaxed text-ink/75">{event.detail}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
