"use client";

import * as React from "react";
import {
  getCurrentAdmin,
  signInWithGoogle,
  signInWithEmail,
  signOutAdmin,
  fetchUserRole,
  type AdminUser,
} from "@/lib/auth";
import { getAuthAsync, getDbAsync, onAuthStateChanged } from "@/lib/firebase";

interface AuthContextValue {
  user: AdminUser | null;
  loading: boolean;
  signIn: () => Promise<void>;
  signInWithEmail: (email: string) => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = React.createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = React.useState<AdminUser | null>(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    let cancelled = false;

    (async () => {
      const [auth, db] = await Promise.all([getAuthAsync(), getDbAsync()]);
      if (cancelled) return;

      if (auth) {
        const unsub = onAuthStateChanged(auth, async (fbUser) => {
          if (cancelled) return;
          if (!fbUser) {
            setUser(null);
            setLoading(false);
            return;
          }
          const email = fbUser.email ?? "";
          if (!/^[^@\s]+@gmail\.com$/i.test(email.trim())) {
            setUser(null);
            setLoading(false);
            return;
          }
          // Check role in Firestore
          let role: "admin" | "usuario" | "pending" = "pending";
          if (db) {
            try {
              const r = await fetchUserRole(fbUser.uid);
              if (r) role = r;
            } catch {
              role = "pending";
            }
          }
          if (role === "admin") {
            setUser({
              uid: fbUser.uid,
              email,
              displayName: fbUser.displayName,
              photoURL: fbUser.photoURL,
              role,
              provider: "firebase",
            });
          } else {
            setUser(null);
          }
          setLoading(false);
        });
        return () => unsub();
      }
      // Mock fallback
      setUser(getCurrentAdmin());
      setLoading(false);
    })();

    return () => { cancelled = true; };
  }, []);

  const signIn = React.useCallback(async () => {
    const u = await signInWithGoogle();
    setUser(u);
  }, []);

  const signInWithEmailFn = React.useCallback(async (email: string) => {
    const u = await signInWithEmail(email);
    setUser(u);
  }, []);

  const signOut = React.useCallback(async () => {
    await signOutAdmin();
    setUser(null);
  }, []);

  const value = React.useMemo(
    () => ({ user, loading, signIn, signInWithEmail: signInWithEmailFn, signOut }),
    [user, loading, signIn, signInWithEmailFn, signOut]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = React.useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
