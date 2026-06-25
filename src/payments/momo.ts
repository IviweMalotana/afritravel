import type { ChargeRequest, ChargeResult, PaymentProvider } from "./types.ts";

// Mobile Money (MoMo) adapter — modelled on the MTN MoMo Collections API.
//
// In production the flow is:
//   1. POST /collection/v1_0/requesttopay  (X-Reference-Id = UUID, with a
//      Bearer token from /collection/token/ and your Ocp-Apim-Subscription-Key)
//   2. The payer approves the prompt on their phone.
//   3. Poll GET /collection/v1_0/requesttopay/{referenceId} until SUCCESSFUL.
//
// MoMo settles in whole currency units for the partner's country wallet.
// This demo runs in mock mode and simulates the approve-on-phone step.

const MOMO_SUBSCRIPTION_KEY = import.meta.env.VITE_MOMO_SUBSCRIPTION_KEY ?? "";
const MOCK = !MOMO_SUBSCRIPTION_KEY;

async function mockCharge(req: ChargeRequest): Promise<ChargeResult> {
  // Simulate the "check your phone to approve" delay.
  await new Promise((r) => setTimeout(r, 1500));
  return {
    reference: req.reference,
    status: "success",
    provider: "momo",
    message: `Mock MoMo collection of ${req.amount} ${req.currency} approved on device.`,
  };
}

export const momo: PaymentProvider = {
  id: "momo",
  label: "Mobile Money — MTN / Airtel / M-Pesa",
  currencies: ["GHS", "KES", "RWF", "NGN"],
  async charge(req) {
    if (MOCK) return mockCharge(req);

    const res = await fetch("/api/momo/requesttopay", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        amount: req.amount,
        currency: req.currency,
        externalId: req.reference,
        payerMessage: "AfriTravel booking",
        payeeNote: req.reference,
      }),
    });
    const data = await res.json();
    return {
      reference: req.reference,
      status: res.ok ? "success" : "failed",
      provider: "momo",
      message: data.message ?? "MoMo request-to-pay sent.",
    };
  },
};
