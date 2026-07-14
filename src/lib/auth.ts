// Auth helpers.
// - If Firebase is configured, uses Firebase Google Auth (popup).
// - Otherwise, uses a mock: "sign in with Gmail" asks for an email,
//   validates @gmail.com, and stores a mock session in localStorage.
//
// Only @gmail.com addresses are allowed as admins.

import { auth } from "./firebase";

export interface AdminUser {
  uid: string;
  email: string;
  displayName: string | null;
  photoURL: string | null;
  provider: "firebase" | "mock";
}

const MOCK_SESSION_KEY = "alexis_admin_session";

function isGmail(email: string): boolean {
  return /^[^@\s]+@gmail\.com$/i.test(email.trim());
}

// ---------- Mock auth (preview mode without Firebase) ----------
function mockSignIn(email: string): AdminUser {
  const user: AdminUser = {
    uid: "mock-" + btoa(email).slice(0, 12),
    email,
    displayName: email.split("@")[0],
    photoURL: null,
    provider: "mock",
  };
  if (typeof window !== "undefined") {
    window.localStorage.setItem(MOCK_SESSION_KEY, JSON.stringify(user));
  }
  return user;
}
function mockSignOut(): void {
  if (typeof window !== "undefined") {
    window.localStorage.removeItem(MOCK_SESSION_KEY);
  }
}
function mockCurrentUser(): AdminUser | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(MOCK_SESSION_KEY);
    return raw ? (JSON.parse(raw) as AdminUser) : null;
  } catch {
    return null;
  }
}

// ---------- Public API ----------
export async function signInWithGoogle(): Promise<AdminUser> {
  if (auth) {
    const { GoogleAuthProvider, signInWithPopup } = await import("firebase/auth");
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: "select_account" });
    const cred = await signInWithPopup(auth, provider);
    const email = cred.user.email ?? "";
    if (!isGmail(email)) {
      const { signOut } = await import("firebase/auth");
      await signOut(auth);
      throw new Error("Only @gmail.com accounts are allowed. Please sign in with a Gmail account.");
    }
    return {
      uid: cred.user.uid,
      email,
      displayName: cred.user.displayName,
      photoURL: cred.user.photoURL,
      provider: "firebase",
    };
  }
  // Mock fallback: caller should use signInWithEmail instead
  throw new Error("Mock mode: use signInWithEmail(email).");
}

// Mock sign-in with a Gmail address (preview mode without Firebase)
export async function signInWithEmail(email: string): Promise<AdminUser> {
  if (!isGmail(email)) {
    throw new Error("Only @gmail.com accounts are allowed. Please use a Gmail address.");
  }
  // Simulate async
  await new Promise((r) => setTimeout(r, 300));
  return mockSignIn(email);
}

export async function signOutAdmin(): Promise<void> {
  if (auth) {
    const { signOut } = await import("firebase/auth");
    await signOut(auth);
  } else {
    mockSignOut();
  }
}

export function getCurrentAdmin(): AdminUser | null {
  if (auth && auth.currentUser) {
    const email = auth.currentUser.email ?? "";
    if (!isGmail(email)) return null;
    return {
      uid: auth.currentUser.uid,
      email,
      displayName: auth.currentUser.displayName,
      photoURL: auth.currentUser.photoURL,
      provider: "firebase",
    };
  }
  return mockCurrentUser();
}
