"use client";

import * as React from "react";
import { getSection, subscribeToSection } from "@/lib/store";
import type { SectionData, SectionId } from "@/lib/content-types";

// Timeout for the initial load. If Firestore doesn't respond in 8s (e.g.
// network blocked, rules misconfigured), we fall back to empty data so the
// page always renders instead of showing a skeleton forever.
const LOAD_TIMEOUT_MS = 8000;

export function useSectionData<T extends SectionData>(id: SectionId) {
  const [data, setData] = React.useState<T | null>(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    let active = true;
    let timedOut = false;

    setLoading(true);
    setError(null);

    // Race the Firestore fetch against a timeout. Whichever resolves first wins.
    const loadPromise = getSection<T>(id).then((d) => d);

    const timeoutPromise = new Promise<T>((resolve) => {
      setTimeout(() => {
        timedOut = true;
        // Resolve with empty data so the page renders
        resolve(null as unknown as T);
      }, LOAD_TIMEOUT_MS);
    });

    Promise.race([loadPromise, timeoutPromise])
      .then((d) => {
        if (!active) return;
        if (timedOut && !d) {
          // Timed out — show empty data but flag a soft error
          setError("Connection to Firebase timed out. Showing default content.");
          // Import emptySectionData lazily to avoid cycle
          import("@/lib/content-types").then(({ emptySectionData }) => {
            if (active) {
              setData(emptySectionData(id) as T);
              setLoading(false);
            }
          });
        } else {
          setData(d);
          setLoading(false);
        }
      })
      .catch((err) => {
        if (!active) return;
        console.error(`[useSectionData] error loading "${id}":`, err);
        setError(err instanceof Error ? err.message : "Failed to load section data.");
        // Fall back to empty data so the page renders
        import("@/lib/content-types").then(({ emptySectionData }) => {
          if (active) {
            setData(emptySectionData(id) as T);
            setLoading(false);
          }
        });
      });

    // Subscribe to live updates (Firestore onSnapshot or localStorage events)
    const unsub = subscribeToSection<T>(id, (d) => {
      if (active) {
        setData(d);
        // Only clear loading if we haven't already
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
