// Command palette — ⌘K

const CommandPalette = ({ open, onClose }) => {
  const D = PORTFOLIO_DATA;
  const [q, setQ] = React.useState("");
  const [active, setActive] = React.useState(0);
  const inputRef = React.useRef(null);

  React.useEffect(() => {
    if (open) {
      setQ("");
      setActive(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [open]);

  const items = React.useMemo(() => {
    const base = [
      { group: "Navigate", label: "Go to Work", icon: Icons.Cube, action: () => location.hash = "#work" },
      { group: "Navigate", label: "Go to Stack", icon: Icons.Code, action: () => location.hash = "#stack" },
      { group: "Navigate", label: "Go to Agent showcase", icon: Icons.Sparkles, action: () => location.hash = "#agents" },
      { group: "Navigate", label: "Go to Timeline", icon: Icons.Bolt, action: () => location.hash = "#timeline" },
      { group: "Navigate", label: "Go to Contact", icon: Icons.Mail, action: () => location.hash = "#contact" },
      ...D.services.map(p => ({
        group: "Services",
        label: p.name,
        sub: p.kind,
        icon: Icons.Cube,
        action: () => location.hash = "#work",
      })),
      { group: "Action", label: "Email me directly", icon: Icons.Mail, action: () => window.location.href = `mailto:${D.brand.email}` },
      { group: "Action", label: "Open GitHub", icon: Icons.Github, action: () => window.open(D.brand.socials.github) },
      { group: "Action", label: "Open LinkedIn", icon: Icons.LinkedIn, action: () => window.open(D.brand.socials.linkedin) },
      { group: "Action", label: "Toggle theme", icon: Icons.Sun, action: () => window.dispatchEvent(new CustomEvent("aura:toggle-theme")) },
    ];
    if (!q) return base;
    const Q = q.toLowerCase();
    return base.filter(i => i.label.toLowerCase().includes(Q) || (i.sub && i.sub.toLowerCase().includes(Q)));
  }, [q]);

  React.useEffect(() => { setActive(0); }, [q]);

  const onKey = (e) => {
    if (e.key === "ArrowDown") { e.preventDefault(); setActive(a => Math.min(a + 1, items.length - 1)); }
    else if (e.key === "ArrowUp") { e.preventDefault(); setActive(a => Math.max(a - 1, 0)); }
    else if (e.key === "Enter") { e.preventDefault(); if (items[active]) { items[active].action(); onClose(); } }
    else if (e.key === "Escape") { onClose(); }
  };

  if (!open) return null;

  // group items
  const groups = items.reduce((acc, it, idx) => {
    (acc[it.group] = acc[it.group] || []).push({ ...it, idx });
    return acc;
  }, {});

  return (
    <div onClick={onClose} style={{
      position: "fixed", inset: 0, zIndex: 100,
      background: "color-mix(in srgb, #000 60%, transparent)",
      backdropFilter: "blur(6px)",
      display: "flex",
      alignItems: "flex-start",
      justifyContent: "center",
      paddingTop: "12vh",
      animation: "float-up 0.2s",
    }}>
      <div onClick={e => e.stopPropagation()} style={{
        width: "min(640px, 92vw)",
        background: "var(--bg-card)",
        border: "1px solid var(--line-strong)",
        borderRadius: 14,
        boxShadow: "var(--shadow-lg)",
        overflow: "hidden",
      }}>
        <div style={{
          display: "flex",
          alignItems: "center",
          gap: 10,
          padding: "14px 18px",
          borderBottom: "1px solid var(--line)",
        }}>
          <Icons.Search size={15} style={{ color: "var(--text-faint)" }} />
          <input
            ref={inputRef}
            value={q}
            onChange={e => setQ(e.target.value)}
            onKeyDown={onKey}
            placeholder="Search projects, sections, actions…"
            style={{
              flex: 1,
              background: "transparent",
              border: "none",
              outline: "none",
              color: "var(--text)",
              fontSize: 15,
              fontFamily: "inherit",
            }}
          />
          <kbd style={{
            fontFamily: "var(--font-mono)",
            fontSize: 11,
            padding: "2px 6px",
            border: "1px solid var(--line)",
            borderRadius: 4,
            color: "var(--text-faint)",
          }}>esc</kbd>
        </div>

        <div style={{ maxHeight: 420, overflowY: "auto", padding: 8 }}>
          {items.length === 0 && (
            <div style={{ padding: 24, textAlign: "center", color: "var(--text-faint)", fontSize: 13 }}>
              No matches for "{q}"
            </div>
          )}
          {Object.entries(groups).map(([group, gitems]) => (
            <div key={group} style={{ marginBottom: 8 }}>
              <div style={{
                padding: "10px 12px 6px",
                fontFamily: "var(--font-mono)",
                fontSize: 10.5,
                color: "var(--text-faint)",
                textTransform: "uppercase",
                letterSpacing: "0.08em",
              }}>{group}</div>
              {gitems.map(it => {
                const I = it.icon;
                const on = it.idx === active;
                return (
                  <button
                    key={it.label}
                    onMouseEnter={() => setActive(it.idx)}
                    onClick={() => { it.action(); onClose(); }}
                    style={{
                      width: "100%",
                      display: "flex",
                      alignItems: "center",
                      gap: 12,
                      padding: "10px 12px",
                      background: on ? "var(--bg-elev)" : "transparent",
                      border: "none",
                      borderRadius: 8,
                      color: "var(--text)",
                      fontSize: 13.5,
                      textAlign: "left",
                    }}>
                    <I size={14} style={{ color: on ? "var(--accent)" : "var(--text-faint)" }} />
                    <span style={{ flex: 1 }}>{it.label}</span>
                    {it.sub && <span style={{ fontSize: 11, color: "var(--text-faint)" }}>{it.sub}</span>}
                    {on && <Icons.Arrow size={12} style={{ color: "var(--text-faint)" }} />}
                  </button>
                );
              })}
            </div>
          ))}
        </div>

        <div style={{
          display: "flex",
          gap: 16,
          padding: "10px 16px",
          borderTop: "1px solid var(--line)",
          background: "var(--bg-elev)",
          fontSize: 11,
          fontFamily: "var(--font-mono)",
          color: "var(--text-faint)",
        }}>
          <span>↑↓ navigate</span>
          <span>↵ select</span>
          <span>esc dismiss</span>
        </div>
      </div>
    </div>
  );
};

window.CommandPalette = CommandPalette;
