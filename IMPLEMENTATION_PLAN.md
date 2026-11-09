# Implementation Plan: Personal Portfolio Redesign

Status: **Implemented locally. Not deployed.** GitHub Pages is still the legacy branch build, so the public site is unchanged until the cutover in this plan.

Implementation notes: dependencies are locked with pnpm, and linting uses oxlint because that is what the current Vite template ships. The behavior in this plan is unchanged.

Date: 2026-11-04

## Objective

Replace the current GitHub Pages site with a static, production-ready portfolio for Eugene, a senior software engineer. The site should read as a minimalist editorial portfolio and support senior frontend, full-stack, and AI engineering conversations.

The public URL stays [https://perekopskyi.github.io/](https://perekopskyi.github.io/). Same repository. No new repo, no custom domain, no second host.

Success looks like this: a hiring manager can understand the positioning in one screen, inspect a small set of honest projects, and find a way to make contact — on desktop, tablet, and mobile — without fabricated employers, clients, or metrics.

## Current project analysis

The repository is `perekopskyi/perekopskyi.github.io`. Default branch is `master`, tracking `origin/master`, working tree clean at `5c33fe3`.

There is no frontend application.

| Fact | What it means |
| --- | --- |
| No `package.json`, `src/`, or lockfile | Nothing to migrate. This is a replacement, not an upgrade. |
| No `.github/workflows` | No Actions deploy exists yet. |
| `_config.yml` contains only `theme: jekyll-theme-cayman` | GitHub Pages builds the README with the Cayman theme. That README is the live homepage. |
| No root `index.html` | The homepage is generated Jekyll output, not a file in git. |
| Pages API: `build_type: legacy`, source `master` `/` | Publishing the branch root. A Vite `dist/` build will not go live until the source is switched to GitHub Actions. |
| `cname: null`, HTTPS enforced | The public URL is the default `*.github.io` host. `base` in Vite must be `/`. |
| Remote is the existing GitHub repo | We keep this remote. |

Published today, from the README:

- `/strict/` — Bootstrap 4 exercise, present in the repo
- `/YouTubeOnJS/` — YouTube API exercise, present in the repo
- `/task3-findThePairJS/` — memory-game exercise, present in the repo
- `/task4-moveHorseOnBoard/` — chess-knight exercise, present in the repo
- `/penkoff/` and `/ReduxCounter/` — linked from the README, **not in this repo**
- A quiz on Firebase and a films project under another GitHub Pages path — also **not in this repo**

These are early HTML/CSS/JS exercises. They are not reusable components, and they do not support the senior positioning. Git history keeps them even if they leave the working tree.

There are no shared components, design tokens, images worth reusing, or SEO files (`robots.txt`, sitemap, favicon, Open Graph).

## Assumptions

1. The site is English. The brief is English, and the audience is international hiring.
2. The public name is “Eugene”, including the headline.
3. One long page with in-page navigation. No client-side router.
4. Only confirmed facts are visible. Incomplete experience and commercial work exist in data files and stay off the page until you fill them in.
5. Old exercise URLs do not need to keep resolving. See the decision below.
6. No analytics, no contact form, no backend.
7. Package manager is npm. Node 22 in CI.
8. Implementation stays local until you explicitly ask to commit, push, or switch the Pages source.

Correct these before implementation if any of them are wrong.

## Approaches considered

### Site shape

**A. One page, section anchors. Recommended.**

Header links scroll to `#about`, `#work`, `#skills`, `#experience`, `#contact`. GitHub Pages serves a single `index.html`. Refresh, direct load, and sharing all work without a 404 fallback. Open Graph tags live in that HTML file, so Slack and LinkedIn can read them without executing JavaScript.

**B. Multi-route React app.**

Rejected for this site. Project pages would need either a `404.html` rewrite or prerendering. The content is one narrative, not a set of destinations. Extra routing adds failure modes and no hiring-manager benefit.

**C. Astro or plain HTML.**

Rejected. The stack is fixed: Vite, React, TypeScript, Tailwind, Framer Motion, Lucide.

### What happens to the old exercises

**A. Remove them from the working tree and from the published site. Recommended.**

`strict/`, `YouTubeOnJS/`, `task3-findThePairJS/`, and `task4-moveHorseOnBoard/` are deleted in the implementation commit. They remain in git history. Actions deploys only `dist/`, so anything left in the repo but outside `dist/` would not be on the public site anyway. Keeping dead folders in the repo just obscures the new project.

**B. Copy them into `public/archive/` so the old URLs keep working.**

Rejected unless you say those links still matter. They contradict the new positioning, and two of the README links already 404 because those projects are not in this repo.

### How the site gets published

**A. GitHub Actions, official Pages deploy, artifact = `dist`. Recommended.**

This is the only option that matches the brief. Vite builds a static `dist/`. Actions uploads that directory and deploys it. The repository and the hostname do not change.

**B. Commit `dist/` to `master` and keep the legacy branch source.**

Rejected. It mixes source and build output, and it fights the required Actions workflow.

**C. Another host.**

Rejected. The brief forbids it.

## Architecture decisions

- **Vite 8 + React 19 + TypeScript 7 strict.** Scaffold matches the current Vite React-TS template, then the demo counter is removed. `@vitejs/plugin-react` 6.
- **`base: '/'`.** This is a user site, not a project site. A relative base would be wrong here and right only for `username.github.io/repo`.
- **Tailwind CSS 4** through `@tailwindcss/vite`. No `tailwind.config.js` unless a token cannot be expressed in CSS. Design tokens live in `src/index.css`.
- **Framer Motion 14** for the load sequence and section reveals. `MotionConfig reducedMotion="user"` so the OS setting turns motion off. No other animation library.
- **Lucide React** for a few functional icons (arrow, external link, mail). Not a decorative icon grid.
- **No React Router, no UI kit, no form library, no CSS-in-JS.**
- **Content is data.** Components render `src/data/*`. Changing a project does not require editing layout code.
- **Unpublished records are first-class.** `published: false` keeps a slot in the data file and out of the page, including its nav link.
- **Covers are inline SVG**, one composition per project. They stay sharp, weigh almost nothing, and do not pretend to be product screenshots. You can later point `cover` at a real image in `public/projects/`.
- **ESLint** for correctness (TypeScript + React Hooks). No Prettier and no test runner. The gates you asked for are `tsc` and `vite build`. Types are the check that project records stay complete.
- **Fonts are self-hosted woff2** (latin, weights actually used). No runtime request to Google Fonts.
- **Default branch stays `master`.** Renaming to `main` would touch Pages settings for no product reason.

## Design direction

Editorial paper, not a dark SaaS template.

The page should feel like a well-set engineering essay: a serif headline, a plain grotesque for reading, a warm paper ground, and one deep green used only for the availability mark, links, and focus rings.

| Token | Value | Use |
| --- | --- | --- |
| `--paper` | `#f3f0e8` | Page background |
| `--ink` | `#1c1915` | Text, header, one dark band |
| `--muted` | `#5e594f` | Secondary text |
| `--line` | `#e3ddd0` | Hairline rules |
| `--accent` | `#1e4d3a` | Links, focus, availability |

- **Display:** Fraunces, optical size high, weight around 520. Hero and section titles only.
- **Text:** Public Sans. Body, navigation, meta.
- **Layout:** left-aligned, content width 1120px, wide margins. The hero is not centered.
- **Projects:** full-width rows, media and text side by side, alternating. A large muted index (01) does the visual work that a badge grid usually tries to do. Below 800px the media stacks on top.
- **Skills:** category name, then the tools in a single quiet line. No pills.
- **Experience:** a vertical hairline. Rendered only when at least one role is `published`.
- **Contact:** the one dark band. Short sentence, then the links that are actually configured.
- **Motion:** opacity and 12px vertical offset, about 500ms, ease-out, once. Header is sticky with a hairline, not a glassmorphism bar. Hover on a card changes the rule color. No glow, no gradient mesh, no looping animation.

Heading order: one `h1` in the hero (“Hi, I’m Eugene.”), `h2` per section, `h3` for project names, skill groups, and roles.

## Information architecture

| Section | Id | Visible at launch |
| --- | --- | --- |
| Hero | `#top` | Yes |
| About | `#about` | Yes |
| Featured work | `#work` | Yes, published projects only |
| Skills | `#skills` | Yes |
| Experience | `#experience` | No, until a role is published |
| Contact | `#contact` | Yes. Email and LinkedIn render only after you set them. GitHub can render immediately. |

Hero copy is the copy from the brief, including both CTAs. “View Projects” scrolls to `#work`. “Get in Touch” scrolls to `#contact`.

Location is Ukraine. Years are “8+ years”. The availability line is omitted when `availability` is `null`, so the live site does not claim you are looking.

### Project records at launch

| Project | Status | Published | Notes |
| --- | --- | --- | --- |
| Tournament Bracket Builder | `live` | Yes | Description and the four achievements from the brief. No URL until you supply one. |
| React Performance Monitor | `concept` | Yes | Labeled as a pet project / concept. Features listed as potential, not as shipped. |
| AI E2E Test Generator | `experimental` | Yes | Labeled as an experiment. Features listed as potential, not as shipped. |
| Commercial product work | `confidential` | **No** | Typed slot only. Empty strings. Nothing invented. |

A card with no `url` and no `githubUrl` has no link row. Status is a small tracked label (“In production”, “Concept”, “Experiment”), not a colored chip.

### Experience

`src/data/experience.ts` exports a `Role[]`. The file ships with the type and a short comment showing a filled example that is **not** included in the array. The array starts empty. The section and its nav item appear when the first `published: true` role exists.

Fields: `company`, `position`, `period`, `description`, `responsibilities`, `achievements`, `technologies`, `published`.

### Contact

`src/data/site.ts` holds `email`, `linkedin`, `github`, and `availability`.

- `github`: `https://github.com/perekopskyi`
- `email`: `null`
- `linkedin`: `null`
- `availability`: `null`

The contact line is: “Have an interesting project in mind? Let’s talk.”

Telegram and Instagram from the old README (`@i_am_yevhen`) are not carried over. Say if you want them.

## Proposed structure

```md
index.html
vite.config.ts
tsconfig.json
tsconfig.app.json
tsconfig.node.json
eslint.config.js
package.json
package-lock.json
README.md
IMPLEMENTATION_PLAN.md
.github/workflows/deploy.yml
public/
  favicon.svg
  og.png
  robots.txt
  sitemap.xml
src/
  main.tsx
  App.tsx
  index.css
  vite-env.d.ts
  assets/fonts/
  components/
    layout/Header.tsx
    layout/Footer.tsx
    sections/Hero.tsx
    sections/About.tsx
    sections/Projects.tsx
    sections/Skills.tsx
    sections/Experience.tsx
    sections/Contact.tsx
    ui/Button.tsx
    ui/ProjectCard.tsx
    ui/SectionHeading.tsx
    ui/covers.tsx
  data/site.ts
  data/projects.ts
  data/skills.ts
  data/experience.ts
  types/content.ts
```

No `hooks/` directory. Reduced motion is handled by Framer Motion. No `styles/` directory. Tailwind and tokens live in `src/index.css`.

`App.tsx` composes the sections and nothing else. `ProjectCard` receives a `Project`. `Projects` filters `published`. `Experience` returns `null` when no role is published. `Contact` maps only the links whose URLs are strings.

## Code style

Functional components, named exports, props interfaces next to the component. No `React.FC`. Data modules export typed constants. No default exports except where Vite requires them (`main` does not).

```tsx
export function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="grid gap-8 border-t border-line py-12 md:grid-cols-12">
      <div className="md:col-span-5">{project.cover}</div>
      <div className="md:col-span-7">
        <p className="text-xs tracking-[0.16em] uppercase text-muted">{project.statusLabel}</p>
        <h3 className="mt-3 font-serif text-3xl text-ink">{project.name}</h3>
        <p className="mt-4 max-w-xl text-muted">{project.summary}</p>
      </div>
    </article>
  );
}
```

`tsconfig` strict mode is on, including `noUnusedLocals` and `noUnusedParameters`. Path aliases are not used; the tree is shallow enough for relative imports.

## SEO and performance

Static tags in `index.html`, not injected after hydration:

- Title: `Eugene — Senior Software Engineer`
- Description: the supporting headline plus the years of experience, kept under ~160 characters
- Canonical: `https://perekopskyi.github.io/`
- Open Graph and Twitter card pointing at `/og.png` (1200×630, type set in the same palette, no screenshot of a product)
- `lang="en"`
- SVG favicon, monogram, same ink and paper

`public/robots.txt` allows all crawlers and points at the sitemap. `public/sitemap.xml` lists the one canonical URL.

Images: SVG covers are inline. The OG image is the only raster, and it is not on the page. Below-the-fold sections are not lazy-loaded as iframes; there are none. If a project later uses a bitmap cover, that `img` gets explicit width and height, `decoding="async"`, and `loading="lazy"` except for the first card.

No third-party scripts. Fonts are `font-display: swap` with a metric fallback so the swap does not shove the headline.

Targets on a production preview, mobile Lighthouse, no throttling tricks:

- Performance, Accessibility, Best Practices, and SEO each at 95 or above

Accessibility specifics: skip link, visible focus, button names, contrast of muted text against paper at least 4.5:1, status not conveyed by color alone, reduced motion honored.

## Deployment configuration

Workflow: `.github/workflows/deploy.yml`

- Trigger: push to `master`, plus `workflow_dispatch`
- Permissions: `contents: read`, `pages: write`, `id-token: write`
- Concurrency group `pages`, do not cancel an in-progress deploy
- Build job: checkout, `actions/setup-node@v4` with Node 22 and npm cache, `npm ci`, `npm run typecheck`, `npm run lint`, `npm run build`, `actions/upload-pages-artifact@v5` with `path: dist`
- Deploy job: environment `github-pages`, `actions/deploy-pages@v5`

`npm run build` is `tsc -b && vite build`.

### Cutover sequence

This is the risky part. Today Pages publishes **the files on `master`**, not a build. If the Vite source lands on `master` before the source is switched, the live site becomes raw source and an empty homepage.

Do this in order, and only when you ask to deploy:

1. Finish and verify the app locally. Do not push yet.
2. Switch Pages to GitHub Actions while `master` still serves the current site:
   `gh api --method PUT repos/perekopskyi/perekopskyi.github.io/pages -f build_type=workflow`
   The last legacy deployment should stay up until the first Actions deployment replaces it.
3. Commit and push to `master`. The workflow builds `dist` and deploys it.
4. Confirm `https://perekopskyi.github.io/` serves the new `index.html` and that `/strict/` 404s.

`_config.yml` is removed in the same commit as the new app. It has no effect once Pages no longer builds the branch with Jekyll.

Local checks before that push:

```bash
npm run typecheck
npm run lint
npm run build
npm run preview
```

## Implementation steps

Each step ends with the app still building. Steps are sequential.

### 1. Tooling skeleton

Add Vite, React, TypeScript, Tailwind, ESLint, and `index.html` beside the old files. Remove the Vite starter content. `.gitignore` includes `node_modules`, `dist`, and OS junk.

Acceptance: `npm run typecheck` and `npm run build` succeed. The preview is an empty shell with the paper background.

### 2. Types and content

Add `src/types/content.ts` and the four data modules, including unpublished commercial work and an empty experience list.

Acceptance: a project missing `status` or `summary` fails `tsc`. Unpublished records are typed and not exported as “shown” content; filtering happens in the section.

### 3. Shell

Header, footer, skip link, `main`, section landmarks. Anchor targets use `scroll-margin-top` so the sticky header does not cover titles.

Acceptance: keyboard users can skip to content. Every nav target exists. Experience is absent from the nav while no role is published.

### 4. Sections and project cards

Hero, About, Projects, Skills, Experience, Contact. Editorial layout as specified. Motion wrapped so reduced motion disables it.

Acceptance: the three published projects render with honest status labels. The commercial record does not. Contact shows GitHub and hides empty email and LinkedIn. Copy matches the brief.

### 5. SEO assets

Meta tags, favicon, `og.png`, `robots.txt`, sitemap.

Acceptance: view-source on the built `index.html` shows title, description, and Open Graph URL without running JavaScript.

### 6. Remove the old site from the tree

Delete the four exercise directories and `_config.yml`. Replace `README.md` with development and deployment instructions.

Acceptance: `npm run build` still succeeds. `dist/` contains the new site only. Old exercises remain reachable through git history.

### 7. Workflow and verification

Add `deploy.yml`. Run typecheck, lint, and production build. Preview at desktop, tablet, and mobile widths. Click every nav target and every external link that exists. Confirm no console errors.

Acceptance: build is clean, and the preview matches the quality bar below. The workflow file is present and not yet triggered, because we have not pushed.

Deployment itself is a separate step, done only after you ask.

## README (written during step 6)

The new README replaces the Jekyll homepage. It will cover:

- What the site is
- `npm install`, `npm run dev`, `npm run typecheck`, `npm run lint`, `npm run build`, `npm run preview`
- Where to edit projects, skills, experience, and contact (`src/data/`)
- How publishing works, including the one-time Pages source switch
- The rule that `master` must not receive the new source while Pages is still in legacy branch mode

## Risks

| Risk | Impact | Mitigation |
| --- | --- | --- |
| Pushing the Vite tree while Pages still publishes `master` | Live site breaks until the source is switched | Do not push until `build_type` is `workflow`. Document the order in the README. |
| Switching the Pages source before a workflow exists | A window with no new deploy; the previous deployment should remain | Switch only when `deploy.yml` is on `master` in the same release, or accept a short wait and watch the first run. |
| Old exercise URLs 404 | Anyone with an old bookmark loses the page | You confirm that those URLs can die. Git history still has the files. |
| Placeholder copy ships | The portfolio invents a career | `published: false` and null contact fields. No sample company names in the rendered tree. |
| Concept projects read as shipped products | Misrepresentation | Status label is visible text. Feature lists use “intended to” / “explores”, not “delivered”. |
| SPA meta tags set in React | Social previews ignore them | Tags are in `index.html`. |
| Font swap shifts the hero | Layout instability | Limited weights, `font-display: swap`, fallback with a close size. |
| Framer Motion cost | JS weight on a simple page | One small motion setup, no scroll-jacking, no extra animation packages. Revisit only if the production bundle looks unreasonable. |
| `master` vs `main` in the workflow | Deploy never runs | Trigger on `master`, which is the actual default branch. |

## Content that needs your confirmation

Nothing below will be invented. Where a value is missing, the UI hides it.

1. Email address.
2. LinkedIn URL.
3. Availability sentence, if you want one. Otherwise it stays hidden.
4. Whether Telegram or Instagram (`@i_am_yevhen`) should appear.
5. Public name is Eugene.
6. Tournament Bracket Builder  live URL and repository URL, if either is public.
7. A real screenshot for Tournament Bracket Builder , if you want one instead of the abstract cover.
8. Whether React Performance Monitor or the AI E2E idea have public repositories.
9. Commercial work: anything you are allowed to say (industry, your role, kinds of problems). Until then the card stays unpublished.
10. Employment history: company, title, dates, what you actually did, what you can claim.
11. Whether any old exercise URL must keep working.

## Acceptance criteria

- [ ] `npm run typecheck` exits 0
- [ ] `npm run lint` exits 0
- [ ] `npm run build` exits 0 and writes `dist/`
- [ ] Preview has no console errors
- [ ] Hero, about, three published projects, skills, and contact match the brief
- [ ] Commercial work and experience are absent on the page and present in the data model
- [ ] No employer, client, metric, or URL was invented
- [ ] Concept and experiment projects are labeled as such in visible text
- [ ] Header links reach their sections on desktop and mobile
- [ ] External links that exist open the right URL
- [ ] Layout holds at roughly 375, 768, and 1280 CSS pixels
- [ ] Reduced-motion preference disables the entrance animation
- [ ] Built HTML contains title, description, canonical, and Open Graph tags
- [ ] `robots.txt`, `sitemap.xml`, and favicon are in `dist/`
- [ ] `.github/workflows/deploy.yml` builds `dist` and deploys with the official Pages actions
- [ ] Vite `base` is `/`
- [ ] Repository remote and hostname are unchanged
- [ ] README documents local development and the Pages cutover

## Out of scope

- Commit, push, or the live cutover, until you ask
- A contact form or any backend
- Blog, CMS, dark-mode toggle, locale switch
- Rewriting the old exercises
- Inventing case-study metrics

## After approval

Implementation follows the seven steps above. The live site is not touched until you explicitly ask to deploy.
