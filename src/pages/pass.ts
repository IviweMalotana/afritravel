import type { Route } from "../router.ts";
import { shell, wireChrome } from "../components/chrome.ts";
import { store } from "../lib/store.ts";
import { countryByCode } from "../data/countries.ts";
import { fauxQr } from "../lib/format.ts";

function fmtDate(iso: string): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });
}

export const passRoute: Route = {
  path: "/pass/:id",
  render(params) {
    store.setRole("visa");
    const pass = store.passById(params.id);
    if (!pass) {
      return shell(`
        <section class="section narrow center">
          <h2>Pass not found</h2>
          <p class="muted">This pass isn't on this device. Passes are stored locally in the demo.</p>
          <a class="btn btn-primary" href="#/visa">Register for a pass</a>
        </section>`);
    }

    const from = countryByCode(pass.nationality);
    const to = countryByCode(pass.destination);

    return shell(`
      <section class="section narrow">
        <div class="issued-banner">
          <span class="confirm-tick small-tick">✓</span>
          <div>
            <h1>Pass approved</h1>
            <p class="muted">Your Visa-Free Pass has been issued. Show it at the border.</p>
          </div>
        </div>

        <div class="pass" id="pass-card">
          <div class="pass-top">
            <div class="brand pass-brand"><span class="brand-mark">▲</span> Afri<strong>Travel</strong></div>
            <span class="pass-kind">VISA-FREE PASS</span>
          </div>

          <div class="pass-body">
            <div class="pass-route">
              <div class="pass-node">
                <span class="pass-flag">${from?.flag ?? ""}</span>
                <span class="pass-cc">${from?.code ?? pass.nationality}</span>
                <span class="muted small">${from?.name ?? ""}</span>
              </div>
              <div class="pass-arrow">✈</div>
              <div class="pass-node">
                <span class="pass-flag">${to?.flag ?? ""}</span>
                <span class="pass-cc">${to?.code ?? pass.destination}</span>
                <span class="muted small">${to?.name ?? ""}</span>
              </div>
            </div>

            <div class="pass-grid">
              <div><span class="pass-label">Holder</span><span class="pass-val">${pass.holder}</span></div>
              <div><span class="pass-label">Passport</span><span class="pass-val mono">${pass.passportNo}</span></div>
              <div><span class="pass-label">Purpose</span><span class="pass-val">${pass.purpose}</span></div>
              <div><span class="pass-label">Status</span><span class="pass-val pass-status">● Approved</span></div>
              <div><span class="pass-label">Valid from</span><span class="pass-val">${fmtDate(pass.validFrom)}</span></div>
              <div><span class="pass-label">Valid until</span><span class="pass-val">${fmtDate(pass.validUntil)}</span></div>
            </div>
          </div>

          <div class="pass-foot">
            <div class="pass-qr">${fauxQr(pass.id)}</div>
            <div class="pass-foot-meta">
              <span class="pass-label">Pass number</span>
              <span class="pass-val mono">${pass.id}</span>
              <span class="muted small">Issued ${fmtDate(pass.issuedAt)} · Scan at immigration</span>
            </div>
          </div>
        </div>

        <div class="pass-actions">
          <button class="btn btn-primary" data-action="print">Save / print pass</button>
          <a class="btn btn-ghost" href="#/visa">Register another</a>
          <a class="btn btn-ghost" href="#/">Find a stay</a>
        </div>
        <p class="muted small center">Demo programme — not a real travel document. The code is decorative.</p>
      </section>
    `);
  },
  mounted() {
    wireChrome();
    document.querySelector('[data-action="print"]')?.addEventListener("click", () => window.print());
  },
};
