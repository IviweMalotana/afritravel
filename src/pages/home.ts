import type { Route } from "../router.ts";
import { shell, wireChrome } from "../components/chrome.ts";
import { stayCard } from "../components/stayCard.ts";
import { featuredStays, STAYS } from "../data/stays.ts";
import { COUNTRIES } from "../data/countries.ts";

export const homeRoute: Route = {
  path: "/",
  render() {
    const featured = featuredStays().map(stayCard).join("");
    const cities = [...new Set(STAYS.map((s) => s.city))];
    const countryChips = COUNTRIES.slice(0, 10)
      .map(
        (c) =>
          `<a class="chip" href="#/search?country=${c.code}">${c.flag} ${c.name}</a>`,
      )
      .join("");

    return shell(`
      <section class="hero">
        <div class="hero-inner">
          <h1>Stay anywhere in Africa.<br/><span class="accent">Move freely across it.</span></h1>
          <p class="hero-sub">Thousands of pan-African stays, plus visa-free travel guidance for your passport — all in one place.</p>
          <form class="search-bar" id="hero-search">
            <label>Where
              <input list="cities" name="q" placeholder="City or country" autocomplete="off" />
              <datalist id="cities">
                ${cities.map((c) => `<option value="${c}"></option>`).join("")}
              </datalist>
            </label>
            <label>Check-in <input type="date" name="checkIn" /></label>
            <label>Check-out <input type="date" name="checkOut" /></label>
            <label>Guests <input type="number" name="guests" min="1" value="2" /></label>
            <button class="btn btn-primary" type="submit">Search</button>
          </form>
          <div class="chips">${countryChips}</div>
        </div>
      </section>

      <section class="section">
        <div class="section-head">
          <h2>Featured stays</h2>
          <a class="link" href="#/search">View all ${STAYS.length} stays →</a>
        </div>
        <div class="grid">${featured}</div>
      </section>

      <section class="section banner">
        <div>
          <h2>Travelling visa-free?</h2>
          <p class="muted">Check which African countries you can enter with just your passport.</p>
        </div>
        <a class="btn btn-primary" href="#/visa">Open visa checker</a>
      </section>
    `);
  },
  mounted() {
    wireChrome();
    const form = document.getElementById("hero-search") as HTMLFormElement | null;
    form?.addEventListener("submit", (e) => {
      e.preventDefault();
      const data = new FormData(form);
      const params = new URLSearchParams();
      const q = String(data.get("q") ?? "").trim();
      if (q) params.set("q", q);
      const guests = String(data.get("guests") ?? "");
      if (guests) params.set("guests", guests);
      location.hash = `/search?${params.toString()}`;
    });
  },
};
