"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { SignOutButton } from "@/components/sign-out-button";

type Props = { email: string | null; initials: string };

export function AuthedNav({ email, initials }: Props) {
  const pathname = usePathname();
  const [crumb, setCrumb] = useState<string>("");

  useEffect(() => {
    let cancelled = false;
    const qs = new URLSearchParams({ pathname }).toString();
    fetch(`/api/nav-context?${qs}`, { credentials: "same-origin" })
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => {
        if (!cancelled) setCrumb((d?.label as string) ?? "");
      })
      .catch(() => {
        if (!cancelled) setCrumb("");
      });
    return () => {
      cancelled = true;
    };
  }, [pathname]);

  return (
    <header className="sticky top-0 z-30 border-b border-[var(--origins-edge)] bg-[var(--origins-paper)]/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4 sm:px-10">
        <div className="flex min-w-0 items-center gap-6">
          <Link href="/dashboard" className="font-display text-xl tracking-tight text-[var(--origins-ink)]">
            Origins<span className="text-[var(--origins-ember)]">.</span>
          </Link>
          {crumb ? <p className="truncate text-sm text-[var(--origins-ink-soft)]">{crumb}</p> : null}
        </div>
        <div className="flex items-center gap-3">
          <span className="hidden max-w-48 truncate text-sm text-[var(--origins-ink-soft)] sm:inline">
            {email}
          </span>
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[var(--origins-ember-soft)] text-xs font-semibold text-[var(--origins-ember-deep)]">
            {initials}
          </div>
          <SignOutButton />
        </div>
      </div>
    </header>
  );
}
