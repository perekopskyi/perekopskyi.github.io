# Eugene — portfolio

Static personal site for [perekopskyi.github.io](https://perekopskyi.github.io/). Vite, React, TypeScript, and Tailwind. No backend.

## Requirements

- Node.js 22 or newer
- pnpm 11

## Scripts

```bash
pnpm install
pnpm dev
pnpm typecheck
pnpm lint            # oxlint + markdownlint
pnpm lint:md         # markdownlint only (.markdownlint-cli2.jsonc)
pnpm build
pnpm preview
pnpm test:e2e        # Playwright + axe against the production build
pnpm test:lighthouse # Lighthouse budget (performance, a11y, best practices, SEO)
```

Run `pnpm build` before either test command. Install the browser once with `pnpm exec playwright install chromium`.

`pnpm dev` starts the local site. `pnpm build` typechecks, builds, and prerenders the page into static HTML in `dist/`.

CI (`.github/workflows/ci.yml`) runs a dependency audit, typecheck, lint, build, Playwright, and Lighthouse on every pull request. The audit fails on moderate or worse in production dependencies and on high or worse anywhere. The deploy workflow runs the same job before publishing.

## Edit the content

All public copy lives in `src/data/`.

| File | What it controls |
| --- | --- |
| `src/data/site.ts` | Name, location, availability, email, LinkedIn, Telegram, GitHub |
| `src/data/projects.ts` | Featured work |
| `src/data/skills.ts` | Skill groups |
| `src/data/experience.ts` | Employment history |

A project is shown only when `published` is true and the summary is filled in. A role is shown only when `published` is true and both company and position are filled in. `null` contact fields stay off the page. Leave unknown values empty.

## Deployment

Production is GitHub Actions uploading `dist/` with the official Pages actions. The workflow is `.github/workflows/deploy.yml`. It runs on a push to `main`.

Merging to `main` publishes the site. The deploy job runs only after the CI job (typecheck, lint, build, Playwright, Lighthouse) passes.

`vite.config.ts` sets `base` to `/` because this is a user site at the domain root.

## Roadmap

Priorities, open items, the data still needed from the owner, and standing design and scope decisions are in [`ROADMAP.md`](ROADMAP.md).
