// Top nav — minimal, sticky, blurred — mobile-responsive
const DASHBOARD = 'https://aura.auraajenticai.cloud'
const NAV_FALLBACK = [
  { id: "work", label: "Services", url: "#work" },
  { id: "stack", label: "Stack", url: "#stack" },
  { id: "agents", label: "Agents", url: "#agents" },
  { id: "timeline", label: "Timeline", url: "#timeline" },
  { id: "contact", label: "Contact", url: "#contact" },
]

const Nav = ({ onCmdK, theme, onToggleTheme, accent, lang, onToggleLang }) => {
  const [scrolled, setScrolled] = React.useState(false);
  const [menuOpen, setMenuOpen] = React.useState(false);
  const [links, setLinks] = React.useState(NAV_FALLBACK);

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Fetch nav links from Control Center API (stale-while-revalidate)
  React.useEffect(() => {
    const CACHE_KEY = 'aura_nav_links'
    const CACHE_TTL = 5 * 60 * 1000 // 5 min
    const cached = sessionStorage.getItem(CACHE_KEY)
    if (cached) {
      try {
        const { data, ts } = JSON.parse(cached)
        if (Date.now() - ts < CACHE_TTL) { setLinks(data.length ? data : NAV_FALLBACK); return }
      } catch {}
    }
    fetch(`${DASHBOARD}/api/public/links?page=home`, { signal: AbortSignal.timeout(3000) })
      .then(r => r.ok ? r.json() : null)
      .then(data => {
        if (Array.isArray(data) && data.length > 0) {
          const mapped = data.map(l => ({ id: l.id, label: l.label, url: l.url }))
          setLinks(mapped)
          sessionStorage.setItem(CACHE_KEY, JSON.stringify({ data: mapped, ts: Date.now() }))
        }
      })
      .catch(() => {})
  }, []);

  return (
    <>
      <nav style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        borderBottom: scrolled ? "1px solid var(--line)" : "1px solid transparent",
        background: scrolled ? "color-mix(in srgb, var(--bg) 75%, transparent)" : "transparent",
        backdropFilter: scrolled ? "blur(14px)" : "none",
        WebkitBackdropFilter: scrolled ? "blur(14px)" : "none",
        transition: "all 0.25s ease",
      }}>
        <div className="container" style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          height: 64,
        }}>
          {/* Brand */}
          <a href="#top" style={{ display: "flex", alignItems: "center", gap: 10, flexShrink: 0 }}>
            <Icons.Logo size={26} />
            <span style={{ fontWeight: 600, fontSize: 15, letterSpacing: "-0.01em" }}>{PORTFOLIO_DATA.brand.name}</span>
            <span className="nav-badge" style={{
              fontFamily: "var(--font-mono)",
              fontSize: 11,
              color: "var(--text-faint)",
              padding: "2px 7px",
              border: "1px solid var(--line)",
              borderRadius: 999,
              marginLeft: 4,
            }}>v.2026</span>
          </a>

          {/* Center links — hidden on mobile */}
          <div style={{ display: "flex", gap: 4, alignItems: "center" }} className="nav-links">
            {links.map(l => (
              <a key={l.id} href={l.url || `#${l.id}`} style={{
                fontSize: 13.5,
                color: "var(--text-dim)",
                padding: "6px 12px",
                borderRadius: 8,
                transition: "all 0.15s",
              }}
                onMouseEnter={e => { e.currentTarget.style.color = "var(--text)"; e.currentTarget.style.background = "var(--line)"; }}
                onMouseLeave={e => { e.currentTarget.style.color = "var(--text-dim)"; e.currentTarget.style.background = "transparent"; }}
              >{l.label}</a>
            ))}
          </div>

          {/* Right — desktop */}
          <div className="nav-right" style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <button onClick={onCmdK} className="nav-search-btn" style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              padding: "6px 8px 6px 12px",
              background: "transparent",
              border: "1px solid var(--line)",
              borderRadius: 8,
              color: "var(--text-dim)",
              fontSize: 12.5,
            }}>
              <Icons.Search size={13} />
              <span>Search</span>
              <kbd style={{
                fontFamily: "var(--font-mono)",
                fontSize: 10.5,
                padding: "2px 5px",
                border: "1px solid var(--line)",
                borderRadius: 4,
                color: "var(--text-faint)",
              }}>⌘K</kbd>
            </button>

            <button onClick={onToggleTheme} aria-label="Toggle theme" style={{
              width: 34, height: 34,
              display: "grid", placeItems: "center",
              background: "transparent",
              border: "1px solid var(--line)",
              borderRadius: 8,
              color: "var(--text-dim)",
            }}>
              {theme === "dark" ? <Icons.Sun size={15} /> : <Icons.Moon size={15} />}
            </button>

            <button onClick={onToggleLang} className="nav-lang-btn" style={{
              padding: "6px 10px",
              background: "transparent",
              border: "1px solid var(--line)",
              borderRadius: 8,
              color: "var(--text-dim)",
              fontSize: 12,
              fontWeight: 600,
              cursor: "pointer",
              letterSpacing: "0.04em",
            }}>
              {lang === "en" ? "বাং" : "EN"}
            </button>

            <a href="mailto:hello@auraajenticai.cloud?subject=Project Quote" className="nav-quote-btn" style={{
              padding: "7px 13px",
              background: "transparent",
              border: "1px solid var(--line)",
              borderRadius: 8,
              color: "var(--text-dim)",
              fontSize: 13,
              fontWeight: 500,
              textDecoration: "none",
              whiteSpace: "nowrap",
            }}>
              Get a Quote
            </a>

            <a href="https://auth.auraajenticai.cloud/login" className="nav-login-btn" style={{
              display: "flex",
              alignItems: "center",
              gap: 6,
              padding: "8px 14px",
              background: "var(--text)",
              color: "var(--bg)",
              fontSize: 13,
              fontWeight: 500,
              borderRadius: 8,
              textDecoration: "none",
              whiteSpace: "nowrap",
            }}>
              Client Login <Icons.Arrow size={13} />
            </a>
          </div>

          {/* Hamburger — mobile only */}
          <button
            className="nav-hamburger"
            onClick={() => setMenuOpen(o => !o)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            style={{
              display: "none",
              width: 36, height: 36,
              background: "transparent",
              border: "1px solid var(--line)",
              borderRadius: 8,
              color: "var(--text-dim)",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
              cursor: "pointer",
            }}
          >
            {menuOpen ? (
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M2 2l12 12M14 2L2 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            ) : (
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M2 4h12M2 8h12M2 12h12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            )}
          </button>
        </div>

        <style>{`
          @media (max-width: 880px) {
            .nav-links { display: none !important; }
          }
          @media (max-width: 640px) {
            .nav-search-btn { display: none !important; }
            .nav-quote-btn { display: none !important; }
            .nav-badge { display: none !important; }
            .nav-lang-btn { display: none !important; }
          }
          @media (max-width: 480px) {
            .nav-login-btn { display: none !important; }
            .nav-hamburger { display: flex !important; }
          }
        `}</style>
      </nav>

      {/* Mobile drawer */}
      {menuOpen && (
        <div style={{
          position: "fixed",
          top: 64,
          left: 0,
          right: 0,
          zIndex: 49,
          background: "color-mix(in srgb, var(--bg) 96%, transparent)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          borderBottom: "1px solid var(--line)",
          padding: "1rem 20px 1.5rem",
          display: "flex",
          flexDirection: "column",
          gap: 2,
        }}>
          {links.map(l => (
            <a
              key={l.id}
              href={l.url || `#${l.id}`}
              onClick={() => setMenuOpen(false)}
              style={{
                fontSize: 15,
                color: "var(--text-dim)",
                padding: "12px 4px",
                textDecoration: "none",
                display: "block",
                borderBottom: "1px solid var(--line)",
              }}
            >{l.label}</a>
          ))}
          <div style={{ display: "flex", gap: 8, marginTop: 14, flexWrap: "wrap" }}>
            <button onClick={() => { onToggleTheme(); setMenuOpen(false); }} style={{
              padding: "8px 14px",
              background: "transparent",
              border: "1px solid var(--line)",
              borderRadius: 8,
              color: "var(--text-dim)",
              fontSize: 13,
              cursor: "pointer",
            }}>
              {theme === "dark" ? "Light" : "Dark"}
            </button>
            <button onClick={() => { onToggleLang(); setMenuOpen(false); }} style={{
              padding: "8px 14px",
              background: "transparent",
              border: "1px solid var(--line)",
              borderRadius: 8,
              color: "var(--text-dim)",
              fontSize: 13,
              cursor: "pointer",
              fontWeight: 600,
            }}>
              {lang === "en" ? "বাংলা" : "English"}
            </button>
            <a
              href="mailto:hello@auraajenticai.cloud?subject=Project Quote"
              onClick={() => setMenuOpen(false)}
              style={{
                padding: "8px 14px",
                background: "transparent",
                border: "1px solid var(--line)",
                borderRadius: 8,
                color: "var(--text-dim)",
                fontSize: 13,
                textDecoration: "none",
              }}
            >Get a Quote</a>
            <a
              href="https://auth.auraajenticai.cloud/login"
              onClick={() => setMenuOpen(false)}
              style={{
                padding: "8px 14px",
                background: "var(--text)",
                color: "var(--bg)",
                fontSize: 13,
                fontWeight: 500,
                borderRadius: 8,
                textDecoration: "none",
              }}
            >Client Login</a>
          </div>
        </div>
      )}
    </>
  );
};

window.Nav = Nav;
