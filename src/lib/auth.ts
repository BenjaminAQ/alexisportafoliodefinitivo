// Auth helpers with Firestore-based whitelist.
//
// Flow:
//   1. User signs in with Google (Firebase Auth).
//   2. We read Firestore `users/{uid}` to check their role.
//   3. If the document doesn't exist, we create it with role "pending"
//      (so the super-admin can later promote them in the Firebase console).
//   4. Only users with role "admin" are granted access to the panel.
//   5. Users with role "usuario" or "pending" are denied.
//
// In preview mode (no Firebase), a mock @gmail.com sign-in is used and the
// user is treated as an admin (data stays in localStorage).

import { getAuthInstance, getDb } from "./firebase";

export type UserRole = "admin" | "usuario" | "pending";

export interface AdminUser {
  uid: string;
  email: string;
  displayName: string | null;
  photoURL: string | null;
  role: UserRole;
  provider: "firebase" | "mock";
}

const MOCK_SESSION_KEY = "alexis_admin_session";

function isGmail(email: string): boolean {
  return /^[^@\s]+@gmail\.com$/i.test(email.trim());
}

// ---------- Firestore user document ----------
export async function fetchUserRole(uid: string): Promise<UserRole | null> {
  const db = getDb();
  if (!db) return null;
  try {
    const { doc, getDoc } = await import("firebase/firestore");
    const ref = doc(db, "users", uid);
    const snap = await getDoc(ref);
    if (!snap.exists()) return null;
    return (snap.data().role as UserRole) ?? "pending";
  } catch (err) {
    console.warn("[auth] fetchUserRole failed:", err);
    return null;
  }
}

async function createUserDoc(uid: string, email: string, displayName: string | null): Promise<void> {
  const db = getDb();
  if (!db) return;
  try {
    const { doc, setDoc, serverTimestamp } = await import("firebase/firestore");
    const ref = doc(db, "users", uid);
    await setDoc(ref, {
      uid,
      email,
      displayName: displayName ?? email.split("@")[0],
      role: "pending",
      createdAt: serverTimestamp(),
    }, { merge: false });
  } catch (err) {
    console.warn("[auth] createUserDoc failed:", err);
    throw err;
  }
}

// ---------- Mock auth (preview mode without Firebase) ----------
function mockSignIn(email: string): AdminUser {
  const user: AdminUser = {
    uid: "mock-" + btoa(email).slice(0, 12),
    email,
    displayName: email.split("@")[0],
    photoURL: null,
    role: "admin", // mock = admin in preview
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

// ---------- Errors ----------
export class AccessDeniedError extends Error {
  role: UserRole;
  constructor(role: UserRole, message: string) {
    super(message);
    this.name = "AccessDeniedError";
    this.role = role;
  }
}

// ---------- Public API ----------
export async function signInWithGoogle(): Promise<AdminUser> {
  const auth = getAuthInstance();
  if (auth) {
    const { GoogleAuthProvider, signInWithPopup } = await import("firebase/auth");
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: "select_account" });
    const cred = await signInWithPopup(auth, provider);
    const email = cred.user.email ?? "";
    if (!isGmail(email)) {
      const { signOut } = await import("firebase/auth");
      await signOut(auth);
      throw new Error("Solo se permiten cuentas @gmail.com. Inicia sesión con una cuenta de Gmail.");
    }

    // Check whitelist in Firestore
    let role = await fetchUserRole(cred.user.uid);
    if (role === null) {
      // First-time login: create a "pending" user doc
      await createUserDoc(cred.user.uid, email, cred.user.displayName);
      role = "pending";
    }

    if (role !== "admin") {
      // Sign out immediately — they're not an admin yet
      const { signOut } = await import("firebase/auth");
      await signOut(auth);
      const msg =
        role === "pending"
          ? "Tu cuenta está pendiente de aprobación. Un administrador debe otorgarte acceso. Pide al propietario del sitio que cambie tu rol a 'admin' en Firebase Console → Firestore → users → tu-uid."
          : "Tu cuenta no tiene acceso de administrador. Solo los administradores pueden editar el portafolio.";
      throw new AccessDeniedError(role, msg);
    }

    return {
      uid: cred.user.uid,
      email,
      displayName: cred.user.displayName,
      photoURL: cred.user.photoURL,
      role: "admin",
      provider: "firebase",
    };
  }
  throw new Error("Mock mode: use signInWithEmail(email).");
}

// Mock sign-in with a Gmail address (preview mode without Firebase)
export async function signInWithEmail(email: string): Promise<AdminUser> {
  if (!isGmail(email)) {
    throw new Error("Only @gmail.com accounts are allowed. Please use a Gmail address.");
  }
  await new Promise((r) => setTimeout(r, 300));
  return mockSignIn(email);
}

export async function signOutAdmin(): Promise<void> {
  const auth = getAuthInstance();
  if (auth) {
    const { signOut } = await import("firebase/auth");
    await signOut(auth);
  } else {
    mockSignOut();
  }
}

export function getCurrentAdmin(): AdminUser | null {
  const auth = getAuthInstance();
  if (auth && auth.currentUser) {
    const email = auth.currentUser.email ?? "";
    if (!isGmail(email)) return null;
    return {
      uid: auth.currentUser.uid,
      email,
      displayName: auth.currentUser.displayName,
      photoURL: auth.currentUser.photoURL,
      role: "admin",
      provider: "firebase",
    };
  }
  return mockCurrentUser();
}
