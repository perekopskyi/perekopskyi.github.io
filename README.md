# Eugene — portfolio

Static personal site for [perekopskyi.github.io](https://perekopskyi.github.io/). Vite, React, TypeScript, and Tailwind. No backend.

The public URL stays on this repository. Do not deploy the new source while GitHub Pages is still publishing the `master` branch directly. See [Deployment](#deployment).

## Requirements

- Node.js 22 or newer
- pnpm 11

## Scripts

```bash
pnpm install
pnpm dev
pnpm typecheck
pnpm lint
pnpm build
pnpm preview
```

`pnpm dev` starts the local site. `pnpm build` typechecks, then writes the static site to `dist/`.

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

Production is GitHub Actions uploading `dist/` with the official Pages actions. The workflow is `.github/workflows/deploy.yml`. It runs on a push to `master`.

Today the repository still uses the legacy Pages source (`master` / `/`). Pushing this app before switching the source would publish the raw project instead of `dist/`.

Cutover, in order:

1. Confirm `pnpm build` and `pnpm preview` locally.
2. Switch Pages to GitHub Actions while the current site is still what `master` serves:

   ```bash
   gh api --method PUT repos/perekopskyi/perekopskyi.github.io/pages -f build_type=workflow
   ```

3. Commit and push to `master`.
4. Wait for the Deploy GitHub Pages workflow. Confirm [https://perekopskyi.github.io/](https://perekopskyi.github.io/) serves the new page.

`vite.config.ts` sets `base` to `/` because this is a user site at the domain root.

## Still needs confirmation

These stay hidden until you fill them in. Nothing here was invented.

- Availability line, if you want one
- Tournament Bracket Builder live URL, repository URL, and a real screenshot if you want one
- Technology lists for each project
- Public repositories for React Performance Monitor and AI E2E Test Generator, if they exist
- Commercial work you are allowed to describe
- Employment history: company, title, dates, responsibilities, outcomes
