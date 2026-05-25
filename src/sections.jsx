// SectionHeader + About + Skills (interactive tabs)

const SectionHeader = ({ eyebrow, title, sub, num }) => (
  <div style={{ marginBottom: 56 }}>
    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 18 }}>
      <span className="eyebrow">{eyebrow}</span>
      {num && <span style={{
        fontFamily: "var(--font-mono)",
        fontSize: 11,
        color: "var(--text-faint)",
      }}>{num}</span>}
    </div>
    <h2 style={{
      fontSize: "clamp(32px, 4.6vw, 54px)",
      fontWeight: 500,
      letterSpacing: "-0.03em",
      lineHeight: 1.05,
      margin: 0,
      maxWidth: 820,
    }}>{title}</h2>
    {sub && <p style={{
      marginTop: 18,
      fontSize: 17,
      lineHeight: 1.55,
      color: "var(--text-dim)",
      maxWidth: 640,
    }}>{sub}</p>}
  </div>
);

const About = () => {
  const D = PORTFOLIO_DATA;
  return (
    <section id="about" style={{ padding: "120px 0", borderTop: "1px solid var(--line)" }}>
      <div className="container">
        <SectionHeader
          eyebrow="About"
          num="01 / 06"
          title={<>I architect the systems that act — not the demos that <span style={{ fontFamily: "var(--font-serif)", fontStyle: "italic", fontWeight: 400 }}>impress</span>.</>}
        />

        <div style={{
          display: "grid",
          gridTemplateColumns: "1.4fr 1fr",
          gap: 48,
          alignItems: "start",
        }} className="about-grid">
          <div>
            <p style={{
              fontSize: 18,
              lineHeight: 1.65,
              color: "var(--text-dim)",
              margin: 0,
            }}>{D.about.pitch}</p>

            <ul style={{
              marginTop: 32,
              padding: 0,
              listStyle: "none",
              display: "grid",
              gap: 14,
            }}>
              {D.about.bullets.map((b, i) => (
                <li key={i} style={{
                  display: "flex",
                  gap: 14,
                  fontSize: 15,
                  lineHeight: 1.55,
                  color: "var(--text)",
                }}>
                  <span style={{
                    flex: "0 0 auto",
                    marginTop: 8,
                    width: 18, height: 1,
                    background: "var(--accent)",
                  }} />
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Side card: at a glance */}
          <div className="panel" style={{ padding: 28 }}>
            <div className="eyebrow" style={{ marginBottom: 20 }}>At a glance</div>
            <div style={{ display: "grid", gap: 16 }}>
              {[
                ["Discipline", "Agentic systems · Full-stack"],
                ["Years", `${D.brand.yearsExp}+ shipping`],
                ["Stack range", "TS · Python · Solidity"],
                ["Working with", "Founders · CTOs · Platform leads"],
                ["Engagement", "Embedded · Lead architect"],
                ["Location", D.brand.location],
              ].map(([k, v]) => (
                <div key={k} style={{
                  display: "grid",
                  gridTemplateColumns: "110px 1fr",
                  gap: 16,
                  fontSize: 13.5,
                  paddingBottom: 14,
                  borderBottom: "1px solid var(--line)",
                }}>
                  <span style={{ color: "var(--text-faint)", fontFamily: "var(--font-mono)", fontSize: 11.5, textTransform: "uppercase", letterSpacing: "0.06em", paddingTop: 2 }}>{k}</span>
                  <span style={{ color: "var(--text)" }}>{v}</span>
                </div>
              ))}
            </div>
            <a href="#contact" style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              marginTop: 8,
              fontSize: 13,
              color: "var(--accent)",
            }}>
              Start a conversation <Icons.ArrowUpRight size={13} />
            </a>
          </div>
        </div>

        <style>{`
          @media (max-width: 880px) {
            .about-grid { grid-template-columns: 1fr !important; gap: 32px !important; }
          }
        `}</style>
      </div>
    </section>
  );
};

