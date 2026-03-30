const iconStyle = { width: 18, height: 18, marginRight: 6, flexShrink: 0 };

export function HomeIcon({ active }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" style={iconStyle} stroke={active ? '#FF6A00' : '#7A6B5A'} strokeWidth="2">
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <path d="M9 22V12h6v10" />
    </svg>
  );
}
export function SearchIcon({ active }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" style={iconStyle} stroke={active ? '#FF6A00' : '#7A6B5A'} strokeWidth="2">
      <circle cx="11" cy="11" r="8" />
      <path d="M21 21l-4.35-4.35" />
    </svg>
  );
}
export function SellIcon({ active }) {
  const c = active ? '#FF6A00' : '#7A6B5A';
  return (
    <svg viewBox="0 0 24 24" fill="none" style={iconStyle}>
      <path d="M5 17h14v-2l-2-4H7L5 15v2zm2.5-6h9l1.5 3h-12l1.5-3zM6 14a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm12 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zM6 4l1.5 3h9L18 4H6z" fill={c} stroke="none" />
      <path d="M9 10l3 3 3-3" stroke={c} strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
export function HeartIcon({ active }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" style={iconStyle} stroke={active ? '#FF6A00' : '#7A6B5A'} strokeWidth="2">
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </svg>
  );
}
export function ProfileIcon({ active }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" style={iconStyle} stroke={active ? '#FF6A00' : '#7A6B5A'} strokeWidth="2">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}

export function FilterIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" width={18} height={18} style={{ marginRight: 8 }} stroke="#7A6B5A" strokeWidth="2">
      <path d="M4 6h16M4 12h16M4 18h16" />
    </svg>
  );
}
export function ResetIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" width={18} height={18} style={{ marginRight: 6 }} stroke="currentColor" strokeWidth="2">
      <path d="M1 4v6h6M23 20v-6h-6" />
      <path d="M20.49 9A9 9 0 0 0 5.64 5.64L1 10m22 4l-4.64 4.36A9 9 0 0 1 3.51 15" />
    </svg>
  );
}
