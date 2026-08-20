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

  // Dynamic meta tags per route
  React.useEffect(() => {
    const BASE = 'Aura Ajentic AI';
    const SERVICE_IDS = (PORTFOLIO_DATA.services || []).reduce((m, s) => {
      m['services/' + s.id] = { title: `${s.name} — ${BASE}`, desc: s.description };
      return m;
    }, {});
    const META = {
      '': {
        title: `${BASE} — AI Agents, Automation & Full-Stack Dev`,
        desc: 'We build custom AI agents, automation pipelines, Web3 infrastructure, MT5 trading systems, and enterprise web apps. Based in Dhaka, serving clients worldwide.',
      },
      services: {
        title: `Services — ${BASE}`,
        desc: 'AI agents, web development, Web3, MT5 trading automation, data pipelines, DevOps, and Meta Ads AI — 7 production-ready services that ship to production.',
      },
      stack: {
        title: `Tech Stack — ${BASE}`,
        desc: 'Production-tested stack: React, SvelteKit, Next.js, Node.js, Python, Anthropic Claude, n8n, Solidity, Docker, and more — across 40+ production agents.',
      },
      agents: {
        title: `AI Agents — ${BASE}`,
        desc: 'Live demos of AI agents built with Anthropic Claude, LangGraph, and n8n. Agents that triage, decide, and execute with tool access, memory, and audit trails.',
      },
      timeline: {
        title: `Experience — ${BASE}`,
        desc: '7 years of shipping production AI systems — from fintech infrastructure to MT5 trading bots to founding Aura Ajentic AI in Dhaka, Bangladesh.',
      },
      contact: {
        title: `Contact — ${BASE}`,
        desc: 'Get a quote for AI agents, automation, web development, Web3, or MT5 trading systems. Based in Dhaka, Bangladesh. Response within 24 hours.',
      },
      'case-studies': {
        title: `Case Studies — ${BASE}`,
        desc: 'Real-world AI agent, MT5 trading, Meta Ads, and Web3 projects with production metrics. See what Aura actually ships for clients.',
      },
      pricing: {
        title: `Pricing — ${BASE}`,
        desc: 'Transparent pricing for AI agents, automation, and full-stack development. Starter, Growth, and Enterprise tiers. Fixed scope, no surprises.',
      },
      blog: {
        title: `Blog — ${BASE}`,
        desc: 'Technical deep-dives on building AI agents, MT5 Expert Advisors, Meta Ads automation, and the infrastructure behind Aura Ajentic AI.',
      },
      products: {
        title: `Our Products — ${BASE}`,
        desc: 'GlamourTouch — Aura\'s own live e-commerce store in beauty & lifestyle. A real, production product built on our stack. See exactly what we ship for clients.',
      },
      privacy: {
        title: `Privacy Policy — ${BASE}`,
        desc: 'What Aura Ajentic AI collects, how it\'s used, and how to ask us to delete it.',
      },
      terms: {
        title: `Terms of Service — ${BASE}`,
        desc: 'Terms for Aura Ajentic AI project engagements and client dashboard access.',
      },
      ...SERVICE_IDS,
    };

    const m = META[route] || META[''];
    document.title = m.title;
    const setMeta = (sel, val) => { const el = document.querySelector(sel); if (el) el.setAttribute('content', val); };
    setMeta('meta[name="description"]', m.desc);
    setMeta('meta[property="og:title"]', m.title);
    setMeta('meta[property="og:description"]', m.desc);
    setMeta('meta[property="og:url"]', `https://auraajenticai.cloud/${route ? '#/' + route : ''}`);
    setMeta('meta[name="twitter:title"]', m.title);
    setMeta('meta[name="twitter:description"]', m.desc);
  }, [route]);

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
    // Service detail pages: #/services/:id
    if (route.startsWith('services/')) {
      const id = route.slice('services/'.length);
      const svc = (PORTFOLIO_DATA.services || []).find(s => s.id === id);
      if (svc) return <T.ServiceDetailPage svc={svc} lang={lang} />;
      window.location.hash = '#/services';
      return null;
    }

    switch (route) {
      case 'services':
        return <T.ServicesPage lang={lang} />;
      case 'stack':
        return <T.StackPage lang={lang} />;
      case 'agents':
        return <T.AgentsPage lang={lang} />;
      case 'timeline':
        return <T.TimelinePage lang={lang} />;
      case 'contact':
        return <T.ContactPage lang={lang} />;
      case 'pricing':
        return <T.PricingPage lang={lang} />;
      case 'blog':
        return <T.BlogPage lang={lang} />;
      case 'case-studies':
        return <T.CaseStudiesPage lang={lang} />;
      case 'privacy':
        return <T.PrivacyPage lang={lang} />;
      case 'terms':
        return <T.TermsPage lang={lang} />;
      default:
        return (
          <main style={density === "compact" ? { fontSize: 14.5 } : undefined}>
            <T.Hero headlinePrefix={tweaks.heroHeadlinePrefix} headlineSuffix={tweaks.heroHeadlineSuffix} lang={lang} />
            <T.About lang={lang} />
            <T.Skills lang={lang} />
            <T.Projects lang={lang} />
            <T.FlagshipProduct lang={lang} />
            <T.AgentShowcase lang={lang} />
            <T.Testimonials lang={lang} />
            <T.Timeline lang={lang} />
            <T.Contact lang={lang} />
          </main>
        );
    }
  };

  return (
    <>
      <T.Nav {...navProps} />
      {renderPage()}
      <T.Footer lang={lang} />
      <T.CommandPalette open={paletteOpen} onClose={() => setPaletteOpen(false)} lang={lang} />
      <T.ChatboxWidget lang={lang} />

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
