// Root app: theme + ⌘K + Tweaks + scroll reveal

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "accent": "#7c5cff",
  "accent2": "#00d4ff",
  "density": "spacious",
  "heroHeadlinePrefix": "Agentic AI &",
  "heroHeadlineSuffix": "automation engineer"
}/*EDITMODE-END*/;

function App() {
  const [theme, setTheme] = React.useState(() => {
    return localStorage.getItem("aura-theme") || "dark";
  });
  const [paletteOpen, setPaletteOpen] = React.useState(false);
  const [tweaks, setTweak] = window.useTweaks(TWEAK_DEFAULTS);
  const [lang, setLang] = React.useState(() => localStorage.getItem("aura-lang") || "en");

  React.useEffect(() => { localStorage.setItem("aura-lang", lang); }, [lang]);
  const toggleLang = () => setLang(l => l === "en" ? "bn" : "en");

  // theme
  React.useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem("aura-theme", theme);
  }, [theme]);

  const toggleTheme = () => setTheme(t => t === "dark" ? "light" : "dark");

  React.useEffect(() => {
    const onToggle = () => toggleTheme();
    window.addEventListener("aura:toggle-theme", onToggle);
    return () => window.removeEventListener("aura:toggle-theme", onToggle);
  }, []);

  // ⌘K
  React.useEffect(() => {
    const onKey = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setPaletteOpen(o => !o);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // tweaks accent vars — apply to :root
  React.useEffect(() => {
    document.documentElement.style.setProperty("--accent", tweaks.accent);
    document.documentElement.style.setProperty("--accent-2", tweaks.accent2);
    document.documentElement.style.setProperty("--accent-glow", tweaks.accent + "59"); // ~35% alpha
  }, [tweaks.accent, tweaks.accent2]);

  // density
  const density = tweaks.density;

  // scroll reveal
  React.useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    const io = new IntersectionObserver(entries => {
      entries.forEach(en => { if (en.isIntersecting) en.target.classList.add("in"); });
    }, { threshold: 0.1 });
    els.forEach(el => io.observe(el));
    return () => io.disconnect();
  }, []);

  const T = window;

  return (
    <>
      <T.Nav onCmdK={() => setPaletteOpen(true)} theme={theme} onToggleTheme={toggleTheme} lang={lang} onToggleLang={toggleLang} />
      <main style={density === "compact" ? { fontSize: 14.5 } : undefined}>
        <T.Hero headlinePrefix={tweaks.heroHeadlinePrefix} headlineSuffix={tweaks.heroHeadlineSuffix} lang={lang} />
        <T.About />
        <T.Skills />
        <T.Projects />
        <T.AgentShowcase />
        <T.Timeline />
        <T.Contact lang={lang} />
      </main>
      <T.Footer />

      <T.CommandPalette open={paletteOpen} onClose={() => setPaletteOpen(false)} />

      <window.TweaksPanel title="Tweaks">
        <window.TweakSection label="Theme" />
        <window.TweakRadio
          label="Mode"
          value={theme}
          onChange={v => setTheme(v)}
          options={["dark", "light"]}
        />

        <window.TweakSection label="Accent" />
        <window.TweakColor label="Primary" value={tweaks.accent} onChange={v => setTweak("accent", v)} />
        <window.TweakColor label="Secondary" value={tweaks.accent2} onChange={v => setTweak("accent2", v)} />
        <div style={{ display: "flex", gap: 4, flexWrap: "wrap", padding: "0 0 4px" }}>
          {[
            ["Violet", "#7c5cff", "#00d4ff"],
            ["Cyan", "#00d4ff", "#7c5cff"],
            ["Emerald", "#22c55e", "#7c5cff"],
            ["Sunset", "#ff6b35", "#fbbf24"],
            ["Mono", "#ffffff", "#a4a8b3"],
          ].map(([name, a, b]) => (
            <button key={name} onClick={() => setTweak({ accent: a, accent2: b })} style={{
              padding: "4px 8px",
              fontSize: 10.5,
              background: "transparent",
              border: "1px solid rgba(0,0,0,.12)",
              borderRadius: 5,
              color: "#29261b",
              display: "inline-flex", gap: 5, alignItems: "center",
              cursor: "pointer",
            }}>
              <span style={{ width: 9, height: 9, background: a, borderRadius: "50%", display: "inline-block" }} />
              {name}
            </button>
          ))}
        </div>

        <window.TweakSection label="Density" />
        <window.TweakRadio
          label="Layout"
          value={tweaks.density}
          onChange={v => setTweak("density", v)}
          options={["compact", "spacious"]}
        />

        <window.TweakSection label="Hero copy" />
        <window.TweakText label="Prefix" value={tweaks.heroHeadlinePrefix} onChange={v => setTweak("heroHeadlinePrefix", v)} />
        <window.TweakText label="Suffix" value={tweaks.heroHeadlineSuffix} onChange={v => setTweak("heroHeadlineSuffix", v)} />
      </window.TweaksPanel>
    </>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
