// Simple client-side auth helper using localStorage/sessionStorage.
// Hardcoded default credentials for demo.
// - Admin creds are fixed and not editable
// - User creds are editable by admin and stored in localStorage

export type Role = "user" | "admin";

export type Creds = {
  user: { username: string; password: string };
  admin: { username: string; password: string };
};

const LS_CREDS_KEY = "appCreds:user"; // stores only user creds overrides
const SS_SESSION_KEY = "appSession"; // stores current session: { role, username }

const DEFAULT_CREDS: Creds = {
  user: { username: "user@example.com", password: "user123" },
  admin: { username: "admin@example.com", password: "admin123" },
};

function isBrowser() {
  return typeof window !== "undefined";
}

export function getCreds(): Creds {
  if (!isBrowser()) return DEFAULT_CREDS;
  try {
    const raw = window.localStorage.getItem(LS_CREDS_KEY);
    if (!raw) return DEFAULT_CREDS;
    const userOverride = JSON.parse(raw) as { username?: string; password?: string };
    return {
      user: {
        username: userOverride.username || DEFAULT_CREDS.user.username,
        password: userOverride.password || DEFAULT_CREDS.user.password,
      },
      admin: DEFAULT_CREDS.admin,
    };
  } catch {
    return DEFAULT_CREDS;
  }
}

export function setUserCreds(update: { username?: string; password?: string }) {
  if (!isBrowser()) return;
  const current = getCreds();
  const next = {
    username: update.username ?? current.user.username,
    password: update.password ?? current.user.password,
  };
  window.localStorage.setItem(LS_CREDS_KEY, JSON.stringify(next));
}

export function clearUserCredOverrides() {
  if (!isBrowser()) return;
  window.localStorage.removeItem(LS_CREDS_KEY);
}

export function getSession(): { role: Role; username: string } | null {
  if (!isBrowser()) return null;
  try {
    const raw = window.sessionStorage.getItem(SS_SESSION_KEY);
    return raw ? (JSON.parse(raw) as { role: Role; username: string }) : null;
  } catch {
    return null;
  }
}

export function setSession(session: { role: Role; username: string }) {
  if (!isBrowser()) return;
  window.sessionStorage.setItem(SS_SESSION_KEY, JSON.stringify(session));
}

export function clearSession() {
  if (!isBrowser()) return;
  window.sessionStorage.removeItem(SS_SESSION_KEY);
}

export function isLoggedIn(): boolean {
  return !!getSession();
}

export function isAdmin(): boolean {
  const s = getSession();
  return !!s && s.role === "admin";
}

export function login(role: Role, username: string, password: string): { ok: boolean; error?: string } {
  const creds = getCreds();
  const expected = role === "admin" ? creds.admin : creds.user;
  if (username === expected.username && password === expected.password) {
    setSession({ role, username });
    return { ok: true };
  }
  return { ok: false, error: "Invalid credentials" };
}

export function logout() {
  clearSession();
}
