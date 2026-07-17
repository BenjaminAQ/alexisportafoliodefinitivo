"use client";

import * as React from "react";
import Link from "next/link";
import { useAuth } from "@/components/admin/auth-provider";
import { SECTION_LABELS } from "@/components/admin/field-schemas";
import { SectionEditor } from "@/components/admin/section-editor";
import { PortfolioIcon } from "@/components/portfolio/icons";
import { isFirebaseConfigured } from "@/lib/firebase";
import type { SectionId } from "@/lib/content-types";
import { cn } from "@/lib/utils";

const SECTION_IDS = Object.keys(SECTION_LABELS) as SectionId[];

export default function AdminPage() {
  const { user, loading, signIn, signInWithEmail, signOut } = useAuth();
  const [active, setActive] = React.useState<SectionId>("about");
  const [signInError, setSignInError] = React.useState<string | null>(null);
  const [signingIn, setSigningIn] = React.useState(false);
  const [gmailInput, setGmailInput] = React.useState("");

  const handleSignIn = async () => {
    setSignInError(null);
    setSigningIn(true);
    try {
      await signIn();
    } catch (err) {
      setSignInError(err instanceof Error ? err.message : "Sign-in failed.");
    } finally {
      setSigningIn(false);
    }
  };

  const handleSignInEmail = async () => {
    setSignInError(null);
    setSigningIn(true);
    try {
      await signInWithEmail(gmailInput);
    } catch (err) {
      setSignInError(err instanceof Error ? err.message : "Sign-in failed.");
    } finally {
      setSigningIn(false);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-brand-gradient">
        <div className="h-8 w-8 rounded-full border-2 border-brand-light/40 border-t-brand-light animate-spin" />
      </div>
    );
  }

  if (!user) {
    return (
      <LoginScreen
        onSignIn={handleSignIn}
        onSignInEmail={handleSignInEmail}
        gmailInput={gmailInput}
        setGmailInput={setGmailInput}
        error={signInError}
        signingIn={signingIn}
        firebaseConfigured={isFirebaseConfigured}
      />
    );
  }

  return (
    <div className="min-h-screen bg-surface">
      {/* Top bar */}
      <header className="sticky top-0 z-30 bg-ink/95 backdrop-blur-xl border-b border-brand/20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand text-white">
                <span className="font-display text-lg font-bold">A</span>
              </span>
              <div>
                <p className="font-display text-sm font-bold text-white">
                  Admin Panel <span className="text-brand">·</span> Alexis
                </p>
                <p className="text-[11px] text-brand-light/60">{user.email}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Link
                href="/"
                className="inline-flex items-center gap-1.5 rounded-md bg-white/5 px-3 py-2 text-xs font-semibold text-brand-light ring-1 ring-inset ring-brand/30 hover:bg-white/10 transition-all"
              >
                <PortfolioIcon name="arrow" width={12} height={12} className="rotate-180" />
                View site
              </Link>
              <button
                onClick={signOut}
                className="inline-flex items-center gap-1.5 rounded-md bg-white/5 px-3 py-2 text-xs font-semibold text-brand-light ring-1 ring-inset ring-brand/30 hover:bg-red-500/20 hover:text-red-300 transition-all"
              >
                <PortfolioIcon name="close" width={12} height={12} />
                Sign out
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid gap-6 lg:grid-cols-12">
          {/* Sidebar: section list */}
          <aside className="lg:col-span-3">
            <div className="lg:sticky lg:top-24 rounded-2xl bg-white p-3 ring-1 ring-inset ring-ink/10">
              <p className="px-2 py-1.5 font-mono-code text-[10px] uppercase tracking-[0.15em] text-muted">
                Sections
              </p>
              <nav className="space-y-0.5">
                {SECTION_IDS.map((id) => (
                  <button
                    key={id}
                    onClick={() => setActive(id)}
                    className={cn(
                      "w-full flex items-center justify-between rounded-lg px-3 py-2 text-left text-sm transition-colors",
                      active === id
                        ? "bg-brand text-white"
                        : "text-ink/80 hover:bg-surface hover:text-brand"
                    )}
                  >
                    <span>{SECTION_LABELS[id]}</span>
                    <PortfolioIcon
                      name="arrow"
                      width={12}
                      height={12}
                      className={cn("opacity-40 transition-all", active === id && "opacity-100")}
                    />
                  </button>
                ))}
              </nav>
            </div>

            {/* Backend status */}
            <div className="mt-3 rounded-xl bg-white p-4 ring-1 ring-inset ring-ink/10">
              <p className="font-mono-code text-[10px] uppercase tracking-[0.15em] text-muted mb-2">
                Backend status
              </p>
              <div className="flex items-center gap-2">
                <span
                  className={cn(
                    "h-2 w-2 rounded-full",
                    isFirebaseConfigured ? "bg-green-500" : "bg-amber-400"
                  )}
                />
                <span className="text-xs text-ink/80">
                  {isFirebaseConfigured ? "Firebase Firestore" : "Local storage (preview mode)"}
                </span>
              </div>
              {!isFirebaseConfigured && (
                <p className="mt-2 text-[11px] text-muted leading-relaxed">
                  Add Firebase env vars to enable cloud persistence. Data is currently saved in your browser.
                </p>
              )}
            </div>
          </aside>

          {/* Main: section editor */}
          <div className="lg:col-span-9">
            <SectionEditor key={active} sectionId={active} />
          </div>
        </div>
      </div>
    </div>
  );
}

