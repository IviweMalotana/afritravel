import type { Route } from "../router.ts";
import { shell, wireChrome } from "../components/chrome.ts";
import { COUNTRIES } from "../data/countries.ts";
import { getVisaPolicy, POLICY_META } from "../data/visa.ts";

function options(selected: string): string {
  return COUNTRIES.map(
    (c) => `<option value="${c.code}" ${c.code === selected ? "selected" : ""}>${c.flag} ${c.name}</option>`,
  ).join("");
}

function resultsFor(from: string): string {
  const dests = COUNTRIES.filter((c) => c.code !== from)
    .map((c) => {
      const policy = getVisaPolicy(from, c.code);
      const meta = POLICY_META[policy];
      return { c, policy, meta };
    })
    .sort((a, b) => {
      const order = ["visa-free", "visa-on-arrival", "eta", "visa-required"];
      return order.indexOf(a.policy) - order.indexOf(b.policy);
    });

  const free = dests.filter((d) => d.policy === "visa-free").length;

  const cards = dests
    .map(
      ({ c, meta }) => `
      <div class="visa-row">
        <span class="visa-country">${c.flag} ${c.name}</span>
        <span class="visa-tag" style="background:${meta.color}1a;color:${meta.color}">${meta.label}</span>
      </div>`,
    )
    .join("");

  return `
    <p class="muted">Your passport unlocks <strong>${free}</strong> visa-free destination${free === 1 ? "" : "s"} of ${dests.length} shown.</p>
    <div class="visa-list">${cards}</div>`;
}

export const visaRoute: Route = {
  path: "/visa",
  render(_params, query) {
    const from = query.get("from") ?? "NG";

    const legend = Object.values(POLICY_META)
      .map((m) => `<span class="legend-item"><span class="dot" style="background:${m.color}"></span>${m.label}</span>`)
      .join("");

    return shell(`
      <section class="section">
        <div class="visa-head">
          <h1>Visa-free travel checker</h1>
          <p class="muted">See where your African passport takes you — visa-free, on arrival, eTA, or visa required.</p>
        </div>
        <form id="visa-form" class="visa-form card pad">
          <label>I hold a passport from
            <select name="from">${options(from)}</select>
          </label>
          <div class="legend">${legend}</div>
        </form>
        <div id="visa-results" class="section">${resultsFor(from)}</div>
        <p class="muted small">Illustrative demo data — always confirm with official sources before booking travel.</p>
      </section>
    `);
  },
  mounted(_params, query) {
    wireChrome();
    const form = document.getElementById("visa-form") as HTMLFormElement | null;
    const select = form?.querySelector("select");
    select?.addEventListener("change", (e) => {
      const from = (e.target as HTMLSelectElement).value;
      const next = new URLSearchParams(query);
      next.set("from", from);
      location.hash = `/visa?${next.toString()}`;
    });
  },
};
