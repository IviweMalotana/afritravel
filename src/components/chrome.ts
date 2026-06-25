import { store } from "../lib/store.ts";

// Shared page chrome: top navigation + footer. Pages compose `shell(...)`.

export function nav(): string {
  const { user, role } = store.get();
  const portalLinks = [
    { href: "#/", label: "Stays" },
    { href: "#/visa", label: "Visa-free" },
    { href: "#/merchant", label: "Merchant" },
    { href: "#/admin", label: "Admin" },
  ];
  const links = portalLinks
    .map((l) => `<a class="nav-link" href="${l.href}">${l.label}</a>`)
    .join("");

  const account = user
    ? `<span class="nav-user">${user.name}</span>
       <button class="btn btn-ghost" data-action="logout">Sign out</button>`
    : `<a class="btn btn-ghost" href="#/login">Sign in</a>`;

  return `
    <header class="nav">
      <a class="brand" href="#/">
        <span class="brand-mark">▲</span> Afri<strong>Travel</strong>
      </a>
      <nav class="nav-links">${links}</nav>
      <div class="nav-account">
        <span class="role-pill" title="Active portal">${role}</span>
        ${account}
      </div>
    </header>`;
}

export function footer(): string {
  return `
    <footer class="footer">
      <div class="footer-cols">
        <div>
          <div class="brand"><span class="brand-mark">▲</span> Afri<strong>Travel</strong></div>
          <p class="muted">Stay anywhere in Africa. Move freely across it.</p>
        </div>
        <div>
          <h4>Explore</h4>
          <a href="#/">All stays</a>
          <a href="#/visa">Visa-free travel</a>
        </div>
        <div>
          <h4>Partners</h4>
          <a href="#/merchant">List your property</a>
          <a href="#/admin">Admin console</a>
        </div>
        <div>
          <h4>Pay with</h4>
          <span class="muted">Paystack · Mobile Money</span>
        </div>
      </div>
      <div class="footer-base muted">
        © ${new Date().getFullYear()} AfriTravel — demo build. Not affiliated with Booking.com.
        Visa data is illustrative, not legal advice.
      </div>
    </footer>`;
}

export function shell(content: string): string {
  return `${nav()}<main class="page">${content}</main>${footer()}`;
}

/** Wire chrome-level actions (logout). Call from each page's mounted hook. */
export function wireChrome() {
  document.querySelector('[data-action="logout"]')?.addEventListener("click", () => {
    store.logout();
    location.hash = "/";
  });
}
