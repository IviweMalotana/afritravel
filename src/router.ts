// Tiny hash-based router. Routes render into a container element.

export interface Route {
  path: string; // e.g. "/", "/stay/:id", "/merchant"
  render: (params: Record<string, string>, query: URLSearchParams) => string;
  // Optional hook run after the HTML is in the DOM (for event wiring).
  mounted?: (params: Record<string, string>, query: URLSearchParams) => void;
}

let routes: Route[] = [];
let container: HTMLElement;

function parseHash(): { path: string; query: URLSearchParams } {
  const raw = location.hash.replace(/^#/, "") || "/";
  const [path, qs = ""] = raw.split("?");
  return { path, query: new URLSearchParams(qs) };
}

function match(path: string): { route: Route; params: Record<string, string> } | null {
  for (const route of routes) {
    const rp = route.path.split("/").filter(Boolean);
    const pp = path.split("/").filter(Boolean);
    if (rp.length !== pp.length) continue;
    const params: Record<string, string> = {};
    let ok = true;
    for (let i = 0; i < rp.length; i++) {
      if (rp[i].startsWith(":")) params[rp[i].slice(1)] = decodeURIComponent(pp[i]);
      else if (rp[i] !== pp[i]) {
        ok = false;
        break;
      }
    }
    if (ok) return { route, params };
  }
  return null;
}

function render() {
  const { path, query } = parseHash();
  const m = match(path) ?? match("/404");
  if (!m) {
    container.innerHTML = "<p>Not found</p>";
    return;
  }
  container.innerHTML = m.route.render(m.params, query);
  m.route.mounted?.(m.params, query);
  window.scrollTo(0, 0);
}

export function navigate(path: string) {
  location.hash = path;
}

export function initRouter(el: HTMLElement, defs: Route[]) {
  container = el;
  routes = defs;
  window.addEventListener("hashchange", render);
  render();
}

export function rerender() {
  render();
}
