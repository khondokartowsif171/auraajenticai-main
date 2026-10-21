// Hero — flowing terminal/code background + bold headline
const TerminalRain = () => {
  // A column of streaming code lines that drift upward forever.
  // Two columns offset so the loop is seamless.
  const lines = React.useMemo(() => {
    const samples = [
      "import { Agent } from '@aura/runtime'",
      "export const triage = new Agent({",
      "  model: 'claude-sonnet-4.5',",
      "  tools: [postgres, slack, stripe],",
      "  policy: 'tier-1-support',",
      "})",
      "",
      "// orchestrator.ts",
      "const run = await graph.invoke({",
      "  task: 'reconcile payouts',",
      "  context: { day: '2026-04-26' },",
      "})",
      "",
      "→ tool.call postgres.query  ok  42ms",
      "→ tool.call math.stats       ok   8ms",
      "→ tool.call slack.notify     ok  120ms",
      "✓ run completed   tokens=8412   $0.083",
      "",
      "contract Settlement {",
      "  function release(address to, uint256 amt)",
      "    external onlyOwner returns (bool) {",
      "    require(escrow[to] >= amt, 'insufficient');",
      "    escrow[to] -= amt;",
      "    payable(to).transfer(amt);",
      "    emit Released(to, amt, block.timestamp);",
      "    return true;",
      "  }",
      "}",
      "",
      "[runtime] cold-start agent pool …",
      "[runtime] 24 agents warmed in 312ms",
      "[runtime] queue depth=0  p50=84ms  p99=410ms",
      "",
      "POST /v1/runs                201 Created",
      "GET  /v1/runs/run_8af3e2     200 OK",
      "POST /v1/tools/register      201 Created",
    ];
    return [...samples, ...samples];
  }, []);

  const colorFor = (line) => {
    if (line.startsWith("//")) return "var(--text-faint)";
    if (line.startsWith("→")) return "var(--accent-2)";
    if (line.startsWith("✓")) return "var(--good)";
    if (line.startsWith("[runtime]")) return "var(--text-faint)";
    if (line.match(/^(POST|GET|PUT|DELETE)/)) return "var(--accent)";
    if (line.match(/^(import|export|const|function|return|contract|require|emit)/)) return "var(--accent)";
    return "var(--text-dim)";
  };

  return (
    <div aria-hidden="true" style={{
      position: "absolute",
      inset: 0,
      overflow: "hidden",
      pointerEvents: "none",
      maskImage: "radial-gradient(ellipse 90% 70% at 50% 40%, black 35%, transparent 75%)",
      WebkitMaskImage: "radial-gradient(ellipse 90% 70% at 50% 40%, black 35%, transparent 75%)",
      opacity: 0.55,
    }}>
      {/* faint grid */}
      <div style={{
        position: "absolute",
        inset: 0,
        backgroundImage: `
          linear-gradient(var(--line) 1px, transparent 1px),
          linear-gradient(90deg, var(--line) 1px, transparent 1px)
        `,
        backgroundSize: "60px 60px",
        opacity: 0.5,
      }} />

      {/* streaming columns */}
      {[0, 1, 2].map(col => (
        <div key={col} style={{
          position: "absolute",
          top: 0,
          left: `${15 + col * 28}%`,
          width: 320,
          fontFamily: "var(--font-mono)",
          fontSize: 11.5,
          lineHeight: 1.9,
          animation: `scroll-y ${28 + col * 6}s linear infinite`,
          animationDelay: `${col * -8}s`,
        }}>
          {lines.map((l, i) => (
            <div key={i} style={{
              color: colorFor(l),
              opacity: 0.7 + (Math.sin((i + col * 7) * 0.7) * 0.3),
              whiteSpace: "pre",
            }}>{l || "\u00A0"}</div>
          ))}
        </div>
      ))}

      {/* accent glow blobs */}
      <div style={{
        position: "absolute",
        top: "20%", left: "10%",
        width: 400, height: 400,
        borderRadius: "50%",
        background: "radial-gradient(circle, var(--accent-glow), transparent 70%)",
        filter: "blur(40px)",
      }} />
      <div style={{
        position: "absolute",
        bottom: "10%", right: "8%",
        width: 500, height: 500,
        borderRadius: "50%",
        background: "radial-gradient(circle, color-mix(in srgb, var(--accent-2) 20%, transparent), transparent 70%)",
        filter: "blur(60px)",
      }} />
    </div>
  );
};

