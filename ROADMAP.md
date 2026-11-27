# Portfolio roadmap

Goal: the site should help land a **Senior Full-stack Developer** role. A hiring manager should be able to verify the CV in five minutes and leave with questions for the interview.

Review date: 2026-11-27. The site is live at [perekopskyi.github.io](https://perekopskyi.github.io/) and deployed by GitHub Actions.

## Diagnosis

The design and code quality are strong: semantic markup, a skip link, reduced-motion support, content kept in `src/data/*`, Open Graph and JSON-LD, and CI deploy.

The content is weak for the senior level. There is no employment history, no project can be verified (no links, no stack), and half of "Selected work" is concepts. The design is about 90% done. The substance is about 30% done.

Legend: ⬜ todo · 🟡 in progress / PR open · ✅ done · ⏸ blocked on owner input

## P0 — before applying

| # | Item | Why | Status |
|---|------|-----|--------|
| 1 | **Fill in Experience** (`src/data/experience.ts`) — company or anonymised domain, title, dates, 2–3 measurable outcomes per role | "8+ years" without a single employer is the biggest red flag on the page | ⏸ needs data |
| 2 | **Separate shipped work from concepts** — Bracket Builder and Garden panel under "Selected work"; Performance Monitor and E2E Generator under a smaller "Exploring" block | Concepts next to production work read as padding | ⬜ |
| 3 | **Make projects verifiable** — live URL, repository, stack, a real screenshot for Bracket Builder and Garden panel | "10,000+ users" with no link proves nothing | ⏸ needs data |
| 4 | **Full name** in `<title>`, H1, JSON-LD, OG — match LinkedIn (Yevhenii Perekopskyi) | Recruiters search by full name and cross-check LinkedIn | ⬜ |
| 5 | **Download CV (PDF)** | Recruiters forward PDFs; no PDF means you get skipped | ⬜ |
| 6 | **Rewrite the Hero** with concrete positioning instead of generic words ("reliable, scalable, user-focused") | The first screen must say what you do and prove it | ⬜ |
| 7 | **Copy fixes** — trailing space in "Tournament Bracket Builder", role title aligned to "Senior Full-stack Engineer" | Small, but visible | ⬜ |

## P1 — what separates Senior from Middle

| # | Item | Why | Status |
|---|------|-----|--------|
| 8 | **Case study page** for Bracket Builder (and later Garden panel): problem and constraints, architecture diagram, key decisions and trade-offs, what went wrong, numbers | This is what I ask about in an interview. Have the answer on the page | ⏸ needs data |
| 9 | **Back every skill with evidence** — tie skills to projects or roles; drop non-skills ("Scalable applications") and tool names (Cursor, Devin) | NestJS, GraphQL, AWS Lambda, microservices are claimed but nothing on the page shows them | ⏸ needs data |
| 10 | **Engineering quality of the site itself** — Playwright smoke and accessibility tests, Lighthouse budget in CI, "Source of this site" link | Cheap, strong signal; Playwright is already listed as a skill | ⬜ |
| 11 | **Prerender HTML at build time** | Content is client-rendered only today; prerendering is required for case-study URLs and helps crawlers | ⬜ |
| 12 | Confirm the new site is deployed | — | ✅ Pages uses `workflow`, last deploy green |

## P2 — features that help hiring

| # | Feature | Value | Effort | Status |
|---|---------|-------|--------|--------|
| 13 | CV PDF generated from `src/data` at build time | One source of truth for site and CV; a good engineering story | S | ⬜ (ships with #5) |
| 14 | Live Bracket Builder metrics (public `/stats` endpoint) | Turns "10k users" into a verified fact and shows the backend | S–M | ⏸ needs API |
| 15 | "Ask about my experience" AI chat over the CV (serverless + LLM) | Shows full-stack and AI in one feature. Must be production-grade: rate limits, prompt-injection guard, answers only from provided facts, cost cap | M–L | ⬜ |
| 16 | 2–3 engineering notes ("Building X in two months with AI agents: what worked") | Gives the interviewer a topic, shows written thinking | M | ⏸ needs writing |
| 17 | Cal.com booking link in Contact | Removes an email round-trip | XS | ⏸ needs link |
| 18 | Dark mode, active-section highlight in nav | Nice, minor hiring impact | S | ⬜ |

## Do not add

Skill progress bars, typing animations, 3D, fabricated testimonials, a command palette for its own sake. At senior level these read as noise.

## Data needed from the owner

- [ ] Employment history: company (or anonymised domain + team size), title, dates, outcomes with numbers
- [ ] Bracket Builder: live URL, repo (if public), stack, screenshot, how "10,000+ users" is measured
- [ ] Garden panel: live/demo URL, repo, screenshot
- [ ] Confirm full-name spelling: Yevhenii Perekopskyi
- [ ] Cal.com (or similar) link, if wanted
- [ ] Where NestJS, GraphQL, AWS Lambda, microservices were used

## Execution log

One branch and one pull request per item. PRs are listed here as they open.

| PR | Branch | Covers |
|----|--------|--------|
| — | `docs/roadmap` | this file |
