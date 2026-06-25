import { paystack } from "./paystack.ts";
import { momo } from "./momo.ts";
import type { PaymentProvider } from "./types.ts";

export const PROVIDERS: PaymentProvider[] = [paystack, momo];

export const providerById = (id: string): PaymentProvider | undefined =>
  PROVIDERS.find((p) => p.id === id);

export type { ChargeRequest, ChargeResult, PaymentProvider } from "./types.ts";
