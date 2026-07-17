"use client";

import * as React from "react";
import { getSection, subscribeToSection } from "@/lib/store";
import type { SectionData, SectionId } from "@/lib/content-types";

export function useSectionData<T extends SectionData>(id: SectionId) {
  const [data, setData] = React.useState<T | null>(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    let active = true;
    setLoading(true);
    getSection<T>(id).then((d) => {
      if (active) {
        setData(d);
        setLoading(false);
      }
    });
    const unsub = subscribeToSection<T>(id, (d) => {
      if (active) setData(d);
    });
    return () => {
      active = false;
      unsub();
    };
  }, [id]);

  return { data, loading };
}
