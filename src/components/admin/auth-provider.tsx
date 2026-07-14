"use client";

import * as React from "react";
import {
  getCurrentAdmin,
  signInWithGoogle,
  signInWithEmail,
  signOutAdmin,
  type AdminUser,
} from "@/lib/auth";
import { auth } from "@/lib/firebase";

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
    if (auth) {
      let unsub = () => {};
      import("firebase/auth").then(({ onAuthStateChanged }) => {
        unsub = onAuthStateChanged(auth!, () => {
          setUser(getCurrentAdmin());
          setLoading(false);
        });
      });
      return () => unsub();
    }
    // Mock fallback
    setUser(getCurrentAdmin());
    setLoading(false);
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
