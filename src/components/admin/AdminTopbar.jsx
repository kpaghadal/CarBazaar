// ── SVG Icons ──────────────────────────────────────────────
const IconBell = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
    <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
  </svg>
);

const IconSearch = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8"/>
    <line x1="21" y1="21" x2="16.65" y2="16.65"/>
  </svg>
);

// ── TopBar ─────────────────────────────────────────────────
export function AdminTopbar({ title, subtitle, showSearch = true }) {
  return (
    <header className="admin-topbar">
      <div className="admin-topbar-left">
        <h1 className="admin-page-title">{title}</h1>
        {subtitle && <p className="admin-page-subtitle">{subtitle}</p>}
      </div>
      <div className="admin-topbar-right">
        {showSearch && (
          <div className="admin-search-wrap">
            <span className="admin-search-icon"><IconSearch /></span>
            <input className="admin-search" placeholder="Search..." />
          </div>
        )}

        <div className="admin-profile">
          <div className="admin-avatar">KP</div>
          <div className="admin-profile-info">
            <span className="admin-profile-name">Krunal</span>
            <span className="admin-profile-role">Administrator</span>
          </div>
        </div>
      </div>
    </header>
  );
}