const Skills = () => {
  const D = PORTFOLIO_DATA;
  const cats = Object.keys(D.stack);
  const [active, setActive] = React.useState(cats[0]);
  const items = D.stack[active];

  const catIcon = {
    "Frontend": Icons.Code,
    "Backend": Icons.Server,
    "AI / Agents": Icons.Sparkles,
    "Web3": Icons.Wallet,
    "DevOps": Icons.Cloud,
  };

  return (
    <section id="stack" style={{ padding: "120px 0", borderTop: "1px solid var(--line)" }}>
      <div className="container">
        <SectionHeader
          eyebrow="Stack"
          num="02 / 06"
          title="Tools I reach for, weighted by reps."
          sub="Numbers are honest signal — not a vanity bar. They reflect production hours, not tutorials watched."
        />

        {/* Category tabs */}
        <div style={{
          display: "flex",
          gap: 6,
          padding: 6,
          background: "var(--bg-card)",
          border: "1px solid var(--line)",
          borderRadius: 12,
          width: "fit-content",
          flexWrap: "wrap",
          marginBottom: 32,
        }}>
          {cats.map(c => {
            const I = catIcon[c];
            const on = active === c;
            return (
              <button key={c} onClick={() => setActive(c)} style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                padding: "9px 14px",
                background: on ? "var(--bg-elev)" : "transparent",
                color: on ? "var(--text)" : "var(--text-dim)",
                border: on ? "1px solid var(--line-strong)" : "1px solid transparent",
                borderRadius: 8,
                fontSize: 13,
                fontWeight: 500,
                transition: "all 0.15s",
              }}>
                <I size={13} /> {c}
              </button>
            );
          })}
        </div>

        {/* Items */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
          gap: 12,
        }}>
          {items.map((s, i) => (
            <div key={s.name} className="panel" style={{
              padding: "20px 22px",
              animation: `float-up 0.5s ${i * 0.05}s both`,
            }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 14 }}>
                <span style={{ fontSize: 14.5, fontWeight: 500 }}>{s.name}</span>
                <span style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 11,
                  color: "var(--text-faint)",
                }}>{s.level}</span>
              </div>
              <div style={{
                height: 3,
                background: "var(--line)",
                borderRadius: 2,
                overflow: "hidden",
                position: "relative",
              }}>
                <div style={{
                  width: `${s.level}%`,
                  height: "100%",
                  background: "linear-gradient(90deg, var(--accent), var(--accent-2))",
                  borderRadius: 2,
                  animation: `grow-w 0.9s ${0.1 + i * 0.04}s both cubic-bezier(0.2,0.8,0.2,1)`,
                  transformOrigin: "left",
                }} />
              </div>
            </div>
          ))}
        </div>

        <style>{`
          @keyframes grow-w {
            from { transform: scaleX(0); }
            to { transform: scaleX(1); }
          }
        `}</style>
      </div>
    </section>
  );
};

// ─── TESTIMONIALS ─────────────────────────────────────────────────────────────

const TESTIMONIAL_COLORS = {
  cyan:   { bg: "rgba(0,212,255,0.07)",  border: "rgba(0,212,255,0.20)",  text: "#67e8f9" },
  amber:  { bg: "rgba(251,191,36,0.08)", border: "rgba(251,191,36,0.22)", text: "#fde68a" },
  rose:   { bg: "rgba(244,63,94,0.08)",  border: "rgba(244,63,94,0.22)",  text: "#fda4af" },
  green:  { bg: "rgba(34,197,94,0.07)",  border: "rgba(34,197,94,0.20)",  text: "#86efac" },
  violet: { bg: "rgba(124,92,255,0.08)", border: "rgba(124,92,255,0.22)", text: "#a78bfa" },
};

const Testimonials = () => {
  const D = PORTFOLIO_DATA;
  return (
    <section style={{ padding: "120px 0", borderTop: "1px solid var(--line)" }}>
      <div className="container">
        <SectionHeader
          eyebrow="Client Results"
          num="05 / 06"
          title={<>What clients say after we <span style={{ fontFamily: "var(--font-serif)", fontStyle: "italic", fontWeight: 400 }}>ship</span></>}
          sub="Real projects. Real metrics. No stock-photo testimonials."
        />
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          gap: 20,
        }} className="testimonials-grid">
          {D.testimonials.map((t, i) => {
            const c = TESTIMONIAL_COLORS[t.color] || TESTIMONIAL_COLORS.cyan;
            return (
              <div
                key={i}
                className="reveal panel"
                style={{
                  padding: "28px 32px",
                  border: `1px solid ${c.border}`,
                  background: c.bg,
                  borderRadius: "var(--radius)",
                }}
              >
                <div style={{
                  fontSize: 32, lineHeight: 1, color: c.text,
                  marginBottom: 16, fontFamily: "var(--font-serif)",
                }}>"</div>
                <p style={{
                  margin: "0 0 24px", fontSize: 15.5,
                  lineHeight: 1.65, color: "var(--text)",
                }}>{t.text}</p>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <div style={{
                    width: 40, height: 40, borderRadius: "50%",
                    background: c.bg, border: `1px solid ${c.border}`,
                    display: "grid", placeItems: "center",
                    fontSize: 12, fontWeight: 600, color: c.text,
                    fontFamily: "var(--font-mono)", flexShrink: 0,
                  }}>{t.avatar}</div>
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 500 }}>{t.name}</div>
                    <div style={{ fontSize: 12, color: "var(--text-faint)", fontFamily: "var(--font-mono)" }}>
                      {t.role} · {t.company}
                    </div>
                  </div>
                  <div style={{ marginLeft: "auto" }}>
                    <span style={{
                      fontSize: 10.5, padding: "3px 9px", borderRadius: 999,
                      background: "var(--bg-elev)", border: "1px solid var(--line)",
                      color: "var(--text-faint)", fontFamily: "var(--font-mono)",
                      whiteSpace: "nowrap",
                    }}>{t.service}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <style>{`
          @media (max-width: 720px) {
            .testimonials-grid { grid-template-columns: 1fr !important; }
          }
        `}</style>
      </div>
    </section>
  );
};

window.About = About;
window.Skills = Skills;
window.SectionHeader = SectionHeader;
window.Testimonials = Testimonials;
