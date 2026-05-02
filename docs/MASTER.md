# Aura Agentic AI Cloud — MASTER.md
> Single source of truth for the entire infrastructure.  
> **Last updated:** 2026-05-02 | **VPS:** root@195.35.7.154  
> ⚠ Credentials are referenced by location only — never pasted here.

---

## 1. VPS

| Field | Value |
|-------|-------|
| Provider | Hostinger KVM 2 |
| Hostname | srv1540635.hstgr.cloud |
| IP | 195.35.7.154 |
| OS | Ubuntu 24.04.4 LTS |
| Kernel | 6.8.0-110-generic x86-64 |
| CPU | 2× vCPU (AMD EPYC, KVM) |
| RAM | 7.8 GB (4.2 GB used) |
| Disk | 96 GB SSD (36 GB used · 61 GB free · 38%) |
| Swap | 4 GB (256 KB used) |
| SSH Key | C:\Users\Masud\.ssh\id_ed25519 |

---

## 2. Live Services & URLs

### Coolify Services

| UUID | Service | URL | Status |
|------|---------|-----|--------|
| `dhcia3tgcvwmwwvexznjw9gr` | OpenClaw (Primary Agent) | https://agent.auraajenticai.cloud | ✅ Healthy |
| `m10jif2sbykx4hd33qf97hc6` | OpenClaw (Secondary / App) | https://app.auraajenticai.cloud | ✅ Healthy |
| `j9pqq74tuik1oqd5runx5ncb` | n8n + PostgreSQL + Task Runners | https://n8n.auraajenticai.cloud | ✅ Healthy |
| `oqwgsn2lcv3hsk13c6ayj8du` | Gitea + PostgreSQL | https://git.auraajenticai.cloud | ✅ Healthy |

### Coolify Applications

| UUID | App | URL | Commit | Status |
|------|-----|-----|--------|--------|
| `q2kkhvkrpdm6ukj20gv69tuk` | Public Site | https://auraajenticai.cloud | a2a11b4 | ⚠ Pending pull (demo URLs commit not yet applied via Coolify) |
| `g5ehpyu7i1azk7f1sv1bhctz` | Central Auth | https://auth.auraajenticai.cloud | 923435bf | ✅ Up |
| `m43q7n7vlttrzyxy5v2hkaig` | API Gateway | https://api.auraajenticai.cloud | 8c2045a7 | ✅ Up |
| `rdqk1mqe0k8fifs64d7jrzfi` | Client Portal | https://client.auraajenticai.cloud | 03a90610 | ✅ Up |
| `j8xnv56xhx6wiaeal2bfiktm` | Billing | https://billing.auraajenticai.cloud | fd9aa384 | ✅ Up |
| `zu9kxa9iung19q003ybvcdj3` | Owner Dashboard | https://aura.auraajenticai.cloud | 2b652dba | ✅ Up |
| `m6fnc3kfy72tf77anuv4o2f4` | [Internal — UUID subdomain] | https://m6fnc3kfy72tf77anuv4o2f4.auraajenticai.cloud | 3df7af00 | ✅ Up |
| `rul16lgnv650ic5kv5wgd51h` | [Staging — no FQDN] | — | 03a90610 | — |
| `y22x4z5sxh3854tbmiv98s2j` | [Staging — no FQDN] | — | 03a90610 | — |
| `z24up798jcmaf4biwshx2kv5` | [Staging — no FQDN] | — | — | — |

### Coolify System

| Service | URL |
|---------|-----|
| Coolify Dashboard | https://coolify.auraajenticai.cloud (port 8000 local) |
| Traefik Dashboard | http://195.35.7.154:8080/dashboard/ ⚠ publicly accessible |
| Coolify Version | 4.0.0-beta.473 (Laravel 12.55.1) |
| Traefik Version | v3.6 |

---

## 3. Complete Tech Stack

