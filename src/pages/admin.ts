import type { Route } from "../router.ts";
import { shell, wireChrome } from "../components/chrome.ts";
import { STAYS, stayById } from "../data/stays.ts";
import { COUNTRIES } from "../data/countries.ts";
import { store } from "../lib/store.ts";
import { money } from "../lib/format.ts";

export const adminRoute: Route = {
  path: "/admin",
  render() {
    store.setRole("admin");
    const bookings = store.get().bookings;
    const merchants = new Set(STAYS.map((s) => s.merchantId));
    const countries = new Set(STAYS.map((s) => s.countryCode));

    // GMV in USD-ish terms is meaningless across currencies in a demo, so we
    // count transactions and show per-currency volume instead.
    const byCurrency = new Map<string, number>();
    for (const b of bookings.filter((b) => b.status === "paid")) {
      byCurrency.set(b.currency, (byCurrency.get(b.currency) ?? 0) + b.total);
    }
    const volume = [...byCurrency.entries()]
      .map(([c, amt]) => money(amt, c as never))
      .join(" · ") || "—";

    // Inventory by region.
    const regionCounts = new Map<string, number>();
    for (const s of STAYS) {
      const region = COUNTRIES.find((c) => c.code === s.countryCode)?.region ?? "—";
      regionCounts.set(region, (regionCounts.get(region) ?? 0) + 1);
    }
    const maxRegion = Math.max(...regionCounts.values());
    const regionBars = [...regionCounts.entries()]
      .sort((a, b) => b[1] - a[1])
      .map(
        ([region, n]) => `
        <div class="bar-row">
          <span>${region} Africa</span>
          <div class="bar"><div class="bar-fill" style="width:${(n / maxRegion) * 100}%"></div></div>
          <span class="muted">${n}</span>
        </div>`,
      )
      .join("");

    const recent = bookings.slice(0, 8);
    const bookingRows = recent.length
      ? recent
          .map(
            (b) => `
            <tr>
              <td class="mono">${b.id}</td>
              <td>${stayById(b.stayId)?.name ?? b.stayId}</td>
              <td>${b.guestName}</td>
              <td>${money(b.total, b.currency)}</td>
              <td>${b.paymentMethod === "momo" ? "MoMo" : "Paystack"}</td>
              <td><span class="status status-${b.status}">${b.status}</span></td>
            </tr>`,
          )
          .join("")
      : '<tr><td colspan="6" class="muted">No bookings yet. Make one from the customer portal to see it here.</td></tr>';

    return shell(`
      <section class="section">
        <div class="portal-head">
          <div>
            <span class="eyebrow">Admin console</span>
            <h1>Platform overview</h1>
            <p class="muted">Marketplace health across stays, merchants and payments.</p>
          </div>
          <button class="btn btn-ghost" data-action="reset">Reset demo data</button>
        </div>

        <div class="stats">
          <div class="stat"><span class="stat-num">${STAYS.length}</span><span class="muted">Listings</span></div>
          <div class="stat"><span class="stat-num">${merchants.size}</span><span class="muted">Merchants</span></div>
          <div class="stat"><span class="stat-num">${countries.size}</span><span class="muted">Countries</span></div>
          <div class="stat"><span class="stat-num">${bookings.length}</span><span class="muted">Bookings</span></div>
        </div>

        <div class="admin-grid">
          <div class="card pad">
            <h3>Inventory by region</h3>
            <div class="bars">${regionBars}</div>
          </div>
          <div class="card pad">
            <h3>Paid volume</h3>
            <p class="big-stat">${volume}</p>
            <p class="muted small">Per-currency settlement totals. A real console would FX-normalise to a reporting currency.</p>
          </div>
        </div>

        <h2>Recent transactions</h2>
        <div class="table-wrap">
          <table>
            <thead><tr><th>Reference</th><th>Stay</th><th>Guest</th><th>Total</th><th>Method</th><th>Status</th></tr></thead>
            <tbody>${bookingRows}</tbody>
          </table>
        </div>
      </section>
    `);
  },
  mounted() {
    wireChrome();
    document.querySelector('[data-action="reset"]')?.addEventListener("click", () => {
      if (confirm("Reset all demo bookings and session state?")) {
        store.reset();
        location.reload();
      }
    });
  },
};
