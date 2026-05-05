import type { Story } from "@/lib/types/story";

function parseYear(value: string | null): number | null {
  if (!value) return null;
  const m = value.match(/\b(18|19|20)\d{2}\b/);
  if (!m) return null;
  return Number.parseInt(m[0], 10);
}

export function splitAndSortStories(stories: Story[]) {
  const dated = stories.filter((s) => parseYear(s.estimated_date) != null);
  const undated = stories.filter((s) => parseYear(s.estimated_date) == null);

  dated.sort((a, b) => {
    const ay = parseYear(a.estimated_date) ?? 0;
    const by = parseYear(b.estimated_date) ?? 0;
    if (ay !== by) return ay - by;
    return new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
  });
  undated.sort(
    (a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime(),
  );
  return { dated, undated };
}
