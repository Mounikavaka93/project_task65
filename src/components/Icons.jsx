function Base({ className = 'h-5 w-5', children, ...props }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
      {...props}
    >
      {children}
    </svg>
  );
}

export function IconSearch(props) {
  return (
    <Base {...props}>
      <circle cx="11" cy="11" r="6.5" />
      <path d="M16 16.5 20.5 21" />
    </Base>
  );
}

export function IconCart(props) {
  return (
    <Base {...props}>
      <circle cx="9" cy="20" r="1.15" fill="currentColor" stroke="none" />
      <circle cx="17" cy="20" r="1.15" fill="currentColor" stroke="none" />
      <path d="M3 4h2.2l2.1 11h11.2l1.8-7H7" />
    </Base>
  );
}

export function IconUser(props) {
  return (
    <Base {...props}>
      <circle cx="12" cy="8" r="3.2" />
      <path d="M5 19.2c1.4-2.6 3.8-3.9 7-3.9s5.6 1.3 7 3.9" />
    </Base>
  );
}

export function IconArrow(props) {
  return (
    <Base {...props}>
      <path d="M5 12h14" />
      <path d="m13 6 6 6-6 6" />
    </Base>
  );
}

export function IconPlus(props) {
  return (
    <Base {...props}>
      <path d="M12 5v14" />
      <path d="M5 12h14" />
    </Base>
  );
}

export function IconMinus(props) {
  return (
    <Base {...props}>
      <path d="M5 12h14" />
    </Base>
  );
}

export function IconTrash(props) {
  return (
    <Base {...props}>
      <path d="M4 7h16" />
      <path d="M9 7V5h6v2" />
      <path d="m7 7 1 12h8l1-12" />
    </Base>
  );
}

export function IconPin(props) {
  return (
    <Base {...props}>
      <path d="M12 21s6-5.2 6-10a6 6 0 1 0-12 0c0 4.8 6 10 6 10Z" />
      <circle cx="12" cy="11" r="1.6" />
    </Base>
  );
}

export function IconClock(props) {
  return (
    <Base {...props}>
      <circle cx="12" cy="12" r="8" />
      <path d="M12 8v4.5L15 15" />
    </Base>
  );
}

export function IconStar({ className = 'h-4 w-4', ...props }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" {...props}>
      <path
        fill="currentColor"
        d="m12 3.2 2.4 5.2 5.7.7-4.2 3.9 1.1 5.6L12 15.9 7 18.6l1.1-5.6L3.9 9.1l5.7-.7L12 3.2Z"
      />
    </svg>
  );
}

export function LogoMark({ className = 'h-9 w-9' }) {
  return (
    <span className={`grid place-items-center [perspective:140px] ${className}`} aria-hidden="true">
      <span className="v-logo-mark">
        <svg viewBox="0 0 36 36" className="h-9 w-9">
          <path d="M18 6c6.2 3.2 9.4 7.6 9.4 12.4" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
          <path d="M18 11c3.8 2 5.6 4.6 5.6 7.4" fill="none" stroke="#e4583a" strokeWidth="1.7" strokeLinecap="round" />
          <path d="M18 15.6c1.8 1 2.7 2.2 2.7 3.6" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
        </svg>
      </span>
    </span>
  );
}
