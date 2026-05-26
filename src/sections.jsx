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

// ─── FLAGSHIP PRODUCTS ───────────────────────────────────────────────────────

const PRODUCT_COLORS = {
  rose:   { bg: "rgba(244,63,94,0.08)",  border: "rgba(244,63,94,0.22)",  text: "#fda4af" },
  violet: { bg: "rgba(124,92,255,0.08)", border: "rgba(124,92,255,0.22)", text: "#a78bfa" },
  cyan:   { bg: "rgba(0,212,255,0.07)",  border: "rgba(0,212,255,0.20)",  text: "#67e8f9" },
  green:  { bg: "rgba(34,197,94,0.07)",  border: "rgba(34,197,94,0.20)",  text: "#86efac" },
  amber:  { bg: "rgba(251,191,36,0.08)", border: "rgba(251,191,36,0.22)", text: "#fde68a" },
};

const OwnProductCard = ({ product }) => {
  const c = PRODUCT_COLORS[product.color] || PRODUCT_COLORS.violet;
  return (
    <div className="reveal" style={{
      borderRadius: "var(--radius)", border: `1px solid ${c.border}`,
      background: "var(--bg-card)", overflow: "hidden",
      display: "flex", flexDirection: "column",
    }}>
      {/* Card header */}
      <div style={{
        background: `linear-gradient(145deg, ${c.bg.replace('0.08', '0.13')} 0%, rgba(0,0,0,0) 100%)`,
        padding: "36px 36px 28px", borderBottom: `1px solid ${c.border}`,
        position: "relative", overflow: "hidden",
      }}>
        <div style={{
          position: "absolute", top: -50, right: -50, width: 180, height: 180,
          borderRadius: "50%", pointerEvents: "none",
          background: `radial-gradient(circle, ${c.bg.replace('0.08', '0.18')} 0%, transparent 65%)`,
        }} />

        {/* Badges */}
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 20, position: "relative" }}>
          <span style={{
            display: "inline-flex", alignItems: "center", gap: 5,
            background: "rgba(34,197,94,0.10)", border: "1px solid rgba(34,197,94,0.28)",
            borderRadius: 999, padding: "3px 10px 3px 7px",
            fontSize: 10, fontFamily: "var(--font-mono)", color: "#4ade80", fontWeight: 600,
          }}>
            <span style={{
              width: 5, height: 5, borderRadius: "50%", background: "#22c55e",
              boxShadow: "0 0 6px rgba(34,197,94,0.9)", display: "inline-block",
              animation: "glamour-pulse 2s ease-in-out infinite",
            }} />
            LIVE
          </span>
          {product.badge && (
            <span style={{
              fontSize: 10, fontFamily: "var(--font-mono)", color: c.text,
              padding: "3px 9px", borderRadius: 999,
              background: c.bg, border: `1px solid ${c.border}`,
            }}>{product.badge}</span>
          )}
          <span style={{
            fontSize: 10, color: "var(--text-faint)", fontFamily: "var(--font-mono)",
            padding: "3px 9px", borderRadius: 999,
            background: "var(--bg-elev)", border: "1px solid var(--line)",
            marginLeft: "auto",
          }}>Built by Aura</span>
        </div>

        {/* Brand name */}
        <div style={{ position: "relative" }}>
          <h3 style={{
            margin: "0 0 6px",
            fontSize: "clamp(22px, 2.5vw, 32px)",
            fontWeight: 700, fontFamily: "var(--font-serif)", fontStyle: "italic",
            letterSpacing: "-0.01em",
            background: `linear-gradient(135deg, ${c.text} 0%, #fff 80%)`,
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}>{product.name}</h3>
          <p style={{
            margin: 0, fontSize: 11.5, color: "var(--text-faint)",
            fontFamily: "var(--font-mono)", letterSpacing: "0.1em",
            textTransform: "uppercase",
          }}>{product.tagline}</p>
        </div>
      </div>

      {/* Card body */}
      <div style={{ padding: "28px 36px 32px", display: "flex", flexDirection: "column", gap: 20, flex: 1 }}>
        <p style={{ margin: 0, fontSize: 14.5, lineHeight: 1.65, color: "var(--text-dim)" }}>
          {product.description}
        </p>

        {/* Top 3 features */}
        <div style={{ display: "grid", gap: 8 }}>
          {product.features.slice(0, 3).map((f, i) => (
            <div key={i} style={{ display: "flex", gap: 10, fontSize: 13, color: "var(--text)" }}>
              <span style={{ color: c.text, flexShrink: 0, fontSize: 11, marginTop: 2 }}>✓</span>
              {f}
            </div>
          ))}
          {product.features.length > 3 && (
            <div style={{ fontSize: 12, color: "var(--text-faint)", fontFamily: "var(--font-mono)", paddingLeft: 21 }}>
              +{product.features.length - 3} more capabilities
            </div>
          )}
        </div>

        {/* Stack */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
          {product.stack.map(s => (
            <span key={s} style={{
              fontSize: 11, padding: "3px 9px", borderRadius: 5,
              background: c.bg, border: `1px solid ${c.border}`,
              color: c.text, fontFamily: "var(--font-mono)",
            }}>{s}</span>
          ))}
        </div>

        {/* CTAs */}
        <div style={{ display: "flex", gap: 10, marginTop: "auto", paddingTop: 4 }}>
          <a
            href={product.url} target="_blank" rel="noopener noreferrer"
            style={{
              display: "inline-flex", alignItems: "center", gap: 7,
              padding: "10px 20px",
              background: `linear-gradient(135deg, ${c.bg.replace('0.08','0.6')}, ${c.bg.replace('0.08','0.4')})`,
              color: "#fff", borderRadius: 9, fontSize: 13, fontWeight: 600,
              textDecoration: "none", border: `1px solid ${c.border}`,
              transition: "opacity 0.15s",
            }}
            onMouseEnter={e => e.currentTarget.style.opacity = "0.82"}
            onMouseLeave={e => e.currentTarget.style.opacity = "1"}
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
              <polyline points="15,3 21,3 21,9"/><line x1="10" y1="14" x2="21" y2="3"/>
            </svg>
            Visit →
          </a>
          <a href="#/services/web-app-dev" style={{
            display: "inline-flex", alignItems: "center", gap: 7,
            padding: "10px 16px",
            background: "transparent", border: `1px solid ${c.border}`,
            color: c.text, borderRadius: 9, fontSize: 13,
            textDecoration: "none", transition: "background 0.15s",
          }}
            onMouseEnter={e => e.currentTarget.style.background = c.bg}
            onMouseLeave={e => e.currentTarget.style.background = "transparent"}
          >Build Mine →</a>
        </div>
      </div>
    </div>
  );
};

