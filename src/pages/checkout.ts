import type { Route } from "../router.ts";
import { shell, wireChrome } from "../components/chrome.ts";
import { stayById } from "../data/stays.ts";
import { money, nightsBetween } from "../lib/format.ts";
import { PROVIDERS, providerById } from "../payments/index.ts";
import { store, uid } from "../lib/store.ts";
import type { Booking } from "../types.ts";

export const checkoutRoute: Route = {
  path: "/checkout/:id",
  render(params, query) {
    const stay = stayById(params.id);
    if (!stay) return shell('<section class="section"><h2>Stay not found</h2></section>');

    const checkIn = query.get("checkIn") ?? "";
    const checkOut = query.get("checkOut") ?? "";
    const guests = query.get("guests") ?? "2";
    const nights = nightsBetween(checkIn, checkOut);
    const subtotal = nights * stay.pricePerNight;
    const fee = Math.round(subtotal * 0.08);
    const total = subtotal + fee;
    const user = store.get().user;

    const methods = PROVIDERS.filter((p) => p.currencies.includes(stay.currency))
      .map(
        (p, i) => `
        <label class="pay-method">
          <input type="radio" name="method" value="${p.id}" ${i === 0 ? "checked" : ""} />
          <span><strong>${p.label.split(" — ")[0]}</strong><br/><span class="muted small">${p.label.split(" — ")[1] ?? ""}</span></span>
        </label>`,
      )
      .join("");

    return shell(`
      <section class="section checkout">
        <a class="link" href="#/stay/${stay.id}">← Back to stay</a>
        <h1>Confirm and pay</h1>
        <div class="checkout-grid">
          <form id="pay-form" class="card pad">
            <h3>Your trip</h3>
            <p class="muted">${stay.name} · ${stay.city}</p>
            <p class="muted small">${checkIn} → ${checkOut} · ${guests} guest${guests === "1" ? "" : "s"} · ${nights} night${nights === 1 ? "" : "s"}</p>

            <h3>Your details</h3>
            <label>Full name <input name="name" value="${user?.name ?? ""}" required /></label>
            <label>Email <input type="email" name="email" value="${user?.email ?? ""}" required /></label>

            <h3>Pay with</h3>
            <div class="pay-methods">${methods || '<p class="muted">No provider supports ' + stay.currency + " in this demo.</p>"}</div>

            <button class="btn btn-primary btn-block" type="submit" ${methods ? "" : "disabled"}>
              Pay ${money(total, stay.currency)}
            </button>
            <p class="muted small">Demo mode — no real payment is processed.</p>
            <div id="pay-status"></div>
          </form>

          <aside class="card pad summary">
            <h3>Price details</h3>
            <div class="quote-row"><span>${money(stay.pricePerNight, stay.currency)} × ${nights}</span><span>${money(subtotal, stay.currency)}</span></div>
            <div class="quote-row"><span>Service fee</span><span>${money(fee, stay.currency)}</span></div>
            <div class="quote-row quote-total"><span>Total (${stay.currency})</span><span>${money(total, stay.currency)}</span></div>
          </aside>
        </div>
      </section>
    `);
  },
  mounted(params, query) {
    wireChrome();
    const stay = stayById(params.id);
    if (!stay) return;
    const form = document.getElementById("pay-form") as HTMLFormElement | null;
    const statusEl = document.getElementById("pay-status");
    if (!form || !statusEl) return;

    const checkIn = query.get("checkIn") ?? "";
    const checkOut = query.get("checkOut") ?? "";
    const guests = Number(query.get("guests") ?? "2");
    const nights = nightsBetween(checkIn, checkOut);
    const subtotal = nights * stay.pricePerNight;
    const total = subtotal + Math.round(subtotal * 0.08);

    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      const data = new FormData(form);
      const methodId = String(data.get("method") ?? "");
      const provider = providerById(methodId);
      if (!provider) return;

      const button = form.querySelector("button");
      if (button) button.disabled = true;
      statusEl.innerHTML = `<p class="pay-pending">⏳ Contacting ${provider.id === "momo" ? "Mobile Money — check your phone…" : "Paystack…"}</p>`;

      const reference = uid("AT");
      const result = await provider.charge({
        email: String(data.get("email")),
        amount: total,
        currency: stay.currency,
        reference,
        metadata: { stayId: stay.id, guests },
      });

      if (result.status === "success") {
        const booking: Booking = {
          id: reference,
          stayId: stay.id,
          guestName: String(data.get("name")),
          email: String(data.get("email")),
          checkIn,
          checkOut,
          guests,
          nights,
          total,
          currency: stay.currency,
          paymentMethod: provider.id,
          status: "paid",
          createdAt: new Date().toISOString(),
        };
        store.addBooking(booking);
        location.hash = `/confirmation/${booking.id}`;
      } else {
        statusEl.innerHTML = `<p class="pay-fail">⚠️ ${result.message}</p>`;
        if (button) button.disabled = false;
      }
    });
  },
};
