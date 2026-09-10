"use client";

import * as React from "react";
import { getSection, subscribeToSection, lsGet } from "@/lib/store";
import type { SectionData, SectionId } from "@/lib/content-types";

// Timeout for the initial load. If Firestore doesn't respond in 10s (e.g.
// offline or network failure), we fall back gracefully.
const LOAD_TIMEOUT_MS = 10000;

export function useSectionData<T extends SectionData>(id: SectionId) {
  // Initialize synchronously with cached data if available for instant render without flash
  const [data, setData] = React.useState<T | null>(() => lsGet<T>(id));
  const [loading, setLoading] = React.useState<boolean>(() => !lsGet<T>(id));
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    let active = true;

    // Only show loading if we don't already have cached data
    if (!data) {
      setLoading(true);
    }
    setError(null);

    // Initial load from Firestore / cache
    const loadPromise = getSection<T>(id);

    const timeoutPromise = new Promise<T | null>((resolve) => {
      setTimeout(() => resolve(null), LOAD_TIMEOUT_MS);
    });

    Promise.race([loadPromise, timeoutPromise])
      .then((d) => {
        if (!active) return;
        if (d) {
          setData(d);
          setLoading(false);
        } else if (!data) {
          // Timed out and no cache: load empty fallback so page is still usable
          import("@/lib/content-types").then(({ emptySectionData }) => {
            if (active && !data) {
              setData(emptySectionData(id) as T);
              setLoading(false);
            }
          });
        }
      })
      .catch((err) => {
        if (!active) return;
        console.error(`[useSectionData] error loading "${id}":`, err);
        setError(err instanceof Error ? err.message : "Failed to load section data.");
        if (!data) {
          import("@/lib/content-types").then(({ emptySectionData }) => {
            if (active && !data) {
              setData(emptySectionData(id) as T);
              setLoading(false);
            }
          });
        }
      });

    // Subscribe to live updates (Firestore onSnapshot or localStorage events)
    const unsub = subscribeToSection<T>(id, (updated) => {
      if (active) {
        setData(updated);
        setLoading(false);
      }
    });

    return () => {
      active = false;
      unsub();
    };
  }, [id]);

  return { data, loading, error };
}
