// Content for the portfolio
const PORTFOLIO_DATA = {
  brand: {
    name: "Aura Agentic AI",
    handle: "@aura",
    title: "Agentic AI & Full-Stack Development",
    titleBn: "এজেন্টিক এআই ও ফুল-স্ট্যাক ডেভেলপমেন্ট",
    tagline: "We build AI agents, automation & enterprise systems that work 24/7.",
    taglineBn: "আমরা AI এজেন্ট, অটোমেশন ও এন্টারপ্রাইজ সিস্টেম তৈরি করি যা ২৪/৭ কাজ করে।",
    location: "Dhaka, Bangladesh · Remote",
    yearsExp: 7,
    email: "hello@auraajenticai.cloud",
    domain: "auraajenticai.cloud",
    socials: {
      github: "https://github.com",
      linkedin: "https://linkedin.com",
      twitter: "https://twitter.com",
    },
  },

  metrics: [
    { label: "Years shipping", value: "7+" },
    { label: "Agents in production", value: "40+" },
    { label: "Enterprise clients", value: "12" },
    { label: "Uptime maintained", value: "99.98%" },
  ],

  about: {
    pitch: "I build the systems that act on behalf of teams — agents that triage, route, decide, and execute. The work spans the full stack: model orchestration, eval harnesses, queue infrastructure, dashboards, on-chain settlement, and the tedious connective tissue that turns a clever demo into something a CFO will sign off on.",
    bullets: [
      "Designed agent runtimes for fintech & MLM platforms moving 8-figure GMV",
      "Built orchestration layers across OpenAI, Anthropic, vLLM, and self-hosted models",
      "Shipped Web3 settlement rails — wallets, signers, on-chain audit trails",
      "Lead architect on three SaaS dashboards now serving 50k+ daily users",
    ],
  },

  stack: {
    Frontend: [
      { name: "React", level: 98 },
      { name: "Next.js", level: 96 },
      { name: "TypeScript", level: 95 },
      { name: "Tailwind", level: 94 },
      { name: "Framer Motion", level: 88 },
    ],
    Backend: [
      { name: "Node.js", level: 96 },
      { name: "Python · FastAPI", level: 92 },
      { name: "PostgreSQL", level: 94 },
      { name: "Supabase", level: 90 },
      { name: "Redis · BullMQ", level: 88 },
    ],
    "AI / Agents": [
      { name: "LangGraph", level: 95 },
      { name: "OpenAI · Anthropic", level: 96 },
      { name: "Vector DBs", level: 90 },
      { name: "Eval harnesses", level: 86 },
      { name: "Tool routing", level: 92 },
    ],
    "Web3": [
      { name: "Solidity", level: 84 },
      { name: "ethers · viem", level: 90 },
      { name: "Wallet integrations", level: 92 },
      { name: "On-chain indexing", level: 80 },
    ],
    DevOps: [
      { name: "Docker", level: 92 },
      { name: "AWS · GCP", level: 88 },
      { name: "Vercel · Fly.io", level: 94 },
      { name: "GitHub Actions", level: 90 },
      { name: "Observability", level: 86 },
    ],
  },

  services: [
    {
      id: "web-app-dev",
      name: "Website & Webapp Development",
      nameBn: "ওয়েবসাইট ও ওয়েবঅ্যাপ ডেভেলপমেন্ট",
      kind: "Core Service",
      description:
        "From landing pages to full SaaS dashboards — pixel-perfect, fast, and built to scale. SvelteKit, Next.js, React, Tailwind.",
      stack: ["SvelteKit", "Next.js", "React", "Tailwind", "PostgreSQL"],
      impact: { primary: "50k+", secondary: "daily users served" },
      color: "violet",
    },
    {
      id: "ai-agent-automation",
      name: "AI Agent & Automation",
      nameBn: "এআই এজেন্ট ও অটোমেশন",
      kind: "Core Service",
      description:
        "Custom AI agents that triage, decide, and execute — integrated with your tools via n8n, Anthropic, and OpenAI.",
      stack: ["Anthropic Claude", "n8n", "LangGraph", "Node.js", "Hono"],
      impact: { primary: "1.2M+", secondary: "agent runs / month" },
      color: "cyan",
    },
    {
      id: "web3-blockchain",
      name: "Web3 & Blockchain",
      nameBn: "ওয়েব৩ ও ব্লকচেইন",
      kind: "Specialist Service",
      description:
        "Wallets, smart contracts, multi-chain bridges, and on-chain audit trails. Gasless UX that hides complexity from end users.",
      stack: ["Solidity", "viem", "wagmi", "Cloudflare Workers"],
      impact: { primary: "12 chains", secondary: "EVM + Solana" },
      color: "green",
    },
    {
      id: "mt5-ea-trading",
      name: "MT5 EA & Trading Automation",
      nameBn: "MT5 EA ও ট্রেডিং অটোমেশন",
      kind: "Specialist Service",
      description:
        "Expert Advisors, real-time P&L dashboards, risk envelopes, and one-click kill switches for MetaTrader 5 platforms.",
      stack: ["MQL5", "Go", "ClickHouse", "WebSockets", "React"],
      impact: { primary: "<80ms", secondary: "tick-to-render latency" },
      color: "amber",
    },
    {
      id: "scraping-data-pipeline",
      name: "Browser Scraping & Data Pipeline",
      nameBn: "ব্রাউজার স্ক্র্যাপিং ও ডেটা পাইপলাইন",
      kind: "Specialist Service",
      description:
        "Playwright/Puppeteer scrapers, proxy rotation, structured data extraction, and ETL pipelines into your DB or warehouse.",
      stack: ["Playwright", "Puppeteer", "Python", "Airflow", "PostgreSQL"],
      impact: { primary: "10M+", secondary: "records extracted / month" },
      color: "violet",
    },
    {
      id: "infra-devops",
      name: "Infrastructure & DevOps",
      nameBn: "ইনফ্রাস্ট্রাকচার ও ডেভঅপস",
      kind: "Specialist Service",
      description:
        "VPS setup, Docker, Coolify, Traefik, CI/CD pipelines, SSL, monitoring, and zero-downtime deploys on your own cloud.",
      stack: ["Docker", "Coolify", "Traefik", "GitHub Actions", "PostgreSQL"],
      impact: { primary: "99.98%", secondary: "uptime maintained" },
      color: "cyan",
    },
  ],

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

  experience: [
    {
      year: "2024 — Present",
      role: "Founder & Principal Engineer",
      company: "Aura Agentic Cloud",
      kind: "Product",
      detail: "Building the agent runtime layer — orchestration, evals, observability — used by 12 enterprise teams.",
    },
    {
      year: "2022 — 2024",
      role: "Staff Full-Stack Engineer",
      company: "Confidential · Fintech",
      kind: "Contract",
      detail: "Led the rebuild of an MLM compensation engine, ran the migration from monolith to multi-tenant.",
    },
    {
      year: "2021 — 2022",
      role: "Senior Engineer · Web3",
      company: "Stealth DeFi protocol",
      kind: "Contract",
      detail: "Wallet UX, signer abstraction, on-chain settlement rails. Shipped before the protocol announced.",
    },
    {
      year: "2019 — 2021",
      role: "Full-Stack Engineer",
      company: "Series-B SaaS",
      kind: "Full-time",
      detail: "Owned the dashboard surface area — billing, RBAC, integrations. Pushed app from 4k to 28k DAU.",
    },
    {
      year: "2018 — 2019",
      role: "Software Engineer",
      company: "Agency · Remote",
      kind: "Full-time",
      detail: "Cut my teeth shipping React + Node products across e-commerce, logistics, and edtech.",
    },
  ],
};

window.PORTFOLIO_DATA = PORTFOLIO_DATA;
