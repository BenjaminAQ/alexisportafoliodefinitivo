// Data store abstraction.
// - If Firebase Firestore is configured AND reachable, uses Firestore.
// - Caches reads to localStorage so subsequent loads are instant and reliable.
// - If Firestore throws (permissions, network, missing rules), falls back
//   gracefully to cached localStorage so the page always renders without missing content.
// - Each section is stored as a single document keyed by section id.

import { getDb, getDbAsync } from "./firebase";
import type { SectionData, SectionId } from "./content-types";
import { emptySectionData } from "./content-types";

const COLLECTION = "sections";
const LS_PREFIX = "alexis_content_";

// ---------- localStorage store ----------
export function lsGet<T>(id: string): T | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(LS_PREFIX + id);
    return raw ? (JSON.parse(raw) as T) : null;
  } catch {
    return null;
  }
}

export function lsSet<T>(id: string, data: T): void {
  if (typeof window === "undefined" || !data) return;
  try {
    window.localStorage.setItem(LS_PREFIX + id, JSON.stringify(data));
    window.dispatchEvent(new CustomEvent("content-changed", { detail: { id } }));
  } catch {
    /* ignore quota errors */
  }
}

// ---------- Firestore store (with error handling & automatic caching) ----------
async function fsGet<T>(id: string, db: NonNullable<ReturnType<typeof getDb>>): Promise<T | null> {
  try {
    const { doc, getDoc } = await import("firebase/firestore");
    const ref = doc(db, COLLECTION, id);
    const snap = await getDoc(ref);
    if (snap.exists()) {
      const data = snap.data() as T;
      lsSet(id, data);
      return data;
    }
    return lsGet<T>(id);
  } catch (err) {
    if (process.env.NODE_ENV !== "production") console.warn(`[store] Firestore getSection("${id}") failed, using fallback:`, err);
    return lsGet<T>(id);
  }
}

async function fsSet<T>(id: string, data: T, db: NonNullable<ReturnType<typeof getDb>>): Promise<void> {
  try {
    const { doc, setDoc } = await import("firebase/firestore");
    const ref = doc(db, COLLECTION, id);
    await setDoc(ref, data as Record<string, unknown>, { merge: false });
    lsSet(id, data);
  } catch (err) {
    if (process.env.NODE_ENV !== "production") console.warn(`[store] Firestore setSection("${id}") failed, saving to localStorage:`, err);
    lsSet(id, data);
    throw err;
  }
}

// ---------- Public API ----------
export async function getSection<T extends SectionData>(id: SectionId): Promise<T> {
  const cached = lsGet<T>(id);
  const db = await getDbAsync();
  let data: T | null = null;
  if (db) {
    data = await fsGet<T>(id, db);
  } else {
    data = cached;
  }
  return data ?? cached ?? (emptySectionData(id) as T);
}

export async function setSection<T extends SectionData>(id: SectionId, data: T): Promise<void> {
  const db = await getDbAsync();
  if (db) {
    await fsSet(id, data, db);
  } else {
    lsSet(id, data);
  }
}

// Client-side subscribe (for live updates in admin / preview / public portfolio)
export function subscribeToSection<T extends SectionData>(
  id: SectionId,
  cb: (data: T) => void
): () => void {
  let unsub = () => {};
  let cancelled = false;

  (async () => {
    const db = await getDbAsync();
    if (cancelled) return;

    // localStorage fallback: listen to custom event
    if (!db) {
      const handler = (e: Event) => {
        const detail = (e as CustomEvent).detail;
        if (!detail || detail.id === id) {
          cb(lsGet<T>(id) ?? (emptySectionData(id) as T));
        }
      };
      window.addEventListener("content-changed", handler);
      window.addEventListener("storage", handler);
      unsub = () => {
        window.removeEventListener("content-changed", handler);
        window.removeEventListener("storage", handler);
      };
      return;
    }

    // Firestore: use onSnapshot (with automatic localStorage caching)
    try {
      const { doc, onSnapshot } = await import("firebase/firestore");
      const ref = doc(db, COLLECTION, id);
      unsub = onSnapshot(
        ref,
        (snap) => {
          if (snap.exists()) {
            const data = snap.data() as T;
            lsSet(id, data);
            cb(data);
          } else {
            const fallback = lsGet<T>(id);
            if (fallback) {
              cb(fallback);
            } else {
              cb(emptySectionData(id) as T);
            }
          }
        },
        (err) => {
          if (process.env.NODE_ENV !== "production") console.warn(`[store] Firestore onSnapshot("${id}") error, using localStorage:`, err);
          cb(lsGet<T>(id) ?? (emptySectionData(id) as T));
        }
      );
    } catch (err) {
      if (process.env.NODE_ENV !== "production") console.warn(`[store] Failed to set up onSnapshot for "${id}":`, err);
      cb(lsGet<T>(id) ?? (emptySectionData(id) as T));
    }
  })();

  return () => {
    cancelled = true;
    unsub();
  };
}

export { isFirebaseConfigured } from "./firebase";
