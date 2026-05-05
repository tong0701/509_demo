import { AuthForm } from "@/components/auth-form";
import { Suspense } from "react";

export default function LoginPage() {
  return (
    <div className="flex min-h-full flex-1">
      <div className="relative hidden w-1/2 flex-col justify-between bg-[var(--origins-paper-deep)] p-12 lg:flex">
        <div className="font-display text-2xl tracking-tight text-[var(--origins-ink)]">
          Origins<span className="text-[var(--origins-ember)]">.</span>
        </div>
        <div className="space-y-4">
          <h1 className="font-display max-w-md text-4xl leading-tight text-[var(--origins-ink)]">
            The stories your family hasn&apos;t told yet.
          </h1>
          <p className="max-w-sm font-serif text-lg italic text-[var(--origins-ink-soft)]">
            A gentle interviewer for the people you love.
          </p>
        </div>
        <p className="text-xs text-[var(--origins-ink-muted)]">
          Est. 2026 · for grandparents, parents, and the unhurried
        </p>
      </div>

      <div className="flex flex-1 flex-col items-center justify-center px-6 py-16">
        <div className="w-full max-w-md space-y-8">
          <div>
            <h2 className="font-display text-3xl text-[var(--origins-ink)]">
              Welcome back
            </h2>
            <p className="mt-1 text-sm text-[var(--origins-ink-muted)]">
              Sign in or create an account to continue capturing stories.
            </p>
          </div>
          <Suspense fallback={<div className="text-sm text-[var(--origins-ink-muted)]">Loading…</div>}>
            <AuthForm />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
