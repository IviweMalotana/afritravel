# AfriTravel ▲

> Stay anywhere in Africa. Move freely across it.

A Booking.com-style demo for **pan-African stays + visa-free travel**, built with
**Vite + Bun + TypeScript**. It ships four portals — **customer**, **merchant**,
**admin**, and a **visa-free checker** — plus mock **Paystack** and **Mobile Money
(MoMo)** payment adapters that mirror the real APIs.

This is a front-end demo: all data is seeded and persisted to `localStorage`, and
payments run in **mock mode** by default (no real charges). The code is structured
so the same adapters and types drop into a real backend later — see
[`docs/PROJECT_PLAN.md`](docs/PROJECT_PLAN.md).

---

## Features

| Portal | Route | What it does |
| --- | --- | --- |
| **Customer** | `#/`, `#/search`, `#/stay/:id`, `#/checkout/:id` | Browse & search stays, view listings, book, pay via Paystack/MoMo, get a confirmation with visa guidance for the destination. |
| **Visa-Free Pass** | `#/visa`, `#/pass/:id` | Register for visa-free travel across partner African nations, get an instantly-approved digital pass (with a scannable code) to show at the border. |
| **Merchant** | `#/merchant` | Host dashboard: listings, bookings, revenue, payout method. |
| **Admin** | `#/admin` | Marketplace overview: inventory by region, paid volume, recent transactions, reset demo data. |

Other niceties: live price quoting, currency-aware formatting (₦, GH₵, KSh, R, $),
deterministic gradient artwork (zero image deps), and a tiny hash router.

## Tech stack

- **Bun** — package manager & runtime
- **Vite 5** — dev server & bundler
- **TypeScript 5** (strict) — no UI framework; hand-rolled components + hash router
- **localStorage** — demo persistence layer (swap for an API)

## Getting started

```bash
bun install      # install dependencies
bun run dev      # start the dev server at http://localhost:5173
bun run build    # type-check (tsc --noEmit) + production build to dist/
bun run preview  # preview the production build
```

> Requires Bun ≥ 1.1. Node 18+ also works (`npm install` / `npm run dev`).

## Payments

Both providers live in [`src/payments/`](src/payments/) behind a common
`PaymentProvider` interface:

- **`paystack.ts`** — models `transaction/initialize` + `verify`; converts to
  kobo/minor units; supports NGN, GHS, ZAR, KES, USD.
- **`momo.ts`** — models MTN MoMo Collections `requesttopay` + status poll;
  supports GHS, KES, RWF, NGN.

With no keys set they run in **mock mode** (simulated approval + success). Provide
`VITE_PAYSTACK_PUBLIC_KEY` / `VITE_MOMO_SUBSCRIPTION_KEY` (see
[`.env.example`](.env.example)) to switch to real-integration mode, which expects
a backend at `/api/paystack/*` and `/api/momo/*` to hold the **secret** keys.
Secrets must never reach the browser.

## Project layout

```
src/
  main.ts            App bootstrap + route registration
  router.ts          Hash router (params + query)
  types.ts           Shared domain types
  style.css          Design system
  data/              Seed data: stays, countries
  lib/               format helpers + localStorage store
  payments/          Paystack & MoMo adapters (common interface)
  components/        Page chrome, stay card
  pages/             home, search, listing, checkout, confirmation,
                     visa (pass registration), pass, merchant, admin, login
docs/
  PROJECT_PLAN.md    Architecture & path to production
  ROADMAP.md         Phased delivery plan
  AWS_COSTS.md       Reference AWS architecture + cost estimates
```

## Documentation

- 📋 [Project plan](docs/PROJECT_PLAN.md)
- 🗺️ [Roadmap](docs/ROADMAP.md)
- ☁️ [AWS cost estimates](docs/AWS_COSTS.md)

## Disclaimer

Demo software. Not affiliated with Booking.com. **Visa data is illustrative only
and is not legal travel advice** — always confirm entry requirements with official
government sources before travelling.
