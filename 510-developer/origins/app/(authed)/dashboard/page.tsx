import { DashboardManager } from "@/components/dashboard-manager";
import { listPersons } from "@/lib/data/persons";
import { createServerClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const { persons, fetchError, missingTable } = await listPersons();
  const supabase = await createServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-3xl text-[var(--origins-ink)]">Dashboard</h1>
        <p className="mt-1 text-[var(--origins-ink-muted)]">
          People you are interviewing and their captured stories.
        </p>
      </div>

      {missingTable ? (
        <div className="rounded-2xl border border-amber-200 bg-amber-50 px-5 py-4 text-sm text-amber-950">
          Run <code className="rounded bg-white/60 px-1.5 py-0.5 font-mono text-xs">origins/supabase/schema.sql</code> in Supabase SQL editor.
        </div>
      ) : null}
      {fetchError ? (
        <div className="rounded-2xl border border-red-200 bg-red-50 px-5 py-4 text-sm text-red-900">
          Could not load people: {fetchError}
        </div>
      ) : null}

      <DashboardManager initialPeople={persons} userId={user.id} />
    </div>
  );
}
