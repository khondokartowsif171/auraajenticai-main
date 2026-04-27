// Timeline + Contact + Footer

const Timeline = () => {
  const D = PORTFOLIO_DATA;
  return (
    <section id="timeline" style={{ padding: "120px 0", borderTop: "1px solid var(--line)" }}>
      <div className="container">
        <SectionHeader
          eyebrow="Trajectory"
          num="05 / 06"
          title="Seven years, one through-line: shipping systems that work in production."
        />

        <div style={{ position: "relative", paddingLeft: 32 }}>
          {/* spine */}
          <div style={{
            position: "absolute",
            left: 7, top: 6, bottom: 6,
            width: 1,
            background: "linear-gradient(180deg, var(--accent), var(--line) 80%)",
          }} />

          {D.experience.map((e, i) => (
            <div key={i} style={{
              position: "relative",
              paddingBottom: i < D.experience.length - 1 ? 40 : 0,
              animation: `float-up 0.5s ${i * 0.08}s both`,
            }}>
              {/* node */}
              <div style={{
                position: "absolute",
                left: -32,
                top: 4,
                width: 15, height: 15,
                borderRadius: "50%",
                background: "var(--bg)",
                border: `2px solid ${i === 0 ? "var(--accent)" : "var(--line-strong)"}`,
                boxShadow: i === 0 ? "0 0 16px var(--accent-glow)" : "none",
              }}>
                {i === 0 && <div style={{
                  position: "absolute",
                  inset: 2,
                  borderRadius: "50%",
                  background: "var(--accent)",
                  animation: "pulse-dot 2s infinite",
                }} />}
              </div>

              <div style={{
                display: "grid",
                gridTemplateColumns: "180px 1fr",
                gap: 32,
                alignItems: "start",
              }} className="tl-row">
                <div>
                  <div style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: 11.5,
                    color: "var(--text-faint)",
                    textTransform: "uppercase",
                    letterSpacing: "0.06em",
                  }}>{e.year}</div>
                  <span style={{
                    display: "inline-block",
                    marginTop: 8,
                    padding: "2px 8px",
                    border: "1px solid var(--line)",
                    borderRadius: 4,
                    fontSize: 10.5,
                    color: "var(--text-dim)",
                    fontFamily: "var(--font-mono)",
                  }}>{e.kind}</span>
                </div>
                <div>
                  <h3 style={{
                    margin: 0,
                    fontSize: 19,
                    fontWeight: 500,
                    letterSpacing: "-0.01em",
                  }}>{e.role}</h3>
                  <div style={{
                    marginTop: 4,
                    fontSize: 14,
                    color: "var(--accent-2)",
                  }}>{e.company}</div>
                  <p style={{
                    marginTop: 10,
                    marginBottom: 0,
                    fontSize: 14,
                    lineHeight: 1.6,
                    color: "var(--text-dim)",
                    maxWidth: 600,
                  }}>{e.detail}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <style>{`
          @media (max-width: 720px) {
            .tl-row { grid-template-columns: 1fr !important; gap: 8px !important; }
          }
        `}</style>
      </div>
    </section>
  );
};

const Contact = ({ lang = "en" }) => {
  const D = PORTFOLIO_DATA;
  const [form, setForm] = React.useState({ name: "", email: "", service: "", budget: "", message: "" });
  const [errors, setErrors] = React.useState({});
  const [status, setStatus] = React.useState("idle"); // idle | sending | sent

  const SERVICES = [
    "Website & Webapp Development",
    "AI Agent & Automation",
    "Web3 & Blockchain",
    "MT5 EA & Trading Automation",
    "Browser Scraping & Data Pipeline",
    "Infrastructure & DevOps",
  ];

  const BUDGETS = ["< $500", "$500 – $2,000", "$2,000 – $5,000", "$5,000 – $15,000", "$15,000+"];

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Required";
    if (!form.email.trim()) e.email = "Required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "Not a valid email";
    if (!form.service) e.service = "Please pick a service";
    if (!form.message.trim()) e.message = "Tell us about the project";
    else if (form.message.trim().length < 12) e.message = "A few more words please";
    return e;
  };

  const submit = async (ev) => {
    ev.preventDefault();
    const e = validate();
    setErrors(e);
    if (Object.keys(e).length) return;
    setStatus("sending");
    try {
      await fetch("https://n8n.auraajenticai.cloud/webhook/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      setStatus("sent");
    } catch {
      setStatus("idle");
      setErrors({ message: "Network error — please email us directly." });
    }
  };

  const Field = ({ id, label, type = "text", as = "input", placeholder }) => {
    const Tag = as;
    const hasErr = errors[id];
    return (
      <label style={{ display: "block" }}>
        <div style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: 8,
          fontSize: 12,
          fontFamily: "var(--font-mono)",
          color: hasErr ? "var(--danger)" : "var(--text-faint)",
          textTransform: "uppercase",
          letterSpacing: "0.06em",
        }}>
          <span>{label}</span>
          {hasErr && <span>{hasErr}</span>}
        </div>
        <Tag
          type={type}
          value={form[id]}
          onChange={(ev) => setForm(f => ({ ...f, [id]: ev.target.value }))}
          placeholder={placeholder}
          rows={as === "textarea" ? 5 : undefined}
          style={{
            width: "100%",
            background: "var(--bg-elev)",
            color: "var(--text)",
            border: `1px solid ${hasErr ? "var(--danger)" : "var(--line)"}`,
            borderRadius: 10,
            padding: "12px 14px",
            fontSize: 14,
            fontFamily: "var(--font-sans)",
            resize: as === "textarea" ? "vertical" : "none",
            outline: "none",
            transition: "border 0.15s",
          }}
          onFocus={(ev) => ev.target.style.borderColor = hasErr ? "var(--danger)" : "var(--accent)"}
          onBlur={(ev) => ev.target.style.borderColor = hasErr ? "var(--danger)" : "var(--line)"}
        />
      </label>
    );
  };

  const SelectField = ({ id, label, options, required = false }) => {
    const hasErr = errors[id];
    return (
      <label style={{ display: "block" }}>
        <div style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: 8,
          fontSize: 12,
          fontFamily: "var(--font-mono)",
          color: hasErr ? "var(--danger)" : "var(--text-faint)",
          textTransform: "uppercase",
          letterSpacing: "0.06em",
        }}>
          <span>{label}</span>
          {hasErr && <span>{hasErr}</span>}
        </div>
        <select
          value={form[id]}
          onChange={(ev) => setForm(f => ({ ...f, [id]: ev.target.value }))}
          style={{
            width: "100%",
            background: "var(--bg-elev)",
            color: form[id] ? "var(--text)" : "var(--text-faint)",
            border: `1px solid ${hasErr ? "var(--danger)" : "var(--line)"}`,
            borderRadius: 10,
            padding: "12px 14px",
            fontSize: 14,
            fontFamily: "var(--font-sans)",
            outline: "none",
            transition: "border 0.15s",
            cursor: "pointer",
          }}
          onFocus={(ev) => ev.target.style.borderColor = hasErr ? "var(--danger)" : "var(--accent)"}
          onBlur={(ev) => ev.target.style.borderColor = hasErr ? "var(--danger)" : "var(--line)"}
        >
          <option value="">Select…</option>
          {options.map(o => <option key={o} value={o}>{o}</option>)}
        </select>
      </label>
    );
  };

  return (
    <section id="contact" style={{ padding: "120px 0", borderTop: "1px solid var(--line)" }}>
      <div className="container">
        <SectionHeader
          eyebrow="Contact"
          num="06 / 06"
          title={<>Have a project that needs to <span style={{ fontFamily: "var(--font-serif)", fontStyle: "italic", fontWeight: 400 }}>actually ship</span>?</>}
          sub="Tell us what you're building — we'll respond within 24 hours with a plan and a quote."
        />

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48, alignItems: "start" }} className="contact-grid">
          {/* form */}
          <form onSubmit={submit} className="panel" style={{ padding: 32, display: "grid", gap: 18 }}>
            {status === "sent" ? (
              <div style={{ textAlign: "center", padding: "40px 20px" }}>
                <div style={{
                  width: 56, height: 56,
                  margin: "0 auto 20px",
                  borderRadius: "50%",
                  background: "color-mix(in srgb, var(--good) 15%, transparent)",
                  border: "1px solid var(--good)",
                  display: "grid", placeItems: "center",
                  color: "var(--good)",
                }}><Icons.Check size={26} /></div>
                <h3 style={{ margin: 0, fontSize: 22, fontWeight: 500, letterSpacing: "-0.02em" }}>
                  {lang === "en" ? "We'll be in touch!" : "বার্তা পাঠানো হয়েছে!"}
                </h3>
                <p style={{ marginTop: 10, color: "var(--text-dim)", fontSize: 14 }}>
                  {lang === "en"
                    ? "We'll get back to you within 24 hours!"
                    : "আমরা ২৪ ঘণ্টার মধ্যে যোগাযোগ করবো!"}
                </p>
                <button type="button" onClick={() => { setForm({ name: "", email: "", service: "", budget: "", message: "" }); setStatus("idle"); }} style={{
                  marginTop: 20,
                  padding: "8px 16px",
                  background: "transparent",
                  color: "var(--text-dim)",
                  border: "1px solid var(--line)",
                  borderRadius: 8,
                  fontSize: 13,
                  cursor: "pointer",
                }}>{lang === "en" ? "Send another" : "আবার পাঠান"}</button>
              </div>
            ) : (
              <>
                <Field id="name" label="Name" placeholder="Your name" />
                <Field id="email" label="Email" type="email" placeholder="you@company.com" />
                <SelectField id="service" label="Service" options={SERVICES} required />
                <SelectField id="budget" label="Budget (optional)" options={BUDGETS} />
                <Field id="message" label="Project Brief" as="textarea" placeholder="What are you trying to build, and where are you stuck?" />
                <button type="submit" disabled={status === "sending"} style={{
                  marginTop: 4,
                  padding: "12px 18px",
                  background: "var(--text)",
                  color: "var(--bg)",
                  border: "none",
                  borderRadius: 10,
                  fontSize: 14,
                  fontWeight: 500,
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 8,
                  opacity: status === "sending" ? 0.6 : 1,
                  cursor: status === "sending" ? "wait" : "pointer",
                }}>
                  {status === "sending" ? "Sending…" : <>Send message <Icons.Send size={13} /></>}
                </button>
              </>
            )}
          </form>

          {/* meta + chatbot teaser */}
          <div style={{ display: "grid", gap: 16 }}>
            <div className="panel" style={{ padding: 28 }}>
              <div className="eyebrow" style={{ marginBottom: 18 }}>Direct</div>
              <a href={`mailto:${D.brand.email}`} style={{
                fontSize: 22,
                fontWeight: 500,
                letterSpacing: "-0.02em",
                display: "inline-flex",
                alignItems: "center",
                gap: 10,
              }}>
                <Icons.Mail size={18} /> {D.brand.email}
              </a>
              <div style={{ marginTop: 24, display: "flex", gap: 8 }}>
                {[
                  { i: Icons.Github, l: "GitHub", h: D.brand.socials.github },
                  { i: Icons.LinkedIn, l: "LinkedIn", h: D.brand.socials.linkedin },
                  { i: Icons.Twitter, l: "Twitter", h: D.brand.socials.twitter },
                ].map(({ i: I, l, h }) => (
                  <a key={l} href={h} title={l} style={{
                    width: 40, height: 40,
                    display: "grid", placeItems: "center",
                    border: "1px solid var(--line)",
                    borderRadius: 8,
                    color: "var(--text-dim)",
                    transition: "all 0.15s",
                  }}
                    onMouseEnter={ev => { ev.currentTarget.style.color = "var(--text)"; ev.currentTarget.style.borderColor = "var(--line-strong)"; }}
                    onMouseLeave={ev => { ev.currentTarget.style.color = "var(--text-dim)"; ev.currentTarget.style.borderColor = "var(--line)"; }}
                  ><I size={15} /></a>
                ))}
              </div>
            </div>

            <ChatbotWidget />
          </div>
        </div>
        <style>{`
          @media (max-width: 880px) {
            .contact-grid { grid-template-columns: 1fr !important; gap: 24px !important; }
          }
        `}</style>
      </div>
    </section>
  );
};

