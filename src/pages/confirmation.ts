import type { Route } from "../router.ts";
import { shell, wireChrome } from "../components/chrome.ts";
import { store } from "../lib/store.ts";
import { stayById } from "../data/stays.ts";
import { money } from "../lib/format.ts";
import { countryByCode } from "../data/countries.ts";

export const confirmationRoute: Route = {
  path: "/confirmation/:id",
  render(params) {
    const booking = store.get().bookings.find((b) => b.id === params.id);
    if (!booking) return shell('<section class="section"><h2>Booking not found</h2><a class="link" href="#/">Home</a></section>');
    const stay = stayById(booking.stayId);
    const country = countryByCode(stay?.countryCode ?? "");

    return shell(`
      <section class="section confirm">
        <div class="confirm-card card pad">
          <div class="confirm-tick">✓</div>
          <h1>You're booked!</h1>
          <p class="muted">Confirmation <strong>${booking.id}</strong> sent to ${booking.email}</p>
          <div class="confirm-detail">
            <h3>${stay?.name ?? "Stay"}</h3>
            <p class="muted">${country?.flag ?? ""} ${stay?.city ?? ""}, ${country?.name ?? ""}</p>
            <div class="quote-row"><span>${booking.checkIn} → ${booking.checkOut}</span><span>${booking.nights} nights</span></div>
            <div class="quote-row"><span>Guests</span><span>${booking.guests}</span></div>
            <div class="quote-row"><span>Paid via ${booking.paymentMethod === "momo" ? "Mobile Money" : "Paystack"}</span><span></span></div>
            <div class="quote-row quote-total"><span>Total paid</span><span>${money(booking.total, booking.currency)}</span></div>
          </div>
          <div class="visa-nudge" style="border-color:#0f7b6c">
            <strong style="color:#0f7b6c">${country?.flag ?? ""} Travelling to ${country?.name ?? "your destination"}?</strong>
            <span class="muted small">Skip the visa queue — register for your free AfriTravel Visa-Free Pass and breeze through immigration.
              <a class="link" href="#/visa">Get your pass →</a></span>
          </div>
          <a class="btn btn-primary" href="#/">Back to stays</a>
        </div>
      </section>
    `);
  },
  mounted() {
    wireChrome();
  },
};