const FlagshipProduct = () => {
  const D = PORTFOLIO_DATA;
  const products = D.ownProducts || [];
  if (!products.length) return null;

  const rose   = { bg: "rgba(244,63,94,0.08)",  border: "rgba(244,63,94,0.22)",  text: "#fda4af" };
  const violet = { bg: "rgba(124,92,255,0.08)", border: "rgba(124,92,255,0.22)", text: "#a78bfa" };

  return (
    <section style={{ padding: "120px 0", borderTop: "1px solid var(--line)" }}>
      <div className="container">
        <SectionHeader
          eyebrow="Our Own Products"
          num="03.5 / 06"
          title={<>We don't just build for clients — we build for <span style={{ fontFamily: "var(--font-serif)", fontStyle: "italic", fontWeight: 400 }}>ourselves.</span></>}
          sub="These are Aura's own live products — real businesses we built, run, and grow. Visit them. That's exactly what we ship for you."
        />

        {/* Products grid */}
        <div className="own-products-grid" style={{
          display: "grid",
          gridTemplateColumns: `repeat(${Math.min(products.length, 2)}, 1fr)`,
          gap: 20,
        }}>
          {products.map(p => <OwnProductCard key={p.id} product={p} />)}
        </div>

        {/* Bottom nudge */}
        <div className="reveal" style={{
          marginTop: 20, padding: "22px 32px",
          background: "var(--bg-card)", border: "1px solid var(--line)",
          borderRadius: "var(--radius)",
          display: "flex", alignItems: "center", justifyContent: "space-between",
          flexWrap: "wrap", gap: 16,
        }}>
          <div>
            <span style={{ fontSize: 15, fontWeight: 500, color: "var(--text)" }}>
              Want Aura to build your product?
            </span>
            <span style={{
              display: "block", fontSize: 13, color: "var(--text-faint)",
              marginTop: 3, fontFamily: "var(--font-mono)",
            }}>
              E-commerce · AI marketplace · SaaS — from $499 · Delivered in 2–4 weeks
            </span>
          </div>
          <a href="#/contact" style={{
            padding: "11px 24px",
            background: "var(--text)", color: "var(--bg)",
            borderRadius: 9, fontSize: 13.5, fontWeight: 500,
            textDecoration: "none", whiteSpace: "nowrap", flexShrink: 0,
          }}>Start a Project →</a>
        </div>
      </div>

      <style>{`
        @keyframes glamour-pulse {
          0%, 100% { opacity: 1; box-shadow: 0 0 7px rgba(34,197,94,0.9); }
          50% { opacity: 0.55; box-shadow: 0 0 2px rgba(34,197,94,0.3); }
        }
        @media (max-width: 860px) {
          .own-products-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
};

window.About = About;
window.Skills = Skills;
window.SectionHeader = SectionHeader;
window.Testimonials = Testimonials;
window.FlagshipProduct = FlagshipProduct;
