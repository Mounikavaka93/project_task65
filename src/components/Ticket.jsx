import { Link } from 'react-router-dom';

export default function Ticket({ offer, notch = 'bg-ink' }) {
  return (
    <Link
      to={offer.href}
      className="group relative flex h-full flex-col rounded-[1.6rem] bg-paper p-5 text-ink shadow-card transition duration-300 hover:-translate-y-1"
    >
      <span className={`absolute -left-2 top-1/2 h-4 w-4 -translate-y-1/2 rounded-full ${notch}`} />
      <span className={`absolute -right-2 top-1/2 h-4 w-4 -translate-y-1/2 rounded-full ${notch}`} />
      <p className="text-[11px] uppercase tracking-[0.18em] text-gold">{offer.kind}</p>
      <p className="mt-4 font-display text-4xl text-ember">{offer.discount}</p>
      <h3 className="mt-2 font-display text-2xl">{offer.title}</h3>
      <div className="my-4 border-t border-dashed border-line" />
      <p className="text-sm leading-relaxed text-ink/70">{offer.detail}</p>
      <p className="mt-auto pt-4 text-[11px] uppercase tracking-[0.16em] text-ink/45">{offer.window}</p>
    </Link>
  );
}
