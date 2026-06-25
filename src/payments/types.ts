import type { Currency } from "../types.ts";

export interface ChargeRequest {
  email: string;
  amount: number; // major units (e.g. naira, not kobo) — adapters convert
  currency: Currency;
  reference: string;
  metadata?: Record<string, unknown>;
}

export interface ChargeResult {
  reference: string;
  status: "success" | "failed";
  provider: "paystack" | "momo";
  message: string;
  authorizationUrl?: string;
}

export interface PaymentProvider {
  readonly id: "paystack" | "momo";
  readonly label: string;
  /** Currencies the provider can settle in this demo. */
  readonly currencies: Currency[];
  charge(req: ChargeRequest): Promise<ChargeResult>;
}
