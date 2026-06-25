import type { VisaPolicy } from "../types.ts";
import { COUNTRIES } from "./countries.ts";

// Demo visa matrix. NOTE: illustrative only — not legal travel advice.
// Keyed as `${fromCode}->${toCode}`. Anything unspecified defaults via
// regional heuristics in `getVisaPolicy` below.
const OVERRIDES: Record<string, VisaPolicy> = {
  // ECOWAS free movement (West Africa) — broadly visa-free
  "NG->GH": "visa-free",
  "GH->NG": "visa-free",
  "NG->SN": "visa-free",
  "SN->NG": "visa-free",
  "CI->GH": "visa-free",
  // East African Community
  "KE->RW": "visa-free",
  "RW->KE": "visa-free",
  "KE->UG": "visa-free",
  "UG->KE": "visa-free",
  "TZ->KE": "visa-free",
  // Rwanda: visa-free / on-arrival to all Africans (real policy)
  "NG->RW": "visa-free",
  "ZA->RW": "visa-free",
  "EG->RW": "visa-free",
  // Kenya electronic travel authorisation
  "ZA->KE": "eta",
  "MA->KE": "eta",
  // SADC region
  "ZA->NA": "visa-free",
  "NA->ZA": "visa-free",
  "ZA->BW": "visa-free",
  "BW->ZA": "visa-free",
  // North Africa is generally more restrictive for sub-Saharan passports
  "NG->EG": "visa-required",
  "NG->MA": "visa-free", // Morocco waives for several West African states
  "KE->EG": "visa-on-arrival",
  "EG->NG": "visa-required",
};

const REGION_OF = new Map(COUNTRIES.map((c) => [c.code, c.region]));

export function getVisaPolicy(from: string, to: string): VisaPolicy {
  if (from === to) return "visa-free";
  const key = `${from}->${to}`;
  if (OVERRIDES[key]) return OVERRIDES[key];

  const rf = REGION_OF.get(from);
  const rt = REGION_OF.get(to);

  // Same regional bloc → tends to be visa-free
  if (rf && rt && rf === rt) return "visa-free";
  // North Africa ↔ sub-Saharan → often visa required
  if (rf === "North" || rt === "North") return "visa-on-arrival";
  // Cross-region default for the demo
  return "visa-on-arrival";
}

export const POLICY_META: Record<
  VisaPolicy,
  { label: string; color: string; blurb: string }
> = {
  "visa-free": {
    label: "Visa-free",
    color: "#0f7b6c",
    blurb: "Travel with just your passport — no visa needed.",
  },
  "visa-on-arrival": {
    label: "Visa on arrival",
    color: "#f4b740",
    blurb: "Get your visa at the border or airport on arrival.",
  },
  eta: {
    label: "eTA required",
    color: "#3b82f6",
    blurb: "Apply online for an electronic travel authorisation before you go.",
  },
  "visa-required": {
    label: "Visa required",
    color: "#ef4444",
    blurb: "Apply for a visa at an embassy or consulate before travel.",
  },
};
