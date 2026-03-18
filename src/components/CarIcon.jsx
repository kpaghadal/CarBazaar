/**
 * Car icon - matches admin panel style exactly
 * Orange rounded square bg + white car SVG
 */
export function CarIcon({ size = 24, variant = 'logo', style = {} }) {

  // The exact same car path used in admin panel sidebar
  const carPath = (
    <>
      <path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.85 7h10.29l1.08 3.11H5.77L6.85 7zM19 17H5v-5h14v5z"/>
      <circle cx="7.5" cy="14.5" r="1.5"/>
      <circle cx="16.5" cy="14.5" r="1.5"/>
    </>
  );

  if (variant === 'footer') {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ borderRadius: 6, flexShrink: 0, ...style }}
        aria-hidden
      >
        <rect width="24" height="24" rx="6" fill="#FF6A00" />
        <g fill="#FFFFFF" transform="scale(0.72) translate(4, 4)">{carPath}</g>
      </svg>
    );
  }

  // ✅ 'logo' variant — exact same as admin panel
  if (variant === 'logo') {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ borderRadius: 8, flexShrink: 0, ...style }}
        aria-hidden
      >
        <rect width="24" height="24" rx="8" fill="#FF6A00" />
        <g fill="#FFFFFF" transform="scale(0.72) translate(4, 4)">{carPath}</g>
      </svg>
    );
  }

  // default — plain orange car, no background
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ flexShrink: 0, ...style }}
      aria-hidden
    >
      <g fill="#FF6A00">{carPath}</g>
    </svg>
  );
}