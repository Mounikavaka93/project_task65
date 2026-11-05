export default function SectionHeading({ eyebrow, title, text, light = false, action }) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-4">
      <div className="max-w-2xl">
        <p className={`text-[11px] font-medium uppercase tracking-[0.22em] ${light ? 'text-goldbright' : 'text-gold'}`}>
          {eyebrow}
        </p>
        <h2 className={`mt-2 font-display text-4xl leading-[1.05] md:text-5xl ${light ? 'text-paper' : 'text-ink'}`}>
          {title}
        </h2>
        {text ? (
          <p className={`mt-3 max-w-xl text-base leading-relaxed ${light ? 'text-paper/75' : 'text-inksoft/80'}`}>{text}</p>
        ) : null}
      </div>
      {action}
    </div>
  );
}