const HERO_TXT = {
  en: {
    pill: "Accepting new projects · Q3 2026",
    getStarted: "Get Started Free",
    viewServices: "View Services",
    lastShipped: "Last shipped: 2 days ago",
  },
  bn: {
    pill: "নতুন প্রজেক্ট নেওয়া হচ্ছে · Q3 2026",
    getStarted: "ফ্রি শুরু করুন",
    viewServices: "সার্ভিস দেখুন",
    lastShipped: "সর্বশেষ শিপড: ২ দিন আগে",
  },
};

// Same self-serve destination as the nav's "Get Started" -- lands a fresh signup straight on the
// client portal's service catalog instead of a blank dashboard.
const HERO_REGISTER_URL = "https://auth.auraajenticai.cloud/register?next=" + encodeURIComponent("https://client.auraajenticai.cloud/services");

// Dynamic Site Links Hook — seamlessly reads from Aura Admin Dashboard Control Center
const useDynamicLinks = () => {
  const [links, setLinks] = React.useState({
    google: "https://cloud.google.com/find-a-partner/partner/aura-ajentic-ai",
    meta: null, // null activates the interactive in-app verification modal
    courier: "https://courier.auraajenticai.cloud",
  });

  React.useEffect(() => {
    const ctrl = new AbortController();
    fetch("https://aura.auraajenticai.cloud/api/public/links?page=home", {
      signal: ctrl.signal,
    })
      .then((res) => (res.ok ? res.json() : []))
      .then((data) => {
        if (!Array.isArray(data) || data.length === 0) return;
        const updated = {};
        data.forEach((item) => {
          const l = (item.label || "").toLowerCase();
          if (l.includes("google")) updated.google = item.url;
          if (l.includes("meta")) updated.meta = item.url;
          if (l.includes("courier") || l.includes("mcp")) updated.courier = item.url;
        });
        setLinks((prev) => ({ ...prev, ...updated }));
      })
      .catch(() => {
        // Safe transparent fallback to official defaults
      });
    return () => ctrl.abort();
  }, []);

  return links;
};