// ---------- Login screen ----------
function LoginScreen({
  onSignIn,
  onSignInEmail,
  gmailInput,
  setGmailInput,
  error,
  signingIn,
  firebaseConfigured,
}: {
  onSignIn: () => void;
  onSignInEmail: () => void;
  gmailInput: string;
  setGmailInput: (v: string) => void;
  error: string | null;
  signingIn: boolean;
  firebaseConfigured: boolean;
}) {
  return (
    <div className="relative min-h-screen overflow-hidden bg-brand-gradient">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 wire-mesh opacity-30" />
        <svg
          className="absolute -right-32 -top-24 h-[640px] w-[640px] text-brand-light/20 animate-mesh-float"
          viewBox="0 0 600 600" fill="none" stroke="currentColor" strokeWidth="0.7"
        >
          {Array.from({ length: 14 }).map((_, i) => (
            <ellipse key={i} cx="300" cy="300" rx={300 - i * 20} ry={150 - i * 10} opacity={0.5 - i * 0.025} />
          ))}
          {Array.from({ length: 14 }).map((_, i) => (
            <ellipse key={`v-${i}`} cx="300" cy="300" rx={150 - i * 10} ry={300 - i * 20} opacity={0.5 - i * 0.025} />
          ))}
        </svg>
        <div className="absolute top-1/3 left-1/4 h-72 w-72 rounded-full bg-brand/20 blur-3xl" />
      </div>

      <div className="relative flex min-h-screen items-center justify-center px-4">
        <div className="w-full max-w-md rounded-2xl bg-ink-deep/70 backdrop-blur-xl p-8 ring-1 ring-inset ring-brand/30 shadow-2xl">
          <div className="flex items-center gap-3">
            <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand text-white shadow-[0_8px_24px_-8px_rgba(0,187,212,0.8)]">
              <span className="font-display text-xl font-bold">A</span>
            </span>
            <div>
              <p className="font-display text-lg font-bold text-white">
                Alexis<span className="text-brand">.</span>
              </p>
              <p className="text-xs text-brand-light/60">Admin Panel</p>
            </div>
          </div>

          <h1 className="mt-8 font-display text-2xl font-bold text-white">
            Sign in to manage content
          </h1>
          <p className="mt-2 text-sm text-brand-light/70 leading-relaxed">
            This admin panel is restricted. Sign in with a <span className="font-semibold text-brand-light">@gmail.com</span> Google account to edit all sections of the portfolio.
          </p>

          {firebaseConfigured ? (
            // Real Firebase: Google popup
            <button
              onClick={onSignIn}
              disabled={signingIn}
              className="mt-6 w-full inline-flex items-center justify-center gap-3 rounded-lg bg-white px-5 py-3 text-sm font-semibold text-ink hover:bg-brand-light transition-all disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {signingIn ? (
                <><span className="h-4 w-4 rounded-full border-2 border-ink/30 border-t-ink animate-spin" />Connecting...</>
              ) : (
                <><GoogleIcon />Sign in with Google</>
              )}
            </button>
          ) : (
            // Preview mode: Gmail input
            <div className="mt-6 space-y-3">
              <label className="block">
                <span className="block text-[11px] font-mono-code uppercase tracking-[0.12em] text-brand-light/60 mb-1.5">
                  Gmail address
                </span>
                <input
                  type="email"
                  value={gmailInput}
                  onChange={(e) => setGmailInput(e.target.value)}
                  onKeyDown={(e) => { if (e.key === "Enter" && gmailInput.trim()) onSignInEmail(); }}
                  placeholder="yourname@gmail.com"
                  className="w-full rounded-md bg-ink px-3 py-2.5 text-sm text-white ring-1 ring-inset ring-brand/30 placeholder:text-brand-light/40 focus:outline-none focus:ring-2 focus:ring-brand"
                />
              </label>
              <button
                onClick={onSignInEmail}
                disabled={signingIn || !gmailInput.trim()}
                className="w-full inline-flex items-center justify-center gap-2 rounded-lg bg-brand px-5 py-3 text-sm font-semibold text-white hover:bg-brand-light hover:text-ink transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {signingIn ? (
                  <><span className="h-4 w-4 rounded-full border-2 border-white/40 border-t-white animate-spin" />Signing in...</>
                ) : (
                  <><GoogleIcon />Sign in as admin</>
                )}
              </button>
            </div>
          )}

          {error && (
            <div className="mt-4 rounded-lg bg-red-500/15 px-4 py-3 ring-1 ring-inset ring-red-400/30">
              <p className="text-xs text-red-200">{error}</p>
            </div>
          )}

          <div className="mt-6 flex items-center gap-2 rounded-lg bg-brand/10 px-4 py-3 ring-1 ring-inset ring-brand/25">
            <span className={`h-2 w-2 shrink-0 rounded-full ${firebaseConfigured ? "bg-green-400" : "bg-amber-400"}`} />
            <p className="text-[11px] text-brand-light/70 leading-relaxed">
              {firebaseConfigured
                ? "Connected to Firebase. Data persists to Firestore."
                : "Preview mode: data saves to this browser. Add Firebase env vars for cloud persistence."}
            </p>
          </div>

          <Link
            href="/"
            className="mt-6 inline-flex items-center gap-1.5 text-xs font-semibold text-brand-light/70 hover:text-white transition-colors"
          >
            <PortfolioIcon name="arrow" width={12} height={12} className="rotate-180" />
            Back to site
          </Link>
        </div>
      </div>
    </div>
  );
}

function GoogleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden>
      <path fill="#4285F4" d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844a4.14 4.14 0 0 1-1.796 2.716v2.259h2.908c1.702-1.567 2.684-3.875 2.684-6.615z" />
      <path fill="#34A853" d="M9 18c2.43 0 4.467-.806 5.956-2.184l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18z" />
      <path fill="#FBBC05" d="M3.964 10.706A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.706V4.962H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.038l3.007-2.332z" />
      <path fill="#EA4335" d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.962l3.007 2.332C4.672 5.166 6.656 3.58 9 3.58z" />
    </svg>
  );
}
