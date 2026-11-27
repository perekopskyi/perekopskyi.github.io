# CLAUDE.md

Install dependencies at their latest version with `pnpm add <package>@latest` (`-D` for dev dependencies; `pnpm install` takes no package names). Never edit dependency lists in package.json by hand.
Change scripts with `npm pkg set 'scripts.<name>=…'`.

Review and suggest updates for CLAUDE.md after task completion. Re-read CLAUDE.md after each update.

## Project

Personal portfolio of Yevhenii Perekopskyi, Senior Full-stack Engineer, at <https://perekopskyi.github.io/>. Its job is to help land a senior full-stack role: a hiring manager should be able to verify the CV in five minutes. Priorities and open work live in `ROADMAP.md`; check it before starting a feature and update its status table when a PR opens or merges.

All site copy, code, and comments are in English.

## Environment

Node >= 22.13 is required; the system Node 20 cannot run pnpm. Use e.g. `export PATH=~/.nvm/versions/node/v22.21.0/bin:$PATH`.

## Architecture

Static single page: Vite 8, React 19, TypeScript (strict), Tailwind CSS 4, Framer Motion, Lucide. No router, no backend, no UI kit.

- **Content is data.** All copy lives in `src/data/*` (`site.ts`, `experience.ts`, `projects.ts`, `skills.ts`, `cv.ts`); components only render it. Types are in `src/types/content.ts`.
- **Never invent facts.** No employers, numbers, links, or skills that are not already in `src/data` or confirmed by the owner. Records with `published: false` (or empty required fields) stay off the page and out of the nav.
- **One source of truth for meta tags.** `index.html` uses `%SITE_*%` placeholders that the `siteMeta` plugin in `vite.config.ts` fills from `site.ts` (title, description, OG, JSON-LD). Do not hard-code the name or role in `index.html`.
- **Prerendered.** `pnpm build` runs the client build, an SSR build of `src/entry-server.tsx`, then `scripts/prerender.mjs`, which injects `renderToString(<App />)` into `dist/index.html`. `main.tsx` hydrates when markup exists. Server and client must render identical markup: no `Date`, `window`, or media queries during render (use `__BUILD_YEAR__`), and `Reveal` must always render `motion.div`.
- **CV PDF.** The same prerender step renders `src/cv/CvDocument.tsx` with `@react-pdf/renderer` to `dist/<Full-Name>-CV.pdf`. Keep it ATS-friendly: built-in fonts, real text, no letter-spaced headings. Contacts and URLs are plain text, never clickable links (the e2e test fails on link annotations). The download link shows only when `cvLinked()` is true (at least one published role).
- **Accessibility.** Keep the skip link, landmarks, visible focus, `min-h-11` touch targets, `sr-only` "(opens in a new tab)" on external links, and reduced-motion support (`MotionConfig reducedMotion="user"`).
- Design tokens (paper, ink, muted, line, panel, accent; Fraunces serif + Public Sans) are in `src/index.css` under `@theme`. Reuse them; do not add raw colors.

## Commands

- `pnpm dev` — local dev server (client-rendered, no prerender).
- `pnpm typecheck` / `pnpm lint` (oxlint) / `pnpm build` (typecheck, build, prerender, CV).
- `pnpm test:e2e` — Playwright (desktop Chrome + Pixel 7) with axe, against the production build. Run `pnpm build` first; install the browser once with `pnpm exec playwright install chromium`.
- `pnpm test:lighthouse` — Lighthouse CI budget on `dist/` (performance ≥ 0.9; accessibility, best practices, SEO ≥ 0.95).
- Before calling work done: typecheck, lint, build, and e2e must pass. Add or update an e2e test for any behaviour change.

## CI and deploy

- `.github/workflows/ci.yml` runs on every PR: typecheck, lint, build, Playwright, Lighthouse.
- `.github/workflows/deploy.yml` runs on push to `main`, reuses `ci.yml` as a gate, and deploys `dist/` to GitHub Pages. Merging to `main` publishes the site.

## Pull requests

- One feature per branch and PR. Branch from `main`; if PRs must stack, say so in the description and merge in order.
- Write PR titles and descriptions in English.
- Start the title with the type: `feat:` (new behaviour), `fix:` (bug fix), `docs:`, `ci:`, or `chore:` (tooling, dependencies, config, refactoring without behaviour change).
- Description sections: what changes and why, the roadmap item it covers, and how it was verified.
- Stage files explicitly (`git add <paths>`), never `git add -A`: personal files (`.claude/settings.local.json`, `.env*`) must not reach the public repo.
- Leave changes uncommitted for the owner to review. Commit, push, or open a PR only after the owner confirms; each commit and push needs its own confirmation.

## Claude Code config

`.claude/` is committed: `CLAUDE.md`, `rules/`, `hooks/`, and `settings.json` hold project rules shared by everyone. Personal preferences (status line, notification hooks, plugins) go in `.claude/settings.local.json`, which is git-ignored.
