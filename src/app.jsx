// Root app: theme + ⌘K + Tweaks + hash router

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "accent": "#7c5cff",
  "accent2": "#00d4ff",
  "density": "spacious",
  "heroHeadlinePrefix": "Agentic AI &",
  "heroHeadlineSuffix": "automation engineer"
}/*EDITMODE-END*/;

// Simple hash router — reads window.location.hash
function useHashRoute() {
  const [route, setRoute] = React.useState(() => {
    const h = window.location.hash;
    return h.startsWith('#/') ? h.slice(2) : '';
  });

  React.useEffect(() => {
    const onHash = () => {
      const h = window.location.hash;
      const r = h.startsWith('#/') ? h.slice(2) : '';
      setRoute(r);
      window.scrollTo(0, 0);
    };
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);

  return route;
}

function App() {
  const [theme, setTheme] = React.useState(() => {
    return localStorage.getItem("aura-theme") || "dark";
  });
  const [paletteOpen, setPaletteOpen] = React.useState(false);
  const [tweaks, setTweak] = window.useTweaks(TWEAK_DEFAULTS);
  const [lang, setLang] = React.useState(() => localStorage.getItem("aura-lang") || "en");
  const route = useHashRoute();

  React.useEffect(() => { localStorage.setItem("aura-lang", lang); }, [lang]);
  const toggleLang = () => setLang(l => l === "en" ? "bn" : "en");

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

  React.useEffect(() => {
    document.documentElement.style.setProperty("--accent", tweaks.accent);
    document.documentElement.style.setProperty("--accent-2", tweaks.accent2);
    document.documentElement.style.setProperty("--accent-glow", tweaks.accent + "59");
  }, [tweaks.accent, tweaks.accent2]);

  // scroll reveal (re-run on route change)
  React.useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    const io = new IntersectionObserver(entries => {
      entries.forEach(en => { if (en.isIntersecting) en.target.classList.add("in"); });
    }, { threshold: 0.1 });
    els.forEach(el => io.observe(el));
    return () => io.disconnect();
  }, [route]);

  const density = tweaks.density;
  const T = window;

  const navProps = {
    onCmdK: () => setPaletteOpen(true),
    theme, onToggleTheme: toggleTheme,
    lang, onToggleLang: toggleLang,
    route,
  };

  const renderPage = () => {
    switch (route) {
      case 'services':
        return <T.ServicesPage lang={lang} />;
      case 'stack':
        return <T.StackPage />;
      case 'agents':
        return <T.AgentsPage />;
      case 'timeline':
        return <T.TimelinePage />;
      case 'contact':
        return <T.ContactPage lang={lang} />;
      case 'pricing':
        return <T.PricingPage />;
      case 'blog':
        return <T.BlogPage />;
      default:
        return (
          <main style={density === "compact" ? { fontSize: 14.5 } : undefined}>
            <T.Hero headlinePrefix={tweaks.heroHeadlinePrefix} headlineSuffix={tweaks.heroHeadlineSuffix} lang={lang} />
            <T.About />
            <T.Skills />
            <T.Projects />
            <T.AgentShowcase />
            <T.Testimonials />
            <T.Timeline />
            <T.Contact lang={lang} />
          </main>
        );
    }
  };

  return (
    <>
      <T.Nav {...navProps} />
      {renderPage()}
      <T.Footer />
      <T.CommandPalette open={paletteOpen} onClose={() => setPaletteOpen(false)} />
      <T.ChatboxWidget />

      <window.TweaksPanel title="Tweaks">
        <window.TweakSection label="Theme" />
        <window.TweakRadio label="Mode" value={theme} onChange={v => setTheme(v)} options={["dark", "light"]} />
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
              padding: "4px 8px", fontSize: 10.5, background: "transparent",
              border: "1px solid rgba(0,0,0,.12)", borderRadius: 5, color: "#29261b",
              display: "inline-flex", gap: 5, alignItems: "center", cursor: "pointer",
            }}>
              <span style={{ width: 9, height: 9, background: a, borderRadius: "50%", display: "inline-block" }} />
              {name}
            </button>
          ))}
        </div>
        <window.TweakSection label="Density" />
        <window.TweakRadio label="Layout" value={tweaks.density} onChange={v => setTweak("density", v)} options={["compact", "spacious"]} />
        <window.TweakSection label="Hero copy" />
        <window.TweakText label="Prefix" value={tweaks.heroHeadlinePrefix} onChange={v => setTweak("heroHeadlinePrefix", v)} />
        <window.TweakText label="Suffix" value={tweaks.heroHeadlineSuffix} onChange={v => setTweak("heroHeadlineSuffix", v)} />
      </window.TweaksPanel>
    </>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
