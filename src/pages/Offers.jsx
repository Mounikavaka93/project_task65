import { useEffect, useState } from 'react';
import { events, offers } from '../data/catalog';
import { useTitle } from '../hooks/useTitle';
import SundayClock from '../components/SundayClock';
import Ticket from '../components/Ticket';

const tabs = [
  { id: 'all', label: 'All' },
  { id: 'ongoing', label: 'Ongoing' },
  { id: 'seasonal', label: 'Seasonal' },
  { id: 'events', label: 'Events' },
];

function readSeats() {
  try {
    const raw = JSON.parse(localStorage.getItem('velthara-events') || '[]');
    return Array.isArray(raw) ? raw : [];
  } catch {
    return [];
  }
}

export default function Offers() {
  const [tab, setTab] = useState('all');
  const [seats, setSeats] = useState(readSeats);
  useTitle('Offers & events');

  useEffect(() => {
    if (window.location.hash === '#events') setTab('events');
  }, []);

  function toggleSeat(id) {
    setSeats((current) => {
      const next = current.includes(id) ? current.filter((item) => item !== id) : [...current, id];
      localStorage.setItem('velthara-events', JSON.stringify(next));
      return next;
    });
  }

  const ongoing = offers.filter((offer) => offer.kind === 'Ongoing');
  const seasonal = offers.filter((offer) => offer.kind === 'Seasonal');
  const showOffers = tab === 'all' || tab === 'ongoing' || tab === 'seasonal';
  const showEvents = tab === 'all' || tab === 'events';

  return (
    <div>
      <section className="bg-ink py-14 text-paper">
        <div className="wrap grid items-end gap-8 lg:grid-cols-[1.1fr_.9fr]">
          <div>
            <p className="text-[11px] uppercase tracking-[0.22em] text-goldbright">Offers & events</p>
            <h1 className="mt-2 font-display text-5xl leading-tight md:text-6xl">Tickets, nights, and the Sunday clock.</h1>
            <p className="mt-4 max-w-xl text-paper/75">
              Ongoing offers stay on the board. Seasonal ones leave when the rail does. Events keep a seat list on this device.
            </p>
          </div>
          <SundayClock />
        </div>
      </section>

      <div className="wrap py-8">
        <div className="flex flex-wrap gap-2" role="tablist" aria-label="Offer filters">
          {tabs.map((item) => (
            <button
              key={item.id}
              type="button"
              role="tab"
              aria-selected={tab === item.id}
              onClick={() => setTab(item.id)}
              className={`rounded-full px-4 py-2 text-sm ${tab === item.id ? 'bg-ink text-paper' : 'bg-white text-ink'}`}
            >
              {item.label}
            </button>
          ))}
        </div>

        {showOffers && (tab === 'all' || tab === 'ongoing') ? (
          <section className="mt-10">
            <h2 className="font-display text-4xl">Ongoing offers</h2>
            <div className="mt-6 grid items-stretch gap-5 bg-ink p-5 md:grid-cols-3 md:rounded-[1.8rem]">
              {ongoing.map((offer) => (
                <Ticket key={offer.id} offer={offer} />
              ))}
            </div>
          </section>
        ) : null}

        {showOffers && (tab === 'all' || tab === 'seasonal') ? (
          <section className="mt-12">
            <h2 className="font-display text-4xl">Seasonal sales</h2>
            <div className="mt-6 grid items-stretch gap-5 bg-ink p-5 md:grid-cols-3 md:rounded-[1.8rem]">
              {seasonal.map((offer) => (
                <Ticket key={offer.id} offer={offer} />
              ))}
            </div>
          </section>
        ) : null}

        {showEvents ? (
          <section id="events" className="mt-14 scroll-mt-28">
            <h2 className="font-display text-4xl">Upcoming shopping events</h2>
            <p className="mt-2 max-w-xl text-sm text-ink/65">Saving a seat keeps your name on this browser. The desk does not receive it.</p>
            <div className="relative mt-8">
              <div className="absolute bottom-0 left-[7px] top-0 w-px bg-line" />
              {events.map((event) => {
                const saved = seats.includes(event.id);
                return (
                  <article key={event.id} className="relative pb-8 pl-10 last:pb-0">
                    <span className="absolute left-0 top-1.5 h-4 w-4 rounded-full border-2 border-ember bg-paper" />
                    <div className="rounded-[1.5rem] border border-line bg-white p-5 shadow-card">
                      <p className="text-[11px] uppercase tracking-[0.18em] text-gold">{event.tone}</p>
                      <h3 className="mt-1 font-display text-3xl">{event.title}</h3>
                      <p className="mt-2 text-sm text-ink/70">{event.date} · {event.time}</p>
                      <p className="text-sm text-ink/70">{event.place}</p>
                      <p className="mt-3 text-sm leading-relaxed text-ink/75">{event.detail}</p>
                      <button type="button" onClick={() => toggleSeat(event.id)} className={`mt-4 ${saved ? 'btn-line' : 'btn-ink'}`}>
                        {saved ? 'On the list' : 'Save a seat'}
                      </button>
                    </div>
                  </article>
                );
              })}
            </div>
          </section>
        ) : null}
      </div>
    </div>
  );
}
