// Top nav — minimal, sticky, blurred — mobile-responsive + PWA Install & Client Gateway
const NAV_LINKS = [
  { id: "services", label: "Services", labelBn: "সার্ভিস", url: "#/services" },
  { id: "case-studies", label: "Case Studies", labelBn: "কেস স্টাডি", url: "#/case-studies" },
  { id: "pricing", label: "Pricing", labelBn: "মূল্য", url: "#/pricing" },
  { id: "blog", label: "Blog", labelBn: "ব্লগ", url: "#/blog" },
  { id: "contact", label: "Contact", labelBn: "যোগাযোগ", url: "#/contact" },
];

const NAV_TXT = {
  en: {
    search: "Search",
    getQuote: "Get a Quote",
    clientLogin: "Client Login",
    getStarted: "Get Started",
    installApp: "Install App",
    appInstalled: "App Installed",
  },
  bn: {
    search: "খুঁজুন",
    getQuote: "কোট নিন",
    clientLogin: "ক্লায়েন্ট লগইন",
    getStarted: "শুরু করুন",
    installApp: "অ্যাপ ইনস্টল",
    appInstalled: "অ্যাপ ইনস্টলড",
  },
};

// Next redirects ensure clients land seamlessly in the right SaaS portal
const REGISTER_URL = "https://auth.auraajenticai.cloud/register?next=" + encodeURIComponent("https://client.auraajenticai.cloud/services");
const CLIENT_LOGIN_URL = "https://auth.auraajenticai.cloud/login?next=" + encodeURIComponent("https://client.auraajenticai.cloud");

