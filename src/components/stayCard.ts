import type { Stay } from "../types.ts";
import { money, stars, gradientFor } from "../lib/format.ts";
import { countryByCode } from "../data/countries.ts";

export function stayCard(stay: Stay): string {
  const country = countryByCode(stay.countryCode);
  return `
    <a class="card stay-card" href="#/stay/${stay.id}">
      <div class="card-media" style="background:${gradientFor(stay.id)}">
        <span class="card-emoji">${stay.image}</span>
        ${stay.featured ? '<span class="badge">Featured</span>' : ""}
      </div>
      <div class="card-body">
        <div class="card-row">
          <h3>${stay.name}</h3>
          <span class="rating" title="${stay.rating} from ${stay.reviews} reviews">
            ${stay.rating.toFixed(1)} <span class="stars">${stars(stay.rating)}</span>
          </span>
        </div>
        <p class="muted">${country?.flag ?? ""} ${stay.city}, ${country?.name ?? stay.countryCode} · ${stay.type}</p>
        <p class="card-amenities muted">${stay.amenities.slice(0, 3).join(" · ")}</p>
        <div class="card-row card-foot">
          <span class="price">${money(stay.pricePerNight, stay.currency)}<span class="muted"> / night</span></span>
          <span class="muted">${stay.bedrooms} bd · ${stay.maxGuests} guests</span>
        </div>
      </div>
    </a>`;
}
