// Projects — SaaS-card grid with featured first

const colorMap = {
  violet: { bg: "rgba(124, 92, 255, 0.08)", border: "rgba(124, 92, 255, 0.25)", text: "#a18bff" },
  cyan:   { bg: "rgba(0, 212, 255, 0.08)",  border: "rgba(0, 212, 255, 0.25)",  text: "#5ee0ff" },
  green:  { bg: "rgba(74, 222, 128, 0.08)", border: "rgba(74, 222, 128, 0.25)", text: "#7ee8a3" },
  amber:  { bg: "rgba(251, 191, 36, 0.08)", border: "rgba(251, 191, 36, 0.25)", text: "#fcd34d" },
};

const ProjectCard = ({ p }) => {
  const tint = colorMap[p.color] || colorMap.violet;
  const [hover, setHover] = React.useState(false);

  return (
    <article
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        position: "relative",
        gridColumn: "span 1",
        background: "var(--bg-card)",
        border: "1px solid var(--line)",
        borderRadius: 16,
        overflow: "hidden",
        cursor: "pointer",
        transition: "all 0.25s ease",
        transform: hover ? "translateY(-2px)" : "none",
        boxShadow: hover ? `0 24px 60px -20px ${tint.border}` : "none",
      }}>
      {/* hover sheen */}
      <div style={{
        position: "absolute",
        inset: 0,
        background: `radial-gradient(circle at 30% 0%, ${tint.bg}, transparent 60%)`,
        opacity: hover ? 1 : 0.5,
        transition: "opacity 0.25s",
        pointerEvents: "none",
      }} />

      {/* Decorative top — small visual specific to service type */}
      <div style={{
        position: "relative",
        height: 160,
        borderBottom: "1px solid var(--line)",
        overflow: "hidden",
        background: `linear-gradient(180deg, color-mix(in srgb, ${tint.text} 8%, var(--bg-card)), var(--bg-card))`,
      }}>
        <ProjectVisual id={p.id} tint={tint} hover={hover} />
        <div style={{
          position: "absolute",
          top: 16, left: 16,
          display: "flex",
          alignItems: "center",
          gap: 8,
          padding: "5px 10px",
          background: "color-mix(in srgb, var(--bg) 60%, transparent)",
          backdropFilter: "blur(6px)",
          border: `1px solid ${tint.border}`,
          borderRadius: 999,
          fontSize: 11,
          fontFamily: "var(--font-mono)",
          color: tint.text,
          textTransform: "uppercase",
          letterSpacing: "0.06em",
        }}>
          <span style={{ width: 6, height: 6, borderRadius: "50%", background: tint.text }} />
          {p.kind}
        </div>
        <div style={{
          position: "absolute",
          top: 16, right: 16,
          fontFamily: "var(--font-mono)",
          fontSize: 11,
          color: tint.text,
          padding: "2px 8px",
          background: tint.bg,
          border: `1px solid ${tint.border}`,
          borderRadius: 4,
        }}>{p.kind}</div>
      </div>

      <div style={{ padding: 24, position: "relative" }}>
        <h3 style={{
          margin: 0,
          fontSize: 20,
          fontWeight: 500,
          letterSpacing: "-0.02em",
        }}>{p.name}</h3>
        {p.nameBn && (
          <div style={{
            marginTop: 4,
            fontSize: 12,
            color: "var(--text-faint)",
            fontFamily: "var(--font-sans)",
          }}>{p.nameBn}</div>
        )}

        <p style={{
          marginTop: 12,
          marginBottom: 20,
          fontSize: 14,
          lineHeight: 1.55,
          color: "var(--text-dim)",
        }}>{p.description}</p>

        {/* Stack badges */}
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 20 }}>
          {p.stack.map(s => (
            <span key={s} style={{
              padding: "4px 10px",
              background: "var(--bg-elev)",
              border: "1px solid var(--line)",
              borderRadius: 6,
              fontFamily: "var(--font-mono)",
              fontSize: 11,
              color: "var(--text-dim)",
            }}>{s}</span>
          ))}
        </div>

        {/* Footer: impact + actions */}
        <div style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          paddingTop: 18,
          borderTop: "1px solid var(--line)",
          gap: 12,
        }}>
          <div>
            <div style={{
              fontSize: 18,
              fontWeight: 500,
              letterSpacing: "-0.01em",
              color: tint.text,
            }}>{p.impact.primary}</div>
            <div style={{
              marginTop: 2,
              fontSize: 11,
              fontFamily: "var(--font-mono)",
              color: "var(--text-faint)",
              textTransform: "uppercase",
              letterSpacing: "0.06em",
            }}>{p.impact.secondary}</div>
          </div>
          <div style={{ display: "flex", gap: 6 }}>
            <button style={{
              width: 34, height: 34,
              display: "grid", placeItems: "center",
              background: "transparent",
              border: "1px solid var(--line)",
              borderRadius: 8,
              color: "var(--text-dim)",
            }} title="GitHub"><Icons.Github size={14} /></button>
            {p.demo && (
              <a href={p.demo} target="_blank" rel="noopener noreferrer" style={{
                padding: "0 14px", height: 34,
                display: "inline-flex", alignItems: "center", gap: 6,
                background: "var(--text)",
                color: "var(--bg)",
                border: "none",
                borderRadius: 8,
                fontSize: 13,
                fontWeight: 500,
                textDecoration: "none",
                cursor: "pointer",
              }}>Demo <Icons.ArrowUpRight size={12} /></a>
            )}
          </div>
        </div>
      </div>
    </article>
  );
};

