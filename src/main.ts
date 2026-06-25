import "./style.css";
import { initRouter } from "./router.ts";
import { homeRoute } from "./pages/home.ts";
import { searchRoute } from "./pages/search.ts";
import { listingRoute } from "./pages/listing.ts";
import { checkoutRoute } from "./pages/checkout.ts";
import { confirmationRoute } from "./pages/confirmation.ts";
import { visaRoute } from "./pages/visa.ts";
import { merchantRoute } from "./pages/merchant.ts";
import { adminRoute } from "./pages/admin.ts";
import { loginRoute, notFoundRoute } from "./pages/login.ts";
import { store } from "./lib/store.ts";

const app = document.getElementById("app");
if (!app) throw new Error("#app container missing");

// Customer-facing pages reset the active role pill back to "customer".
const customerRoutes = [
  homeRoute,
  searchRoute,
  listingRoute,
  checkoutRoute,
  confirmationRoute,
  loginRoute,
].map((r) => ({
  ...r,
  render: (p: Record<string, string>, q: URLSearchParams) => {
    if (store.get().role !== "customer" && store.get().role !== "visa") store.setRole("customer");
    return r.render(p, q);
  },
}));

initRouter(app, [
  ...customerRoutes,
  visaRoute,
  merchantRoute,
  adminRoute,
  notFoundRoute,
]);
