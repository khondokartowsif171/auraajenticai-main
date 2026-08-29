// Content for the portfolio
const PORTFOLIO_DATA = {
  brand: {
    name: "Aura Ajentic AI",
    handle: "@aura",
    title: "Agentic AI & Full-Stack Development",
    titleBn: "এজেন্টিক এআই ও ফুল-স্ট্যাক ডেভেলপমেন্ট",
    tagline: "We build AI agents, automation & enterprise systems that work 24/7.",
    taglineBn: "আমরা AI এজেন্ট, অটোমেশন ও এন্টারপ্রাইজ সিস্টেম তৈরি করি যা ২৪/৭ কাজ করে।",
    location: "Dhaka, Bangladesh · Remote",
    founded: "Jul 2026",
    email: "ceo@auraajenticai.cloud",
    whatsapp: "8801317685758",
    domain: "auraajenticai.cloud",
    socials: {
      github: "https://github.com/khondokartowsif171",
      linkedin: "https://www.linkedin.com/in/amirul-islam-redwan-90114a3ab/",
      twitter: "https://twitter.com",
    },
  },

  // Every number below is real and checkable today -- never add a stat we can't stand behind if
  // someone asks where it comes from.
  metrics: [
    { label: "Products we built & run ourselves", labelBn: "আমাদের নিজের বানানো ও চালানো প্রোডাক্ট", value: "2" },
    { label: "Products in our own live catalog", labelBn: "আমাদের নিজের catalog-এ প্রোডাক্ট", value: "560+" },
    { label: "Meta-approved WhatsApp bot", labelBn: "Meta-approved WhatsApp বট", value: "Live" },
    { label: "Self-hosted infrastructure", labelBn: "নিজস্ব হোস্টেড ইনফ্রাস্ট্রাকচার", value: "100%" },
  ],

  about: {
    pitch: "We're a new studio building the systems that act on behalf of teams — agents that triage, route, decide, and execute. Rather than pitch and disappear, we build our own products first and run them ourselves: a live WhatsApp sales bot answering real customers today, on infrastructure we host and pay for out of pocket, not resold AWS margins.",
    pitchBn: "আমরা একটা নতুন স্টুডিও, যারা এমন সিস্টেম তৈরি করি যা টিমের হয়ে সরাসরি কাজ করে — এজেন্ট যা বিচার করে, route করে, সিদ্ধান্ত নেয়, এবং কাজ সম্পন্ন করে। শুধু পিচ দিয়ে হারিয়ে না গিয়ে, আমরা আগে নিজেদের প্রোডাক্ট বানাই ও নিজেরাই চালাই — একটা live WhatsApp sales বট যা আজই real কাস্টমারদের উত্তর দিচ্ছে, নিজেদের হোস্ট করা ইনফ্রাস্ট্রাকচারে, resold AWS margin না।",
    bullets: [
      "Built and run our own WhatsApp + Messenger sales bot, live in Bengali, 24/7",
      "Self-host our entire stack on our own VPS with Coolify — no reselling AWS",
      "Meta Tech Provider status — we can onboard other businesses' WhatsApp numbers",
      "Bangla-first team, built on Anthropic's Claude, not a wrapped GPT-4 API",
    ],
    bulletsBn: [
      "নিজেদের WhatsApp + Messenger sales বট বানিয়ে চালাচ্ছি, বাংলায়, ২৪/৭ live",
      "পুরো স্ট্যাক নিজেদের VPS-এ Coolify দিয়ে self-host করি — AWS resell না",
      "Meta Tech Provider status অর্জন করেছি — অন্য ব্যবসার WhatsApp নম্বরও onboard করতে পারি",
      "বাংলা-ফার্স্ট টিম, Anthropic-এর Claude-এর উপর বানানো — কোনো wrapped GPT-4 API না",
    ],
  },

  // Real tools we actually build with -- no fabricated proficiency percentages. A one-month-old
  // company can't honestly claim "98% React" backed by "production hours" it hasn't logged yet.
  stack: {
    Frontend: ["React", "Next.js", "TypeScript", "Tailwind", "SvelteKit"],
    Backend: ["Node.js", "PostgreSQL", "Supabase", "Drizzle ORM", "Hono"],
    "AI / Agents": ["Anthropic Claude", "n8n", "LangGraph", "Meta MCP", "Gemini"],
    "Web3": ["Solidity", "viem", "wagmi", "Cloudflare Workers"],
    DevOps: ["Docker", "Coolify", "Traefik", "GitHub Actions", "Vercel"],
  },

  services: [
    {
      id: "web-app-dev",
      name: "Website & Webapp Development",
      nameBn: "ওয়েবসাইট ও ওয়েবঅ্যাপ ডেভেলপমেন্ট",
      kind: "Core Service",
      kindBn: "কোর সার্ভিস",
      description:
        "From landing pages to full SaaS dashboards — pixel-perfect, fast, and built to scale. SvelteKit, Next.js, React, Tailwind.",
      descriptionBn:
        "ল্যান্ডিং পেজ থেকে শুরু করে সম্পূর্ণ SaaS ড্যাশবোর্ড পর্যন্ত — pixel-perfect, দ্রুত, এবং স্কেল করার উপযোগী করে তৈরি। SvelteKit, Next.js, React, Tailwind।",
      stack: ["SvelteKit", "Next.js", "React", "Tailwind", "PostgreSQL"],
      impact: { primary: "560+", secondary: "products in our own live store" },
      color: "violet",
      demo: "https://glamourstouch.com",
    },
    {
      id: "ai-agent-automation",
      name: "AI Agent & Automation",
      nameBn: "এআই এজেন্ট ও অটোমেশন",
      kind: "Core Service",
      kindBn: "কোর সার্ভিস",
      description:
        "Custom AI agents that triage, decide, and execute — integrated with your tools via n8n, Anthropic, and OpenAI.",
      descriptionBn:
        "কাস্টম এআই এজেন্ট যা নিজে বিচার করে, সিদ্ধান্ত নেয় ও কাজ সম্পন্ন করে — n8n, Anthropic ও OpenAI-এর মাধ্যমে আপনার টুলসের সাথে যুক্ত।",
      stack: ["Anthropic Claude", "n8n", "LangGraph", "Node.js", "Hono"],
      impact: { primary: "24/7", secondary: "our own agent, answering real customers" },
      color: "cyan",
      demo: "https://demo-agenticai-website.vercel.app",
    },
    {
      id: "web3-blockchain",
      name: "Web3 & Blockchain",
      nameBn: "ওয়েব৩ ও ব্লকচেইন",
      kind: "Specialist Service",
      kindBn: "স্পেশালিস্ট সার্ভিস",
      description:
        "Wallets, smart contracts, multi-chain bridges, and on-chain audit trails. Gasless UX that hides complexity from end users.",
      descriptionBn:
        "ওয়ালেট, স্মার্ট কন্ট্রাক্ট, মাল্টি-চেইন ব্রিজ, এবং অন-চেইন অডিট ট্রেইল। Gasless UX যা জটিলতা ইউজারের কাছ থেকে লুকিয়ে রাখে।",
      stack: ["Solidity", "viem", "wagmi", "Cloudflare Workers"],
      impact: { primary: "12 chains", secondary: "EVM + Solana" },
      color: "green",
      demo: "https://demo-cryptotradeanalysis-website.vercel.app",
    },
    {
      id: "mt5-ea-trading",
      name: "MT5 EA & Trading Automation",
      nameBn: "MT5 EA ও ট্রেডিং অটোমেশন",
      kind: "Specialist Service",
      kindBn: "স্পেশালিস্ট সার্ভিস",
      description:
        "Expert Advisors, real-time P&L dashboards, risk envelopes, and one-click kill switches for MetaTrader 5 platforms.",
      descriptionBn:
        "Expert Advisor, রিয়েল-টাইম P&L ড্যাশবোর্ড, রিস্ক এনভেলপ, এবং MetaTrader 5 প্ল্যাটফর্মের জন্য এক-ক্লিক kill switch।",
      stack: ["MQL5", "Go", "ClickHouse", "WebSockets", "React"],
      impact: { primary: "MQL5", secondary: "expert advisor development" },
      color: "amber",
      demo: "https://ea-dashboard-blush.vercel.app",
    },
    {
      id: "scraping-data-pipeline",
      name: "Browser Scraping & Data Pipeline",
      nameBn: "ব্রাউজার স্ক্র্যাপিং ও ডেটা পাইপলাইন",
      kind: "Specialist Service",
      kindBn: "স্পেশালিস্ট সার্ভিস",
      description:
        "Playwright/Puppeteer scrapers, proxy rotation, structured data extraction, and ETL pipelines into your DB or warehouse.",
      descriptionBn:
        "Playwright/Puppeteer স্ক্র্যাপার, প্রক্সি রোটেশন, structured ডেটা এক্সট্র্যাকশন, এবং আপনার DB বা warehouse-এ ETL পাইপলাইন।",
      stack: ["Playwright", "Puppeteer", "Python", "Airflow", "PostgreSQL"],
      impact: { primary: "Playwright", secondary: "production-grade scraping" },
      color: "violet",
      demo: "https://portfolio-website-tan-six-24.vercel.app",
    },
    {
      id: "infra-devops",
      name: "Infrastructure & DevOps",
      nameBn: "ইনফ্রাস্ট্রাকচার ও ডেভঅপস",
      kind: "Specialist Service",
      kindBn: "স্পেশালিস্ট সার্ভিস",
      description:
        "VPS setup, Docker, Coolify, Traefik, CI/CD pipelines, SSL, monitoring, and zero-downtime deploys on your own cloud.",
      descriptionBn:
        "VPS সেটআপ, Docker, Coolify, Traefik, CI/CD পাইপলাইন, SSL, মনিটরিং, এবং আপনার নিজের cloud-এ zero-downtime ডিপ্লয়।",
      stack: ["Docker", "Coolify", "Traefik", "GitHub Actions", "PostgreSQL"],
      impact: { primary: "11+", secondary: "apps running on our own VPS" },
      color: "cyan",
    },
    {
      id: "meta-ads-ai",
      name: "AI-Powered Meta Ads",
      nameBn: "এআই-চালিত মেটা অ্যাডস",
      kind: "Growth Service",
      kindBn: "গ্রোথ সার্ভিস",
      badge: "NEW · Meta MCP",
      description:
        "AI agents connected directly to Meta's official API — optimizing bids, rotating creatives, and reallocating budgets every 15 minutes. Not a human checking ads twice a day. A system that never sleeps.",
      descriptionBn:
        "Meta-এর official API-এর সাথে সরাসরি যুক্ত এআই এজেন্ট — প্রতি ১৫ মিনিটে bid অপ্টিমাইজ করে, creative পাল্টায়, বাজেট পুনর্বণ্টন করে। দিনে দুইবার মানুষ চেক করার মতো না — এমন একটা সিস্টেম যা কখনো ঘুমায় না।",
      stack: ["Meta MCP", "Meta Ads API", "n8n", "Claude AI", "Anthropic"],
      impact: { primary: "Official", secondary: "Meta MCP · direct API access" },
      color: "rose",
      highlights: [
        "Real-time bid & budget optimization every 15 min",
        "100+ ad variants A/B tested simultaneously by AI",
        "Automated audience expansion & lookalike generation",
        "Creative fatigue detection — pauses before burnout",
        "Daily AI-written performance reports to your inbox",
        "Full Meta API access via official MCP integration",
      ],
      highlightsBn: [
        "প্রতি ১৫ মিনিটে রিয়েল-টাইম bid ও বাজেট অপ্টিমাইজেশন",
        "১০০+ অ্যাড ভ্যারিয়েন্ট একসাথে এআই দিয়ে A/B টেস্ট",
        "স্বয়ংক্রিয় audience expansion ও lookalike generation",
        "Creative fatigue detection — burnout হওয়ার আগেই থামায়",
        "প্রতিদিন এআই-লিখিত পারফরম্যান্স রিপোর্ট আপনার ইনবক্সে",
        "অফিসিয়াল MCP integration-এর মাধ্যমে সম্পূর্ণ Meta API অ্যাক্সেস",
      ],
    },
    {
      id: "whatsapp-messenger-bot",
      name: "WhatsApp & Messenger Sales Bot",
      nameBn: "হোয়াটসঅ্যাপ ও মেসেঞ্জার সেলস বট",
      kind: "Automation · Live",
      kindBn: "অটোমেশন · লাইভ",
      badge: "LIVE · Try it on WhatsApp",
      description:
        "A Bengali sales assistant that answers your customers 24/7 on WhatsApp and Messenger — with the real product photo, the real price, and the real discount pulled straight from your own database. It takes the order too. Running live on our own shop right now; message it and see.",
      descriptionBn:
        "একটা বাংলা সেলস অ্যাসিস্ট্যান্ট যা WhatsApp ও Messenger-এ আপনার কাস্টমারদের ২৪/৭ উত্তর দেয় — আসল প্রোডাক্ট ছবি, আসল দাম, আসল ছাড় সহ, সরাসরি আপনার নিজের ডেটাবেস থেকে। অর্ডারও নেয়। আমাদের নিজের দোকানে এখনই লাইভ চলছে; মেসেজ করে দেখুন।",
      stack: ["WhatsApp Cloud API", "Meta Graph API", "Cloudflare Workers", "n8n", "Gemini", "Supabase"],
      impact: { primary: "24/7", secondary: "replies in Bengali, in seconds" },
      color: "emerald",
      highlights: [
        "Prices and photos come from your database — the AI never types a price, so it cannot quote a wrong one",
        "Sends the actual product photo with every answer, not a link",
        "Captures the full order — name, address, phone — straight into your system",
        "Remembers the conversation, so \"ওইটা দেখান\" works",
        "Flags suspicious COD orders and hands angry customers to a human",
      ],
      highlightsBn: [
        "দাম ও ছবি আসে আপনার ডেটাবেস থেকে — এআই কখনো নিজে দাম লেখে না, তাই ভুল দাম বলার সুযোগই নেই",
        "প্রতিটা উত্তরে আসল প্রোডাক্ট ছবি পাঠায়, শুধু লিংক না",
        "সম্পূর্ণ অর্ডার — নাম, ঠিকানা, ফোন — সরাসরি আপনার সিস্টেমে জমা করে",
        "কথোপকথন মনে রাখে, তাই \"ওইটা দেখান\" বললেও বোঝে",
        "সন্দেহজনক COD অর্ডার চিহ্নিত করে ও রাগান্বিত কাস্টমারকে মানুষের কাছে পাঠায়",
      ],
      demo: "https://wa.me/8801712426871?text=Medicube%20er%20ki%20ki%20product%20ache%3F",
    },
    {
      id: "social-autopilot",
      name: "Social Media Autopilot",
      nameBn: "সোশ্যাল মিডিয়া অটোপাইলট",
      kind: "Automation · Live",
      kindBn: "অটোমেশন · লাইভ",
      badge: "LIVE · Running daily",
      description:
        "Your Facebook page posts itself. Daily product carousels and spotlights, pulled from your own catalog, captioned in Bengali and watermarked automatically — every day, without anyone opening a laptop. Running on our own page right now.",
      descriptionBn:
        "আপনার Facebook পেজ নিজে থেকেই পোস্ট করে। দৈনিক প্রোডাক্ট carousel ও spotlight, আপনার নিজের ক্যাটালগ থেকে নেওয়া, বাংলায় ক্যাপশন সহ ও স্বয়ংক্রিয়ভাবে watermark করা — প্রতিদিন, কারো ল্যাপটপ না খুলেই। আমাদের নিজের পেজে এখনই চলছে।",
      stack: ["n8n", "Meta Graph API", "Supabase", "Sharp", "Gemini"],
      impact: { primary: "0", secondary: "minutes of manual posting" },
      color: "blue",
      highlights: [
        "Daily multi-product carousel — real photos, real prices from your catalog",
        "Bengali captions written for you, watermarked with your brand",
        "Every card deep-links to that product's page, not just the homepage",
        "Rotates brands and products so the page never looks repetitive",
        "Posts keep going out whether you're at the shop or asleep",
      ],
      highlightsBn: [
        "দৈনিক মাল্টি-প্রোডাক্ট carousel — আসল ছবি, আসল দাম, আপনার ক্যাটালগ থেকে",
        "বাংলা ক্যাপশন আপনার জন্য লেখা, আপনার ব্র্যান্ড দিয়ে watermark করা",
        "প্রতিটা কার্ড সরাসরি সেই প্রোডাক্টের পেজে নিয়ে যায়, শুধু হোমপেজ না",
        "ব্র্যান্ড ও প্রোডাক্ট ঘুরিয়ে দেখায় যাতে পেজ কখনো একঘেয়ে না লাগে",
        "আপনি দোকানে থাকুন বা ঘুমান, পোস্ট চলতেই থাকে",
      ],
    },
    {
      id: "ecommerce-full",
      name: "Complete Online Shop",
      nameBn: "সম্পূর্ণ অনলাইন দোকান",
      kind: "Bundle · End to end",
      kindBn: "বান্ডল · এন্ড টু এন্ড",
      badge: "EVERYTHING IN ONE",
      description:
        "The whole shop, one roof: the website, the WhatsApp sales bot, courier booking, daily social posts, and Meta ads — built, connected, and run together. This is exactly what we run for our own brand, so you are buying a system that already sells, not a plan.",
      descriptionBn:
        "পুরো দোকান, এক ছাদের নিচে: ওয়েবসাইট, WhatsApp সেলস বট, কুরিয়ার বুকিং, দৈনিক সোশ্যাল পোস্ট, এবং Meta অ্যাডস — সব তৈরি, সংযুক্ত ও একসাথে চালানো। এটাই আমরা নিজেদের ব্র্যান্ডের জন্য চালাই, তাই আপনি একটা পরিকল্পনা না, একটা already-বিক্রি-করা সিস্টেম কিনছেন।",
      stack: ["React", "Supabase", "WhatsApp Cloud API", "n8n", "Meta Ads", "Steadfast"],
      impact: { primary: "1", secondary: "team, running all of it" },
      color: "violet",
      highlights: [
        "Storefront with real stock, discounts and cash on delivery",
        "WhatsApp bot answering and taking orders 24/7 in Bengali",
        "Orders flow into one dashboard — website and bot together",
        "Courier booking and tracking without leaving the dashboard",
        "Daily auto-posts and Meta ad campaigns driving the traffic",
        "One team accountable for the whole chain, not five vendors",
      ],
      highlightsBn: [
        "আসল স্টক, ছাড় ও cash on delivery সহ স্টোরফ্রন্ট",
        "WhatsApp বট ২৪/৭ বাংলায় উত্তর দেয় ও অর্ডার নেয়",
        "অর্ডার এক ড্যাশবোর্ডে আসে — ওয়েবসাইট ও বট একসাথে",
        "ড্যাশবোর্ড থেকে না বেরিয়েই কুরিয়ার বুকিং ও ট্র্যাকিং",
        "দৈনিক অটো-পোস্ট ও Meta অ্যাড ক্যাম্পেইন ট্রাফিক আনে",
        "পুরো চেইনের জন্য একটাই দায়বদ্ধ টিম, পাঁচটা vendor না",
      ],
    },
    {
      id: "courier-mcp",
      name: "Aura Courier MCP",
      nameBn: "অরা কুরিয়ার MCP",
      kind: "Connector · Live",
      kindBn: "কানেক্টর · লাইভ",
      badge: "LIVE · MCP Connector",
      description:
        "One Model Context Protocol connector for every Bangladesh courier. Add it to Claude, plug in your own courier keys, and book & track parcels — Steadfast & Pathao — straight from a conversation. Your shop's logistics, agentic.",
      descriptionBn:
        "বাংলাদেশের প্রতিটা কুরিয়ারের জন্য একটাই Model Context Protocol কানেক্টর। Claude-এ যোগ করুন, নিজের কুরিয়ার key বসান, আর কথোপকথন থেকেই পার্সেল বুক ও ট্র্যাক করুন — Steadfast ও Pathao। আপনার দোকানের লজিস্টিক্স, এজেন্টিক।",
      stack: ["MCP", "Steadfast", "Pathao", "Claude", "TypeScript"],
      impact: { primary: "1", secondary: "connector · every courier" },
      color: "amber",
      highlights: [
        "Book & track parcels from Claude — no dashboard hopping",
        "One URL, your own courier keys — nothing stored by us",
        "Steadfast & Pathao live · RedX & Paperfly coming",
        "Works in Claude Desktop, Claude Code, or hosted",
        "Open source — anyone can add it in seconds",
      ],
      highlightsBn: [
        "Claude থেকেই পার্সেল বুক ও ট্র্যাক — ড্যাশবোর্ড ঘোরাঘুরি লাগবে না",
        "একটা URL, আপনার নিজের কুরিয়ার key — আমরা কিছুই সংরক্ষণ করি না",
        "Steadfast ও Pathao লাইভ · RedX ও Paperfly আসছে",
        "Claude Desktop, Claude Code, বা hosted — সব জায়গায় কাজ করে",
        "ওপেন সোর্স — যে কেউ কয়েক সেকেন্ডে যোগ করতে পারে",
      ],
      demo: "https://courier.auraajenticai.cloud",
      repo: "https://github.com/auraajenticai/aura-courier-mcp",
    },
  ],

  // Empty on purpose -- the old array here was fabricated (invented names, companies and quotes
  // that never existed). Never repopulate with placeholder content; only add a testimonial once a
  // real client has actually given one. The Testimonials component renders an honest
  // "new agency, real results coming soon" state when this is empty.
  testimonials: [],

  pricingTiers: [
    {
      name: "Starter",
      badge: null,
      price: 499,
      period: "one-time",
      description: "For founders who need a fast, professional launch.",
      color: "violet",
      features: [
        "Landing page or single-service site",
        "Mobile responsive + dark/light mode",
        "Contact form with real email",
        "1 API or third-party integration",
        "Deployed on your domain",
        "1 revision round",
        "14-day support window",
      ],
      cta: "Get Started",
      href: "mailto:ceo@auraajenticai.cloud?subject=Starter Package Enquiry",
    },
    {
      name: "Growth",
      badge: "Most Popular",
      price: 1499,
      period: "per project",
      description: "Full-stack builds for teams ready to scale.",
      color: "cyan",
      features: [
        "Full SaaS dashboard or complex webapp",
        "AI agent or automation integration",
        "Admin dashboard + public API",
        "Auth, billing & role-based access",
        "CI/CD pipeline + VPS deployment",
        "3 revision rounds",
        "60-day support window",
        "Performance monitoring setup",
      ],
      cta: "Start Project",
      href: "mailto:ceo@auraajenticai.cloud?subject=Growth Package Enquiry",
    },
    {
      name: "Enterprise",
      badge: "Custom",
      price: null,
      period: null,
      description: "Multi-agent systems, trading infra, and global integrations.",
      color: "amber",
      features: [
        "Custom architecture design",
        "Multi-agent orchestration system",
        "MT5 EA or Meta Ads AI system",
        "Web3 / on-chain settlement rails",
        "Dedicated VPS infrastructure",
        "Unlimited revisions",
        "6-month SLA support",
        "Monthly performance reports",
        "Direct engineer access via Slack",
      ],
      cta: "Book a Call",
      href: "mailto:ceo@auraajenticai.cloud?subject=Enterprise Enquiry",
    },
  ],

  // Empty on purpose -- the old array here was fabricated (fake publish dates predating Aura's own
  // founding, an invented "18 months of production data" claim, and made-up client numbers matching
  // the fake case studies). Never repopulate with placeholder posts; only publish once we've written
  // something real. The blog page renders an honest "coming soon" state when this is empty.
  blogArticles: [],

  agentRun: [
    { t: 0, kind: "system", text: "agent.session :: id=run_8af3e2 model=claude-sonnet-4.5" },
    { t: 350, kind: "user", text: 'task: "Reconcile yesterday\'s payouts. Flag anything > $5k or > 3σ from the cohort baseline."' },
    { t: 1200, kind: "thought", text: "Decompose → fetch payouts, compute cohort baseline (μ, σ), filter, draft reconciliation note." },
    { t: 1900, kind: "tool", tool: "postgres.query", text: "SELECT id, member_id, amount, created_at FROM payouts WHERE day = $1", status: "ok", meta: "1,284 rows · 42ms" },
    { t: 2700, kind: "tool", tool: "math.stats", text: "compute(μ=412.30, σ=187.40, n=1284)", status: "ok", meta: "8ms" },
    { t: 3400, kind: "tool", tool: "slack.notify", text: '#finance-ops · "12 outliers flagged for review"', status: "ok", meta: "delivered" },
    { t: 4100, kind: "thought", text: "All checks passed. Drafting reconciliation summary for the CFO digest." },
    { t: 4900, kind: "output", text: "Reconciliation complete. 12 outliers flagged · 1 above-threshold (member_4419 · $7,420). Audit trail written." },
    { t: 5400, kind: "system", text: "session.end :: tokens=8,412 · cost=$0.083 · duration=5.4s" },
  ],

  ownProducts: [
    {
      id: "snehalata",
      name: "Snehalata",
      tagline: "AI-Powered Clothing Ecosystem",
      taglineBn: "এআই-চালিত ক্লথিং ইকোসিস্টেম",
      description:
        "Aura's own multi-vendor clothing marketplace for Bangladesh. Vendors register, list products, and sell — while Gemini AI handles style refinement, virtual try-on, fraud audits, and a 24/7 Bengali-language chat assistant. Built end-to-end on Aura's stack.",
      descriptionBn:
        "বাংলাদেশের জন্য Aura-র নিজস্ব multi-vendor ক্লথিং মার্কেটপ্লেস। Vendor-রা রেজিস্টার করে, প্রোডাক্ট লিস্ট করে, বিক্রি করে — আর Gemini AI স্টাইল রিফাইনমেন্ট, ভার্চুয়াল ট্রাই-অন, fraud audit, এবং ২৪/৭ বাংলা চ্যাট অ্যাসিস্ট্যান্ট সামলায়। সম্পূর্ণ Aura-র নিজের স্ট্যাকে তৈরি।",
      url: "https://www.snehalata.com",
      badge: "Ecosystem",
      stack: ["SvelteKit", "Supabase", "Gemini AI", "Tailwind", "Vercel"],
      features: [
        "Multi-vendor marketplace with AI-powered vendor onboarding audit",
        "Gemini-powered virtual try-on and style transfer for every product",
        "24/7 Bengali AI chat assistant for shopping guidance",
        "Bangladesh district-level vendor & product filtering",
        "Full order lifecycle: placement → quality check → delivery tracking",
        "CEO & vendor dashboards with real-time ecosystem stats",
      ],
      featuresBn: [
        "এআই-চালিত vendor onboarding audit সহ multi-vendor মার্কেটপ্লেস",
        "প্রতিটা প্রোডাক্টের জন্য Gemini-চালিত ভার্চুয়াল ট্রাই-অন ও স্টাইল ট্রান্সফার",
        "শপিং গাইডেন্সের জন্য ২৪/৭ বাংলা এআই চ্যাট অ্যাসিস্ট্যান্ট",
        "বাংলাদেশ জেলা-ভিত্তিক vendor ও প্রোডাক্ট ফিল্টারিং",
        "সম্পূর্ণ অর্ডার লাইফসাইকেল: অর্ডার → কোয়ালিটি চেক → ডেলিভারি ট্র্যাকিং",
        "রিয়েল-টাইম ইকোসিস্টেম পরিসংখ্যান সহ CEO ও vendor ড্যাশবোর্ড",
      ],
      color: "violet",
    },
    {
      id: "glamourstouch",
      name: "Glamours Touch",
      tagline: "Beauty & Lifestyle E-Commerce",
      taglineBn: "বিউটি ও লাইফস্টাইল ই-কমার্স",
      description:
        "Aura's own live e-commerce brand in the beauty & lifestyle space. We built it, we run it, we sell from it — end to end. Custom storefront, product catalog, cart, payment integration, and admin dashboard. Not a demo. A real business.",
      descriptionBn:
        "বিউটি ও লাইফস্টাইল সেক্টরে Aura-র নিজস্ব লাইভ ই-কমার্স ব্র্যান্ড। আমরাই বানিয়েছি, আমরাই চালাই, আমরাই বিক্রি করি — শুরু থেকে শেষ পর্যন্ত। কাস্টম স্টোরফ্রন্ট, প্রোডাক্ট ক্যাটালগ, কার্ট, পেমেন্ট ইন্টিগ্রেশন, এবং অ্যাডমিন ড্যাশবোর্ড। কোনো ডেমো না। একটা আসল ব্যবসা।",
      url: "https://glamourstouch.com",
      badge: "Live Product",
      stack: ["React", "Vite", "Supabase", "Tailwind", "Vercel"],
      features: [
        "560+ product catalog with real stock and discount pricing",
        "Cash on delivery across Bangladesh, order tracking built in",
        "WhatsApp & Messenger sales bot answering customers 24/7 in Bengali",
        "Mobile-first responsive storefront design",
        "Admin dashboard for orders, products & analytics",
        "Daily automated Facebook product posts — no manual posting",
      ],
      featuresBn: [
        "৫৬০+ প্রোডাক্ট ক্যাটালগ, আসল স্টক ও ছাড়ের দাম সহ",
        "পুরো বাংলাদেশে cash on delivery, order tracking বিল্ট-ইন",
        "WhatsApp ও Messenger সেলস বট ২৪/৭ বাংলায় কাস্টমারদের উত্তর দেয়",
        "মোবাইল-ফার্স্ট রেসপনসিভ স্টোরফ্রন্ট ডিজাইন",
        "অর্ডার, প্রোডাক্ট ও অ্যানালিটিক্সের জন্য অ্যাডমিন ড্যাশবোর্ড",
        "দৈনিক স্বয়ংক্রিয় Facebook প্রোডাক্ট পোস্ট — ম্যানুয়াল পোস্টিং লাগে না",
      ],
      color: "rose",
    },
  ],

  // Empty on purpose -- the old array here was fabricated (invented clients, quotes and metrics
  // like "FinSync BD" and "AlphaEdge Capital" that never existed). Never repopulate with placeholder
  // content; only add a case study once a real, verifiable project is done. The CaseStudiesPage
  // component renders an honest "new agency, real results coming soon" state when this is empty.
  caseStudies: [],

  // Real Aura milestones, dated -- not an individual's job history. Add a new entry only when
  // something actually, verifiably happened; never backfill a "years of experience" narrative.
  experience: [
    {
      year: "Aug 2026",
      role: "Meta Tech Provider status",
      roleBn: "Meta Tech Provider status অর্জন",
      company: "Aura Ajentic AI",
      kind: "Milestone",
      kindBn: "মাইলফলক",
      detail: "Approved to onboard other businesses' WhatsApp Business numbers, on top of our own.",
      detailBn: "নিজের ছাড়াও অন্য ব্যবসার WhatsApp Business নম্বর onboard করার অনুমোদন পেয়েছি।",
    },
    {
      year: "Aug 2026",
      role: "WhatsApp Business API approved",
      roleBn: "WhatsApp Business API অনুমোদিত",
      company: "Aura Ajentic AI",
      kind: "Milestone",
      kindBn: "মাইলফলক",
      detail: "Meta approved our WhatsApp messaging integration — our own sales bot went fully live.",
      detailBn: "Meta আমাদের WhatsApp messaging integration অনুমোদন করেছে — আমাদের নিজের sales বট পুরোপুরি live হয়েছে।",
    },
    {
      year: "Jul 2026",
      role: "First paying client signed",
      roleBn: "প্রথম paying client",
      company: "Applix BD",
      kind: "Client",
      kindBn: "ক্লায়েন্ট",
      detail: "A Dhaka mobile-parts retailer became our first client — automated their Facebook posting and ad ops.",
      detailBn: "ঢাকার একটা mobile-parts retailer আমাদের প্রথম client হন — তাদের Facebook posting আর ad কাজ automate করেছি।",
    },
    {
      year: "Jul 2026",
      role: "Aura Ajentic AI founded",
      roleBn: "Aura Ajentic AI প্রতিষ্ঠা",
      company: "Dhaka, Bangladesh",
      kind: "Founding",
      kindBn: "প্রতিষ্ঠা",
      detail: "Started building our own live products first — Glamour's Touch (K-beauty e-commerce) and Snehalata (AI marketplace) — before pitching anyone else.",
      detailBn: "আগে নিজেদের live প্রোডাক্ট বানানো শুরু করি — Glamour's Touch (K-beauty e-commerce) আর Snehalata (AI marketplace) — অন্য কাউকে pitch করার আগেই।",
    },
  ],
};

window.PORTFOLIO_DATA = PORTFOLIO_DATA;
