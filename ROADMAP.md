# Portfolio roadmap

Goal: the site should help land a **Senior Full-stack Developer** role. A hiring manager should be able to verify the CV in five minutes and leave with questions for the interview.

Last updated: 2026-11-27. The site is live at [perekopskyi.github.io](https://perekopskyi.github.io/) and deploys from `main` through GitHub Actions after CI passes.

## Status at a glance

- **Done:** positioning, experience from the CV, prerendering, CV PDF, tests and Lighthouse in CI, Markdown lint. 10 of 19 items are closed.
- **Blocked on owner data:** #3 verifiable projects, #8 case study, #9 skill evidence (part), #14 live metrics, #16 notes, #17 booking link.
- **Open, no data needed:** #15 AI chat (needs an owner decision), #18 dark mode and nav highlight, #19 sitemap `lastmod`.

## Initial diagnosis (before the first pass)

The design and code quality are strong: semantic markup, a skip link, reduced-motion support, content kept in `src/data/*`, Open Graph and JSON-LD, and CI deploy.

The content is weak for the senior level. There is no employment history, no project can be verified (no links, no stack), and half of "Selected work" is concepts. The design is about 90% done. The substance is about 30% done.

Legend: ⬜ todo · 🟡 in progress / PR open · ✅ done · ⏸ blocked on owner input

## P0 — before applying

| # | Item | Why | Status |
| --- | ------ | ----- | -------- |
| 1 | **Fill in Experience** (`src/data/experience.ts`) — company or anonymised domain, title, dates, 2–3 measurable outcomes per role | "8+ years" without a single employer is the biggest red flag on the page | ✅ #8, from the CV |
| 2 | **Separate shipped work from concepts** — Bracket Builder and Garden panel under "Selected work"; Performance Monitor and E2E Generator under a smaller "Exploring" block | Concepts next to production work read as padding | ✅ #4 |
| 3 | **Make projects verifiable** — live URL, repository, stack, a real screenshot for Bracket Builder and Garden panel | "10,000+ users" with no link proves nothing | ⏸ needs data (Garden stack is in; no URLs anywhere yet) |
| 4 | **Full name** in `<title>`, H1, JSON-LD, OG — match LinkedIn (Yevhenii Perekopskyi) | Recruiters search by full name and cross-check LinkedIn | ✅ #4, spelling confirmed by the CV |
| 5 | **Download CV (PDF)** | Recruiters forward PDFs; no PDF means you get skipped | ✅ #7, #8; contacts are plain text since #12 |
| 6 | **Rewrite the Hero** with concrete positioning instead of generic words ("reliable, scalable, user-focused") | The first screen must say what you do and prove it | ✅ #4 |
| 7 | **Copy fixes** — trailing space in "Tournament Bracket Builder", role title aligned to "Senior Full-stack Engineer" | Small, but visible | ✅ #4 |

## P1 — what separates Senior from Middle

| # | Item | Why | Status |
| --- | ------ | ----- | -------- |
| 8 | **Case study page** for Bracket Builder (and later Garden panel): problem and constraints, architecture diagram, key decisions and trade-offs, what went wrong, numbers | This is what I ask about in an interview. Have the answer on the page | ⏸ needs data |
| 9 | **Back every skill with evidence** — tie skills to projects or roles; drop non-skills ("Scalable applications") and tool names (Cursor, Devin) | NestJS, GraphQL, AWS Lambda, microservices are claimed but nothing on the page shows them | 🟡 #8: skills match the CV, unbacked claims removed. ⏸ NestJS, GraphQL, AWS still lack a role bullet or project that shows them |
| 10 | **Engineering quality of the site itself** — Playwright smoke and accessibility tests, Lighthouse budget in CI, "Source of this site" link | Cheap, strong signal; Playwright is already listed as a skill | ✅ #6; Markdown lint added in #13 |
| 11 | **Prerender HTML at build time** | Content is client-rendered only today; prerendering is required for case-study URLs and helps crawlers | ✅ #5 |
| 12 | Confirm the new site is deployed | — | ✅ Pages uses `workflow`; deploys from `main` since #13 |

## P2 — features that help hiring

| # | Feature | Value | Effort | Status |
| --- | --------- | ------- | -------- | -------- |
| 13 | CV PDF generated from `src/data` at build time | One source of truth for site and CV; a good engineering story | S | ✅ #7 |
| 14 | Live Bracket Builder metrics (public `/stats` endpoint) | Turns "10k users" into a verified fact and shows the backend | S–M | ⏸ needs API |
| 15 | "Ask about my experience" AI chat over the CV (serverless + LLM) | Shows full-stack and AI in one feature. Must be production-grade: rate limits, prompt-injection guard, answers only from provided facts, cost cap | M–L | ⬜ |
| 16 | 2–3 engineering notes ("Building X in two months with AI agents: what worked") | Gives the interviewer a topic, shows written thinking | M | ⏸ needs writing |
| 17 | Cal.com booking link in Contact | Removes an email round-trip | XS | ⏸ needs link |
| 18 | Dark mode, active-section highlight in nav | Nice, minor hiring impact | S | 🟡 dark mode follows the system, with a moon/sun toggle in the header; nav marks the section in view. Also fixes sideways scroll at 360px (long contact links) |
| 19 | Generate `sitemap.xml` `lastmod` at build time (or drop it) | The hand-written date (2026-11-04) is already stale | XS | ✅ #15, generated at build; `lastmod` = last content commit |

## Do not add

Skill progress bars, typing animations, 3D, fabricated testimonials, a command palette for its own sake. At senior level these read as noise.

## Standing decisions

Carried over from the original implementation plan (2026-11-04), which is now retired. These still apply; change them deliberately, not by drift.

### Scope

- One page with in-page anchors, no client-side router. Revisit only for case-study URLs (#8); the prerender step from #5 is the base for that.
- English only. No analytics, no third-party scripts, no contact form, no backend for the page itself.
- The old HTML/CSS exercises (`/strict/`, `/YouTubeOnJS/`, …) were removed on purpose; they live in git history.

### Content honesty

- Concepts and experiments say so in a visible text label ("Concept", "Experiment") and describe what they *explore*, never what they *delivered*.
- Commercial or NDA work stays `published: false` until it can be described without breaking confidentiality.

### Design

- Editorial, not a SaaS template: warm paper ground, serif display (Fraunces, about weight 520) for the hero and section titles only, Public Sans for reading. One deep green accent for availability, links, and focus. Tokens live in `src/index.css`.
- Left-aligned, 1120px content width, hero not centered. Projects are full-width alternating rows with a large muted index instead of badges; skills are one quiet line per group, no pills; Contact is the single dark band.
- Motion: opacity plus a 12px rise, about 500 ms, ease-out, once. Sticky header with a hairline. No glow, gradient mesh, glassmorphism, or looping animation.
- Status is never conveyed by colour alone. Muted text keeps at least 4.5:1 contrast on paper.
- Dark mode follows `prefers-color-scheme` by default. A moon/sun icon button in the header, sized like the nav text, stores an explicit choice; an inline head script applies it before first paint, so the prerendered page never flashes the wrong theme. Choosing the system theme clears the stored choice. Both themes keep the same roles: warm paper, ink, one green accent. Contact stays the one inverted band.
- The page never scrolls sideways down to 320px wide; e2e checks 320, 360, and Pixel 7 widths.

### Performance

- Fonts are self-hosted, latin subset, `font-display: swap`, only the weights in use.
- When a bitmap screenshot replaces an SVG cover (#3): store it in `public/projects/`, set explicit `width` and `height`, `decoding="async"`, and `loading="lazy"` on every card except the first. Keep the Lighthouse budget green.
- Framer Motion is the only animation dependency. Revisit if the bundle grows.

## Data needed from the owner

- [x] Employment history — taken from the CV (#8)
- [ ] Bracket Builder: live URL, repo (if public), stack, screenshot, how "10,000+ users" is measured
- [ ] Garden panel: live/demo URL, repo, screenshot
- [x] Full-name spelling — confirmed by the CV
- [ ] Cal.com (or similar) link, if wanted
- [ ] Where NestJS, GraphQL, and AWS were used (a project or a role bullet). AWS Lambda and microservices were dropped

## Execution log

One branch and one pull request per item. #4–#8 and #10–#11 were stacked and merged in order. The default branch was `master` until #13 renamed it to `main`; the table keeps the names used at the time. All PRs below are merged.

| PR | Branch | Base | Covers | Result |
| ---- | -------- | ------ | -------- | -------- |
| [#3](https://github.com/perekopskyi/perekopskyi.github.io/pull/3) | `docs/roadmap` | `master` | this file | — |
| [#4](https://github.com/perekopskyi/perekopskyi.github.io/pull/4) | `feat/content-positioning` | `master` | #2, #4, #6, #7 | Full name, Senior Full-stack role, concrete hero, Exploring block, meta tags generated from `site.ts`, new OG image, source link |
| [#5](https://github.com/perekopskyi/perekopskyi.github.io/pull/5) | `feat/prerender` | #4 | #11 | 20 kB of prerendered HTML; the page reads with JS disabled; hydration-safe `Reveal` |
| [#6](https://github.com/perekopskyi/perekopskyi.github.io/pull/6) | `ci/e2e-and-lighthouse` | #5 | #10 | 11 Playwright + axe checks on desktop and mobile; Lighthouse 100/100/100/100; deploy gated on CI; CI green |
| [#7](https://github.com/perekopskyi/perekopskyi.github.io/pull/7) | `feat/cv-pdf` | #6 | #5, #13 | ATS-friendly PDF from `src/data`; download link gated on published roles |
| [#8](https://github.com/perekopskyi/perekopskyi.github.io/pull/8) | `feat/experience-from-cv` | #7 | #1, #9 (part) | LOW6, ArtMyWeb, Upwork, education, languages; Experience moved after About; skills match the CV; CV download is live |
| [#9](https://github.com/perekopskyi/perekopskyi.github.io/pull/9) | `docs/roadmap` | `master` | this file | Roadmap status after the CV import |
| [#10](https://github.com/perekopskyi/perekopskyi.github.io/pull/10) | `refactor/components-arrow-props` | `master` | code quality | Components follow the component rules; prerendered HTML byte-identical |
| [#11](https://github.com/perekopskyi/perekopskyi.github.io/pull/11) | `chore/commit-claude-config` | #10 | tooling | Shared `.claude/` project config committed; personal settings stay local |
| [#12](https://github.com/perekopskyi/perekopskyi.github.io/pull/12) | `fix/cv-plain-text-links` | `master` | #5 | CV contacts and URLs are plain text; e2e fails on link annotations |
| [#13](https://github.com/perekopskyi/perekopskyi.github.io/pull/13) | `chore/main-branch-and-docs` | `main` | #10, tooling | Default branch `main`; implementation plan retired into Standing decisions; markdownlint in CI |

## Review after the first pass (2026-11-27)

**What moved.** Everything that did not need owner input is in review: positioning copy, prerendering, a CI quality gate, and the CV pipeline. The site's engineering quality is now provable, not just visible: tests, Lighthouse budget, no-JS rendering, and a single data source for the page, meta tags, and CV.

**What did not move, and why.** The items that matter most for hiring (#1 experience, #3 verifiable projects, #8 case study, #9 skill evidence) are all blocked on facts only the owner has. The site still reads as "strong frontend, unverified track record". The next step is data, not code.

**Corrections to the original review.**

- "Garden panel lists features under *Outcomes*" was wrong. The card already labels MVP points as *Includes*. The real issue is that the panel has no link or screenshot.
- #12 was already done: Pages builds from Actions and the last deploy was green.

**New findings.**

- CI only exists from #6 onward, so #4 and #5 show no checks. They are covered once the stack merges.
- `sitemap.xml` has a hand-written `lastmod` (2026-11-04). Generate it at build time, or drop `lastmod`. → added as #19.
- With employment history filled in, the CV runs to two pages. Keep each role to 2–3 outcome bullets so it stays at two pages.

**Updated priorities.**

1. **Owner data** (#1, #3, #4 spelling, #9). This unblocks the CV link (#7) and the case study (#8). The biggest single improvement left.
2. **Case study for Bracket Builder** (#8). Needs #3 and an architecture outline. The prerender from #5 is the foundation for a second URL.
3. **One flagship feature:** the AI chat (#15) *or* live metrics (#14), not both. Metrics are cheaper and prove a claim. The chat is a stronger AI-engineering story but needs a backend, an LLM provider key, and a cost cap. Owner decision.
4. #17, #18, #19: small polish, any time.

## Review after the CV import (2026-11-27)

**What changed.** The biggest red flag is gone. The page now shows three roles with measurable outcomes (10,000+ users, millions of users, −20% load time, 20+ shipped products, mentoring and hiring). It also shows education and languages, and offers a two-page CV for download. The site, the CV PDF, and the owner's CV now say the same thing.

**Still open, in order of hiring impact.**

1. **#3 Verifiable projects.** Bracket Builder is now attributed to LOW6, so a public URL may not be possible. Ask what can be shown: a public tournament page, a screenshot, or a short screen recording.
2. **#8 Case study.** Bracket Builder at LOW6 is the strongest story. Write it at the architecture level (no proprietary details) and check NDA limits first.
3. **#9 Skill evidence.** NestJS, GraphQL, and AWS are listed but not shown in any role or project. Add one bullet each where they were used, or drop them.
4. Flagship feature: #14 or #15, as before.

**Interview prep note.** The CV title at LOW6 is "Full-stack Developer", while the site positions you as "Senior Full-stack Engineer". That is normal and defensible (scope, ownership, mentoring), but expect the question and have a one-sentence answer ready.

## Review after tooling and cleanup (2026-11-27)

**What changed.** No hiring-facing content moved in this round; the work made the repository itself a better exhibit and easier to keep honest.

- Components follow one convention (#10), and the agent rules behind the site are public in `.claude/` (#11). A reviewer can see how AI-assisted work is constrained: no invented facts, checks before merge, one PR per change.
- The CV no longer carries clickable links (#12), and a test keeps it that way.
- `main` is the default branch, deploys are gated on CI from `main` only, and stale branches are gone (#13). Markdown is linted in CI, and `IMPLEMENTATION_PLAN.md` is folded into Standing decisions.

**Still open, in order of hiring impact.** Unchanged from the previous review: #3 verifiable projects, #8 case study, #9 skill evidence, then one flagship feature (#14 or #15). All of them need owner input first.

**Next code-only steps,** if there is time before the owner data arrives: #19 (sitemap `lastmod`, minutes), then #18 (active-section highlight; dark mode only if it keeps the editorial palette and passes the Lighthouse budget).
