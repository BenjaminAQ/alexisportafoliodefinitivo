// Data store abstraction.
// - If Firebase Firestore is configured, uses Firestore (collection: "sections").
// - Otherwise, uses localStorage with the same async API (preview mode).
//
// Each section is stored as a single document keyed by section id.

import { db } from "./firebase";
import type { SectionData, SectionId } from "./content-types";
import { emptySectionData } from "./content-types";

const COLLECTION = "sections";
const LS_PREFIX = "alexis_content_";

// ---------- localStorage store ----------
function lsGet<T>(id: string): T | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(LS_PREFIX + id);
    return raw ? (JSON.parse(raw) as T) : null;
  } catch {
    return null;
  }
}
function lsSet<T>(id: string, data: T): void {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(LS_PREFIX + id, JSON.stringify(data));
  // Notify listeners (same-tab updates)
  window.dispatchEvent(new CustomEvent("content-changed", { detail: { id } }));
}

// ---------- Firestore store ----------
async function fsGet<T>(id: string): Promise<T | null> {
  if (!db) return null;
  const { doc, getDoc } = await import("firebase/firestore");
  const ref = doc(db, COLLECTION, id);
  const snap = await getDoc(ref);
  return snap.exists() ? (snap.data() as T) : null;
}
async function fsSet<T>(id: string, data: T): Promise<void> {
  if (!db) return;
  const { doc, setDoc } = await import("firebase/firestore");
  const ref = doc(db, COLLECTION, id);
  await setDoc(ref, data as Record<string, unknown>, { merge: false });
}

// ---------- Public API ----------
export async function getSection<T extends SectionData>(id: SectionId): Promise<T> {
  let data: T | null = null;
  if (db) {
    data = (await fsGet<T>(id)) ?? null;
  } else {
    data = lsGet<T>(id);
  }
  return data ?? (emptySectionData(id) as T);
}

export async function setSection<T extends SectionData>(id: SectionId, data: T): Promise<void> {
  if (db) {
    await fsSet(id, data);
  } else {
    lsSet(id, data);
  }
}

// Client-side subscribe (for live updates in admin / preview)
export function subscribeToSection<T extends SectionData>(
  id: SectionId,
  cb: (data: T) => void
): () => void {
  // localStorage fallback: listen to custom event
  if (typeof window !== "undefined" && !db) {
    const handler = (e: Event) => {
      const detail = (e as CustomEvent).detail;
      if (!detail || detail.id === id) {
        cb(lsGet<T>(id) ?? (emptySectionData(id) as T));
      }
    };
    window.addEventListener("content-changed", handler);
    window.addEventListener("storage", handler);
    return () => {
      window.removeEventListener("content-changed", handler);
      window.removeEventListener("storage", handler);
    };
  }
  // Firestore: use onSnapshot
  if (db) {
    let unsub = () => {};
    (async () => {
      const { doc, onSnapshot } = await import("firebase/firestore");
      const ref = doc(db, COLLECTION, id);
      unsub = onSnapshot(ref, (snap) => {
        cb(snap.exists() ? (snap.data() as T) : (emptySectionData(id) as T));
      });
    })();
    return () => unsub();
  }
  return () => {};
}

export { isFirebaseConfigured } from "./firebase";
