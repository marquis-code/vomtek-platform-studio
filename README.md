# LineSight Studio

Internal operations console for LineSight. Nuxt 3 SPA, port 3210.

## Run
```bash
pnpm install
pnpm dev
```
Sign in at http://localhost:3210/login with `ops@linesight.io` /
`LineSightOps!2026`.

## Scope
Revenue overview, customers, marketplace orders, rentals, inspection reports,
home jobs and escrow, catalog pricing/stock, subscriptions, manufacturer
partners, leads and runtime settings.

The Studio only consumes `/api/admin/*`; it never talks to Mongo directly.