const Hero = ({ headlinePrefix, headlineSuffix, lang = "en" }) => {
  const D = PORTFOLIO_DATA;
  const prefix = headlinePrefix || "Agentic AI &";
  const suffix = headlineSuffix || "automation engineer";
  const t = HERO_TXT[lang] || HERO_TXT.en;

  const dynamicLinks = useDynamicLinks();
  const [metaModalOpen, setMetaModalOpen] = React.useState(false);

  // Close modal on Escape key
  React.useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") setMetaModalOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <section id="top" style={{
      position: "relative",
      minHeight: "100vh",
      paddingTop: 96,
      paddingBottom: 80,
      display: "flex",
      alignItems: "center",
      overflow: "hidden",
    }}>
      <TerminalRain />

      <div className="container" style={{ position: "relative", zIndex: 1 }}>
        {/* status pill */}
        <div style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 10,
          padding: "6px 12px 6px 10px",
          background: "color-mix(in srgb, var(--bg-card) 80%, transparent)",
          border: "1px solid var(--line)",
          backdropFilter: "blur(6px)",
          borderRadius: 999,
          fontSize: 12.5,
          color: "var(--text-dim)",
          marginBottom: 32,
        }}>
          <span style={{
            width: 7, height: 7, borderRadius: "50%",
            background: "var(--good)",
            boxShadow: "0 0 10px var(--good)",
            animation: "pulse-dot 2s infinite",
          }} />
          {t.pill}
        </div>

        {/* headline */}
        <h1 style={{
          fontFamily: "var(--font-sans)",
          fontSize: "clamp(44px, 7.2vw, 96px)",
          fontWeight: 500,
          lineHeight: 0.98,
          letterSpacing: "-0.04em",
          margin: 0,
          maxWidth: 980,
        }}>
          {prefix}<br/>
          <span style={{ fontFamily: "var(--font-serif)", fontStyle: "italic", fontWeight: 400 }}>full-stack</span>{" "}
          <span style={{
            background: "linear-gradient(110deg, var(--accent), var(--accent-2))",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}>{suffix}</span>.
        </h1>

        {/* sub */}
        <p style={{
          marginTop: 28,
          maxWidth: 620,
          fontSize: 18,
          lineHeight: 1.55,
          color: "var(--text-dim)",
        }}>
          {lang === "bn" ? D.brand.taglineBn : D.brand.tagline}
        </p>

        {/* CTAs */}
        <div style={{ display: "flex", gap: 12, marginTop: 40, flexWrap: "wrap" }}>
          <a href={HERO_REGISTER_URL} style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            padding: "12px 20px",
            background: "linear-gradient(110deg, var(--accent), var(--accent-2))",
            color: "#fff",
            fontSize: 14,
            fontWeight: 500,
            borderRadius: 10,
            textDecoration: "none",
            transition: "transform 0.15s",
          }}
            onMouseEnter={e => e.currentTarget.style.transform = "translateY(-1px)"}
            onMouseLeave={e => e.currentTarget.style.transform = "none"}
          >
            {t.getStarted} <Icons.Arrow size={14} />
          </a>
          <a href="#work" style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            padding: "12px 20px",
            background: "transparent",
            color: "var(--text)",
            fontSize: 14,
            fontWeight: 500,
            border: "1px solid var(--line-strong)",
            borderRadius: 10,
            textDecoration: "none",
          }}>
            {t.viewServices} <Icons.ArrowUpRight size={14} />
          </a>
        </div>

        {/* tiny meta row */}
        <div style={{
          display: "flex",
          gap: 28,
          marginTop: 80,
          flexWrap: "wrap",
          fontSize: 12.5,
          color: "var(--text-faint)",
          fontFamily: "var(--font-mono)",
        }}>
          <span>{D.brand.location}</span>
          <span>·</span>
          <span>{D.brand.domain}</span>
          <span>·</span>
          <span>{t.lastShipped}</span>
        </div>

        {/* metric strip: 4 Pillars of Aura Tech Infrastructure */}
        <div style={{
          marginTop: 56,
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: 0,
          borderTop: "1px solid var(--line)",
          borderBottom: "1px solid var(--line)",
        }} className="metric-strip">

          {/* Column 1: Google Cloud Partner Advantage */}
          <a 
            href={dynamicLinks.google}
            target="_blank" 
            rel="noopener noreferrer"
            style={{
              padding: "24px 20px",
              borderRight: "1px solid var(--line)",
              textDecoration: "none",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              background: "rgba(37, 132, 252, 0.03)",
              transition: "background 0.2s",
            }}
            onMouseEnter={e => e.currentTarget.style.background = "rgba(37, 132, 252, 0.08)"}
            onMouseLeave={e => e.currentTarget.style.background = "rgba(37, 132, 252, 0.03)"}
          >
            <div style={{
              background: "#ffffff",
              padding: "8px 18px",
              borderRadius: "9px",
              display: "inline-flex",
              alignItems: "center",
              width: "fit-content",
              maxWidth: "100%",
              marginBottom: "10px",
              boxShadow: "0 3px 12px rgba(0, 0, 0, 0.22)",
            }}>
              <img 
                src="/google_cloud_partner_advantage_badge.svg" 
                alt="Google Cloud Partner Advantage"
                style={{ height: "38px", maxWidth: "100%", width: "auto", display: "block" }} 
              />
            </div>
            <div style={{
              fontSize: "11.5px",
              color: "var(--text-faint)",
              fontFamily: "var(--font-mono)",
              textTransform: "uppercase",
              letterSpacing: "0.06em",
              marginTop: "4px",
            }}>
              Google Cloud Partner <span style={{ color: "var(--accent)" }}>↗</span>
            </div>
          </a>

          {/* Column 2: Meta Official Tech Provider (Symmetric Arrow + Verification Modal) */}
          <a 
            href={dynamicLinks.meta || "#meta-verification"}
            onClick={(e) => {
              if (!dynamicLinks.meta) {
                e.preventDefault();
                setMetaModalOpen(true);
              }
            }}
            target={dynamicLinks.meta ? "_blank" : undefined}
            rel="noopener noreferrer"
            style={{
              padding: "24px 20px",
              borderRight: "1px solid var(--line)",
              textDecoration: "none",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              background: "rgba(6, 104, 225, 0.03)",
              cursor: "pointer",
              transition: "background 0.2s",
            }}
            onMouseEnter={e => e.currentTarget.style.background = "rgba(6, 104, 225, 0.08)"}
            onMouseLeave={e => e.currentTarget.style.background = "rgba(6, 104, 225, 0.03)"}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "6px" }}>
              <svg viewBox="0 0 100 100" style={{ height: "22px", width: "auto", display: "block" }} fill="#0668E1">
                <path d="M49.999 59.832c-6.84 0-12.87-4.63-14.72-11.31-.83-3.02-.75-6.2.24-9.17 1.83-5.53 6.94-9.33 12.8-9.52 7.04-.22 13.06 4.34 14.7 11.09.83 3.4.67 6.95-.47 10.27-1.8 5.25-6.52 8.64-12.55 8.64zm35.29-37.45C76.999 13.9 66.86 9.87 56.63 10.74c-12.22 1.05-22.95 8.89-27.42 20.06-2.52 6.28-3.07 13.14-1.58 19.74 2.82 12.5 12.79 21.99 25.39 24.16 8.52 1.47 17.2-.18 24.58-4.66 4.96-3.02 9.07-7.25 11.96-12.31l-14.76-8.52c-1.53 2.68-3.7 4.93-6.33 6.53-3.9 2.37-8.49 3.25-13 2.47-6.68-1.16-11.99-6.22-13.49-12.87-.79-3.5-.5-7.14.84-10.48 2.37-5.92 8.05-10.07 14.52-10.63 5.42-.46 10.79 1.67 14.73 5.84 2.67 2.83 4.41 6.38 5.04 10.26l17.02-3.15c-1.2-7.39-4.5-14.16-9.56-19.57z"/>
              </svg>
              <span style={{ fontSize: "clamp(20px, 2.4vw, 24px)", fontWeight: 600, color: "#ffffff", letterSpacing: "-0.02em" }}>Meta</span>
            </div>
            <div style={{
              fontSize: "11.5px",
              color: "var(--text-faint)",
              fontFamily: "var(--font-mono)",
              textTransform: "uppercase",
              letterSpacing: "0.06em",
              marginTop: "4px",
            }}>
              Official Tech Provider <span style={{ color: "var(--accent)" }}>↗</span>
            </div>
          </a>

          {/* Column 3: 4-in-1 BD's 1st Aura Courier MCP */}
          <a 
            href={dynamicLinks.courier} 
            target="_blank" 
            rel="noopener noreferrer"
            style={{
              padding: "24px 20px",
              borderRight: "1px solid var(--line)",
              textDecoration: "none",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              transition: "background 0.2s",
            }}
            onMouseEnter={e => e.currentTarget.style.background = "rgba(255, 255, 255, 0.03)"}
            onMouseLeave={e => e.currentTarget.style.background = "transparent"}
          >
            <div style={{
              fontSize: "clamp(28px, 3.4vw, 40px)",
              fontWeight: 500,
              letterSpacing: "-0.02em",
              lineHeight: 1,
              color: "#ffffff",
            }}>4-in-1</div>
            <div style={{
              marginTop: 8,
              fontSize: "11.5px",
              color: "var(--text-faint)",
              fontFamily: "var(--font-mono)",
              textTransform: "uppercase",
              letterSpacing: "0.05em",
              lineHeight: 1.4,
            }}>
              <span style={{ color: "var(--accent)", fontWeight: 600 }}>BD's 1st</span> Aura Courier MCP
            </div>
          </a>

          {/* Column 4: 24/7 Autonomous Agentic Workforce */}
          <div style={{
            padding: "24px 20px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{
                fontSize: "clamp(28px, 3.4vw, 40px)",
                fontWeight: 500,
                letterSpacing: "-0.02em",
                lineHeight: 1,
                color: "#ffffff",
              }}>24/7</span>
              <span style={{
                display: "inline-block",
                width: 8,
                height: 8,
                borderRadius: "50%",
                background: "#34A853",
                boxShadow: "0 0 8px #34A853",
              }} />
            </div>
            <div style={{
              marginTop: 8,
              fontSize: 12,
              color: "var(--text-faint)",
              fontFamily: "var(--font-mono)",
              textTransform: "uppercase",
              letterSpacing: "0.06em",
            }}>
              Autonomous Agentic Workforce
            </div>
          </div>

        </div>

        <style>{`
          @media (max-width: 720px) {
            .metric-strip { grid-template-columns: repeat(2, 1fr) !important; }
            .metric-strip > a:nth-child(2) { border-right: none !important; }
            .metric-strip > a:nth-child(1), .metric-strip > a:nth-child(2) {
              border-bottom: 1px solid var(--line);
            }
          }
        `}</style>

        {/* Interactive Meta Verification In-App Modal */}
        {metaModalOpen && (
          <div 
            onClick={() => setMetaModalOpen(false)}
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 999999,
              background: "rgba(5, 7, 13, 0.78)",
              backdropFilter: "blur(12px)",
              WebkitBackdropFilter: "blur(12px)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: 20,
              animation: "fadeIn 0.2s ease-out",
            }}
          >
            <div 
              onClick={(e) => e.stopPropagation()}
              style={{
                background: "linear-gradient(145deg, rgba(20, 24, 33, 0.96), rgba(13, 16, 23, 0.98))",
                border: "1px solid rgba(255, 255, 255, 0.12)",
                borderRadius: 18,
                maxWidth: 620,
                width: "100%",
                boxShadow: "0 25px 60px -15px rgba(0, 0, 0, 0.8), 0 0 40px rgba(6, 104, 225, 0.15)",
                overflow: "hidden",
                fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
                color: "#f1f5f9",
              }}
            >
              {/* Top Accent Gradient Bar */}
              <div style={{ height: 4, background: "linear-gradient(90deg, #0668E1, #00C6FF, #0668E1)" }} />

              {/* Modal Header */}
              <div style={{
                padding: "24px 28px 20px",
                borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
                display: "flex",
                alignItems: "flex-start",
                justifyContent: "space-between",
                gap: 16,
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                  <div style={{
                    width: 44,
                    height: 44,
                    borderRadius: 12,
                    background: "rgba(6, 104, 225, 0.12)",
                    border: "1px solid rgba(6, 104, 225, 0.3)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}>
                    <svg viewBox="0 0 100 100" style={{ height: 24, width: "auto" }} fill="#0668E1">
                      <path d="M49.999 59.832c-6.84 0-12.87-4.63-14.72-11.31-.83-3.02-.75-6.2.24-9.17 1.83-5.53 6.94-9.33 12.8-9.52 7.04-.22 13.06 4.34 14.7 11.09.83 3.4.67 6.95-.47 10.27-1.8 5.25-6.52 8.64-12.55 8.64zm35.29-37.45C76.999 13.9 66.86 9.87 56.63 10.74c-12.22 1.05-22.95 8.89-27.42 20.06-2.52 6.28-3.07 13.14-1.58 19.74 2.82 12.5 12.79 21.99 25.39 24.16 8.52 1.47 17.2-.18 24.58-4.66 4.96-3.02 9.07-7.25 11.96-12.31l-14.76-8.52c-1.53 2.68-3.7 4.93-6.33 6.53-3.9 2.37-8.49 3.25-13 2.47-6.68-1.16-11.99-6.22-13.49-12.87-.79-3.5-.5-7.14.84-10.48 2.37-5.92 8.05-10.07 14.52-10.63 5.42-.46 10.79 1.67 14.73 5.84 2.67 2.83 4.41 6.38 5.04 10.26l17.02-3.15c-1.2-7.39-4.5-14.16-9.56-19.57z"/>
                    </svg>
                  </div>
                  <div>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <h3 style={{ margin: 0, fontSize: 19, fontWeight: 600, color: "#ffffff", letterSpacing: "-0.01em" }}>
                        Meta Verified Tech Provider
                      </h3>
                      <span style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: 4,
                        background: "rgba(16, 185, 129, 0.15)",
                        border: "1px solid rgba(16, 185, 129, 0.4)",
                        color: "#34d399",
                        fontSize: 11,
                        fontWeight: 600,
                        padding: "2px 8px",
                        borderRadius: 9999,
                      }}>
                        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                        VERIFIED
                      </span>
                    </div>
                    <p style={{ margin: "3px 0 0", fontSize: 13, color: "#94a3b8" }}>
                      Official Meta Developer Platform Verification Record
                    </p>
                  </div>
                </div>
                <button 
                  onClick={() => setMetaModalOpen(false)}
                  style={{
                    background: "rgba(255, 255, 255, 0.06)",
                    border: "1px solid rgba(255, 255, 255, 0.1)",
                    color: "#94a3b8",
                    width: 32,
                    height: 32,
                    borderRadius: 8,
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 16,
                  }}
                >✕</button>
              </div>

              {/* Modal Body */}
              <div style={{ padding: "24px 28px" }}>
                {/* Status Box from Meta Developer Dashboard */}
                <div style={{
                  background: "rgba(6, 104, 225, 0.08)",
                  border: "1px solid rgba(6, 104, 225, 0.25)",
                  borderRadius: 12,
                  padding: "16px 18px",
                  marginBottom: 20,
                }}>
                  <div style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
                    <div style={{
                      width: 28,
                      height: 28,
                      borderRadius: "50%",
                      background: "#0668E1",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                      color: "#ffffff",
                      marginTop: 1,
                    }}>
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                    </div>
                    <div>
                      <div style={{ fontSize: "14.5px", fontWeight: 600, color: "#ffffff", lineHeight: 1.4 }}>
                        Your business was verified as a Tech Provider.
                      </div>
                      <div style={{ fontSize: "12.5px", color: "#cbd5e1", marginTop: 4, lineHeight: 1.5 }}>
                        Meta Developer Access Verification confirms that <strong style={{ color: "#60a5fa" }}>Aura Agentic AI</strong> is officially approved to deploy client messaging solutions, WhatsApp Cloud API integrations, and AI automation on behalf of businesses.
                      </div>
                    </div>
                  </div>
                </div>

                {/* Verification Key Details Grid */}
                <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 12, marginBottom: 20 }}>
                  <div style={{ background: "rgba(255, 255, 255, 0.03)", border: "1px solid rgba(255, 255, 255, 0.07)", borderRadius: 10, padding: "12px 14px" }}>
                    <div style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: "0.06em", color: "#64748b", fontFamily: "monospace" }}>Registered App ID</div>
                    <div style={{ fontSize: 15, fontWeight: 600, color: "#f8fafc", marginTop: 4, fontFamily: "monospace", letterSpacing: "0.02em" }}>950490494806230</div>
                  </div>

                  <div style={{ background: "rgba(255, 255, 255, 0.03)", border: "1px solid rgba(255, 255, 255, 0.07)", borderRadius: 10, padding: "12px 14px" }}>
                    <div style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: "0.06em", color: "#64748b", fontFamily: "monospace" }}>Verification Tier</div>
                    <div style={{ fontSize: "14.5px", fontWeight: 600, color: "#38bdf8", marginTop: 4 }}>Tech Provider (Direct Access)</div>
                  </div>

                  <div style={{ background: "rgba(255, 255, 255, 0.03)", border: "1px solid rgba(255, 255, 255, 0.07)", borderRadius: 10, padding: "12px 14px" }}>
                    <div style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: "0.06em", color: "#64748b", fontFamily: "monospace" }}>Authorized Submitter</div>
                    <div style={{ fontSize: "14.5px", fontWeight: 600, color: "#f8fafc", marginTop: 4 }}>A. I. Redwan</div>
                  </div>

                  <div style={{ background: "rgba(255, 255, 255, 0.03)", border: "1px solid rgba(255, 255, 255, 0.07)", borderRadius: 10, padding: "12px 14px" }}>
                    <div style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: "0.06em", color: "#64748b", fontFamily: "monospace" }}>Verified Date</div>
                    <div style={{ fontSize: "14.5px", fontWeight: 600, color: "#f8fafc", marginTop: 4 }}>August 2, 2026</div>
                  </div>
                </div>

                {/* Authorized Capabilities */}
                <div>
                  <div style={{ fontSize: "11.5px", textTransform: "uppercase", letterSpacing: "0.06em", color: "#94a3b8", fontWeight: 600, marginBottom: 10 }}>
                    Approved Meta Solutions & API Capabilities:
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 13, color: "#e2e8f0", background: "rgba(255, 255, 255, 0.02)", padding: "8px 12px", borderRadius: 8, border: "1px solid rgba(255, 255, 255, 0.05)" }}>
                      <span style={{ color: "#25D366", fontSize: 15 }}>💬</span>
                      <span><strong>WhatsApp Business Cloud API:</strong> Co-Management, On-Behalf-Of Embedded Onboarding & 24/7 AI Sales</span>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 13, color: "#e2e8f0", background: "rgba(255, 255, 255, 0.02)", padding: "8px 12px", borderRadius: 8, border: "1px solid rgba(255, 255, 255, 0.05)" }}>
                      <span style={{ color: "#0084FF", fontSize: 15 }}>⚡</span>
                      <span><strong>Meta Messenger Platform:</strong> Omnichannel Multi-Tenant Ingestion, Live Auto-Replies & Order Handover</span>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 13, color: "#e2e8f0", background: "rgba(255, 255, 255, 0.02)", padding: "8px 12px", borderRadius: 8, border: "1px solid rgba(255, 255, 255, 0.05)" }}>
                      <span style={{ color: "#E1306C", fontSize: 15 }}>📸</span>
                      <span><strong>Instagram Graph API:</strong> D2C Direct Message Automation & High-Ticket Lead Triage</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Modal Footer */}
              <div style={{
                padding: "16px 28px 20px",
                background: "rgba(0, 0, 0, 0.25)",
                borderTop: "1px solid rgba(255, 255, 255, 0.06)",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: 12,
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 12, color: "#64748b" }}>
                  <span>Dual Tech Partner:</span>
                  <a href="https://cloud.google.com/find-a-partner/partner/aura-ajentic-ai" target="_blank" rel="noopener noreferrer" style={{ color: "#38bdf8", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 3 }}>
                    Google Cloud Partner ↗
                  </a>
                </div>
                <button 
                  onClick={() => setMetaModalOpen(false)}
                  style={{
                    background: "#0668E1",
                    border: "none",
                    color: "#ffffff",
                    fontSize: 13,
                    fontWeight: 500,
                    padding: "8px 20px",
                    borderRadius: 8,
                    cursor: "pointer",
                  }}
                >
                  Done
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};

window.Hero = Hero;
