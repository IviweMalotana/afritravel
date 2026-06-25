import type { Route } from "../router.ts";
import { shell, wireChrome } from "../components/chrome.ts";
import { STAYS, stayById } from "../data/stays.ts";
import { store } from "../lib/store.ts";
import { money, gradientFor } from "../lib/format.ts";
import { countryName } from "../data/countries.ts";

// Demo: treat merchant "mer-002" as the logged-in host (owns 2 listings).
const DEMO_MERCHANT = "mer-002";

export const merchantRoute: Route = {
  path: "/merchant",
  render() {
    store.setRole("merchant");
    const listings = STAYS.filter((s) => s.merchantId === DEMO_MERCHANT);
    const myStayIds = new Set(listings.map((s) => s.id));
    const bookings = store.get().bookings.filter((b) => myStayIds.has(b.stayId));

    const revenue = bookings
      .filter((b) => b.status === "paid")
      .reduce((sum, b) => sum + b.total, 0);
    const currency = listings[0]?.currency ?? "USD";

    const rows = listings
      .map(
        (s) => `
        <tr>
          <td>
            <span class="thumb" style="background:${gradientFor(s.id)}">${s.image}</span>
            ${s.name}
          </td>
          <td>${s.city}, ${countryName(s.countryCode)}</td>
          <td>${money(s.pricePerNight, s.currency)}</td>
          <td>${s.rating.toFixed(1)} ★</td>
          <td><span class="status status-live">Live</span></td>
        </tr>`,
      )
      .join("");

    const bookingRows = bookings.length
      ? bookings
          .map(
            (b) => `
            <tr>
              <td>${stayById(b.stayId)?.name ?? b.stayId}</td>
              <td>${b.guestName}</td>
              <td>${b.checkIn} → ${b.checkOut}</td>
              <td>${money(b.total, b.currency)}</td>
              <td><span class="status status-${b.status}">${b.status}</span></td>
            </tr>`,
          )
          .join("")
      : '<tr><td colspan="5" class="muted">No bookings yet — they\'ll appear here once guests reserve.</td></tr>';

    return shell(`
      <section class="section">
        <div class="portal-head">
          <div>
            <span class="eyebrow">Merchant portal</span>
            <h1>Osu Hospitality Group</h1>
            <p class="muted">Manage your listings, bookings and payouts.</p>
          </div>
          <button class="btn btn-primary" data-action="new-listing">+ New listing</button>
        </div>

        <div class="stats">
          <div class="stat"><span class="stat-num">${listings.length}</span><span class="muted">Active listings</span></div>
          <div class="stat"><span class="stat-num">${bookings.length}</span><span class="muted">Bookings</span></div>
          <div class="stat"><span class="stat-num">${money(revenue, currency)}</span><span class="muted">Revenue (paid)</span></div>
          <div class="stat"><span class="stat-num">Paystack</span><span class="muted">Payout method</span></div>
        </div>

        <h2>Your listings</h2>
        <div class="table-wrap">
          <table>
            <thead><tr><th>Property</th><th>Location</th><th>Price/night</th><th>Rating</th><th>Status</th></tr></thead>
            <tbody>${rows}</tbody>
          </table>
        </div>

        <h2>Recent bookings</h2>
        <div class="table-wrap">
          <table>
            <thead><tr><th>Property</th><th>Guest</th><th>Dates</th><th>Total</th><th>Status</th></tr></thead>
            <tbody>${bookingRows}</tbody>
          </table>
        </div>
      </section>
    `);
  },
  mounted() {
    wireChrome();
    document.querySelector('[data-action="new-listing"]')?.addEventListener("click", () => {
      alert("Demo: the new-listing wizard would open here (photos, pricing, calendar, payout setup).");
    });
  },
};
