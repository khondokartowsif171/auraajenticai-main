// AI agent showcase — animated terminal "console replay" of an agent run

const AgentShowcase = () => {
  const D = PORTFOLIO_DATA;
  const run = D.agentRun;
  const totalDuration = run[run.length - 1].t + 1500;

  const [playing, setPlaying] = React.useState(true);
  const [elapsed, setElapsed] = React.useState(0);
  const [resetKey, setResetKey] = React.useState(0);

  React.useEffect(() => {
    if (!playing) return;
    let raf, start = performance.now() - elapsed;
    const tick = (now) => {
      const e = now - start;
      if (e >= totalDuration) {
        setElapsed(totalDuration);
        setPlaying(false);
        return;
      }
      setElapsed(e);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [playing, resetKey]);

  const visible = run.filter(r => r.t <= elapsed);
  const progress = Math.min(elapsed / totalDuration, 1);

  const restart = () => {
    setElapsed(0);
    setPlaying(true);
    setResetKey(k => k + 1);
  };

  const lineFor = (line, i) => {
    const styles = {
      system:  { prefix: "▸", color: "var(--text-faint)" },
      user:    { prefix: "❯", color: "var(--accent)" },
      thought: { prefix: "↪", color: "var(--text-dim)" },
      tool:    { prefix: "⌁", color: "var(--accent-2)" },
      output:  { prefix: "✓", color: "var(--good)" },
    };
    const s = styles[line.kind];
    return (
      <div key={i} style={{
        display: "grid",
        gridTemplateColumns: "20px 1fr",
        gap: 12,
        padding: "8px 0",
        borderBottom: i < visible.length - 1 ? "1px dashed var(--line)" : "none",
        animation: `float-up 0.35s both`,
      }}>
        <span style={{ color: s.color, fontWeight: 600 }}>{s.prefix}</span>
        <div>
          {line.kind === "tool" ? (
            <div>
              <div style={{ display: "flex", gap: 10, alignItems: "center", flexWrap: "wrap" }}>
                <span style={{
                  padding: "2px 8px",
                  background: "var(--bg-elev)",
                  border: "1px solid var(--line)",
                  borderRadius: 4,
                  fontSize: 11,
                  color: "var(--accent-2)",
                  fontWeight: 500,
                }}>{line.tool}</span>
                <span style={{
                  fontSize: 11,
                  color: "var(--good)",
                  fontFamily: "var(--font-mono)",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 4,
                }}>
                  <span style={{ width: 5, height: 5, borderRadius: "50%", background: "var(--good)" }} />
                  {line.status}
                </span>
                <span style={{ fontSize: 11, color: "var(--text-faint)" }}>{line.meta}</span>
              </div>
              <div style={{ marginTop: 6, color: "var(--text)", fontSize: 12.5 }}>{line.text}</div>
            </div>
          ) : (
            <span style={{
              color: line.kind === "user" || line.kind === "output" ? "var(--text)" : "var(--text-dim)",
              fontWeight: line.kind === "user" || line.kind === "output" ? 500 : 400,
              fontSize: line.kind === "system" ? 11.5 : 13,
            }}>{line.text}</span>
          )}
        </div>
      </div>
    );
  };

  return (
    <section id="agents" style={{ padding: "120px 0", borderTop: "1px solid var(--line)", position: "relative", overflow: "hidden" }}>
      {/* faint accent wash */}
      <div aria-hidden style={{
        position: "absolute",
        top: "30%", left: "50%",
        transform: "translateX(-50%)",
        width: 800, height: 400,
        background: "radial-gradient(ellipse, var(--accent-glow), transparent 70%)",
        filter: "blur(60px)",
        opacity: 0.6,
        pointerEvents: "none",
      }} />

      <div className="container" style={{ position: "relative" }}>
        <SectionHeader
          eyebrow="Agent runtime"
          num="04 / 06"
          title={<>What it actually <span style={{ fontFamily: "var(--font-serif)", fontStyle: "italic", fontWeight: 400 }}>looks like</span> when an agent does the work.</>}
          sub="Below is a real session replay — model decomposes a task, calls tools, and writes back. This is the surface every agent I ship gets out of the box: trace, evals, audit trail."
        />

        <div style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: 16, alignItems: "start" }} className="agent-grid">
          {/* Terminal */}
          <div className="panel" style={{ overflow: "hidden", fontFamily: "var(--font-mono)" }}>
            {/* chrome */}
            <div style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              padding: "12px 16px",
              borderBottom: "1px solid var(--line)",
              background: "var(--bg-elev)",
            }}>
              <div style={{ display: "flex", gap: 6 }}>
                <span style={{ width: 11, height: 11, borderRadius: "50%", background: "#ff5f56" }} />
                <span style={{ width: 11, height: 11, borderRadius: "50%", background: "#ffbd2e" }} />
                <span style={{ width: 11, height: 11, borderRadius: "50%", background: "#27c93f" }} />
              </div>
              <span style={{ fontSize: 11.5, color: "var(--text-faint)" }}>aura ▸ runtime ▸ run_8af3e2.replay</span>
              <span style={{ marginLeft: "auto", fontSize: 11, color: "var(--text-faint)" }}>{(elapsed/1000).toFixed(1)}s / {(totalDuration/1000).toFixed(1)}s</span>
            </div>

            {/* scanline progress */}
            <div style={{ height: 2, background: "var(--line)" }}>
              <div style={{
                width: `${progress * 100}%`,
                height: "100%",
                background: "linear-gradient(90deg, var(--accent), var(--accent-2))",
                transition: "width 0.1s linear",
              }} />
            </div>

            {/* body */}
            <div style={{ padding: "16px 20px", minHeight: 460, fontSize: 12.5 }}>
              {visible.map((l, i) => lineFor(l, i))}
              {playing && (
                <div style={{
                  display: "inline-block",
                  width: 8, height: 14,
                  background: "var(--accent)",
                  marginTop: 8,
                  animation: "blink 1s infinite",
                  verticalAlign: "middle",
                }} />
              )}
            </div>

            {/* controls */}
            <div style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              padding: "12px 16px",
              borderTop: "1px solid var(--line)",
              background: "var(--bg-elev)",
            }}>
              <button onClick={() => setPlaying(p => !p)} style={{
                padding: "6px 12px",
                background: "var(--text)",
                color: "var(--bg)",
                border: "none",
                borderRadius: 6,
                fontSize: 12,
                fontWeight: 500,
                fontFamily: "var(--font-sans)",
              }}>{playing ? "Pause" : (elapsed >= totalDuration ? "Replay" : "Play")}</button>
              <button onClick={restart} style={{
                padding: "6px 12px",
                background: "transparent",
                color: "var(--text-dim)",
                border: "1px solid var(--line)",
                borderRadius: 6,
                fontSize: 12,
                fontFamily: "var(--font-sans)",
              }}>Restart</button>
              <span style={{ marginLeft: "auto", fontSize: 11, color: "var(--text-faint)" }}>
                {visible.length} / {run.length} steps
              </span>
            </div>
          </div>

          {/* Sidebar: capabilities */}
          <div style={{ display: "grid", gap: 12 }}>
            {[
              { i: Icons.Layers, t: "Orchestration", d: "Durable graphs with retries, timeouts, and human-in-the-loop checkpoints." },
              { i: Icons.Cube, t: "Tool registry", d: "Typed tool catalog — Postgres, Stripe, Slack, custom HTTP, on-chain calls." },
              { i: Icons.Bolt, t: "Eval harness", d: "Golden datasets, regression suites, drift detection on every model swap." },
              { i: Icons.Database, t: "Audit trail", d: "Every step, prompt, and token logged. Replayable. Court-admissible." },
            ].map(({ i: I, t, d }) => (
              <div key={t} className="panel" style={{ padding: 20 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 10 }}>
                  <div style={{
                    width: 32, height: 32,
                    display: "grid", placeItems: "center",
                    background: "var(--accent-glow)",
                    border: "1px solid color-mix(in srgb, var(--accent) 30%, transparent)",
                    borderRadius: 8,
                    color: "var(--accent)",
                  }}><I size={15} /></div>
                  <span style={{ fontSize: 14.5, fontWeight: 500 }}>{t}</span>
                </div>
                <p style={{ margin: 0, fontSize: 13, lineHeight: 1.5, color: "var(--text-dim)" }}>{d}</p>
              </div>
            ))}
          </div>
        </div>

        <style>{`
          @media (max-width: 1000px) {
            .agent-grid { grid-template-columns: 1fr !important; }
          }
        `}</style>
      </div>
    </section>
  );
};

window.AgentShowcase = AgentShowcase;