const ChatbotWidget = () => {
  const [msgs, setMsgs] = React.useState([
    { role: "bot", text: "Ask me anything about the work — projects, stack choices, timelines." },
  ]);
  const [input, setInput] = React.useState("");
  const [thinking, setThinking] = React.useState(false);
  const scrollRef = React.useRef(null);

  React.useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [msgs, thinking]);

  const reply = async (q) => {
    setThinking(true);
    try {
      const text = await window.claude.complete(
        `You are a concise portfolio assistant for Aura, a senior agentic AI & full-stack engineer with 7+ years experience. Domains: AI agents, Web3, MLM/EA dashboards, full-stack. Answer in 1-3 sentences, professional but friendly. Question: ${q}`
      );
      setMsgs(m => [...m, { role: "bot", text }]);
    } catch (e) {
      setMsgs(m => [...m, { role: "bot", text: "Aura's offline — drop a note via the form and I'll reply within 48h." }]);
    }
    setThinking(false);
  };

  const send = () => {
    const q = input.trim();
    if (!q) return;
    setMsgs(m => [...m, { role: "user", text: q }]);
    setInput("");
    reply(q);
  };

  return (
    <div className="panel" style={{ padding: 0, overflow: "hidden" }}>
      <div style={{
        padding: "16px 20px",
        borderBottom: "1px solid var(--line)",
        display: "flex",
        alignItems: "center",
        gap: 10,
      }}>
        <div style={{
          width: 28, height: 28,
          display: "grid", placeItems: "center",
          borderRadius: 7,
          background: "var(--accent-glow)",
          color: "var(--accent)",
        }}><Icons.Sparkles size={14} /></div>
        <div>
          <div style={{ fontSize: 13.5, fontWeight: 500 }}>Ask about my work</div>
          <div style={{ fontSize: 11, color: "var(--text-faint)", fontFamily: "var(--font-mono)" }}>powered by claude · live</div>
        </div>
        <span style={{
          marginLeft: "auto",
          fontSize: 10.5,
          padding: "2px 8px",
          background: "color-mix(in srgb, var(--good) 15%, transparent)",
          color: "var(--good)",
          border: "1px solid color-mix(in srgb, var(--good) 30%, transparent)",
          borderRadius: 999,
          fontFamily: "var(--font-mono)",
          textTransform: "uppercase",
          letterSpacing: "0.06em",
        }}>online</span>
      </div>
      <div ref={scrollRef} style={{
        padding: 16,
        height: 200,
        overflowY: "auto",
        display: "flex",
        flexDirection: "column",
        gap: 10,
        fontSize: 13,
      }}>
        {msgs.map((m, i) => (
          <div key={i} style={{
            alignSelf: m.role === "user" ? "flex-end" : "flex-start",
            maxWidth: "85%",
            padding: "8px 12px",
            background: m.role === "user" ? "var(--accent)" : "var(--bg-elev)",
            color: m.role === "user" ? "white" : "var(--text)",
            border: m.role === "user" ? "none" : "1px solid var(--line)",
            borderRadius: 12,
            lineHeight: 1.5,
          }}>{m.text}</div>
        ))}
        {thinking && (
          <div style={{
            alignSelf: "flex-start",
            padding: "8px 12px",
            background: "var(--bg-elev)",
            border: "1px solid var(--line)",
            borderRadius: 12,
            display: "flex", gap: 4, alignItems: "center",
          }}>
            {[0,1,2].map(i => (
              <span key={i} style={{
                width: 5, height: 5, borderRadius: "50%",
                background: "var(--text-faint)",
                animation: `pulse-dot 1.2s ${i * 0.15}s infinite`,
              }} />
            ))}
          </div>
        )}
      </div>
      <form onSubmit={(e) => { e.preventDefault(); send(); }} style={{
        display: "flex",
        gap: 8,
        padding: 12,
        borderTop: "1px solid var(--line)",
        background: "var(--bg-elev)",
      }}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask about a project, stack, or timeline…"
          style={{
            flex: 1,
            background: "var(--bg-card)",
            color: "var(--text)",
            border: "1px solid var(--line)",
            borderRadius: 8,
            padding: "9px 12px",
            fontSize: 13,
            fontFamily: "inherit",
            outline: "none",
          }}
        />
        <button type="submit" style={{
          padding: "0 12px",
          background: "var(--text)",
          color: "var(--bg)",
          border: "none",
          borderRadius: 8,
          fontSize: 12,
          fontWeight: 500,
          display: "flex", alignItems: "center", gap: 6,
        }}><Icons.Send size={12} /></button>
      </form>
    </div>
  );
};

const Footer = () => {
  const D = PORTFOLIO_DATA;
  return (
    <footer style={{
      borderTop: "1px solid var(--line)",
      padding: "48px 0 32px",
    }}>
      <div className="container" style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flexWrap: "wrap",
        gap: 16,
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <Icons.Logo size={22} />
          <span style={{ fontSize: 13, color: "var(--text-dim)" }}>{D.brand.name} · {D.brand.domain}</span>
        </div>
        <div style={{ fontSize: 12, color: "var(--text-faint)", fontFamily: "var(--font-mono)" }}>
          © 2026 — Built with intent.
        </div>
      </div>
    </footer>
  );
};

window.Timeline = Timeline;
window.Contact = Contact;
window.Footer = Footer;
