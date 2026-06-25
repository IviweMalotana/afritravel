import type { Route } from "../router.ts";
import { shell, wireChrome } from "../components/chrome.ts";
import { stayById } from "../data/stays.ts";
import { countryByCode } from "../data/countries.ts";
import { money, stars, gradientFor, todayPlus, nightsBetween } from "../lib/format.ts";

export const listingRoute: Route = {
  path: "/stay/:id",
  render(params) {
    const stay = stayById(params.id);
    if (!stay) return shell('<section class="section"><h2>Stay not found</h2><a class="link" href="#/">Back to stays</a></section>');
    const country = countryByCode(stay.countryCode);

    const amenities = stay.amenities
      .map((a) => `<li>✓ ${a}</li>`)
      .join("");

    return shell(`
      <section class="section">
        <a class="link" href="#/search">← Back to results</a>
        <div class="listing-media" style="background:${gradientFor(stay.id)}">
          <span class="listing-emoji">${stay.image}</span>
        </div>
        <div class="listing-grid">
          <div>
            <h1>${stay.name}</h1>
            <p class="muted">${country?.flag ?? ""} ${stay.city}, ${country?.name ?? ""} · ${stay.type}</p>
            <p class="rating">${stay.rating.toFixed(1)} <span class="stars">${stars(stay.rating)}</span>
              <span class="muted">(${stay.reviews} reviews)</span></p>
            <p class="listing-desc">${stay.description}</p>
            <h3>What this place offers</h3>
            <ul class="amenities">${amenities}</ul>
            <p class="muted">Sleeps ${stay.maxGuests} · ${stay.bedrooms} bedroom${stay.bedrooms === 1 ? "" : "s"}</p>
          </div>

          <aside class="booking-box">
            <div class="price-lg">${money(stay.pricePerNight, stay.currency)} <span class="muted">/ night</span></div>
            <form id="book-form">
              <label>Check-in <input type="date" name="checkIn" value="${todayPlus(14)}" required /></label>
              <label>Check-out <input type="date" name="checkOut" value="${todayPlus(17)}" required /></label>
              <label>Guests
                <input type="number" name="guests" min="1" max="${stay.maxGuests}" value="2" required />
              </label>
              <div class="quote" id="quote"></div>
              <button class="btn btn-primary btn-block" type="submit">Reserve</button>
              <p class="muted small">You won't be charged yet.</p>
            </form>
          </aside>
        </div>
      </section>
    `);
  },
  mounted(params) {
    wireChrome();
    const stay = stayById(params.id);
    if (!stay) return;
    const form = document.getElementById("book-form") as HTMLFormElement | null;
    const quote = document.getElementById("quote");
    if (!form || !quote) return;

    const update = () => {
      const data = new FormData(form);
      const nights = nightsBetween(String(data.get("checkIn")), String(data.get("checkOut")));
      if (nights <= 0) {
        quote.innerHTML = '<p class="muted small">Pick valid dates.</p>';
        return;
      }
      const subtotal = nights * stay.pricePerNight;
      const fee = Math.round(subtotal * 0.08);
      quote.innerHTML = `
        <div class="quote-row"><span>${money(stay.pricePerNight, stay.currency)} × ${nights} night${nights === 1 ? "" : "s"}</span><span>${money(subtotal, stay.currency)}</span></div>
        <div class="quote-row"><span>Service fee</span><span>${money(fee, stay.currency)}</span></div>
        <div class="quote-row quote-total"><span>Total</span><span>${money(subtotal + fee, stay.currency)}</span></div>`;
    };

    form.addEventListener("input", update);
    update();

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const data = new FormData(form);
      const p = new URLSearchParams({
        checkIn: String(data.get("checkIn")),
        checkOut: String(data.get("checkOut")),
        guests: String(data.get("guests")),
      });
      location.hash = `/checkout/${stay.id}?${p.toString()}`;
    });
  },
};
