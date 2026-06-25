# AfriTravel — Roadmap

A phased path from this demo to a production marketplace. Timeframes assume a
small team (2–4 engineers + 1 designer/PM).

---

## ✅ Phase 0 — Demo (this repo)

**Goal:** prove the concept end-to-end in the browser.

- [x] Vite + Bun + TypeScript scaffold, strict mode, clean build
- [x] Customer, merchant, admin, and visa portals
- [x] Seed inventory (12 stays / 9 countries / 7 currencies)
- [x] Search, filter, sort, live price quote
- [x] Visa matrix with bloc heuristics + overrides
- [x] Paystack + MoMo adapters (mock mode) behind one interface
- [x] Booking lifecycle in `localStorage`, surfaced to merchant/admin

---

## Phase 1 — Foundations (≈ 4–6 weeks)

**Goal:** a real backend the demo UI can talk to.

- [ ] Aurora Postgres schema from `src/types.ts`; migrations
- [ ] REST/tRPC API (API Gateway + Lambda): stays, search, bookings
- [ ] Cognito auth; replace the demo login with real sessions + roles
- [ ] Move seed data into the database; admin CRUD for stays
- [ ] CI: typecheck + build + deploy SPA to S3/CloudFront

**Exit:** a logged-in user can browse live data and create a (still unpaid) booking.

---

## Phase 2 — Payments for real (≈ 4–5 weeks)

**Goal:** money actually moves.

- [ ] Server-side Paystack initialize/verify + **webhooks** (idempotent)
- [ ] MoMo Collections `requesttopay` + status callbacks
- [ ] Secrets Manager for provider keys; PCI-minimised (hosted checkout)
- [ ] Booking state machine: pending → paid → cancelled/refunded
- [ ] Merchant payouts (batched, fee-deducted) + payout ledger
- [ ] Receipts/notifications via SES + SMS

**Exit:** a traveller pays, the host sees the booking, a payout is scheduled.

---

## Phase 3 — Marketplace depth (≈ 6–8 weeks)

**Goal:** make it a real product, not a catalogue.

- [ ] Property photos: S3 upload + CloudFront delivery + thumbnails
- [ ] Availability calendar, dynamic pricing, instant vs. request-to-book
- [ ] OpenSearch: geo + relevance ranking, map view, filters at scale
- [ ] Reviews & ratings (post-stay), host responses
- [ ] Merchant onboarding wizard + KYC, payout method verification
- [ ] Wishlists, booking management & cancellations for travellers

**Exit:** a host can self-onboard and a traveller can plan a multi-stay trip.

---

## Phase 4 — Visa-free as a differentiator (≈ 4–6 weeks)

**Goal:** own the "where can I go" question.

- [ ] Sourced, dated visa-rule database with admin review workflow
- [ ] Passport-aware results everywhere (badges in search & on listings)
- [ ] "Visa-free trip planner": destinations reachable on your passport
- [ ] Partnerships / deep-links for eTA & visa-on-arrival applications
- [ ] Regional bloc pages (ECOWAS, EAC, SADC, AfCFTA explainers)

**Exit:** travellers come for visa guidance and stay to book.

---

## Phase 5 — Scale & growth (ongoing)

- [ ] i18n (English, French, Arabic, Swahili, Portuguese) + multi-currency UX
- [ ] Mobile apps (React Native / Expo) reusing the API + payment adapters
- [ ] Fraud & trust tooling, dispute resolution, support console
- [ ] Loyalty / referrals, host analytics, demand-shaping pricing
- [ ] Observability SLOs, autoscaling, multi-region read replicas

---

## Guiding principles

1. **Africa-first defaults** — currencies, payment rails, and connectivity
   realities (offline-tolerant, low-bandwidth) drive UX decisions.
2. **Webhooks are truth** — never trust the client for payment state.
3. **Compliance is a feature** — sourced, dated visa data with disclaimers.
4. **Keep the core framework-light** — the data/types/payment layers stay
   portable so the UI can evolve independently.
