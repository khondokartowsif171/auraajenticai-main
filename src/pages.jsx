// Individual page views for hash router

const COLOR_MAP = {
  violet: { bg: "rgba(124,92,255,0.08)", border: "rgba(124,92,255,0.22)", text: "#a78bfa" },
  cyan:   { bg: "rgba(0,212,255,0.07)",  border: "rgba(0,212,255,0.20)",  text: "#67e8f9" },
  green:  { bg: "rgba(34,197,94,0.07)",  border: "rgba(34,197,94,0.20)",  text: "#86efac" },
  amber:  { bg: "rgba(251,191,36,0.08)", border: "rgba(251,191,36,0.22)", text: "#fde68a" },
  rose:   { bg: "rgba(244,63,94,0.08)",  border: "rgba(244,63,94,0.22)",  text: "#fda4af" },
};

const PageHero = ({ eyebrow, title, sub, children }) => (
  <section style={{ padding: "140px 0 80px", borderBottom: "1px solid var(--line)" }}>
    <div className="container">
      <a href="#" style={{
        display: "inline-flex", alignItems: "center", gap: 6,
        fontSize: 12.5, color: "var(--text-faint)",
        marginBottom: 40, textDecoration: "none",
        fontFamily: "var(--font-mono)",
        transition: "color 0.15s",
      }}
        onMouseEnter={e => e.currentTarget.style.color = "var(--text-dim)"}
        onMouseLeave={e => e.currentTarget.style.color = "var(--text-faint)"}
      >← Home</a>
      <span className="eyebrow" style={{ marginBottom: 20, display: "flex" }}>{eyebrow}</span>
      <h1 style={{
        fontSize: "clamp(36px, 5.5vw, 68px)",
        fontWeight: 500, letterSpacing: "-0.03em",
        lineHeight: 1.04, margin: "0 0 20px",
      }}>{title}</h1>
      {sub && <p style={{ fontSize: 18, color: "var(--text-dim)", maxWidth: 600, margin: 0, lineHeight: 1.6 }}>{sub}</p>}
      {children}
    </div>
  </section>
);

// ─── SERVICES PAGE ────────────────────────────────────────────────────────────

const DASHBOARD_API = 'https://aura.auraajenticai.cloud';