// Tiny SVG visual per service — gives each card a distinct "product preview"
const ProjectVisual = ({ id, tint, hover }) => {
  if (id === "ai-agent-automation") {
    return (
      <svg viewBox="0 0 600 220" style={{ width: "100%", height: "100%", position: "absolute", inset: 0 }}>
        <defs>
          <linearGradient id="aura-g" x1="0" x2="1">
            <stop stopColor={tint.text} stopOpacity="0.6"/>
            <stop offset="1" stopColor={tint.text} stopOpacity="0.05"/>
          </linearGradient>
        </defs>
        {/* nodes */}
        {[
          [120, 60], [220, 110], [320, 70], [420, 130], [500, 90],
          [180, 160], [280, 180], [380, 50], [460, 180],
        ].map(([x, y], i) => (
          <g key={i}>
            <circle cx={x} cy={y} r="4" fill={tint.text} opacity="0.9" />
            <circle cx={x} cy={y} r="14" fill={tint.text} opacity={hover ? 0.18 : 0.08}>
              <animate attributeName="r" from="4" to="22" dur={`${2 + i*0.3}s`} repeatCount="indefinite" />
              <animate attributeName="opacity" from="0.25" to="0" dur={`${2 + i*0.3}s`} repeatCount="indefinite" />
            </circle>
          </g>
        ))}
        {/* connectors */}
        <g stroke={tint.text} strokeOpacity="0.35" strokeWidth="1" fill="none">
          <path d="M120,60 L220,110 L320,70 L420,130 L500,90"/>
          <path d="M180,160 L280,180 L380,50 L460,180"/>
          <path d="M120,60 L180,160 M220,110 L280,180 M320,70 L380,50 M420,130 L460,180"/>
        </g>
      </svg>
    );
  }
  if (id === "scraping-data-pipeline") {
    // bar chart
    const bars = [40, 64, 52, 78, 92, 70, 110, 95, 130, 118, 142];
    return (
      <svg viewBox="0 0 600 160" style={{ width: "100%", height: "100%", position: "absolute", inset: 0 }} preserveAspectRatio="xMidYMid meet">
        {bars.map((h, i) => (
          <rect key={i} x={50 + i*45} y={150 - h} width="22" height={h} rx="3" fill={tint.text} opacity={0.4 + i*0.05}>
            <animate attributeName="height" from="0" to={h} dur="0.8s" begin={`${i*0.05}s`} fill="freeze" />
            <animate attributeName="y" from="150" to={150-h} dur="0.8s" begin={`${i*0.05}s`} fill="freeze" />
          </rect>
        ))}
        <line x1="40" y1="150" x2="580" y2="150" stroke={tint.border} />
      </svg>
    );
  }
  if (id === "web3-blockchain") {
    // chain dots
    const chains = ["ETH","ARB","OP","BASE","SOL","ZK","POL","BNB","AVAX","CELO","XLM","TRX"];
    return (
      <div style={{ position: "absolute", inset: 0, display: "grid", gridTemplateColumns: "repeat(6, 1fr)", padding: 24, gap: 8, alignContent: "center" }}>
        {chains.map((c, i) => (
          <div key={c} style={{
            padding: "8px 0",
            textAlign: "center",
            border: `1px solid ${tint.border}`,
            borderRadius: 6,
            fontFamily: "var(--font-mono)",
            fontSize: 11,
            color: tint.text,
            background: tint.bg,
            animation: `float-up 0.5s ${i*0.04}s both`,
          }}>{c}</div>
        ))}
      </div>
    );
  }
  if (id === "mt5-ea-trading") {
    // line chart
    return (
      <svg viewBox="0 0 600 160" style={{ width: "100%", height: "100%", position: "absolute", inset: 0 }}>
        <defs>
          <linearGradient id="ea-g" x1="0" y1="0" x2="0" y2="1">
            <stop stopColor={tint.text} stopOpacity="0.4"/>
            <stop offset="1" stopColor={tint.text} stopOpacity="0"/>
          </linearGradient>
        </defs>
        <path d="M0,110 L60,90 L120,100 L180,70 L240,80 L300,55 L360,70 L420,40 L480,55 L540,30 L600,45 L600,160 L0,160 Z" fill="url(#ea-g)" />
        <path d="M0,110 L60,90 L120,100 L180,70 L240,80 L300,55 L360,70 L420,40 L480,55 L540,30 L600,45" stroke={tint.text} strokeWidth="1.5" fill="none" />
        {[60,180,300,420,540].map((x, i) => (
          <circle key={i} cx={x} cy={[90,70,55,40,30][i]} r="3" fill={tint.text} />
        ))}
      </svg>
    );
  }
  if (id === "web-app-dev") {
    // schema → grid morph
    return (
      <svg viewBox="0 0 600 200" style={{ width: "100%", height: "100%", position: "absolute", inset: 0 }}>
        {/* schema box */}
        <g transform="translate(60, 50)">
          <rect width="160" height="100" rx="8" fill="none" stroke={tint.border} />
          {[20, 40, 60, 80].map(y => <line key={y} x1="12" y1={y} x2="148" y2={y} stroke={tint.border} strokeOpacity="0.5" strokeDasharray="2 2" />)}
          {[20, 40, 60, 80].map(y => <rect key={y} x="14" y={y-4} width="60" height="6" fill={tint.text} opacity="0.4" rx="1" />)}
        </g>
        {/* arrow */}
        <g transform="translate(240, 90)" stroke={tint.text} fill="none" strokeWidth="1.5">
          <line x1="0" y1="10" x2="80" y2="10" />
          <polyline points="70,4 80,10 70,16" />
        </g>
        {/* dashboard grid */}
        <g transform="translate(360, 30)">
          <rect width="200" height="140" rx="8" fill={tint.bg} stroke={tint.border} />
          <rect x="12" y="12" width="80" height="36" rx="4" fill={tint.text} opacity="0.5" />
          <rect x="100" y="12" width="88" height="36" rx="4" fill={tint.text} opacity="0.3" />
          <rect x="12" y="56" width="176" height="72" rx="4" fill={tint.text} opacity="0.18" />
        </g>
      </svg>
    );
  }
  if (id === "infra-devops") {
    // chat bubbles
    return (
      <div style={{ position: "absolute", inset: 0, padding: "20px 28px", display: "flex", flexDirection: "column", gap: 8, justifyContent: "center", fontFamily: "var(--font-mono)", fontSize: 11 }}>
        <div style={{ alignSelf: "flex-start", padding: "8px 12px", background: "var(--bg-elev)", border: "1px solid var(--line)", borderRadius: 12, color: "var(--text-dim)", maxWidth: "70%" }}>How do I rotate my API key?</div>
        <div style={{ alignSelf: "flex-end", padding: "8px 12px", background: tint.bg, border: `1px solid ${tint.border}`, borderRadius: 12, color: tint.text, maxWidth: "70%" }}>Settings → API → Rotate. New key live in &lt;5s.</div>
        <div style={{ alignSelf: "flex-start", padding: "8px 12px", background: "var(--bg-elev)", border: "1px solid var(--line)", borderRadius: 12, color: "var(--text-dim)", maxWidth: "70%", display: "flex", gap: 4, alignItems: "center" }}>
          <span style={{ width: 4, height: 4, borderRadius: "50%", background: "var(--text-dim)", animation: "pulse-dot 1.2s infinite" }} />
          <span style={{ width: 4, height: 4, borderRadius: "50%", background: "var(--text-dim)", animation: "pulse-dot 1.2s 0.2s infinite" }} />
          <span style={{ width: 4, height: 4, borderRadius: "50%", background: "var(--text-dim)", animation: "pulse-dot 1.2s 0.4s infinite" }} />
        </div>
      </div>
    );
  }
  return null;
};

const Projects = () => {
  const D = PORTFOLIO_DATA;
  return (
    <section id="work" style={{ padding: "120px 0", borderTop: "1px solid var(--line)" }}>
      <div className="container">
        <SectionHeader
          eyebrow="What we build"
          num="03 / 06"
          title={<>Six services. One team. All <span style={{ fontFamily: "var(--font-serif)", fontStyle: "italic", fontWeight: 400 }}>production-grade</span>.</>}
          sub="From landing pages to AI agent runtimes — we take your idea from spec to live deployment."
        />

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          gap: 16,
        }} className="proj-grid">
          {D.services.map(p => <ProjectCard key={p.id} p={p} />)}
        </div>

        <style>{`
          @media (max-width: 880px) {
            .proj-grid { grid-template-columns: 1fr !important; }
            .proj-grid > article { grid-column: span 1 !important; }
          }
        `}</style>
      </div>
    </section>
  );
};

window.Projects = Projects;
