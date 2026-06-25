import type { Route } from "../router.ts";
import { shell, wireChrome } from "../components/chrome.ts";
import { COUNTRIES, countryByCode } from "../data/countries.ts";
import { store, uid } from "../lib/store.ts";
import type { TravelPass } from "../types.ts";

const PURPOSES: TravelPass["purpose"][] = ["Tourism", "Business", "Family", "Transit"];

function options(selected = ""): string {
  return (
    `<option value="" disabled ${selected ? "" : "selected"}>Select a country…</option>` +
    COUNTRIES.map(
      (c) => `<option value="${c.code}" ${c.code === selected ? "selected" : ""}>${c.flag} ${c.name}</option>`,
    ).join("")
  );
}

function passRow(p: TravelPass): string {
  const from = countryByCode(p.nationality);
  const to = countryByCode(p.destination);
  return `
    <a class="visa-pass-row" href="#/pass/${p.id}">
      <span class="visa-pass-route">${from?.flag ?? ""} → ${to?.flag ?? ""} <strong>${to?.name ?? p.destination}</strong></span>
      <span class="mono">${p.id}</span>
      <span class="visa-tag" style="background:#0f7b6c1a;color:#0f7b6c">Approved</span>
    </a>`;
}

export const visaRoute: Route = {
  path: "/visa",
  render() {
    store.setRole("visa");
    const passes = store.get().passes;
    const user = store.get().user;

    return shell(`
      <section class="hero hero-visa">
        <div class="hero-inner">
          <span class="eyebrow eyebrow-light">In partnership with African governments</span>
          <h1>The AfriTravel <span class="accent">Visa-Free Pass</span></h1>
          <p class="hero-sub">One registration. Travel visa-free across participating African nations.
            Register your trip, get an approved digital pass, and show it at the border.</p>
          <div class="visa-steps">
            <div class="visa-step"><span class="visa-step-n">1</span> Register your details</div>
            <div class="visa-step"><span class="visa-step-n">2</span> Get instant approval</div>
            <div class="visa-step"><span class="visa-step-n">3</span> Show your pass at the border</div>
          </div>
        </div>
      </section>

      <section class="section visa-register">
        <div class="checkout-grid">
          <form id="pass-form" class="card pad">
            <h2>Register for a Visa-Free Pass</h2>
            <p class="muted">Free for citizens of participating nations. Approval is instant in this demo.</p>

            <div class="form-2col">
              <label>Full name (as on passport)
                <input name="holder" value="${user?.name ?? ""}" placeholder="e.g. Ama Mensah" required />
              </label>
              <label>Passport number
                <input name="passportNo" placeholder="e.g. G1234567" required />
              </label>
            </div>

            <div class="form-2col">
              <label>Nationality
                <select name="nationality" required>${options()}</select>
              </label>
              <label>Destination
                <select name="destination" required>${options()}</select>
              </label>
            </div>

            <div class="form-2col">
              <label>Travel from <input type="date" name="validFrom" required /></label>
              <label>Travel until <input type="date" name="validUntil" required /></label>
            </div>

            <label>Purpose of travel
              <select name="purpose">${PURPOSES.map((p) => `<option value="${p}">${p}</option>`).join("")}</select>
            </label>

            <label class="checkbox">
              <input type="checkbox" name="consent" required />
              <span>I confirm the details are correct and consent to sharing them with partner immigration authorities.</span>
            </label>

            <div id="pass-error" class="pay-fail"></div>
            <button class="btn btn-primary btn-block" type="submit">Register & issue pass</button>
          </form>

          <aside class="card pad visa-side">
            <h3>Why register?</h3>
            <ul class="amenities">
              <li>✓ Skip visa queues at the border</li>
              <li>✓ One pass, multiple partner nations</li>
              <li>✓ Recognised by partner immigration</li>
              <li>✓ Instant, paperless approval</li>
            </ul>
            ${
              passes.length
                ? `<h3 style="margin-top:1.25rem">Your passes</h3><div class="visa-pass-list">${passes.map(passRow).join("")}</div>`
                : `<p class="muted small" style="margin-top:1.25rem">Your issued passes will appear here.</p>`
            }
          </aside>
        </div>
        <p class="muted small">Demo programme — illustrative only, not a real travel document or legal advice.</p>
      </section>
    `);
  },
  mounted() {
    wireChrome();
    const form = document.getElementById("pass-form") as HTMLFormElement | null;
    const err = document.getElementById("pass-error");
    if (!form || !err) return;

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const data = new FormData(form);
      const nationality = String(data.get("nationality"));
      const destination = String(data.get("destination"));
      if (nationality === destination) {
        err.textContent = "Pick a destination different from your nationality.";
        return;
      }
      err.textContent = "";

      const pass: TravelPass = {
        id: uid("AFP").toUpperCase(),
        holder: String(data.get("holder")),
        passportNo: String(data.get("passportNo")).toUpperCase(),
        nationality,
        destination,
        validFrom: String(data.get("validFrom")),
        validUntil: String(data.get("validUntil")),
        purpose: String(data.get("purpose")) as TravelPass["purpose"],
        status: "approved",
        issuedAt: new Date().toISOString(),
      };
      store.addPass(pass);
      location.hash = `/pass/${pass.id}`;
    });
  },
};
