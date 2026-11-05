import { useState } from 'react';

export default function Photo({ src, alt, className = '', priority = false, fallback }) {
  const [failed, setFailed] = useState(false);
  const label = fallback || alt;

  if (!src || failed) {
    return (
      <div
        className={`grid place-items-center bg-gradient-to-br from-[#2a241e] to-[#8d6b32] px-3 text-center text-paper ${className}`}
      >
        {label ? <span className="font-display text-lg leading-tight">{label}</span> : null}
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      loading={priority ? 'eager' : 'lazy'}
      decoding="async"
      referrerPolicy="no-referrer"
      onError={() => setFailed(true)}
      className={className}
    />
  );
}
