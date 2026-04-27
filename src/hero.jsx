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

const Hero = ({ headlinePrefix, headlineSuffix, lang = "en" }) => {
  const D = PORTFOLIO_DATA;
  const prefix = headlinePrefix || "Agentic AI &";
  const suffix = headlineSuffix || "automation engineer";

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
          Accepting new projects · Q3 2026
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
          {D.brand.tagline}
        </p>
        <p style={{
          marginTop: 8,
          maxWidth: 620,
          fontSize: 14,
          lineHeight: 1.6,
          color: "var(--text-faint)",
          fontFamily: "var(--font-sans)",
        }}>
          {D.brand.taglineBn}
        </p>

        {/* CTAs */}
        <div style={{ display: "flex", gap: 12, marginTop: 40, flexWrap: "wrap" }}>
          <a href="#work" style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            padding: "12px 20px",
            background: "var(--text)",
            color: "var(--bg)",
            fontSize: 14,
            fontWeight: 500,
            borderRadius: 10,
            transition: "transform 0.15s",
          }}
            onMouseEnter={e => e.currentTarget.style.transform = "translateY(-1px)"}
            onMouseLeave={e => e.currentTarget.style.transform = "none"}
          >
            View Services <Icons.Arrow size={14} />
          </a>
          <a href="#contact" style={{
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
            Get a Quote <Icons.ArrowUpRight size={14} />
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
          <span>Last shipped: 2 days ago</span>
        </div>

        {/* metric strip */}
        <div style={{
          marginTop: 56,
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: 0,
          borderTop: "1px solid var(--line)",
          borderBottom: "1px solid var(--line)",
        }} className="metric-strip">
          {D.metrics.map((m, i) => (
            <div key={m.label} style={{
              padding: "24px 20px",
              borderRight: i < D.metrics.length - 1 ? "1px solid var(--line)" : "none",
            }}>
              <div style={{
                fontSize: "clamp(28px, 3.4vw, 40px)",
                fontWeight: 500,
                letterSpacing: "-0.02em",
                lineHeight: 1,
              }}>{m.value}</div>
              <div style={{
                marginTop: 8,
                fontSize: 12,
                color: "var(--text-faint)",
                fontFamily: "var(--font-mono)",
                textTransform: "uppercase",
                letterSpacing: "0.06em",
              }}>{m.label}</div>
            </div>
          ))}
        </div>

        <style>{`
          @media (max-width: 720px) {
            .metric-strip { grid-template-columns: repeat(2, 1fr) !important; }
            .metric-strip > div:nth-child(2) { border-right: none !important; }
            .metric-strip > div:nth-child(1), .metric-strip > div:nth-child(2) {
              border-bottom: 1px solid var(--line);
            }
          }
        `}</style>
      </div>
    </section>
  );
};

window.Hero = Hero;
