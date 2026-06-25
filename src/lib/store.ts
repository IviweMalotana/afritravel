import type { Booking, Role, TravelPass } from "../types.ts";

// Minimal reactive store persisted to localStorage. Demo-only — a real build
// would back this with an API + database (see docs/PROJECT_PLAN.md).

const KEY = "afritravel.state.v1";

interface State {
  bookings: Booking[];
  passes: TravelPass[];
  role: Role;
  user: { name: string; email: string } | null;
}

const defaultState: State = {
  bookings: [],
  passes: [],
  role: "customer",
  user: null,
};

type Listener = () => void;
const listeners = new Set<Listener>();

function load(): State {
  try {
    const raw = localStorage.getItem(KEY);
    if (raw) return { ...defaultState, ...JSON.parse(raw) };
  } catch {
    /* ignore corrupt state */
  }
  return structuredClone(defaultState);
}

let state: State = load();

function persist() {
  try {
    localStorage.setItem(KEY, JSON.stringify(state));
  } catch {
    /* storage may be unavailable */
  }
  listeners.forEach((l) => l());
}

export const store = {
  get(): Readonly<State> {
    return state;
  },
  subscribe(fn: Listener): () => void {
    listeners.add(fn);
    return () => listeners.delete(fn);
  },
  addBooking(b: Booking) {
    state.bookings = [b, ...state.bookings];
    persist();
  },
  setBookingStatus(id: string, status: Booking["status"]) {
    state.bookings = state.bookings.map((b) =>
      b.id === id ? { ...b, status } : b,
    );
    persist();
  },
  addPass(p: TravelPass) {
    state.passes = [p, ...state.passes];
    persist();
  },
  passById(id: string): TravelPass | undefined {
    return state.passes.find((p) => p.id === id);
  },
  setRole(role: Role) {
    state.role = role;
    persist();
  },
  login(name: string, email: string) {
    state.user = { name, email };
    persist();
  },
  logout() {
    state.user = null;
    persist();
  },
  reset() {
    state = structuredClone(defaultState);
    persist();
  },
};

export function uid(prefix = "id"): string {
  return `${prefix}-${Math.random().toString(36).slice(2, 8)}${Date.now().toString(36).slice(-4)}`;
}