### Infrastructure
- **Reverse Proxy:** Traefik v3.6 (HTTP :80 → HTTPS :443, Let's Encrypt cert resolver)
- **Orchestration:** Coolify 4.0.0-beta.473 (self-hosted)
- **Git:** Gitea v1.26.0 (SSH :22222, HTTP git.auraajenticai.cloud)
- **Containers:** Docker + Docker Compose
- **OS:** Ubuntu 24.04.4 LTS

### AI / Agents
- **Agent Runtime:** OpenClaw v2026.2.6
- **Primary Model:** `openrouter/anthropic/claude-sonnet-4.5`
- **AI Provider:** OpenRouter (key in Coolify .env)
- **Additional Providers:** Google Gemini (GEMINI_API_KEY set), Groq (GROQ_API_KEY set)
- **Channels:** Telegram (@tradingbanglaajentic_bot — long-polling)
- **Agent Tools:** read, edit, write, exec, browser, canvas, nodes, cron, message, sessions, web_search, memory

### Automation
- **n8n:** v2.10.2 + Task Runners 2.10.2
- **Webhooks:** https://n8n.auraajenticai.cloud/webhook/*

### Frontend
- **Public Site:** React 18 + Babel Standalone (CDN, no build step)
- **Dashboard/Apps:** SvelteKit 2 + Svelte 5 runes + Tailwind CSS + Vite
- **Fonts:** Geist, Geist Mono, Instrument Serif (Google Fonts)

### Backend
- **Auth Service:** Hono + Drizzle ORM + JWT + bcrypt (SvelteKit adapter-node)
- **API:** Node.js / Hono
- **Language:** TypeScript throughout

### Databases

| DB | Container | Engine | Database Name | Network IP |
|----|-----------|--------|---------------|------------|
| Auth/Main | `ernix50nvuq9ur9jy8na8tgr` | Supabase Postgres 17.4 | `aura_auth` | 10.0.1.7:5432 |
| n8n | `postgresql-j9pqq74tuik1oqd5runx5ncb` | Postgres 16-alpine | `n8n` | internal |
| Gitea | `postgresql-oqwgsn2lcv3hsk13c6ayj8du` | Postgres 16-alpine | `gitea` | internal |
| Coolify | `coolify-db` | Postgres 15-alpine | `coolify` | internal |
| Document | `b3bhfd7bocb4pm36uv36rebq` | MongoDB 7 | *(various)* | :27017 |
| Cache | `coolify-redis` | Redis 7-alpine | — | internal |

### aura_auth DB Schema
Tables: `users`, `sessions`, `api_keys`, `audit_logs`, `clients`, `projects`, `skills`, `invoices`

---

## 4. OpenClaw Configuration (Primary — `dhcia3tgcvwmwwvexznjw9gr`)

```
AI Provider:     OpenRouter
Primary Model:   openrouter/anthropic/claude-sonnet-4.5
Secondary Model: anthropic/claude-3.5-haiku  (env var, secondary/fast not in schema)
Fast Model:      anthropic/claude-3-haiku     (env var)
Gateway:         ws://127.0.0.1:18789 (loopback, behind nginx on :8080)
Auth mode:       token (OPENCLAW_GATEWAY_TOKEN)
nginx auth:      SERVICE_USER_OPENCLAW / SERVICE_PASSWORD_OPENCLAW
```

### Telegram Channel
```
Bot username:  @tradingbanglaajentic_bot
Bot ID:        8736690733
Mode:          long-polling (no webhook URL set)
Status:        enabled, configured, running
Channel name:  default
Token env:     TELEGRAM_BOT_TOKEN (in Coolify service .env)
```
> To test: send any message to @tradingbanglaajentic_bot on Telegram.
> OpenClaw routes it to the main agent session → claude-sonnet-4.5 → reply back.

### Workspace Files
Located at: `/var/lib/docker/volumes/dhcia3tgcvwmwwvexznjw9gr_openclaw-data/_data/workspace/`

| File | Purpose |
|------|---------|
| AGENTS.md | Agent routing rules and capabilities |
| BOOTSTRAP.md | Startup context injected every session |
| HEARTBEAT.md | Scheduled check-in instructions |
| IDENTITY.md | Agent persona and identity rules |
| SOUL.md | Core values and behavioral constraints |
| TOOLS.md | Available tool descriptions |
| USER.md | User (Khondokar) profile and preferences |

---

## 5. n8n Workflows

URL: https://n8n.auraajenticai.cloud  
Contact webhook: `POST https://n8n.auraajenticai.cloud/webhook/contact`

| Workflow ID | Name |
|-------------|------|
| `j2JZuCcx38n6hFUa` | skill-code-review |
| `ICKS1V8j0rfFRCAM` | skill-analyze |
| `tza1cNW0fCZhMd63` | skill-draft-email |
| `1FtaniVPKRBKNDwX` | invoice-overdue-checker |
| `MeuMN9zV0m2SlPeV` | skill-summarize |
| `l2CkZKPgnSyt3Nvt` | Generate AI viral videos (NanoBanana + VEO3 → Blotato) |
| `zLqHh5sJ6rT7lyGU` | new-client-deployment |
| `sX0KPnr4c0Zh138d` | contact-form |
| `8kjRU6YNvtJpcpTD` | client-onboarding |
| `m4AB1XlfpvgmNmLF` | api-usage-weekly-report |

---

## 6. Gitea Repositories

Host: https://git.auraajenticai.cloud  
User: `khondokar`  
Token location: `C:\Users\Masud\.claude\projects\C--Users-Masud-aura\memory\project_aura_infrastructure.md`

| Repo | URL | Last Updated |
|------|-----|-------------|
| khondokar/auraajenticai-main | git.auraajenticai.cloud/khondokar/auraajenticai-main | 2026-04-27 |

### GitHub Mirrors (github.com/khondokartowsif171)

| Repo | GitHub URL | Notes |
|------|-----------|-------|
| auraajenticai-main | github.com/khondokartowsif171/auraajenticai-main | Main site — latest commit a2a11b4 (demo URLs) |
| demo-autostudio-ecomercewebsite | github.com/khondokartowsif171/demo-autostudio-ecomercewebsite | Vite/React ecommerce |
| demo-agenticai-website | github.com/khondokartowsif171/demo-agenticai-website | Static HTML portfolio |
| demo-cryptotradeanalysis-website | github.com/khondokartowsif171/demo-cryptotradeanalysis-website | React crypto dashboard |
| demo-ea-dashboard | github.com/khondokartowsif171/demo-ea-dashboard | Static HTML XAUUSD analyzer |
| demo-portfolio-website | github.com/khondokartowsif171/demo-portfolio-website | Vite/React portfolio |

---

## 7. Important File Paths

### On VPS (root@195.35.7.154)

```
/docs/MASTER.md                                     ← this file

# Coolify data root
/data/coolify/applications/{uuid}/                  ← per-app: .env + docker-compose.yaml
/data/coolify/services/{uuid}/                      ← per-service: .env + docker-compose.yaml
/data/coolify/proxy/                                ← Traefik dynamic config
/data/coolify/ssh/                                  ← SSH keys for deployments

# OpenClaw Primary (dhcia3tgcvwmwwvexznjw9gr)
/var/lib/docker/volumes/dhcia3tgcvwmwwvexznjw9gr_openclaw-data/_data/
  .openclaw/openclaw.json                           ← main config (auto-managed by entrypoint)
  .openclaw/openclaw.json.bak                       ← backup (up to 4 kept)
  .openclaw/credentials/                            ← API keys/tokens (never edit directly)
  .openclaw/agents/main/sessions/sessions.json      ← conversation history
  workspace/                                        ← agent workspace (AGENTS.md, SOUL.md, etc.)

# Service .env files (credentials)
/data/coolify/services/dhcia3tgcvwmwwvexznjw9gr/.env   ← OpenClaw primary
/data/coolify/services/m10jif2sbykx4hd33qf97hc6/.env   ← OpenClaw secondary
/data/coolify/services/j9pqq74tuik1oqd5runx5ncb/.env   ← n8n + DB
/data/coolify/services/oqwgsn2lcv3hsk13c6ayj8du/.env   ← Gitea
/data/coolify/applications/{uuid}/.env                 ← per-app credentials
```

### On Local (Windows — C:\Users\Masud\)

```
.ssh/id_ed25519                                    ← VPS SSH private key

.claude/settings.json                              ← MCP servers + API keys
.claude/projects/C--Users-Masud-aura/
  memory/MEMORY.md                                 ← Memory index
  memory/project_aura_infrastructure.md            ← Infra notes (has tokens)
  memory/user_khondokar.md                         ← Founder profile

aura/
  auraajenticai-main/                              ← Public site source (git)
    src/data.jsx                                   ← All content + brand data
    src/nav.jsx                                    ← Navigation + lang toggle
    src/hero.jsx                                   ← Hero section
    src/app.jsx                                    ← Root app + lang state
    src/projects.jsx                               ← Services grid (6 cards)
    src/timeline-contact.jsx                       ← Timeline, contact form, footer
    src/agent-showcase.jsx                         ← Agent demo terminal
    index.html                                     ← Entry point + CSS vars
    Dockerfile                                     ← nginx:1.27-alpine
    nginx.conf                                     ← JSX MIME fix + gzip + SPA
  
  aura-dashboard/                                  ← Owner Dashboard (SvelteKit 2)
  n8n-mcp/index.js                                 ← Custom n8n MCP server
```

---

## 8. Credentials Locations (NOT values)

| Credential | Location |
|-----------|---------|
| VPS root password | Hostinger dashboard (hostinger.com) |
| SSH private key | C:\Users\Masud\.ssh\id_ed25519 |
| Coolify API token | memory/project_aura_infrastructure.md |
| Gitea token (khondokar) | memory/project_aura_infrastructure.md |
| OpenRouter API key | /data/coolify/services/dhcia3tgcvwmwwvexznjw9gr/.env → OPENROUTER_API_KEY |
| Telegram bot token | /data/coolify/services/dhcia3tgcvwmwwvexznjw9gr/.env → TELEGRAM_BOT_TOKEN |
| OpenClaw gateway token | /data/coolify/services/dhcia3tgcvwmwwvexznjw9gr/.env → SERVICE_PASSWORD_64_GATEWAYTOKEN |
| OpenClaw nginx auth | /data/coolify/services/dhcia3tgcvwmwwvexznjw9gr/.env → SERVICE_USER/PASSWORD_OPENCLAW |
| Gemini API key | /data/coolify/services/dhcia3tgcvwmwwvexznjw9gr/.env → GEMINI_API_KEY |
| Groq API key | /data/coolify/services/dhcia3tgcvwmwwvexznjw9gr/.env → GROQ_API_KEY |
| n8n admin credentials | /data/coolify/services/j9pqq74tuik1oqd5runx5ncb/.env |
| Cloudflare token (n8n) | /data/coolify/services/j9pqq74tuik1oqd5runx5ncb/.env → CLOUDFLARE_TOKEN |
| Cloudflare Zone ID | /data/coolify/services/j9pqq74tuik1oqd5runx5ncb/.env → CLOUDFLARE_ZONE_ID |
| Supabase DB password | /data/coolify/databases/ernix50nvuq9ur9jy8na8tgr/ or service .env |
| MongoDB auth | /data/coolify/databases/b3bhfd7bocb4pm36uv36rebq/ |
| JWT secret (shared) | application UUID g5ehpyu7... .env |
| aura_auth DB password | application UUIDs (dashboard apps) .env → DATABASE_URL |
| Claude Code API key | C:\Users\Masud\.claude\settings.json |
| n8n MCP API key | C:\Users\Masud\.claude\settings.json |

---

## 9. MCP Tools Status

Configured in: `C:\Users\Masud\.claude\settings.json`

| MCP Server | Status | Key Tools |
|-----------|--------|-----------|
| **Coolify** (`04a4937c-...`) | ✅ Connected | d1_database_*, kv_namespace_*, r2_bucket_*, workers_* |
| **Gitea** | ✅ Connected | issue_*, pull_request_*, repo_*, user_* |
| **n8n** (local node server) | ✅ Connected | list_workflows, execute_workflow, set_workflow_active |
| **Google Calendar** (`c00adf3f-...`) | ✅ Connected | list_events, create_event, update_event |
| **Gmail** (`0525003c-...`) | ✅ Connected | search_threads, get_thread, create_draft |
| **Google Drive** (`d51cbec6-...`) | ✅ Connected | read_file_content, search_files, create_file |
| **Vercel** (`39a5e89f-...`) | ✅ Connected | list_projects, list_deployments, get_runtime_logs |
| **Claude Preview** | ✅ Available | preview_start, preview_screenshot, preview_eval |
| **Computer Use** | ✅ Available | screenshot, left_click, type, key, scroll |
| **Claude-in-Chrome** | ✅ Available | navigate, find, read_page, javascript_tool |

---

## 10. Phase Completion Status

| Phase | Description | Status | Completed |
|-------|-------------|--------|-----------|
| **0** | VPS audit, health report, swap configured, baseline | ✅ Complete | 2026-04-26 |
| **1** | Central Auth Service (SvelteKit + Hono + Drizzle + JWT + bcrypt) | ✅ Complete | 2026-04-26 |
| **2** | Owner Dashboard upgrade (sidebar nav, auth gate, Clients CRUD, Brain Console) | ✅ Complete | 2026-04-27 |
| **3** | Public site (auraajenticai.cloud) — bilingual EN/BN, 6 services, n8n contact form | ✅ Complete | 2026-04-27 |
| **4** | OpenClaw AI Agent — OpenRouter + claude-sonnet-4.5 + model ID fix | ✅ Complete | 2026-04-30 |
| **5** | Telegram integration — @tradingbanglaajentic_bot wired to OpenClaw agent | ✅ Complete | 2026-05-01 |
| **6** | Client portal (client.auraajenticai.cloud) | ✅ Deployed | — |
| **7** | API gateway (api.auraajenticai.cloud) | ✅ Deployed | — |
| **8** | Billing service (billing.auraajenticai.cloud) | ✅ Deployed | — |
| **9** | n8n automation (10 workflows: skills, contact, onboarding, invoice, AI video) | ✅ Active | — |
| **10** | DB backups, monitoring, Traefik hardening, OpenClaw secondary model config | ⏳ Pending | — |
| **11** | Demo projects — 5 Vercel deployments, GitHub repos, live demo buttons on public site | ✅ Complete | 2026-05-02 |

---

## 11. Pending / Known Gaps

### High Priority
- [ ] **Phase 10:** Automated DB backups (no crontab yet — data loss risk)
- [ ] **Traefik dashboard** `:8080` is publicly accessible — restrict to VPN/IP allowlist
- [ ] **OpenClaw secondary** (`app.auraajenticai.cloud` — `m10jif2sbykx4hd33qf97hc6`) has no `OPENCLAW_PRIMARY_MODEL` set
- [ ] **ANTHROPIC_API_KEY** not set in Owner Dashboard app (required for Brain Console feature)
- [ ] **Telegram live test** — send `/start` to @tradingbanglaajentic_bot to verify full round-trip
- [ ] **Public site — pull & rebuild** — commit `a2a11b4` (demo URLs) is on GitHub but NOT yet pulled into VPS/Coolify. Run from Hostinger console (see §13)
- [ ] **Cloudflare DNS** — `auraajenticai.cloud` A record still points to VPS (195.35.7.154). Vercel domain added (`auraajenticai-main` project) but DNS not yet switched. Need `A → 76.76.21.21` + `www CNAME → cname.vercel-dns.com`. Cloudflare token at `/data/coolify/services/j9pqq74tuik1oqd5runx5ncb/.env → CLOUDFLARE_TOKEN`

### Medium Priority
- [ ] Set up disk/memory monitoring (no alerting configured)
- [ ] Configure Traefik rate limiting on API gateway
- [ ] Gitea webhook → Coolify auto-deploy (currently triggered manually)
- [ ] n8n workflow active/inactive status audit (10 workflows, status not confirmed per-item)
- [ ] MongoDB — confirm root credentials and access restriction

### Low Priority
- [ ] `www.auraajenticai.cloud` CNAME redirect to apex
- [ ] Log retention policy for OpenClaw gateway logs (`/tmp/openclaw/`)
- [ ] Document aura_auth DB migration history
- [ ] Add `app.auraajenticai.cloud` source repo to Gitea

---

## 12. Auth Service Details

```
URL:            https://auth.auraajenticai.cloud
Container UUID: g5ehpyu7i1azk7f1sv1bhctz
Container IP:   10.0.1.12
Framework:      SvelteKit + Hono + Drizzle + JWT + bcrypt
DB:             Supabase Postgres 17.4 @ 10.0.1.7:5432/aura_auth
Cookies:
  aura_access   → 15-min JWT
  aura_refresh  → 7-day (path /api/auth/refresh)
Cookie domain:  .auraajenticai.cloud
Login URL:      https://auth.auraajenticai.cloud/login?next=<URL>
```

---

## 13. Quick Reference Commands

```bash
# SSH to VPS
ssh root@195.35.7.154

# All containers + status
docker ps --format 'table {{.Names}}\t{{.Status}}\t{{.Image}}'

# OpenClaw — live logs (primary)
docker logs openclaw-dhcia3tgcvwmwwvexznjw9gr --tail=30 -f

# OpenClaw — test agent
docker exec openclaw-dhcia3tgcvwmwwvexznjw9gr \
  openclaw agent --message "ping" --session-id main --json

# OpenClaw — Telegram channel status
docker exec openclaw-dhcia3tgcvwmwwvexznjw9gr openclaw channels status

# OpenClaw — restart with updated env
cd /data/coolify/services/dhcia3tgcvwmwwvexznjw9gr
docker compose up openclaw --force-recreate -d

# n8n — list workflows
docker exec n8n-j9pqq74tuik1oqd5runx5ncb n8n list:workflow

# Disk usage
df -h / && du -sh /var/lib/docker/volumes/*openclaw* /data/coolify/

# Check all service domains
for d in /data/coolify/services/*/; do
  uuid=$(basename $d)
  fqdn=$(grep SERVICE_FQDN= $d/.env 2>/dev/null | cut -d= -f2)
  echo "$uuid: $fqdn"
done
```

---

---

## 14. Vercel Deployments (2026-05-02)

Team: `khondokartowsif171s-projects` (`team_9DzpWOXgLFfZkFhpYL0QoKAO`)

| Project | Live URL | GitHub Repo | Notes |
|---------|----------|-------------|-------|
| auraajenticai-main | https://auraajenticai-main.vercel.app | khondokartowsif171/auraajenticai-main | Main site — domain `auraajenticai.cloud` added to project, DNS not yet switched |
| demo-autostudio-ecomercewebsite | https://demo-autostudio-ecomercewebsite.vercel.app | khondokartowsif171/demo-autostudio-ecomercewebsite | Linked to service card: Website & Webapp Dev |
| demo-agenticai-website | https://demo-agenticai-website.vercel.app | khondokartowsif171/demo-agenticai-website | Linked to: AI Agent & Automation |
| demo-cryptotradeanalysis-website | https://demo-cryptotradeanalysis-website.vercel.app | khondokartowsif171/demo-cryptotradeanalysis-website | Linked to: Web3 & Blockchain |
| ea-dashboard | https://ea-dashboard-blush.vercel.app | khondokartowsif171/demo-ea-dashboard | Linked to: MT5 EA & Trading |
| portfolio-website | https://portfolio-website-tan-six-24.vercel.app | khondokartowsif171/demo-portfolio-website | Linked to: Scraping & Data Pipeline |

### Demo URL → Service Card Mapping (`src/data.jsx`)
```
web-app-dev          → https://demo-autostudio-ecomercewebsite.vercel.app
ai-agent-automation  → https://demo-agenticai-website.vercel.app
web3-blockchain      → https://demo-cryptotradeanalysis-website.vercel.app
mt5-ea-trading       → https://ea-dashboard-blush.vercel.app
scraping-data-pipeline → https://portfolio-website-tan-six-24.vercel.app
infra-devops         → (no demo — button hidden)
```

---

## 15. VPS Console Commands (run from Hostinger web console)

Use when SSH from local machine is blocked by network routing issues.

```bash
# Pull latest main site source from GitHub into Coolify app dir
cd /data/coolify/applications/q2kkhvkrpdm6ukj20gv69tuk
git remote get-url github 2>/dev/null || \
  git remote add github https://github.com/khondokartowsif171/auraajenticai-main.git
git pull github main

# Also push to Gitea to keep it in sync
git push origin main

# Trigger Coolify rebuild for the public site
curl -s -X POST http://localhost:8000/api/v1/applications/q2kkhvkrpdm6ukj20gv69tuk/start \
  -H "Authorization: Bearer 6|aura-claude-ceo-2026-secret"

# Get Cloudflare token + zone ID for DNS update
grep -E "CLOUDFLARE_TOKEN|CLOUDFLARE_ZONE_ID" \
  /data/coolify/services/j9pqq74tuik1oqd5runx5ncb/.env

# Update Cloudflare DNS: point auraajenticai.cloud to Vercel (76.76.21.21)
# Replace ZONE_ID and TOKEN with values from above
CF_ZONE="ZONE_ID_HERE"
CF_TOKEN="TOKEN_HERE"
# Get existing A record ID
curl -s "https://api.cloudflare.com/client/v4/zones/$CF_ZONE/dns_records?type=A&name=auraajenticai.cloud" \
  -H "Authorization: Bearer $CF_TOKEN" | grep -o '"id":"[^"]*"' | head -1
# Update it (replace RECORD_ID)
curl -s -X PUT "https://api.cloudflare.com/client/v4/zones/$CF_ZONE/dns_records/RECORD_ID" \
  -H "Authorization: Bearer $CF_TOKEN" -H "Content-Type: application/json" \
  -d '{"type":"A","name":"auraajenticai.cloud","content":"76.76.21.21","ttl":1,"proxied":true}'
# Add www CNAME
curl -s -X POST "https://api.cloudflare.com/client/v4/zones/$CF_ZONE/dns_records" \
  -H "Authorization: Bearer $CF_TOKEN" -H "Content-Type: application/json" \
  -d '{"type":"CNAME","name":"www","content":"cname.vercel-dns.com","ttl":1,"proxied":false}'
```

---

*Generated by Claude (Aura AI Brain) on 2026-05-01. Updated 2026-05-02. Update this file after each infrastructure change.*
