import type { Currency } from "../types.ts";

const SYMBOL: Record<Currency, string> = {
  NGN: "₦",
  GHS: "GH₵",
  KES: "KSh",
  ZAR: "R",
  USD: "$",
  RWF: "FRw",
  EGP: "E£",
};

export function money(amount: number, currency: Currency): string {
  const symbol = SYMBOL[currency] ?? "";
  return `${symbol}${amount.toLocaleString("en-US")}`;
}

export function nightsBetween(checkIn: string, checkOut: string): number {
  const a = new Date(checkIn).getTime();
  const b = new Date(checkOut).getTime();
  if (Number.isNaN(a) || Number.isNaN(b) || b <= a) return 0;
  return Math.round((b - a) / (1000 * 60 * 60 * 24));
}

export function stars(rating: number): string {
  const full = Math.round(rating);
  return "★".repeat(full) + "☆".repeat(5 - full);
}

export function gradientFor(seed: string): string {
  // Deterministic two-stop gradient from a seed string.
  let h = 0;
  for (let i = 0; i < seed.length; i++) h = (h * 31 + seed.charCodeAt(i)) >>> 0;
  const h1 = h % 360;
  const h2 = (h1 + 40) % 360;
  return `linear-gradient(135deg, hsl(${h1} 55% 45%), hsl(${h2} 60% 35%))`;
}

export function hashInt(seed: string): number {
  // FNV-1a — stable across reloads, used to seed the faux QR matrix.
  let h = 2166136261;
  for (let i = 0; i < seed.length; i++) {
    h ^= seed.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

/** Render a deterministic QR-like SVG (decorative — encodes nothing real). */
export function fauxQr(seed: string, size = 17): string {
  let s = hashInt(seed) || 1;
  const rng = () => {
    // mulberry32
    s |= 0;
    s = (s + 0x6d2b79f5) | 0;
    let t = Math.imul(s ^ (s >>> 15), 1 | s);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
  const cell = 6;
  const dim = size * cell;
  let rects = "";
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      // Keep the three finder corners solid like a real QR.
      const corner =
        (x < 4 && y < 4) || (x >= size - 4 && y < 4) || (x < 4 && y >= size - 4);
      const on = corner ? (x % 3 !== 1 || y % 3 !== 1) : rng() > 0.5;
      if (on) rects += `<rect x="${x * cell}" y="${y * cell}" width="${cell}" height="${cell}"/>`;
    }
  }
  return `<svg class="qr" viewBox="0 0 ${dim} ${dim}" width="${dim}" height="${dim}" fill="#0a5a4f" xmlns="http://www.w3.org/2000/svg"><rect width="${dim}" height="${dim}" fill="#fff"/>${rects}</svg>`;
}

export function todayPlus(days: number): string {
  const d = new Date();
  d.setDate(d.getDate() + days);
  return d.toISOString().slice(0, 10);
}
