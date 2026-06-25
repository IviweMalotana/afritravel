// Shared domain types for the AfriTravel demo.

export type Currency = "NGN" | "GHS" | "KES" | "ZAR" | "USD" | "RWF" | "EGP";

export type StayType =
  | "Hotel"
  | "Apartment"
  | "Villa"
  | "Guesthouse"
  | "Lodge"
  | "Boutique";

export interface Stay {
  id: string;
  name: string;
  type: StayType;
  city: string;
  countryCode: string; // ISO-3166 alpha-2
  description: string;
  pricePerNight: number; // in `currency`
  currency: Currency;
  rating: number; // 0..5
  reviews: number;
  amenities: string[];
  maxGuests: number;
  bedrooms: number;
  image: string; // gradient seed / emoji-based placeholder
  merchantId: string;
  featured?: boolean;
}

export interface Country {
  code: string; // alpha-2
  name: string;
  flag: string; // emoji
  region: "West" | "East" | "Southern" | "North" | "Central";
  capital: string;
}

/** A visa-free / visa-on-arrival relationship between two passports. */
export type VisaPolicy = "visa-free" | "visa-on-arrival" | "eta" | "visa-required";

export interface Booking {
  id: string;
  stayId: string;
  guestName: string;
  email: string;
  checkIn: string; // ISO date
  checkOut: string; // ISO date
  guests: number;
  nights: number;
  total: number;
  currency: Currency;
  paymentMethod: "paystack" | "momo";
  status: "pending" | "paid" | "cancelled";
  createdAt: string;
}

/** A registered Visa-Free Travel Pass issued to a traveller. */
export interface TravelPass {
  id: string; // human-facing pass number, e.g. AFP-XXXXXX
  holder: string;
  passportNo: string;
  nationality: string; // country code (alpha-2)
  destination: string; // country code (alpha-2)
  validFrom: string; // ISO date
  validUntil: string; // ISO date
  purpose: "Tourism" | "Business" | "Family" | "Transit";
  status: "approved";
  issuedAt: string; // ISO timestamp
}

export type Role = "customer" | "merchant" | "admin" | "visa";

export interface Merchant {
  id: string;
  name: string;
  country: string;
  joined: string;
  payoutMethod: "paystack" | "momo" | "bank";
}
