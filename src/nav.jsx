// Top nav — minimal, sticky, blurred
const Nav = ({ onCmdK, theme, onToggleTheme, accent, lang, onToggleLang }) => {
  const [scrolled, setScrolled] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { id: "work", label: "Services" },
    { id: "stack", label: "Stack" },
    { id: "agents", label: "Agents" },
    { id: "timeline", label: "Timeline" },
    { id: "contact", label: "Contact" },
  ];

  return (
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
        <a href="#top" style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <Icons.Logo size={26} />
          <span style={{ fontWeight: 600, fontSize: 15, letterSpacing: "-0.01em" }}>{PORTFOLIO_DATA.brand.name}</span>
          <span style={{
            fontFamily: "var(--font-mono)",
            fontSize: 11,
            color: "var(--text-faint)",
            padding: "2px 7px",
            border: "1px solid var(--line)",
            borderRadius: 999,
            marginLeft: 4,
          }}>v.2026</span>
        </a>

        {/* Center links */}
        <div style={{ display: "flex", gap: 4, alignItems: "center" }} className="nav-links">
          {links.map(l => (
            <a key={l.id} href={`#${l.id}`} style={{
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

        {/* Right: ⌘K, theme, hire */}
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <button onClick={onCmdK} style={{
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

          {/* EN/BN toggle */}
          <button onClick={onToggleLang} style={{
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

          {/* Get a Quote */}
          <a href="mailto:hello@auraajenticai.cloud?subject=Project Quote" style={{
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

          {/* Client Login */}
          <a href="https://auth.auraajenticai.cloud/login" style={{
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
      </div>

      <style>{`
        @media (max-width: 880px) {
          .nav-links { display: none !important; }
        }
      `}</style>
    </nav>
  );
};

window.Nav = Nav;
