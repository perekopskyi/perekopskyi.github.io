# CLAUDE.md

Always install the latest version of dependencies using `pnpm add [package]@latest` (`-D` for dev dependencies; `pnpm install` takes no package names). Never edit package.json directly.
Change scripts with `npm pkg set 'scripts.<name>=…'` (`pnpm pkg` rejects keys with `:` such as `dev:identity`).

Review and suggest updates for CLAUDE.md after task copletion. Re-read CLAUDE.md after each update

## Project

Garden-community (КСТ «Придніпровець») app: React PWA + Fastify microservices on PostgreSQL. Version 1.4.0; requirements in `docs/requirements-v1.4.md`, gaps in `docs/coverage.md`. UI copy, API error messages and the README are in Ukrainian; code and comments are in English.

## Environment

Node >= 22.13 is required (`.nvmrc`); the system Node 20 cannot run pnpm. Use e.g. `export PATH=~/.nvm/versions/node/v22.21.0/bin:$PATH`.

A single root `package.json` covers everything (pnpm, no per-app packages). Code under `apps/` and `packages/` imports other folders by **relative path** (`../../../packages/service-kit/src/app`), not by package name. The web app and `lib/` use the `@/` alias for the repo root.

## Architecture

```text
browser ─▶ gateway (Caddy / scripts/dev-gateway.ts)
   /api/auth, /api-docs, /health ─────────────────▶ identity-service (3001)
   /api/users                  ─ forward_auth ──▶ identity-service
   /api/plots|meters|billing-periods ─ forward_auth ─▶ property-service (3002)
   /internal/* ─▶ 404
property ─HTTP /internal─▶ identity;  property ─BullMQ assign-role─▶ worker ─▶ identity
```

- `apps/identity-service` — auth, sessions, users, roles; PostgreSQL schema `identity`; internal API `/internal/*` (verify session, users batch/options, assign role). Serves Swagger UI at `/api-docs` from `docs/openapi.json` (covers every service; update it when routes change).
- `apps/property-service` — plots, ownership history, claims, meters, readings, billing periods; schema `property`. Never reads identity tables: user names and role grants go through `IdentityClient` (HTTP). Role grants after claim approval go through `applyRoleGrant` (`modules/plots/role-grants.ts`), which enqueues a retry when `REDIS_HOST` is set and fails the request otherwise.
- `apps/worker` — BullMQ worker on queue `integrations` (`assign-role` retries, `health-check`).
- `apps/web` — React 19 + Vite 8, TanStack Router (file routes in `src/routes`, `routeTree.gen.ts` is generated), TanStack Query, shadcn/ui, Tailwind 4. Vite proxies `/api` to the gateway on 3000.
- `packages/service-kit` — shared Fastify app (`createServiceApp`: helmet, rate limit, cookies, JSON error shape `{error, code, correlationId}`, `/health`, `/health/ready`), `HttpError` hierarchy (throw these instead of mapping errors by hand), `getPrincipal`/`requirePermission`/`can`, `requireOrigin` (CSRF), `requireInternalToken`, gateway routing table, `testing.ts` (`send` helper).
- `packages/contracts` — cross-service contracts (role → permission matrix in `permissions.ts`, `Principal`, `PRINCIPAL_HEADERS`, identity internal API zod schemas, `HttpIdentityClient`).
- `packages/shared` + `lib/domain.ts` — browser-only demo-domain rules (ledger, allocations, tickets) for workspace pages that have no backend yet.
- `lib/` — i18n (`i18n-en.ts` defines `MessageId` keys, `i18n-ua.ts` must have every key), reading-deadline helpers, `cn` util.
- `components/ui/` — vendored shadcn components (root, not under `apps/web`); don't restyle them in place.
- `hosting/worker.ts` — separate Cloudflare/D1 "Sites" pilot runtime (`pnpm start`, `pnpm test:sites`); unrelated to the Fastify services.
- Gateway: `infra/Caddyfile` in production, `scripts/dev-gateway.ts` locally; both mirror `packages/service-kit/src/gateway.ts`. Adding a route prefix means updating all three. Services trust `X-User-*` only because the gateway strips client copies.
- Plot owners change only through a transfer (`transferOwnership`, `POST /api/plots/:id/transfer`) or an approved owner claim, both of which write `plot_ownerships` (half-open periods `[valid_from, valid_to)`, shares summing to 1, one primary owner; rules in `modules/plots/ownership.ts`). `plots.owner_id` caches the current primary owner — never write it directly, and plot edits reject `ownerId`.
- No foreign keys across schemas; store other services' ids by value. Each service uses its own DB role (`identity_svc`, `property_svc`) in Docker.

## Service module layout

Each module in `apps/<service>-service/src/modules/<name>/`:

- `routes.ts` — `xxxRoutes(repo, origin, …)` returns a Fastify plugin; every route gets `onRequest: requireOrigin(origin)`.
- `controller.ts` — reads `getPrincipal(request)`, calls the service, sends `{ <entity> }` with the status code.
- `service.ts` — zod schemas (`.strict()`) + authorization (`requirePermission(principal, '<permission>')`); takes `body: unknown` and parses it.
- `repository.ts` — interface + `Pg…Repository` (drizzle) + domain error classes extending `HttpError` subclasses.
- In-memory test doubles live in `src/test/memory-*.ts` and must implement the same interface.

Dependencies are injected through `create<Service>App(options)` (`app.ts`); `server.ts` wires the real Pg repos, env, and `startService`.

Access is by permission, never by role name: `requirePermission`/`can` in services, `can(user, '<permission>')` from `AuthContext` in web (UI hiding only; the API is the real check). Permissions are derived from `X-User-Roles` via `packages/contracts/src/permissions.ts`; add a permission or role there, and a new role also via an identity migration (like `0003_rbac_roles.sql`, checked by `tests/rbac.test.ts`). Only `admin` may grant or remove `admin`.

Administrative changes are recorded in `audit_events` (per schema, append-only via trigger) with `recordAudit(tx, audit, …)` inside the repository transaction. New mutating repository methods take an `AuditContext` (`{ actorId, correlationId }`, built in the service from the principal and `request.id`); in-memory repositories record into a `MemoryAuditTrail` (`audit.events` in tests, `tests/audit.test.ts`). An entity's history is served by `GET /<resource>/:id/audit` (`audit.read`, `?limit&before` cursor = `seq`): the service checks access and returns `history.page(entities, query)` from the shared `AuditHistory` (`packages/service-kit/src/audit.ts`).

## Web conventions

- One hook per endpoint in `apps/web/src/api/<resource>/use<Verb><Thing>Query|Mutation.ts`, built on `apiRequest` (`api/apiClient.ts`). Queries export their `queryKey`; mutations invalidate it on success.
- Routes are `/$zone/...` with zones `public | member | admin` (`admin` needs `panel.access`, guarded in `routes/$zone/route.tsx`); workspace page ids are in `src/workspace/pages.ts`.
- All user-facing text goes through `useI18n().tr(...)`; add keys to both `lib/i18n-en.ts` and `lib/i18n-ua.ts`.
- MSW starts in dev (`src/mocks/handlers.ts`, currently empty).

## Commands

- `pnpm dev` — web + identity (3001) + property (3002) + dev gateway (3000); needs `DATABASE_URL`, `APP_ORIGIN`, `INTERNAL_TOKEN` in `.env.local`. Run `pnpm db:migrate` first, `pnpm db:seed` optionally.
- `pnpm db:generate` / `pnpm db:migrate` — per-service drizzle configs and migration folders (`apps/<service>-service/drizzle`). `scripts/migrate.ts` also adopts a legacy pre-split `public` schema on first run.
  - `drizzle-kit generate` knows nothing about triggers. For append-only tables (audit log, future ledger/bank transactions) add the trigger to the generated SQL by hand, as in `0001_audit_events.sql`, and revoke UPDATE/DELETE/TRUNCATE for the service role in `scripts/migrate.ts`.
- `pnpm typecheck && pnpm test` — tests run both services behind an in-process gateway (`tests/support/system.ts`, `createTestSystem().gateway`) with in-memory repositories; no DB needed.
  - Single backend test: `node --import tsx --test apps/property-service/src/modules/meters/meters.test.ts`
  - Web tests: `vitest run --project web` (jsdom, `apps/web/**/*.test.tsx`).
  - Backend tests use `node:test` + `node:assert/strict`; vitest aliases `node:test` for coverage runs.
- `pnpm build` — esbuild bundles for services/worker/migrate + Vite web build + generated `sw.js`/manifest into `dist/`; then `node scripts/check-pwa.mjs`.
- Prettier: no semis, single quotes, width 100, sorted imports. Don't run `pnpm format` — it rewrites the whole repo; format only the files you changed with `npx prettier --write <files>`.
- `pnpm lint` — ESLint 10 flat config (`@eslint/js` + `typescript-eslint` + `react-hooks` for browser code, Prettier last); CI runs it after typecheck, and the `lint-on-write` hook blocks edits that leave lint errors. `_name` marks intentionally unused values. `no-explicit-any` is off only for the demo workspace (`apps/web/src/workspace/context.tsx`, `packages/shared/src/domain.ts`); don't extend that list. Prefer fixing over `eslint-disable`; if unavoidable, disable one line with a reason.
- CI (`.github/workflows/ci.yml`): typecheck, test, coverage badges, build, PWA check, Sites test, Docker build.

## Pull requests

- Write PR titles and descriptions in English.
- Start the title with the PR type: `feat:` (new behaviour), `fix:` (bug fix) or `chore:` (tooling, dependencies, config, refactoring without behaviour change), e.g. `feat: role-based permissions (RBAC)`.
- Use the sections of `.github/pull_request_template.md`: "Behaviour change", "Verification", "Migrations and rollback".
