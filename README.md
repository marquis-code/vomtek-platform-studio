# Vomtek Studio

Internal operations console for Vomtek. Nuxt 3 SPA, port 3210.

## Run
```bash
pnpm install
pnpm dev
```
Sign in at http://localhost:3210/login with `ops@vomtek.com` /
`VomtekOps!2026`.

## Scope
Revenue overview, customers, marketplace orders, invoices/refunds, rentals,
inspection reports, home jobs and escrow, work-order verification, catalog
pricing/stock, subscriptions, manufacturer partners, contractor verification,
users/roles, leads, audit trail, notification queue and runtime settings.

The Studio only consumes `/api/admin/*`; it never talks to Mongo directly.
