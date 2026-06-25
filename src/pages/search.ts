import type { Route } from "../router.ts";
import { shell, wireChrome } from "../components/chrome.ts";
import { stayCard } from "../components/stayCard.ts";
import { STAYS } from "../data/stays.ts";
import { countryName } from "../data/countries.ts";
import type { Stay, StayType } from "../types.ts";

const TYPES: StayType[] = ["Hotel", "Apartment", "Villa", "Guesthouse", "Lodge", "Boutique"];

function filterStays(query: URLSearchParams): Stay[] {
  const q = (query.get("q") ?? "").toLowerCase();
  const country = query.get("country") ?? "";
  const type = query.get("type") ?? "";
  const sort = query.get("sort") ?? "rating";

  let list = STAYS.filter((s) => {
    if (country && s.countryCode !== country) return false;
    if (type && s.type !== type) return false;
    if (q) {
      const hay = `${s.name} ${s.city} ${countryName(s.countryCode)} ${s.type}`.toLowerCase();
      if (!hay.includes(q)) return false;
    }
    return true;
  });

  if (sort === "price-asc") list = [...list].sort((a, b) => a.pricePerNight - b.pricePerNight);
  else if (sort === "price-desc") list = [...list].sort((a, b) => b.pricePerNight - a.pricePerNight);
  else list = [...list].sort((a, b) => b.rating - a.rating);

  return list;
}

export const searchRoute: Route = {
  path: "/search",
  render(_params, query) {
    const results = filterStays(query);
    const activeType = query.get("type") ?? "";
    const q = query.get("q") ?? "";
    const sort = query.get("sort") ?? "rating";

    const typeChips = ["", ...TYPES]
      .map((t) => {
        const next = new URLSearchParams(query);
        if (t) next.set("type", t);
        else next.delete("type");
        const cls = activeType === t ? "chip chip-active" : "chip";
        return `<a class="${cls}" href="#/search?${next.toString()}">${t || "All types"}</a>`;
      })
      .join("");

    return shell(`
      <section class="section">
        <div class="search-head">
          <div>
            <h2>${results.length} stay${results.length === 1 ? "" : "s"}${q ? ` for “${q}”` : ""}</h2>
            <p class="muted">${query.get("country") ? countryName(query.get("country")!) : "Across Africa"}</p>
          </div>
          <form id="sort-form" class="sort">
            <label>Sort
              <select name="sort">
                <option value="rating" ${sort === "rating" ? "selected" : ""}>Top rated</option>
                <option value="price-asc" ${sort === "price-asc" ? "selected" : ""}>Price: low to high</option>
                <option value="price-desc" ${sort === "price-desc" ? "selected" : ""}>Price: high to low</option>
              </select>
            </label>
          </form>
        </div>
        <div class="chips">${typeChips}</div>
        <div class="grid">
          ${results.length ? results.map(stayCard).join("") : '<p class="muted">No stays match your filters. Try clearing them.</p>'}
        </div>
      </section>
    `);
  },
  mounted(_params, query) {
    wireChrome();
    const form = document.getElementById("sort-form") as HTMLFormElement | null;
    form?.querySelector("select")?.addEventListener("change", (e) => {
      const next = new URLSearchParams(query);
      next.set("sort", (e.target as HTMLSelectElement).value);
      location.hash = `/search?${next.toString()}`;
    });
  },
};