const Nav = ({ onCmdK, theme, onToggleTheme, accent, lang, onToggleLang, route }) => {
  const [scrolled, setScrolled] = React.useState(false);
  const [menuOpen, setMenuOpen] = React.useState(false);
  const [installModalOpen, setInstallModalOpen] = React.useState(false);
  const [deferredPrompt, setDeferredPrompt] = React.useState(null);
  const [isInstalled, setIsInstalled] = React.useState(false);

  const links = NAV_LINKS;
  const t = NAV_TXT[lang] || NAV_TXT.en;
  const bn = lang === "bn";

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // PWA standalone detection & prompt listener
  React.useEffect(() => {
    const isStandalone = window.matchMedia("(display-mode: standalone)").matches || window.navigator.standalone === true;
    if (isStandalone) {
      setIsInstalled(true);
    }

    const handleBeforeInstall = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };

    const handleAppInstalled = () => {
      setIsInstalled(true);
      setDeferredPrompt(null);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstall);
    window.addEventListener("appinstalled", handleAppInstalled);

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstall);
      window.removeEventListener("appinstalled", handleAppInstalled);
    };
  }, []);

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      try {
        deferredPrompt.prompt();
        const choice = await deferredPrompt.userChoice;
        if (choice && choice.outcome === "accepted") {
          setIsInstalled(true);
          setDeferredPrompt(null);
        }
      } catch (err) {
        console.warn("PWA install prompt error:", err);
      }
    } else {
      setInstallModalOpen(true);
    }
  };

  return (
    <>
      <nav style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        borderBottom: scrolled ? "1px solid var(--line)" : "1px solid transparent",
        background: scrolled ? "color-mix(in srgb, var(--bg) 75%, transparent)" : "transparent",
        backdropFilter: scrolled ? "blur(14px)" : "none",
        WebkitBackdropFilter: scrolled ? "blur(14px)" : "none",
        transition: "all 0.25s ease",
      }}>
        <div className="container" style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          height: 64,
        }}>
          {/* Brand */}
          <a href="#top" style={{ display: "flex", alignItems: "center", gap: 10, flexShrink: 0 }}>
            <Icons.Logo size={26} />
            <span style={{ fontWeight: 600, fontSize: 15, letterSpacing: "-0.01em" }}>{PORTFOLIO_DATA.brand.name}</span>
            <span className="nav-badge" style={{
              fontFamily: "var(--font-mono)",
              fontSize: 11,
              color: "var(--text-faint)",
              padding: "2px 7px",
              border: "1px solid var(--line)",
              borderRadius: 999,
              marginLeft: 4,
            }}>v.2026</span>
          </a>

          {/* Center links — hidden on mobile */}
          <div style={{ display: "flex", gap: 4, alignItems: "center" }} className="nav-links">
            {links.map(l => {
              const isActive = route === l.id;
              return (
                <a key={l.id} href={l.url || `#/${l.id}`} style={{
                  fontSize: 13.5,
                  color: isActive ? "var(--text)" : "var(--text-dim)",
                  background: isActive ? "var(--line)" : "transparent",
                  padding: "6px 12px",
                  borderRadius: 8,
                  transition: "all 0.15s",
                  fontWeight: isActive ? 500 : 400,
                }}
                  onMouseEnter={e => { e.currentTarget.style.color = "var(--text)"; e.currentTarget.style.background = "var(--line)"; }}
                  onMouseLeave={e => {
                    e.currentTarget.style.color = isActive ? "var(--text)" : "var(--text-dim)";
                    e.currentTarget.style.background = isActive ? "var(--line)" : "transparent";
                  }}
                >{bn && l.labelBn ? l.labelBn : l.label}</a>
              );
            })}
          </div>

          {/* Right — desktop */}
          <div className="nav-right" style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <button onClick={onCmdK} className="nav-search-btn" style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              padding: "6px 8px 6px 12px",
              background: "transparent",
              border: "1px solid var(--line)",
              borderRadius: 8,
              color: "var(--text-dim)",
              fontSize: 12.5,
            }}>
              <Icons.Search size={13} />
              <span>{t.search}</span>
              <kbd style={{
                fontFamily: "var(--font-mono)",
                fontSize: 10.5,
                padding: "2px 5px",
                border: "1px solid var(--line)",
                borderRadius: 4,
                color: "var(--text-faint)",
              }}>⌘K</kbd>
            </button>

            <button onClick={onToggleTheme} aria-label="Toggle theme" style={{
              width: 34, height: 34,
              display: "grid", placeItems: "center",
              background: "transparent",
              border: "1px solid var(--line)",
              borderRadius: 8,
              color: "var(--text-dim)",
            }}>
              {theme === "dark" ? <Icons.Sun size={15} /> : <Icons.Moon size={15} />}
            </button>

            <button onClick={onToggleLang} className="nav-lang-btn" style={{
              padding: "6px 10px",
              background: "transparent",
              border: "1px solid var(--line)",
              borderRadius: 8,
              color: "var(--text-dim)",
              fontSize: 12,
              fontWeight: 600,
              cursor: "pointer",
              letterSpacing: "0.04em",
            }}>
              {lang === "en" ? "বাং" : "EN"}
            </button>

            {/* PWA Install Button (Desktop) */}
            {!isInstalled && (
              <button
                onClick={handleInstallClick}
                className="nav-install-btn"
                title={bn ? "Aura Cloud অ্যাপ আপনার ডিভাইসে ইনস্টল করুন" : "Install Aura Cloud App on your device"}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 6,
                  padding: "6px 11px",
                  background: "linear-gradient(135deg, rgba(124,92,255,0.16), rgba(0,212,255,0.16))",
                  border: "1px solid rgba(124,92,255,0.45)",
                  borderRadius: 8,
                  color: "var(--text)",
                  fontSize: 12.5,
                  fontWeight: 600,
                  cursor: "pointer",
                  whiteSpace: "nowrap",
                }}
              >
                <span>📲</span>
                <span>{t.installApp}</span>
              </button>
            )}

            <a href="mailto:ceo@auraajenticai.cloud?subject=Project Quote" className="nav-quote-btn" style={{
              padding: "7px 13px",
              background: "transparent",
              border: "1px solid var(--line)",
              borderRadius: 8,
              color: "var(--text-dim)",
              fontSize: 13,
              fontWeight: 500,
              textDecoration: "none",
              whiteSpace: "nowrap",
            }}>
              {t.getQuote}
            </a>

            <a
              href={CLIENT_LOGIN_URL}
              className="nav-login-btn"
              style={{
                padding: "8px 12px",
                background: "transparent",
                border: "1px solid var(--line)",
                borderRadius: 8,
                color: "var(--text-dim)",
                fontSize: 13,
                fontWeight: 500,
                textDecoration: "none",
                whiteSpace: "nowrap",
              }}
            >
              {t.clientLogin}
            </a>

            <a href={REGISTER_URL} className="nav-signup-btn" style={{
              display: "flex",
              alignItems: "center",
              gap: 6,
              padding: "8px 14px",
              background: "var(--text)",
              color: "var(--bg)",
              fontSize: 13,
              fontWeight: 500,
              borderRadius: 8,
              textDecoration: "none",
              whiteSpace: "nowrap",
            }}>
              {t.getStarted} <Icons.Arrow size={13} />
            </a>
          </div>

          {/* Hamburger — mobile only */}
          <button
            className="nav-hamburger"
            onClick={() => setMenuOpen(o => !o)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            style={{
              display: "none",
              width: 36, height: 36,
              background: "transparent",
              border: "1px solid var(--line)",
              borderRadius: 8,
              color: "var(--text-dim)",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
              cursor: "pointer",
            }}
          >
            {menuOpen ? (
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M2 2l12 12M14 2L2 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            ) : (
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M2 4h12M2 8h12M2 12h12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            )}
          </button>
        </div>

        <style>{`
          @media (max-width: 880px) {
            .nav-links { display: none !important; }
          }
          @media (max-width: 640px) {
            .nav-search-btn { display: none !important; }
            .nav-quote-btn { display: none !important; }
            .nav-install-btn { display: none !important; }
            .nav-badge { display: none !important; }
          }
          @media (max-width: 480px) {
            .nav-login-btn { display: none !important; }
            .nav-signup-btn { display: none !important; }
            .nav-hamburger { display: flex !important; }
          }
        `}</style>
      </nav>

      {/* Mobile drawer */}
      {menuOpen && (
        <div style={{
          position: "fixed",
          top: 64,
          left: 0,
          right: 0,
          zIndex: 49,
          background: "color-mix(in srgb, var(--bg) 96%, transparent)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          borderBottom: "1px solid var(--line)",
          padding: "1rem 20px 1.5rem",
          display: "flex",
          flexDirection: "column",
          gap: 2,
          maxHeight: "calc(100vh - 64px)",
          overflowY: "auto",
        }}>
          {/* Mobile PWA Install Banner */}
          {!isInstalled && (
            <div style={{
              padding: "12px 14px",
              borderRadius: 12,
              background: "linear-gradient(135deg, rgba(124,92,255,0.18), rgba(0,212,255,0.18))",
              border: "1px solid rgba(124,92,255,0.35)",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: 10,
            }}>
              <div>
                <div style={{ fontWeight: 600, fontSize: 13, color: "var(--text)" }}>
                  {bn ? "📲 Aura Cloud অ্যাপ" : "📲 Aura Cloud App"}
                </div>
                <div style={{ fontSize: 11, color: "var(--text-dim)", marginTop: 2 }}>
                  {bn ? "হোমস্ক্রিনে ১-ট্যাপে ইনস্টল করুন" : "Install to home screen for 1-tap launch"}
                </div>
              </div>
              <button
                onClick={() => {
                  setMenuOpen(false);
                  handleInstallClick();
                }}
                style={{
                  padding: "6px 12px",
                  background: "var(--text)",
                  color: "var(--bg)",
                  border: "none",
                  borderRadius: 8,
                  fontSize: 12,
                  fontWeight: 600,
                  cursor: "pointer",
                  whiteSpace: "nowrap",
                }}
              >
                {bn ? "ইনস্টল" : "Install"}
              </button>
            </div>
          )}

          {links.map(l => (
            <a
              key={l.id}
              href={l.url || `#${l.id}`}
              onClick={() => setMenuOpen(false)}
              style={{
                fontSize: 15,
                color: "var(--text-dim)",
                padding: "12px 4px",
                textDecoration: "none",
                display: "block",
                borderBottom: "1px solid var(--line)",
              }}
            >{bn && l.labelBn ? l.labelBn : l.label}</a>
          ))}
          <div style={{ display: "flex", gap: 8, marginTop: 14, flexWrap: "wrap" }}>
            <button onClick={() => { onToggleTheme(); setMenuOpen(false); }} style={{
              padding: "8px 14px",
              background: "transparent",
              border: "1px solid var(--line)",
              borderRadius: 8,
              color: "var(--text-dim)",
              fontSize: 13,
              cursor: "pointer",
            }}>
              {theme === "dark" ? "Light" : "Dark"}
            </button>
            <button onClick={() => { onToggleLang(); setMenuOpen(false); }} style={{
              padding: "8px 14px",
              background: "transparent",
              border: "1px solid var(--line)",
              borderRadius: 8,
              color: "var(--text-dim)",
              fontSize: 13,
              cursor: "pointer",
              fontWeight: 600,
            }}>
              {lang === "en" ? "বাংলা" : "English"}
            </button>
            <a
              href="mailto:ceo@auraajenticai.cloud?subject=Project Quote"
              onClick={() => setMenuOpen(false)}
              style={{
                padding: "8px 14px",
                background: "transparent",
                border: "1px solid var(--line)",
                borderRadius: 8,
                color: "var(--text-dim)",
                fontSize: 13,
                textDecoration: "none",
              }}
            >{t.quote}</a>
            <a
              href={CLIENT_LOGIN_URL}
              onClick={() => setMenuOpen(false)}
              style={{
                padding: "8px 14px",
                background: "transparent",
                border: "1px solid var(--line)",
                color: "var(--text-dim)",
                fontSize: 13,
                fontWeight: 500,
                borderRadius: 8,
                textDecoration: "none",
              }}
            >{t.clientLogin}</a>
            <a
              href={REGISTER_URL}
              onClick={() => setMenuOpen(false)}
              style={{
                padding: "8px 14px",
                background: "var(--text)",
                color: "var(--bg)",
                fontSize: 13,
                fontWeight: 500,
                borderRadius: 8,
                textDecoration: "none",
              }}
            >{t.getStarted}</a>
          </div>
        </div>
      )}

      {/* PWA Install Help Modal (iOS & Fallback) */}
      {installModalOpen && (
        <div
          onClick={() => setInstallModalOpen(false)}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 100,
            background: "rgba(0, 0, 0, 0.72)",
            backdropFilter: "blur(10px)",
            WebkitBackdropFilter: "blur(10px)",
            display: "grid",
            placeItems: "center",
            padding: 16,
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              position: "relative",
              width: "100%",
              maxWidth: 440,
              background: "var(--bg-card, #0c1222)",
              border: "1px solid rgba(0, 212, 255, 0.35)",
              borderRadius: 16,
              padding: "24px 22px",
              boxShadow: "0 24px 60px rgba(0, 0, 0, 0.6)",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <span style={{ fontSize: 22 }}>📲</span>
                <h3 style={{ margin: 0, fontSize: 16, fontWeight: 600, color: "var(--text)" }}>
                  {bn ? "Aura Cloud অ্যাপ ইনস্টল গাইড" : "Install Aura Cloud App"}
                </h3>
              </div>
              <button
                onClick={() => setInstallModalOpen(false)}
                style={{ background: "transparent", border: "none", color: "var(--text-dim)", cursor: "pointer", fontSize: 18 }}
              >
                ✕
              </button>
            </div>

            <p style={{ fontSize: 13, color: "var(--text-dim)", lineHeight: 1.5, margin: "0 0 16px" }}>
              {bn
                ? "Aura Cloud অ্যাপ আপনার মোবাইল বা কম্পিউটারে ইনস্টল করে সরাসরি ১-ট্যাপে ওপেন করুন:"
                : "Install the Aura Cloud App directly to your device for 1-tap instant launch and offline access:"}
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: 10, fontSize: 12.5, color: "var(--text)" }}>
              <div style={{ padding: "10px 12px", background: "rgba(255,255,255,0.03)", borderRadius: 8, border: "1px solid var(--line)" }}>
                <strong>🍏 iOS / iPhone (Safari):</strong>
                <div style={{ color: "var(--text-dim)", marginTop: 4 }}>
                  {bn
                    ? "সাফারি ব্রাউজারের নিচে শেয়ার বাটনে (Share ⎋) ট্যাপ করুন, এরপর নিচে স্ক্রল করে 'Add to Home Screen ⊞' সিলেক্ট করুন।"
                    : "Tap the Share icon (⎋) at bottom of Safari, scroll down and tap 'Add to Home Screen ⊞'."}
                </div>
              </div>

              <div style={{ padding: "10px 12px", background: "rgba(255,255,255,0.03)", borderRadius: 8, border: "1px solid var(--line)" }}>
                <strong>🤖 Android (Chrome):</strong>
                <div style={{ color: "var(--text-dim)", marginTop: 4 }}>
                  {bn
                    ? "ব্রাউজারের উপরের ডান কোণায় ৩-ডট মেনুতে (⋮) ট্যাপ করে 'Install app' বা 'Add to Home screen' নির্বাচন করুন।"
                    : "Tap the 3 dots menu (⋮) in Chrome and select 'Install app' or 'Add to Home screen'."}
                </div>
              </div>

              <div style={{ padding: "10px 12px", background: "rgba(255,255,255,0.03)", borderRadius: 8, border: "1px solid var(--line)" }}>
                <strong>💻 Windows / Mac (Chrome & Edge):</strong>
                <div style={{ color: "var(--text-dim)", marginTop: 4 }}>
                  {bn
                    ? "ব্রাউজারের অ্যাড্রেস বারের ডানপাশে ইনস্টল আইকন (⊕) ক্লিক করে ইনস্টল করুন।"
                    : "Click the Install icon (⊕) in the browser address bar to install to desktop."}
                </div>
              </div>
            </div>

            <button
              onClick={() => setInstallModalOpen(false)}
              style={{
                width: "100%",
                marginTop: 18,
                padding: "10px",
                background: "var(--text)",
                color: "var(--bg)",
                border: "none",
                borderRadius: 8,
                fontWeight: 600,
                fontSize: 13,
                cursor: "pointer",
              }}
            >
              {bn ? "ঠিক আছে, বুঝেছি" : "Got it"}
            </button>
          </div>
        </div>
      )}
    </>
  );
};

window.Nav = Nav;
