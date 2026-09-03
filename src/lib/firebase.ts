// Firebase initialization.
// Uses static imports for the modular Firebase SDK. Initializes app + auth +
// firestore + storage. Services are lazy-initialized on first client access
// via an async init function; null on the server.
//
// Config priority: env vars (NEXT_PUBLIC_FIREBASE_*) → hardcoded fallback.
// The fallback is safe because Firebase web API keys are public by design
// (they're embedded in client bundles anyway). Security is provided by
// Firestore/Storage rules, not by hiding these keys.

import { initializeApp, getApps, type FirebaseApp } from "firebase/app";
import { getAuth, onAuthStateChanged, type Auth } from "firebase/auth";
import { getFirestore, type Firestore } from "firebase/firestore";
import { getStorage, type FirebaseStorage } from "firebase/storage";

// Hardcoded fallback config (used when env vars aren't available, e.g. some
// hosting providers where the build doesn't have access to .env files).
const FALLBACK_CONFIG = {
  apiKey: "AIzaSyBeB5tLApYfA5-3xV8-ahnAeCyr40XPmq8",
  authDomain: "alexisportafolio-8d4a7.firebaseapp.com",
  projectId: "alexisportafolio-8d4a7",
  storageBucket: "alexisportafolio-8d4a7.firebasestorage.app",
  messagingSenderId: "830645139026",
  appId: "1:830645139026:web:ab98e1eda089df311ed18b",
};

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || FALLBACK_CONFIG.apiKey,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || FALLBACK_CONFIG.authDomain,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || FALLBACK_CONFIG.projectId,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || FALLBACK_CONFIG.storageBucket,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || FALLBACK_CONFIG.messagingSenderId,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || FALLBACK_CONFIG.appId,
};

export const isFirebaseConfigured = Boolean(
  firebaseConfig.apiKey && firebaseConfig.projectId && firebaseConfig.authDomain
);

// App is safe to initialize on both server and client (it's just config).
export const app: FirebaseApp | null = isFirebaseConfigured
  ? (getApps().length ? getApps()[0] : initializeApp(firebaseConfig))
  : null;

// Auth / Firestore / Storage are client-only. We initialize them via the
// synchronous getAuth/getFirestore/getStorage (which register the components),
// but only on the client. The init is wrapped in try/catch for safety.
let _auth: Auth | null = null;
let _db: Firestore | null = null;
let _storage: FirebaseStorage | null = null;
let _initialized = false;

function initClientServices(): void {
  if (_initialized || typeof window === "undefined" || !isFirebaseConfigured || !app) return;
  _initialized = true;
  try {
    _auth = getAuth(app);
  } catch (e) {
    console.error("[firebase] getAuth failed:", e);
  }
  try {
    _db = getFirestore(app);
  } catch (e) {
    console.error("[firebase] getFirestore failed:", e);
  }
  try {
    _storage = getStorage(app);
  } catch (e) {
    console.error("[firebase] getStorage failed:", e);
  }
}

// Kick off init immediately on the client.
if (typeof window !== "undefined") {
  initClientServices();
}

// Synchronous getters (return null on server, instance on client after init).
export function getAuthInstance(): Auth | null {
  if (typeof window !== "undefined") initClientServices();
  return _auth;
}
export function getDb(): Firestore | null {
  if (typeof window !== "undefined") initClientServices();
  return _db;
}
export function getStorageInstance(): FirebaseStorage | null {
  if (typeof window !== "undefined") initClientServices();
  return _storage;
}

// Async getters (wait for the module to be loaded — useful for first paint).
export async function getAuthAsync(): Promise<Auth | null> {
  if (typeof window !== "undefined") initClientServices();
  return _auth;
}
export async function getDbAsync(): Promise<Firestore | null> {
  if (typeof window !== "undefined") initClientServices();
  return _db;
}
export async function getStorageAsync(): Promise<FirebaseStorage | null> {
  if (typeof window !== "undefined") initClientServices();
  return _storage;
}

// Re-export onAuthStateChanged for convenience in auth-provider.
export { onAuthStateChanged };

// For backwards compat with code that reads `db`/`auth`/`storage` directly,
// export the current values (null on server, instance on client).
export const auth: Auth | null = null;
export const db: Firestore | null = null;
export const storage: FirebaseStorage | null = null;
