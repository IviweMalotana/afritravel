# AfriTravel — AWS Architecture & Cost Estimates

Reference architecture and **illustrative** monthly cost estimates for running
AfriTravel on AWS. Figures use on-demand `us-east-1` / `af-south-1`-ish public
pricing as of 2024–2025 and are rounded for planning. **Always re-check with the
[AWS Pricing Calculator](https://calculator.aws/) before budgeting** — prices
change and `af-south-1` (Cape Town) runs a premium over US regions.

> TL;DR: a launch-ready stack runs roughly **$180–$320/month**; at ~50k bookings/mo
> expect **$900–$1,500/month** before payment-processing fees (which are a
> pass-through % charged by Paystack/MoMo, not AWS).

---

## Reference architecture

| Layer | Service | Why |
| --- | --- | --- |
| CDN + static SPA | **CloudFront + S3** | Serve this Vite build globally, cheaply |
| API | **API Gateway + Lambda** | Scales to zero; pay per request |
| Hot path (optional) | **ECS Fargate** | Steady search/booking traffic |
| Database | **Aurora Serverless v2 (Postgres)** | Auto-scaling ACUs |
| Search | **OpenSearch** (or Postgres FTS first) | Stay discovery |
| Media | **S3 + CloudFront** | Property photos |
| Auth | **Cognito** | Users/roles; 50k MAU free tier |
| Async | **SQS + EventBridge** | Payments webhooks, payouts, email |
| Email/SMS | **SES + SNS** | Receipts, OTPs |
| Secrets | **Secrets Manager** | Paystack/MoMo keys |
| Observability | **CloudWatch** | Logs, metrics, alarms |

---

## Stage 1 — MVP / Launch (low traffic)

~5k monthly active users, ~2k bookings/mo, search via Postgres FTS (no OpenSearch).

| Service | Assumption | Est. / mo |
| --- | --- | --- |
| S3 + CloudFront (SPA + media) | 50 GB transfer, few GB stored | $5–10 |
| API Gateway | ~2M requests | $7 |
| Lambda | ~2M invocations, 512 MB, 200 ms | $3–6 |
| Aurora Serverless v2 | 0.5–2 ACU, ~20 GB storage | $60–110 |
| Cognito | < 50k MAU (free tier) | $0 |
| SQS + EventBridge | low volume | $1–2 |
| SES + SNS | ~20k emails, some SMS | $5–20 |
| Secrets Manager | ~3 secrets | $2 |
| CloudWatch | logs + alarms | $5–15 |
| Route 53 + ACM | 1 hosted zone, TLS free | $1 |
| **Total** | | **≈ $180–320 / mo** |

> The Aurora floor dominates. Dropping to a single small RDS instance (or Aurora
> auto-pause in dev) can shave $40–80/mo while traffic is tiny.

---

## Stage 2 — Growth (medium traffic)

~50k MAU, ~50k bookings/mo, OpenSearch enabled, Fargate for the API hot path.

| Service | Assumption | Est. / mo |
| --- | --- | --- |
| CloudFront + S3 | ~1 TB transfer, photo-heavy | $90–150 |
| API Gateway / ALB | ~30M requests | $35–70 |
| Lambda + Fargate | 2× `0.5 vCPU/1 GB` tasks + bursts | $70–140 |
| Aurora Serverless v2 | 2–8 ACU, 100 GB, 1 replica | $300–550 |
| OpenSearch | 2× `t3.small.search` | $90–130 |
| Cognito | 50k MAU (still free) → just over | $0–25 |
| SQS / EventBridge / SES / SNS | higher volume | $30–70 |
| Secrets Manager / CloudWatch / misc | | $40–80 |
| **Total** | | **≈ $900–1,500 / mo** |

---

## Stage 3 — Scale (high traffic)

~500k MAU, ~500k bookings/mo, multi-AZ, read replicas, autoscaling Fargate.

Expect **$4,000–$8,000+/month**, dominated by Aurora (multiple replicas, higher
ACUs), OpenSearch (larger/data nodes), and CloudFront egress. At this stage,
commit to **Savings Plans / Reserved capacity** (30–50% off compute) and add
caching (**ElastiCache/Redis**, ~$50–150/mo) to take load off Aurora.

---

## Cost levers (biggest first)

1. **Aurora is usually #1.** Right-size ACUs, auto-pause non-prod, add a read
   replica only when read latency demands it. Consider plain RDS for steady loads.
2. **CloudFront egress.** Compress assets (this build gzips the JS to ~11 kB),
   set long cache TTLs on hashed assets, and resize/serve WebP property images.
3. **OpenSearch.** Defer it — Postgres full-text search covers Stage 1 fine.
4. **Lambda vs Fargate.** Lambda scales to zero (great early); switch hot paths
   to Fargate once they run hot enough that always-on is cheaper.
5. **Savings Plans.** Once usage is predictable, 1-year commitments cut compute
   30–50%.
6. **Region choice.** `af-south-1` reduces latency for African users but costs
   more than US/EU regions — weigh latency vs. spend, or split CDN (global) from
   compute (cheaper region).

---

## What's *not* in these numbers

- **Payment processing fees** — Paystack/MoMo charge a per-transaction % (and
  caps) that pass through to the platform; budget separately as COGS.
- **Domain registration**, third-party email/SMS overages, SaaS observability
  (Datadog/Sentry), and data-transfer between regions.
- **Support, on-call, and human ops.**

---

*Estimates are planning-grade, not a quote. Model your own workload in the AWS
Pricing Calculator before committing budget.*
