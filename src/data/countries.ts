import type { Country } from "../types.ts";

// A representative slice of African nations used across the demo.
export const COUNTRIES: Country[] = [
  { code: "NG", name: "Nigeria", flag: "🇳🇬", region: "West", capital: "Abuja" },
  { code: "GH", name: "Ghana", flag: "🇬🇭", region: "West", capital: "Accra" },
  { code: "SN", name: "Senegal", flag: "🇸🇳", region: "West", capital: "Dakar" },
  { code: "CI", name: "Côte d'Ivoire", flag: "🇨🇮", region: "West", capital: "Yamoussoukro" },
  { code: "KE", name: "Kenya", flag: "🇰🇪", region: "East", capital: "Nairobi" },
  { code: "TZ", name: "Tanzania", flag: "🇹🇿", region: "East", capital: "Dodoma" },
  { code: "RW", name: "Rwanda", flag: "🇷🇼", region: "East", capital: "Kigali" },
  { code: "UG", name: "Uganda", flag: "🇺🇬", region: "East", capital: "Kampala" },
  { code: "ET", name: "Ethiopia", flag: "🇪🇹", region: "East", capital: "Addis Ababa" },
  { code: "ZA", name: "South Africa", flag: "🇿🇦", region: "Southern", capital: "Pretoria" },
  { code: "NA", name: "Namibia", flag: "🇳🇦", region: "Southern", capital: "Windhoek" },
  { code: "BW", name: "Botswana", flag: "🇧🇼", region: "Southern", capital: "Gaborone" },
  { code: "MA", name: "Morocco", flag: "🇲🇦", region: "North", capital: "Rabat" },
  { code: "EG", name: "Egypt", flag: "🇪🇬", region: "North", capital: "Cairo" },
  { code: "TN", name: "Tunisia", flag: "🇹🇳", region: "North", capital: "Tunis" },
];

export const countryByCode = (code: string): Country | undefined =>
  COUNTRIES.find((c) => c.code === code);

export const countryName = (code: string): string =>
  countryByCode(code)?.name ?? code;
