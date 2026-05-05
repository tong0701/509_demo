import { getPersonForCurrentUser } from "@/lib/data/persons";
import { listStoriesForPerson } from "@/lib/data/stories";
import { signStoragePaths } from "@/lib/storage/sign-urls";
import { splitAndSortStories } from "@/lib/timeline/sort";
import Link from "next/link";
import { notFound } from "next/navigation";

type Props = { params: Promise<{ personId: string }> };

export default async function TimelinePage({ params }: Props) {
  const { personId } = await params;
  const person = await getPersonForCurrentUser(personId);
  if (!person) notFound();
  const stories = await listStoriesForPerson(personId);
  const { dated, undated } = splitAndSortStories(stories);

  async function thumb(path: string | null) {
    if (!path) return null;
    return (await signStoragePaths("story-photos", [path]))[0];
  }

  const datedRows = await Promise.all(
    dated.map(async (s) => ({ s, thumb: await thumb(s.photo_urls?.[0] ?? null) })),
  );
  const undatedRows = await Promise.all(
    undated.map(async (s) => ({ s, thumb: await thumb(s.photo_urls?.[0] ?? null) })),
  );

  const Item = ({ id, question, response, estimated, created, theme, t }: any) => (
    <article className="overflow-hidden rounded-2xl border border-[var(--origins-edge)] bg-[var(--origins-paper)] shadow-sm">
      <div className="flex flex-col gap-4 p-5 sm:flex-row">
        {t ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={t} alt="" className="h-28 w-full rounded-xl object-cover sm:h-full sm:w-36" />
        ) : null}
        <div className="min-w-0 flex-1 space-y-2">
          <div className="flex flex-wrap gap-2 text-xs text-[var(--origins-ink-muted)]">
            <span className="rounded-full bg-[var(--origins-paper-deep)] px-2 py-0.5 font-mono">
              {estimated ?? created}
            </span>
            {theme ? (
              <span className="rounded-full bg-[var(--origins-ember-soft)] px-2 py-0.5 font-mono text-[var(--origins-ember-deep)]">
                {theme}
              </span>
            ) : null}
          </div>
          <p className="font-mono text-[var(--origins-ink)]">{question}</p>
          <p className="line-clamp-3 text-sm text-[var(--origins-ink-soft)]">{response || "(Audio or photos)"}</p>
          <Link href={`/story/${id}`} className="text-sm font-semibold text-[var(--origins-ember)] hover:underline">
            Open full story
          </Link>
        </div>
      </div>
    </article>
  );

  return (
    <div className="mx-auto max-w-3xl space-y-8">
      <header>
        <h1 className="font-display text-3xl text-[var(--origins-ink)]">{person.name}</h1>
        <p className="mt-2 text-sm text-[var(--origins-ink-muted)]">Chronological timeline with undated stories grouped at the bottom.</p>
      </header>

      {datedRows.length > 0 ? (
        <ol className="relative space-y-6 border-l border-[var(--origins-edge)] pl-8">
          {datedRows.map(({ s, thumb }) => (
            <li key={s.id} className="relative">
              <span className="absolute -left-[29px] mt-1.5 h-3 w-3 rounded-full bg-[var(--origins-ember)] ring-4 ring-[var(--origins-cream)]" />
              <Item
                id={s.id}
                question={s.question_text}
                response={s.response_text}
                estimated={s.estimated_date}
                created={new Date(s.created_at).toLocaleDateString()}
                theme={s.theme}
                t={thumb}
              />
            </li>
          ))}
        </ol>
      ) : null}

      {undatedRows.length > 0 ? (
        <section className="space-y-4">
          <div className="flex items-center gap-3">
            <span className="font-mono text-[var(--origins-ink-muted)]">—</span>
            <h2 className="font-display text-xl text-[var(--origins-ink)]">Undated stories · Sorted by capture date</h2>
          </div>
          <div className="space-y-4">
            {undatedRows.map(({ s, thumb }) => (
              <Item
                key={s.id}
                id={s.id}
                question={s.question_text}
                response={s.response_text}
                estimated={null}
                created={new Date(s.created_at).toLocaleDateString()}
                theme={s.theme}
                t={thumb}
              />
            ))}
          </div>
        </section>
      ) : null}

      {datedRows.length === 0 && undatedRows.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-[var(--origins-edge)] bg-[var(--origins-paper)] px-8 py-12 text-center">
          <p className="text-[var(--origins-ink)]">No stories yet.</p>
          <Link href={`/interview/${person.id}`} className="mt-3 inline-block text-sm font-semibold text-[var(--origins-ember)] underline">
            Start an interview
          </Link>
        </div>
      ) : null}
    </div>
  );
}
