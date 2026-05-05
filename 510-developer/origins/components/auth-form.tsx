"use client";

import { createBrowserClient } from "@/lib/supabase/browser";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

const MIN_PASSWORD = 8;

export function AuthForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const errorParam = searchParams.get("error");

  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setMessage(null);

    if (password.length < MIN_PASSWORD) {
      setMessage(`Password must be at least ${MIN_PASSWORD} characters.`);
      return;
    }

    setLoading(true);
    const supabase = createBrowserClient();

    try {
      if (mode === "signup") {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: `${window.location.origin}/auth/callback`,
          },
        });
        if (error) {
          setMessage(error.message);
          return;
        }
        setMessage(
          "Check your email to confirm your account, or sign in if confirmations are disabled.",
        );
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) {
          setMessage(error.message);
          return;
        }
        router.replace("/dashboard");
        router.refresh();
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="flex w-full max-w-sm flex-col gap-4">
      {(errorParam === "auth" ||
        errorParam === "config" ||
        message) && (
        <p
          className="rounded-lg border border-amber-200 bg-amber-50 px-3 py-2 text-sm text-amber-950"
          role="status"
        >
          {errorParam === "config"
            ? "Supabase URL and key are missing. In origins/.env.local set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY (sb_publishable_…) or NEXT_PUBLIC_SUPABASE_ANON_KEY (legacy eyJ…), then restart npm run dev."
            : errorParam === "auth"
              ? "Something went wrong signing you in. Try again."
              : message}
        </p>
      )}

      <div className="flex rounded-full bg-[var(--origins-paper-deep)] p-1 text-sm font-medium">
        <button
          type="button"
          className={`flex-1 rounded-full px-3 py-2 transition-colors ${
            mode === "signin"
              ? "bg-[var(--origins-cream)] text-[var(--origins-ink)] shadow-sm"
              : "text-[var(--origins-ink-muted)]"
          }`}
          onClick={() => {
            setMode("signin");
            setMessage(null);
          }}
        >
          Sign in
        </button>
        <button
          type="button"
          className={`flex-1 rounded-full px-3 py-2 transition-colors ${
            mode === "signup"
              ? "bg-[var(--origins-cream)] text-[var(--origins-ink)] shadow-sm"
              : "text-[var(--origins-ink-muted)]"
          }`}
          onClick={() => {
            setMode("signup");
            setMessage(null);
          }}
        >
          Sign up
        </button>
      </div>

      <div>
        <label htmlFor="email" className="mb-1 block text-xs font-medium uppercase tracking-wide text-[var(--origins-ink-muted)]">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="field-input"
        />
      </div>

      <div>
        <label htmlFor="password" className="mb-1 block text-xs font-medium uppercase tracking-wide text-[var(--origins-ink-muted)]">
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          autoComplete={mode === "signup" ? "new-password" : "current-password"}
          required
          minLength={MIN_PASSWORD}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="field-input"
        />
        <p className="mt-1 text-xs text-[var(--origins-ink-muted)]">
          At least {MIN_PASSWORD} characters.
        </p>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="btn-primary mt-2 w-full disabled:opacity-60"
      >
        {loading ? "Working…" : mode === "signup" ? "Create account" : "Sign in"}
      </button>
    </form>
  );
}
