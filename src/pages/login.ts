import type { Route } from "../router.ts";
import { shell, wireChrome } from "../components/chrome.ts";
import { store } from "../lib/store.ts";

export const loginRoute: Route = {
  path: "/login",
  render() {
    return shell(`
      <section class="section narrow">
        <div class="card pad auth">
          <h1>Welcome back</h1>
          <p class="muted">Sign in to manage bookings. (Demo — any details work.)</p>
          <form id="login-form">
            <label>Full name <input name="name" value="Ama Mensah" required /></label>
            <label>Email <input type="email" name="email" value="ama@example.com" required /></label>
            <button class="btn btn-primary btn-block" type="submit">Sign in</button>
          </form>
        </div>
      </section>
    `);
  },
  mounted() {
    wireChrome();
    const form = document.getElementById("login-form") as HTMLFormElement | null;
    form?.addEventListener("submit", (e) => {
      e.preventDefault();
      const data = new FormData(form);
      store.setRole("customer");
      store.login(String(data.get("name")), String(data.get("email")));
      location.hash = "/";
    });
  },
};

export const notFoundRoute: Route = {
  path: "/404",
  render() {
    return shell(`
      <section class="section narrow center">
        <h1>404</h1>
        <p class="muted">That page wandered off the map.</p>
        <a class="btn btn-primary" href="#/">Back to stays</a>
      </section>
    `);
  },
  mounted() {
    wireChrome();
  },
};