const ServicesPage = ({ lang }) => {
  const D = PORTFOLIO_DATA;
  const [active, setActive] = React.useState(null);
  const [svcLinks, setSvcLinks] = React.useState({});

  // Fetch demo/repo overrides from Dashboard (stale-while-revalidate)
  React.useEffect(() => {
    const CACHE_KEY = 'aura_svc_links_v2';
    const CACHE_TTL = 10 * 60 * 1000;
    try {
      const cached = sessionStorage.getItem(CACHE_KEY);
      if (cached) {
        const { data, ts } = JSON.parse(cached);
        if (Date.now() - ts < CACHE_TTL) { setSvcLinks(data); return; }
      }
    } catch {}
    fetch(`${DASHBOARD_API}/api/public/services`, { signal: AbortSignal.timeout(3000) })
      .then(r => r.ok ? r.json() : null)
      .then(data => {
        if (Array.isArray(data)) {
          const map = {};
          data.forEach(s => { if (s.id) map[s.id] = { demo: s.demo, repo: s.repo }; });
          setSvcLinks(map);
          sessionStorage.setItem(CACHE_KEY, JSON.stringify({ data: map, ts: Date.now() }));
        }
      })
      .catch(() => {});
  }, []);

  return (
    <main>
      <PageHero
        eyebrow="What we build"
        title={<>Services that <span style={{ fontFamily: "var(--font-serif)", fontStyle: "italic", fontWeight: 400 }}>ship</span> — not decks that pitch</>}
        sub="Every engagement ends with production code. No retainers for decks. No sprints for prototypes that never deploy."
      />

      <section style={{ padding: "80px 0 120px" }}>
        <div className="container">
          <div style={{ display: "grid", gap: 24 }}>
            {D.services.map((svc, i) => {
              const c = COLOR_MAP[svc.color] || COLOR_MAP.violet;
              const isOpen = active === svc.id;
              const demo = (svcLinks[svc.id]?.demo) || svc.demo;
              const repo = (svcLinks[svc.id]?.repo) || svc.repo;
              const isNew = !!svc.badge;
              return (
                <div
                  key={svc.id}
                  className="reveal"
                  style={{
                    background: isOpen ? c.bg : "var(--bg-card)",
                    border: `1px solid ${isOpen ? c.border : "var(--line)"}`,
                    borderRadius: "var(--radius)",
                    overflow: "hidden",
                    transition: "all 0.25s ease",
                    cursor: "pointer",
                  }}
                  onClick={() => setActive(isOpen ? null : svc.id)}
                >
                  {/* Header row */}
                  <div style={{ padding: "28px 32px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 20 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 20, flex: 1, minWidth: 0 }}>
                      <span style={{
                        fontFamily: "var(--font-mono)", fontSize: 11,
                        color: "var(--text-faint)", flexShrink: 0,
                      }}>0{i + 1}</span>
                      <div style={{ minWidth: 0 }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
                          <h3 style={{ margin: 0, fontSize: 18, fontWeight: 500, letterSpacing: "-0.01em" }}>
                            {lang === "bn" && svc.nameBn ? svc.nameBn : svc.name}
                          </h3>
                          {isNew && (
                            <span style={{
                              fontSize: 10.5, fontFamily: "var(--font-mono)",
                              padding: "2px 8px", borderRadius: 999,
                              background: c.bg, border: `1px solid ${c.border}`,
                              color: c.text, fontWeight: 600,
                            }}>{svc.badge}</span>
                          )}
                        </div>
                        <span style={{
                          fontSize: 11, fontFamily: "var(--font-mono)",
                          color: "var(--text-faint)", marginTop: 4, display: "block",
                        }}>{svc.kind}</span>
                      </div>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 24, flexShrink: 0 }}>
                      <div style={{ textAlign: "right" }}>
                        <div style={{ fontSize: 22, fontWeight: 600, color: c.text }}>{svc.impact.primary}</div>
                        <div style={{ fontSize: 11, color: "var(--text-faint)", fontFamily: "var(--font-mono)" }}>{svc.impact.secondary}</div>
                      </div>
                      <div style={{
                        width: 28, height: 28, borderRadius: 8,
                        border: "1px solid var(--line)",
                        display: "grid", placeItems: "center",
                        color: "var(--text-faint)", fontSize: 16,
                        transform: isOpen ? "rotate(45deg)" : "none",
                        transition: "transform 0.2s",
                        flexShrink: 0,
                      }}>+</div>
                    </div>
                  </div>

                  {/* Expanded content */}
                  {isOpen && (
                    <div style={{ padding: "0 32px 32px", borderTop: `1px solid ${c.border}` }}>
                      <div style={{ paddingTop: 24, display: "grid", gridTemplateColumns: svc.highlights ? "1.2fr 1fr" : "1fr 1fr", gap: 32 }} className="svc-detail-grid">
                        <div>
                          <p style={{ margin: "0 0 24px", fontSize: 15.5, lineHeight: 1.65, color: "var(--text-dim)" }}>{svc.description}</p>
                          {svc.highlights && (
                            <ul style={{ margin: 0, padding: 0, listStyle: "none", display: "grid", gap: 10 }}>
                              {svc.highlights.map((h, hi) => (
                                <li key={hi} style={{ display: "flex", gap: 12, fontSize: 14, color: "var(--text)" }}>
                                  <span style={{ color: c.text, flexShrink: 0, marginTop: 1 }}>✓</span>
                                  {h}
                                </li>
                              ))}
                            </ul>
                          )}
                        </div>
                        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                          <div>
                            <div style={{ fontSize: 11, fontFamily: "var(--font-mono)", color: "var(--text-faint)", marginBottom: 10, textTransform: "uppercase", letterSpacing: "0.1em" }}>Stack</div>
                            <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                              {svc.stack.map(s => (
                                <span key={s} style={{
                                  fontSize: 12, padding: "4px 10px", borderRadius: 6,
                                  background: c.bg, border: `1px solid ${c.border}`,
                                  color: c.text, fontFamily: "var(--font-mono)",
                                }}>{s}</span>
                              ))}
                            </div>
                          </div>

                          {/* Demo / Repo links */}
                          {(demo || repo) && (
                            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                              {demo && (
                                <a
                                  href={demo}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  onClick={e => e.stopPropagation()}
                                  style={{
                                    display: "inline-flex", alignItems: "center", gap: 6,
                                    padding: "8px 16px",
                                    background: c.bg, border: `1px solid ${c.border}`,
                                    borderRadius: 8, fontSize: 13, fontWeight: 500,
                                    color: c.text, textDecoration: "none",
                                    fontFamily: "var(--font-mono)",
                                  }}
                                >
                                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15,3 21,3 21,9"/><line x1="10" y1="14" x2="21" y2="3"/>
                                  </svg>
                                  Live Demo
                                </a>
                              )}
                              {repo && (
                                <a
                                  href={repo}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  onClick={e => e.stopPropagation()}
                                  style={{
                                    display: "inline-flex", alignItems: "center", gap: 6,
                                    padding: "8px 16px",
                                    background: "var(--bg-elev)", border: "1px solid var(--line)",
                                    borderRadius: 8, fontSize: 13, fontWeight: 500,
                                    color: "var(--text-dim)", textDecoration: "none",
                                    fontFamily: "var(--font-mono)",
                                  }}
                                >
                                  <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>
                                  </svg>
                                  View Repo
                                </a>
                              )}
                            </div>
                          )}

                          <a
                            href={`mailto:hello@auraajenticai.cloud?subject=Enquiry: ${svc.name}`}
                            onClick={e => e.stopPropagation()}
                            style={{
                              alignSelf: "flex-start",
                              padding: "10px 20px",
                              background: "var(--text)", color: "var(--bg)",
                              borderRadius: 9, fontSize: 13.5, fontWeight: 500,
                              textDecoration: "none", marginTop: "auto",
                            }}
                          >Get a Quote →</a>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>
      <style>{`
        @media (max-width: 640px) {
          .svc-detail-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </main>
  );
};

// ─── STACK PAGE ──────────────────────────────────────────────────────────────

const StackPage = () => {
  const D = PORTFOLIO_DATA;
  const cats = Object.entries(D.stack);
  const [activeTab, setActiveTab] = React.useState(cats[0][0]);
  const skills = cats.find(([k]) => k === activeTab)?.[1] || [];

  return (
    <main>
      <PageHero
        eyebrow="Technology"
        title={<>Tools we wield <span style={{ fontFamily: "var(--font-serif)", fontStyle: "italic", fontWeight: 400 }}>daily</span></>}
        sub="Production-tested across 40+ agents, 12 enterprise clients, and 7 years of shipping real systems."
      />
      <section style={{ padding: "80px 0 120px" }}>
        <div className="container">
          {/* Tab bar */}
          <div style={{ display: "flex", gap: 4, flexWrap: "wrap", marginBottom: 48, borderBottom: "1px solid var(--line)", paddingBottom: 0 }}>
            {cats.map(([cat]) => (
              <button key={cat} onClick={() => setActiveTab(cat)} style={{
                padding: "10px 18px", background: "transparent", border: "none",
                borderBottom: activeTab === cat ? "2px solid var(--accent)" : "2px solid transparent",
                color: activeTab === cat ? "var(--text)" : "var(--text-dim)",
                fontSize: 13.5, fontWeight: activeTab === cat ? 500 : 400,
                cursor: "pointer", marginBottom: -1, transition: "all 0.15s",
                fontFamily: "var(--font-sans)",
              }}>{cat}</button>
            ))}
          </div>

          {/* Skill bars */}
          <div style={{ display: "grid", gap: 20, maxWidth: 720 }}>
            {skills.map((s, i) => (
              <div key={s.name} className="reveal" style={{ animationDelay: `${i * 60}ms` }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                  <span style={{ fontSize: 14.5, fontWeight: 500 }}>{s.name}</span>
                  <span style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--text-faint)" }}>{s.level}%</span>
                </div>
                <div style={{ height: 6, background: "var(--line)", borderRadius: 99, overflow: "hidden" }}>
                  <div style={{
                    height: "100%", width: `${s.level}%`,
                    background: "linear-gradient(90deg, var(--accent), var(--accent-2))",
                    borderRadius: 99,
                    transition: "width 0.8s cubic-bezier(0.2,0.8,0.2,1)",
                  }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

// ─── AGENTS PAGE ─────────────────────────────────────────────────────────────

const AgentsPage = () => (
  <main>
    <PageHero
      eyebrow="AI Agents"
      title={<>Agents that act — not <span style={{ fontFamily: "var(--font-serif)", fontStyle: "italic", fontWeight: 400 }}>chat</span></>}
      sub="Every agent we ship has tool access, memory, retry logic, and an audit trail. Live demo below."
    />
    <section style={{ padding: "60px 0 120px" }}>
      <div className="container">
        <window.AgentShowcase />
      </div>
    </section>
  </main>
);

// ─── TIMELINE PAGE ───────────────────────────────────────────────────────────

const TimelinePage = () => {
  const D = PORTFOLIO_DATA;
  return (
    <main>
      <PageHero
        eyebrow="Experience"
        title="Seven years of shipping"
        sub="From agency work to fintech infrastructure to founding Aura — the full arc."
      />
      <section style={{ padding: "80px 0 120px" }}>
        <div className="container">
          <div style={{ maxWidth: 720, display: "grid", gap: 0 }}>
            {D.experience.map((exp, i) => (
              <div key={i} className="reveal" style={{
                display: "grid", gridTemplateColumns: "160px 1fr",
                gap: "0 32px", paddingBottom: 40,
                borderLeft: "1px solid var(--line)",
                paddingLeft: 32, marginLeft: 160, position: "relative",
              }}>
                <div style={{
                  position: "absolute", left: -5, top: 8,
                  width: 9, height: 9, borderRadius: "50%",
                  background: "var(--accent)",
                  boxShadow: "0 0 12px var(--accent-glow)",
                }} />
                <div style={{
                  position: "absolute", left: -160, top: 6,
                  fontFamily: "var(--font-mono)", fontSize: 11,
                  color: "var(--text-faint)", whiteSpace: "nowrap",
                  textAlign: "right", paddingRight: 28,
                }}>{exp.year}</div>
                <div style={{ paddingTop: 0 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 4, flexWrap: "wrap" }}>
                    <span style={{ fontSize: 15.5, fontWeight: 500 }}>{exp.role}</span>
                    <span style={{
                      fontSize: 10.5, padding: "2px 7px", borderRadius: 999,
                      background: "var(--bg-elev)", border: "1px solid var(--line)",
                      color: "var(--text-faint)", fontFamily: "var(--font-mono)",
                    }}>{exp.kind}</span>
                  </div>
                  <div style={{ fontSize: 13, color: "var(--accent)", marginBottom: 10, fontWeight: 500 }}>{exp.company}</div>
                  <p style={{ margin: 0, fontSize: 14, lineHeight: 1.6, color: "var(--text-dim)" }}>{exp.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

// ─── CONTACT PAGE ─────────────────────────────────────────────────────────────

const ContactPage = ({ lang }) => {
  const [sent, setSent] = React.useState(false);
  const [form, setForm] = React.useState({ name: "", email: "", service: "", message: "" });
  const [loading, setLoading] = React.useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(`${DASHBOARD_API}/api/public/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
        signal: AbortSignal.timeout(8000),
      });
      if (res.ok) {
        setSent(true);
      } else {
        alert('Something went wrong. Please email us directly at hello@auraajenticai.cloud');
      }
    } catch {
      alert('Could not send message. Please email us at hello@auraajenticai.cloud');
    }
    setLoading(false);
  };

  const services = PORTFOLIO_DATA.services.map(s => s.name);

  return (
    <main>
      <PageHero
        eyebrow="Contact"
        title="Let's build something real"
        sub="Describe what you need — we'll respond within 24 hours with a scoped proposal."
      />
      <section style={{ padding: "80px 0 120px" }}>
        <div className="container">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1.3fr", gap: 80, alignItems: "start" }} className="contact-grid">
            {/* Left info */}
            <div>
              <div style={{ display: "grid", gap: 24 }}>
                {[
                  { label: "Email", value: "hello@auraajenticai.cloud", href: "mailto:hello@auraajenticai.cloud" },
                  { label: "Response time", value: "< 24 hours" },
                  { label: "Location", value: "Dhaka, Bangladesh · Remote" },
                  { label: "Availability", value: "Open to new projects" },
                ].map(item => (
                  <div key={item.label} style={{
                    padding: "20px 24px", borderRadius: "var(--radius)",
                    border: "1px solid var(--line)", background: "var(--bg-card)",
                  }}>
                    <div style={{ fontSize: 11, fontFamily: "var(--font-mono)", color: "var(--text-faint)", marginBottom: 6, textTransform: "uppercase", letterSpacing: "0.1em" }}>{item.label}</div>
                    {item.href
                      ? <a href={item.href} style={{ fontSize: 15, color: "var(--accent)", textDecoration: "none" }}>{item.value}</a>
                      : <div style={{ fontSize: 15, fontWeight: 500 }}>{item.value}</div>
                    }
                  </div>
                ))}
              </div>
            </div>

            {/* Contact form */}
            {sent ? (
              <div style={{
                padding: 48, borderRadius: "var(--radius)", border: "1px solid var(--line)",
                background: "var(--bg-card)", textAlign: "center",
              }}>
                <div style={{ fontSize: 40, marginBottom: 16 }}>✓</div>
                <h3 style={{ margin: "0 0 8px", fontWeight: 500 }}>Message sent!</h3>
                <p style={{ color: "var(--text-dim)", margin: 0 }}>We'll get back to you within 24 hours.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: "grid", gap: 16 }}>
                {[
                  { key: "name", label: "Your name", type: "text", placeholder: "Jane Smith" },
                  { key: "email", label: "Email", type: "email", placeholder: "jane@company.com" },
                ].map(f => (
                  <div key={f.key}>
                    <label style={{ display: "block", fontSize: 12.5, color: "var(--text-faint)", marginBottom: 6, fontFamily: "var(--font-mono)" }}>{f.label}</label>
                    <input
                      type={f.type} required placeholder={f.placeholder}
                      value={form[f.key]}
                      onChange={e => setForm(p => ({ ...p, [f.key]: e.target.value }))}
                      style={{
                        width: "100%", padding: "11px 14px",
                        background: "var(--bg-elev)", border: "1px solid var(--line)",
                        borderRadius: 9, color: "var(--text)", fontSize: 14.5,
                        fontFamily: "var(--font-sans)", outline: "none",
                        boxSizing: "border-box",
                      }}
                    />
                  </div>
                ))}
                <div>
                  <label style={{ display: "block", fontSize: 12.5, color: "var(--text-faint)", marginBottom: 6, fontFamily: "var(--font-mono)" }}>Service interested in</label>
                  <select
                    value={form.service}
                    onChange={e => setForm(p => ({ ...p, service: e.target.value }))}
                    style={{
                      width: "100%", padding: "11px 14px",
                      background: "var(--bg-elev)", border: "1px solid var(--line)",
                      borderRadius: 9, color: form.service ? "var(--text)" : "var(--text-faint)",
                      fontSize: 14.5, fontFamily: "var(--font-sans)", outline: "none",
                      boxSizing: "border-box",
                    }}
                  >
                    <option value="">Select a service…</option>
                    {services.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
                <div>
                  <label style={{ display: "block", fontSize: 12.5, color: "var(--text-faint)", marginBottom: 6, fontFamily: "var(--font-mono)" }}>What do you need?</label>
                  <textarea
                    required rows={5} placeholder="Describe your project or goal…"
                    value={form.message}
                    onChange={e => setForm(p => ({ ...p, message: e.target.value }))}
                    style={{
                      width: "100%", padding: "11px 14px",
                      background: "var(--bg-elev)", border: "1px solid var(--line)",
                      borderRadius: 9, color: "var(--text)", fontSize: 14.5,
                      fontFamily: "var(--font-sans)", outline: "none", resize: "vertical",
                      boxSizing: "border-box",
                    }}
                  />
                </div>
                <button type="submit" disabled={loading} style={{
                  padding: "13px 28px", background: "var(--text)", color: "var(--bg)",
                  border: "none", borderRadius: 10, fontSize: 14.5, fontWeight: 500,
                  cursor: loading ? "wait" : "pointer", opacity: loading ? 0.7 : 1,
                }}>
                  {loading ? "Sending…" : "Send Message →"}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
      <style>{`
        @media (max-width: 720px) {
          .contact-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </main>
  );
};

// ─── PRICING PAGE ─────────────────────────────────────────────────────────────

const PRICING_COLORS = {
  violet: { bg: "rgba(124,92,255,0.08)", border: "rgba(124,92,255,0.22)", text: "#a78bfa" },
  cyan:   { bg: "rgba(0,212,255,0.07)",  border: "rgba(0,212,255,0.20)",  text: "#67e8f9" },
  amber:  { bg: "rgba(251,191,36,0.08)", border: "rgba(251,191,36,0.22)", text: "#fde68a" },
};

const PricingPage = () => {
  const D = PORTFOLIO_DATA;
  return (
    <main>
      <PageHero
        eyebrow="Pricing"
        title={<>Transparent pricing. <span style={{ fontFamily: "var(--font-serif)", fontStyle: "italic", fontWeight: 400 }}>No surprises.</span></>}
        sub="Fixed-scope projects. No retainers for decks. Every tier ends with production code on your domain."
      />
      <section style={{ padding: "80px 0 120px" }}>
        <div className="container">
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 24, alignItems: "start",
          }} className="pricing-grid">
            {D.pricingTiers.map((tier, i) => {
              const c = PRICING_COLORS[tier.color] || PRICING_COLORS.violet;
              const isPopular = tier.badge === "Most Popular";
              return (
                <div
                  key={i}
                  className="reveal"
                  style={{
                    background: isPopular ? c.bg : "var(--bg-card)",
                    border: `1px solid ${isPopular ? c.border : "var(--line)"}`,
                    borderRadius: "var(--radius)",
                    padding: "32px",
                    position: "relative",
                  }}
                >
                  {tier.badge && (
                    <div style={{
                      position: "absolute", top: -12, left: "50%",
                      transform: "translateX(-50%)",
                      background: isPopular ? c.text : "var(--bg-elev)",
                      color: isPopular ? "var(--bg)" : "var(--text-faint)",
                      fontSize: 10.5, fontWeight: 600,
                      padding: "3px 12px", borderRadius: 999,
                      fontFamily: "var(--font-mono)",
                      border: `1px solid ${c.border}`,
                      whiteSpace: "nowrap",
                    }}>{tier.badge}</div>
                  )}

                  <div style={{ marginBottom: 24 }}>
                    <h3 style={{ margin: "0 0 6px", fontSize: 20, fontWeight: 600 }}>{tier.name}</h3>
                    <p style={{ margin: 0, fontSize: 13.5, color: "var(--text-dim)", lineHeight: 1.5 }}>{tier.description}</p>
                  </div>

                  <div style={{ marginBottom: 28 }}>
                    {tier.price ? (
                      <div style={{ display: "flex", alignItems: "baseline", gap: 4 }}>
                        <span style={{ fontSize: 13, color: "var(--text-faint)" }}>USD</span>
                        <span style={{ fontSize: 40, fontWeight: 700, letterSpacing: "-0.03em", color: c.text }}>${tier.price.toLocaleString()}</span>
                        <span style={{ fontSize: 13, color: "var(--text-faint)", fontFamily: "var(--font-mono)" }}>{tier.period}</span>
                      </div>
                    ) : (
                      <div style={{ fontSize: 28, fontWeight: 700, color: c.text }}>Custom Quote</div>
                    )}
                  </div>

                  <ul style={{ margin: "0 0 28px", padding: 0, listStyle: "none", display: "grid", gap: 10 }}>
                    {tier.features.map((f, fi) => (
                      <li key={fi} style={{ display: "flex", gap: 10, fontSize: 13.5, color: "var(--text-dim)", lineHeight: 1.45 }}>
                        <span style={{ color: c.text, flexShrink: 0, marginTop: 1, fontWeight: 700 }}>✓</span>
                        {f}
                      </li>
                    ))}
                  </ul>

                  <a
                    href={tier.href}
                    style={{
                      display: "block", textAlign: "center",
                      padding: "12px 24px",
                      background: isPopular ? c.text : "var(--bg-elev)",
                      color: isPopular ? "var(--bg)" : "var(--text)",
                      border: `1px solid ${isPopular ? c.text : "var(--line)"}`,
                      borderRadius: 10, fontSize: 14, fontWeight: 500,
                      textDecoration: "none",
                      transition: "opacity 0.15s",
                    }}
                    onMouseEnter={e => e.currentTarget.style.opacity = "0.85"}
                    onMouseLeave={e => e.currentTarget.style.opacity = "1"}
                  >{tier.cta} →</a>
                </div>
              );
            })}
          </div>

          <div style={{
            marginTop: 64, padding: "32px 40px",
            background: "var(--bg-card)", border: "1px solid var(--line)",
            borderRadius: "var(--radius)",
            display: "grid", gridTemplateColumns: "1fr auto",
            gap: 24, alignItems: "center",
          }} className="pricing-cta-row">
            <div>
              <h3 style={{ margin: "0 0 6px", fontSize: 18, fontWeight: 500 }}>Not sure which tier fits your project?</h3>
              <p style={{ margin: 0, fontSize: 14, color: "var(--text-dim)" }}>Email us a brief description — we'll scope it and get back within 24 hours.</p>
            </div>
            <a
              href="mailto:hello@auraajenticai.cloud?subject=Project Scoping"
              style={{
                padding: "12px 24px", background: "var(--text)", color: "var(--bg)",
                borderRadius: 10, fontSize: 14, fontWeight: 500,
                textDecoration: "none", whiteSpace: "nowrap",
              }}
            >Get a Quote →</a>
          </div>
        </div>
      </section>
      <style>{`
        @media (max-width: 900px) {
          .pricing-grid { grid-template-columns: 1fr !important; max-width: 480px; }
        }
        @media (max-width: 600px) {
          .pricing-cta-row { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </main>
  );
};

// ─── BLOG PAGE ────────────────────────────────────────────────────────────────

const BLOG_COLORS = {
  amber:  { bg: "rgba(251,191,36,0.08)", border: "rgba(251,191,36,0.22)", text: "#fde68a" },
  rose:   { bg: "rgba(244,63,94,0.08)",  border: "rgba(244,63,94,0.22)",  text: "#fda4af" },
  cyan:   { bg: "rgba(0,212,255,0.07)",  border: "rgba(0,212,255,0.20)",  text: "#67e8f9" },
  violet: { bg: "rgba(124,92,255,0.08)", border: "rgba(124,92,255,0.22)", text: "#a78bfa" },
};

const BlogPage = () => {
  const D = PORTFOLIO_DATA;
  const [active, setActive] = React.useState(null);
  const article = active ? D.blogArticles.find(a => a.slug === active) : null;

  if (article) {
    const c = BLOG_COLORS[article.color] || BLOG_COLORS.violet;
    return (
      <main>
        <section style={{ padding: "140px 0 80px" }}>
          <div className="container" style={{ maxWidth: 720 }}>
            <button
              onClick={() => setActive(null)}
              style={{
                display: "inline-flex", alignItems: "center", gap: 6,
                fontSize: 12.5, color: "var(--text-faint)", background: "none",
                border: "none", cursor: "pointer", marginBottom: 40,
                fontFamily: "var(--font-mono)", padding: 0,
              }}
            >← All Articles</button>

            <div style={{ display: "flex", gap: 10, alignItems: "center", marginBottom: 20 }}>
              <span style={{
                fontSize: 11, padding: "3px 10px", borderRadius: 999,
                background: c.bg, border: `1px solid ${c.border}`,
                color: c.text, fontFamily: "var(--font-mono)",
              }}>{article.category}</span>
              <span style={{ fontSize: 12, color: "var(--text-faint)", fontFamily: "var(--font-mono)" }}>
                {article.date} · {article.readTime} read
              </span>
            </div>

            <h1 style={{
              fontSize: "clamp(28px, 4vw, 48px)", fontWeight: 500,
              letterSpacing: "-0.02em", lineHeight: 1.1, margin: "0 0 48px",
            }}>{article.title}</h1>

            <div style={{ display: "grid", gap: 20 }}>
              {article.content.map((block, i) => {
                if (block.type === "h2") return (
                  <h2 key={i} style={{
                    fontSize: 20, fontWeight: 600, margin: "16px 0 0",
                    letterSpacing: "-0.01em",
                  }}>{block.text}</h2>
                );
                return (
                  <p key={i} style={{
                    margin: 0, fontSize: 16, lineHeight: 1.75,
                    color: "var(--text-dim)",
                  }}>{block.text}</p>
                );
              })}
            </div>

            <div style={{
              marginTop: 64, padding: "28px 32px",
              background: c.bg, border: `1px solid ${c.border}`,
              borderRadius: "var(--radius)",
            }}>
              <p style={{ margin: "0 0 16px", fontSize: 15, fontWeight: 500 }}>
                Want to build something like this?
              </p>
              <a
                href={`mailto:hello@auraajenticai.cloud?subject=Enquiry from blog: ${article.title}`}
                style={{
                  display: "inline-flex", padding: "10px 22px",
                  background: "var(--text)", color: "var(--bg)",
                  borderRadius: 9, fontSize: 13.5, fontWeight: 500,
                  textDecoration: "none",
                }}
              >Get in Touch →</a>
            </div>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main>
      <PageHero
        eyebrow="Blog"
        title={<>How we build — <span style={{ fontFamily: "var(--font-serif)", fontStyle: "italic", fontWeight: 400 }}>openly</span></>}
        sub="Technical deep-dives on AI agents, trading systems, and the infrastructure behind Aura."
      />
      <section style={{ padding: "80px 0 120px" }}>
        <div className="container">
          <div style={{ display: "grid", gap: 20 }}>
            {D.blogArticles.map((post, i) => {
              const c = BLOG_COLORS[post.color] || BLOG_COLORS.violet;
              return (
                <div
                  key={i}
                  className="reveal"
                  onClick={() => setActive(post.slug)}
                  style={{
                    background: "var(--bg-card)", border: "1px solid var(--line)",
                    borderRadius: "var(--radius)", padding: "28px 32px",
                    cursor: "pointer", transition: "border-color 0.15s, background 0.15s",
                    display: "grid", gridTemplateColumns: "1fr auto", gap: 24, alignItems: "center",
                  }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = c.border; e.currentTarget.style.background = c.bg; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = "var(--line)"; e.currentTarget.style.background = "var(--bg-card)"; }}
                >
                  <div>
                    <div style={{ display: "flex", gap: 10, alignItems: "center", marginBottom: 12 }}>
                      <span style={{
                        fontSize: 10.5, padding: "2px 9px", borderRadius: 999,
                        background: c.bg, border: `1px solid ${c.border}`,
                        color: c.text, fontFamily: "var(--font-mono)",
                      }}>{post.category}</span>
                      <span style={{ fontSize: 11.5, color: "var(--text-faint)", fontFamily: "var(--font-mono)" }}>
                        {post.date} · {post.readTime} read
                      </span>
                    </div>
                    <h3 style={{ margin: "0 0 10px", fontSize: 18, fontWeight: 500, letterSpacing: "-0.01em" }}>
                      {post.title}
                    </h3>
                    <p style={{ margin: 0, fontSize: 14, color: "var(--text-dim)", lineHeight: 1.55 }}>
                      {post.excerpt}
                    </p>
                  </div>
                  <div style={{ fontSize: 20, color: "var(--text-faint)", flexShrink: 0 }}>→</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </main>
  );
};

// ─── SERVICE DETAIL PAGE ──────────────────────────────────────────────────────

const SVC_EXTRA = {
  'web-app-dev': {
    useCases: [
      { icon: '🛒', title: 'E-commerce & Marketplace', body: 'Product catalogs, cart flows, payment integrations, and seller dashboards — all built to handle real traffic from day one.' },
      { icon: '📊', title: 'SaaS Dashboards', body: 'Multi-tenant apps with role-based access, live data, Stripe billing, and the kind of UX that keeps customers from churning.' },
      { icon: '🚀', title: 'Landing Pages that Convert', body: 'Fast, opinionated landing pages with A/B-ready structures — we\'ve seen >5% conversion on cold paid traffic.' },
    ],
    process: ['Scope & wireframe in Figma (3–5 days)', 'Build core flows, DB schema, auth (2–4 weeks)', 'QA, performance audit, deploy to production'],
  },
  'ai-agent-automation': {
    useCases: [
      { icon: '💬', title: 'Customer Support Triage', body: 'Agents that classify, route, and draft responses for support tickets — cutting first-response time from hours to seconds.' },
      { icon: '📈', title: 'Internal Reporting & Analysis', body: 'Agents that pull data from your tools, summarize it, and push scheduled reports to Slack or email — no analyst required.' },
      { icon: '🎯', title: 'Lead Qualification & CRM Automation', body: 'AI that scores inbound leads, enriches profiles, and books meetings without a human touching the pipeline.' },
    ],
    process: ['Define the agent\'s scope and tool integrations (1–3 days)', 'Build, prompt-engineer, and eval the agent (1–3 weeks)', 'Deploy with monitoring, retry logic, and a kill switch'],
  },
  'web3-blockchain': {
    useCases: [
      { icon: '🔐', title: 'DAO & Multi-sig Interfaces', body: 'Governance UIs, proposal voting, and treasury management — making on-chain decisions feel as simple as a web form.' },
      { icon: '🖼️', title: 'NFT Minting & Marketplace', body: 'ERC-721/1155 contracts, lazy minting, royalty enforcement, and storefront UIs that don\'t look like it\'s 2021.' },
      { icon: '🌉', title: 'Cross-chain Bridges & Gasless UX', body: 'Bridge infrastructure with abstract-away gas complexity — users just click "confirm" without touching ETH.' },
    ],
    process: ['Contract design & security review (3–5 days)', 'Smart contract deployment + frontend integration (2–4 weeks)', 'Audit, testnet, mainnet launch'],
  },
  'mt5-ea-trading': {
    useCases: [
      { icon: '📉', title: 'Automated Trading Strategies', body: 'Trend-following, mean-reversion, and multi-symbol EAs with hard risk limits, drawdown stops, and real-time alerts.' },
      { icon: '🏦', title: 'Prop Firm Dashboards', body: 'Live P&L tracking, account-level risk envelopes, one-click kill switches, and challenge-pass analytics for prop trading firms.' },
      { icon: '📋', title: 'Copy Trading Infrastructure', body: 'Master-slave signal distribution across hundreds of follower accounts with sub-100ms latency and full trade history.' },
    ],
    process: ['Strategy specification & backtest design (2–5 days)', 'MQL5 development, forward test on demo (1–3 weeks)', 'Live deployment with monitoring and kill switches'],
  },
  'scraping-data-pipeline': {
    useCases: [
      { icon: '🏷️', title: 'Competitor Price Monitoring', body: 'Real-time price intelligence across thousands of SKUs — normalized, deduplicated, and delivered to your dashboard or DB.' },
      { icon: '🏘️', title: 'Real Estate & Listing Aggregation', body: 'Multi-source property data collected, structured, and refreshed on schedule — feeding analytics or ML models.' },
      { icon: '💹', title: 'Financial Data ETL', body: 'Earnings reports, regulatory filings, and market data extracted from public sources and piped into your warehouse.' },
    ],
    process: ['Site analysis & proxy strategy (1–2 days)', 'Scraper build with error handling & rotation (1–2 weeks)', 'ETL pipeline, scheduling, and delivery to your DB'],
  },
  'infra-devops': {
    useCases: [
      { icon: '💸', title: 'Cut Cloud Bills by 60%+', body: 'Move from AWS/GCP managed services to self-hosted Coolify on a bare-metal VPS — same reliability, fraction of the cost.' },
      { icon: '🔄', title: 'Zero-downtime CI/CD Pipelines', body: 'GitHub Actions → Docker → Traefik with blue/green deploys, automatic SSL, and rollback on health-check failure.' },
      { icon: '🔭', title: 'Observability for AI Workloads', body: 'Structured logging, Prometheus metrics, and alerting for long-running agent tasks — know before your users do.' },
    ],
    process: ['Audit current infra and cost (1 day)', 'Provision, configure, migrate (3–7 days)', 'CI/CD setup, monitoring, runbook handoff'],
  },
  'meta-ads-ai': {
    useCases: [
      { icon: '🛍️', title: 'E-commerce Scaling ($10k+/mo spend)', body: 'AI that manages bid adjustments, budget reallocation, and creative rotation across campaigns — every 15 minutes, not twice a day.' },
      { icon: '🏢', title: 'Agencies with Multiple Client Accounts', body: 'One AI system managing dozens of accounts simultaneously, surfacing anomalies and generating client-ready reports automatically.' },
      { icon: '📣', title: 'Product Launches & Rapid Testing', body: '100+ ad variants generated and tested by AI in the first 48 hours — finding your winning creative before your budget runs out.' },
    ],
    process: ['Connect Meta Ads API + brief the AI on goals (1 day)', 'Deploy optimization agent, set guardrails & budget caps (2–3 days)', 'Monitor KPIs, iterate on creative strategy weekly'],
  },
};

const ServiceDetailPage = ({ svc }) => {
  const extra = SVC_EXTRA[svc.id] || {};
  const c = COLOR_MAP[svc.color] || COLOR_MAP.violet;
  const demo = svc.demo;
  const repo = svc.repo;

  return (
    <main>
      <PageHero
        eyebrow={svc.kind}
        title={svc.name}
        sub={svc.description}
      >
        <div style={{ display: 'flex', gap: 12, marginTop: 32, flexWrap: 'wrap' }}>
          {demo && (
            <a href={demo} target="_blank" rel="noopener noreferrer" style={{
              display: 'inline-flex', alignItems: 'center', gap: 6,
              padding: '10px 20px', borderRadius: 9,
              background: c.bg, border: `1px solid ${c.border}`,
              color: c.text, fontSize: 13.5, fontWeight: 500,
              textDecoration: 'none', fontFamily: 'var(--font-mono)',
            }}>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15,3 21,3 21,9"/><line x1="10" y1="14" x2="21" y2="3"/>
              </svg>
              Live Demo
            </a>
          )}
          <a
            href={`mailto:hello@auraajenticai.cloud?subject=Enquiry: ${svc.name}`}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 6,
              padding: '10px 20px', borderRadius: 9,
              background: 'var(--text)', color: 'var(--bg)',
              fontSize: 13.5, fontWeight: 500, textDecoration: 'none',
            }}
          >Get a Quote →</a>
        </div>
      </PageHero>

      {/* Impact metric + stack */}
      <section style={{ padding: '64px 0', borderBottom: '1px solid var(--line)' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 48, alignItems: 'start' }} className="svc-detail-top">
            <div>
              <div style={{ fontSize: 11, fontFamily: 'var(--font-mono)', color: 'var(--text-faint)', marginBottom: 12, textTransform: 'uppercase', letterSpacing: '0.1em' }}>Key metric</div>
              <div style={{ fontSize: 52, fontWeight: 700, color: c.text, lineHeight: 1 }}>{svc.impact.primary}</div>
              <div style={{ fontSize: 14, color: 'var(--text-dim)', marginTop: 8 }}>{svc.impact.secondary}</div>
            </div>
            <div>
              <div style={{ fontSize: 11, fontFamily: 'var(--font-mono)', color: 'var(--text-faint)', marginBottom: 12, textTransform: 'uppercase', letterSpacing: '0.1em' }}>Stack</div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {svc.stack.map(s => (
                  <span key={s} style={{
                    fontSize: 12.5, padding: '5px 12px', borderRadius: 7,
                    background: c.bg, border: `1px solid ${c.border}`,
                    color: c.text, fontFamily: 'var(--font-mono)',
                  }}>{s}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Highlights */}
      {svc.highlights && (
        <section style={{ padding: '72px 0', borderBottom: '1px solid var(--line)' }}>
          <div className="container">
            <div className="eyebrow" style={{ marginBottom: 32 }}>What's included</div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 16 }}>
              {svc.highlights.map((h, i) => (
                <div key={i} className="reveal" style={{
                  padding: '20px 24px', borderRadius: 'var(--radius)',
                  background: c.bg, border: `1px solid ${c.border}`,
                  display: 'flex', gap: 12, alignItems: 'flex-start',
                }}>
                  <span style={{ color: c.text, fontWeight: 700, flexShrink: 0, marginTop: 1 }}>✓</span>
                  <span style={{ fontSize: 14.5, lineHeight: 1.5 }}>{h}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Use cases */}
      {extra.useCases && (
        <section style={{ padding: '72px 0', borderBottom: '1px solid var(--line)' }}>
          <div className="container">
            <div className="eyebrow" style={{ marginBottom: 12 }}>Use cases</div>
            <h2 style={{ fontSize: 'clamp(24px, 3.5vw, 40px)', fontWeight: 500, letterSpacing: '-0.02em', margin: '0 0 48px' }}>
              Who hires us for this
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 24 }}>
              {extra.useCases.map((uc, i) => (
                <div key={i} className="reveal" style={{
                  padding: '28px 28px', borderRadius: 'var(--radius)',
                  background: 'var(--bg-card)', border: '1px solid var(--line)',
                }}>
                  <div style={{ fontSize: 28, marginBottom: 14 }}>{uc.icon}</div>
                  <h3 style={{ margin: '0 0 10px', fontSize: 16, fontWeight: 600 }}>{uc.title}</h3>
                  <p style={{ margin: 0, fontSize: 14, lineHeight: 1.65, color: 'var(--text-dim)' }}>{uc.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Process */}
      {extra.process && (
        <section style={{ padding: '72px 0', borderBottom: '1px solid var(--line)' }}>
          <div className="container">
            <div className="eyebrow" style={{ marginBottom: 12 }}>Process</div>
            <h2 style={{ fontSize: 'clamp(24px, 3.5vw, 40px)', fontWeight: 500, letterSpacing: '-0.02em', margin: '0 0 48px' }}>
              How we work
            </h2>
            <div style={{ display: 'grid', gap: 0, maxWidth: 640 }}>
              {extra.process.map((step, i) => (
                <div key={i} className="reveal" style={{
                  display: 'flex', gap: 24, paddingBottom: 32,
                  borderLeft: i < extra.process.length - 1 ? `1px solid ${c.border}` : 'none',
                  paddingLeft: 32, marginLeft: 16, position: 'relative',
                }}>
                  <div style={{
                    position: 'absolute', left: -8, top: 4,
                    width: 15, height: 15, borderRadius: '50%',
                    background: c.bg, border: `2px solid ${c.text}`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 9, fontWeight: 700, color: c.text,
                    fontFamily: 'var(--font-mono)',
                  }}>{i + 1}</div>
                  <p style={{ margin: 0, fontSize: 15, lineHeight: 1.6, color: 'var(--text-dim)' }}>{step}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section style={{ padding: '80px 0 120px' }}>
        <div className="container">
          <div style={{
            padding: '48px 56px', borderRadius: 'var(--radius)',
            background: c.bg, border: `1px solid ${c.border}`,
            display: 'grid', gridTemplateColumns: '1fr auto',
            gap: 32, alignItems: 'center',
          }} className="svc-cta-row">
            <div>
              <h2 style={{ margin: '0 0 10px', fontSize: 'clamp(20px, 3vw, 30px)', fontWeight: 500, letterSpacing: '-0.01em' }}>
                Ready to ship {svc.name}?
              </h2>
              <p style={{ margin: 0, fontSize: 15, color: 'var(--text-dim)' }}>
                Describe your project — we'll respond within 24 hours with a scoped proposal.
              </p>
            </div>
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              <a
                href={`mailto:hello@auraajenticai.cloud?subject=Project: ${svc.name}`}
                style={{
                  padding: '12px 28px', background: 'var(--text)', color: 'var(--bg)',
                  borderRadius: 10, fontSize: 14, fontWeight: 500,
                  textDecoration: 'none', whiteSpace: 'nowrap',
                }}
              >Start a Project →</a>
              <a href="#/services" style={{
                padding: '12px 20px',
                background: 'transparent', border: `1px solid ${c.border}`,
                color: c.text, borderRadius: 10, fontSize: 14,
                textDecoration: 'none', whiteSpace: 'nowrap',
              }}>All Services</a>
            </div>
          </div>
        </div>
      </section>

      <style>{`
        @media (max-width: 720px) {
          .svc-detail-top { grid-template-columns: 1fr !important; }
          .svc-cta-row { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </main>
  );
};

window.ServicesPage     = ServicesPage;
window.StackPage        = StackPage;
window.AgentsPage       = AgentsPage;
window.TimelinePage     = TimelinePage;
window.ContactPage      = ContactPage;
window.PricingPage      = PricingPage;
window.BlogPage         = BlogPage;
window.ServiceDetailPage = ServiceDetailPage;
