# AfriTravel — Project Plan

## 1. Vision

A pan-African travel marketplace that does two things Booking.com doesn't do well
for the continent:

1. **Stays built for Africa** — inventory, pricing currencies, and payment rails
   (Paystack, Mobile Money) that match how Africans actually book and pay.
2. **Visa-free travel guidance** — surface, at booking time, whether a traveller
   can enter the destination on their passport. Free movement (AfCFTA, ECOWAS,
   EAC, SADC) is a real differentiator and a real source of friction.

## 2. Personas & portals

| Persona | Needs | Portal (demo route) |
| --- | --- | --- |
| **Traveller (customer)** | Find, book, and pay for a stay; know visa rules | `#/`, `#/search`, `#/stay/:id`, `#/checkout/:id`, `#/visa` |
| **Host (merchant)** | List property, manage calendar/pricing, get paid | `#/merchant` |
| **Operations (admin)** | Monitor inventory, transactions, fraud, payouts | `#/admin` |
| **Compliance / visa** | Maintain the visa policy matrix | `#/visa` data + admin |

## 3. Current demo scope (this repo)

- ✅ Four portals wired through a hash router (no framework).
- ✅ 12 seed stays across 9 countries, 6 stay types, 7 currencies.
- ✅ Search + filter + sort, live price quoting.
- ✅ Visa matrix with regional-bloc heuristics + explicit overrides.
- ✅ Paystack & MoMo adapters behind one `PaymentProvider` interface (mock mode).
- ✅ Booking lifecycle persisted to `localStorage`; surfaced in merchant & admin.
- ✅ Strict TypeScript, `tsc --noEmit` clean, Vite production build.

### Explicitly out of scope for the demo
Real auth, real payment settlement, a server/database, image hosting, search
relevance, i18n, and reviews. These are the backbone of the production plan below.

## 4. Target production architecture

```
                ┌──────────────────────────────────────────────┐
   Browser ───► │  CloudFront + S3 (static SPA, this codebase)  │
                └───────────────┬──────────────────────────────┘
                                │ HTTPS /api
                ┌───────────────▼──────────────────────────────┐
                │  API Gateway → Lambda / ECS Fargate (Node)    │
                │  • auth (Cognito)   • bookings  • search       │
                │  • payments-webhooks • payouts  • visa-rules   │
                └───┬───────────┬───────────┬───────────┬───────┘
                    │           │           │           │
              ┌─────▼───┐ ┌─────▼────┐ ┌────▼─────┐ ┌───▼──────┐
              │ Aurora  │ │ OpenSrch │ │   S3     │ │ Paystack │
              │ Postgres│ │ (stays)  │ │ (images) │ │  + MoMo  │
              └─────────┘ └──────────┘ └──────────┘ └──────────┘
```

- **Frontend**: this SPA, served from **S3 + CloudFront**. Migrate rendering
  functions into a component framework (or keep vanilla) — the data/types/payment
  layers are already framework-agnostic.
- **API**: **API Gateway + Lambda** to start (cheap, scales to zero), graduating
  hot paths (search) to **ECS Fargate** if needed.
- **Database**: **Aurora Serverless v2 (PostgreSQL)** for stays, bookings, users,
  merchants, payouts.
- **Search**: **OpenSearch** (or Postgres full-text first) for stay discovery.
- **Media**: **S3** for property photos, served via CloudFront.
- **Auth**: **Cognito** user pools, role-based (customer / merchant / admin).
- **Payments**: server-side Paystack + MoMo; webhooks via API Gateway → Lambda →
  SQS for reliable settlement processing. Secrets in **Secrets Manager**.
- **Async**: **SQS/EventBridge** for payout batching, email/SMS, payment retries.

See [`AWS_COSTS.md`](AWS_COSTS.md) for the sizing and monthly estimates.

## 5. Data model (production)

| Entity | Key fields |
| --- | --- |
| `users` | id, role, name, email, passport_country |
| `merchants` | id, name, country, payout_method, kyc_status |
| `stays` | id, merchant_id, type, geo, currency, price, amenities[] |
| `availability` | stay_id, date, price_override, is_blocked |
| `bookings` | id, stay_id, user_id, dates, guests, total, currency, status |
| `payments` | id, booking_id, provider, provider_ref, amount, status |
| `payouts` | id, merchant_id, period, amount, status |
| `visa_rules` | from_country, to_country, policy, source, updated_at |

The demo's `src/types.ts` is the seed of this schema.

## 6. Payments design

- One `PaymentProvider` interface; provider chosen by stay currency + traveller
  preference (already implemented in `src/payments/`).
- **Paystack**: initialize server-side, redirect to `authorization_url`, verify
  on callback **and** via webhook (idempotent on `reference`).
- **MoMo**: `requesttopay`, then poll/await callback; reconcile by `externalId`.
- **Idempotency**: every charge keyed by booking `reference`; webhooks are the
  source of truth, the client result is advisory.
- **Payouts**: scheduled batch per merchant, minus platform fee (demo uses 8%).

## 7. Compliance & trust

- Visa data must cite an authoritative source per rule and carry an `updated_at`;
  show a "not legal advice" disclaimer (already in the footer/visa page).
- KYC for merchants before payout; PCI scope minimised by never touching card
  data (Paystack-hosted) — see the secret-handling notes in the adapters.

## 8. Risks

| Risk | Mitigation |
| --- | --- |
| Visa rules go stale / wrong | Sourced + dated rules, admin review, disclaimer |
| FX across 7+ currencies | Settle per-currency; FX-normalise only for reporting |
| Payment reconciliation gaps | Webhook-driven, idempotent, SQS retries |
| Trust/fraud on a new marketplace | Cognito + KYC + manual review queue (admin) |
