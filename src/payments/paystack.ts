import type { ChargeRequest, ChargeResult, PaymentProvider } from "./types.ts";

// Paystack adapter.
//
// In production you would initialize a transaction server-side via
//   POST https://api.paystack.co/transaction/initialize
// (Authorization: Bearer PAYSTACK_SECRET_KEY) and redirect the customer to the
// returned `authorization_url`, then verify with
//   GET https://api.paystack.co/transaction/verify/:reference
//
// Paystack expects amounts in the *minor* unit (kobo / pesewas / cents).
// This demo runs in mock mode and never transmits card data.

const PAYSTACK_PUBLIC_KEY = import.meta.env.VITE_PAYSTACK_PUBLIC_KEY ?? "";
const MOCK = !PAYSTACK_PUBLIC_KEY;

function toMinorUnits(amount: number): number {
  return Math.round(amount * 100);
}

async function mockCharge(req: ChargeRequest): Promise<ChargeResult> {
  await new Promise((r) => setTimeout(r, 900));
  return {
    reference: req.reference,
    status: "success",
    provider: "paystack",
    message: `Mock Paystack charge of ${toMinorUnits(req.amount)} ${req.currency} (minor units) authorized.`,
  };
}

export const paystack: PaymentProvider = {
  id: "paystack",
  label: "Paystack — Card / Bank / USSD",
  currencies: ["NGN", "GHS", "ZAR", "KES", "USD"],
  async charge(req) {
    if (MOCK) return mockCharge(req);

    // Real integration sketch (requires a backend to hold the secret key).
    const res = await fetch("/api/paystack/initialize", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: req.email,
        amount: toMinorUnits(req.amount),
        currency: req.currency,
        reference: req.reference,
        metadata: req.metadata,
      }),
    });
    const data = await res.json();
    return {
      reference: req.reference,
      status: res.ok ? "success" : "failed",
      provider: "paystack",
      message: data.message ?? "Paystack transaction initialized.",
      authorizationUrl: data.authorization_url,
    };
  },
};
