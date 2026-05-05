import { getStoryForCurrentUser } from "@/lib/data/stories";
import { signStoragePaths } from "@/lib/storage/sign-urls";
import { notFound } from "next/navigation";

type Props = { params: Promise<{ storyId: string }> };

export default async function StoryPage({ params }: Props) {
  const { storyId } = await params;
  const row = await getStoryForCurrentUser(storyId);
  if (!row) notFound();

  const audioSigned = row.audio_url ? (await signStoragePaths("story-audio", [row.audio_url]))[0] : null;
  const photoSigned = row.photo_urls?.length ? await signStoragePaths("story-photos", row.photo_urls) : [];

  return (
    <article className="mx-auto max-w-3xl space-y-6 rounded-2xl border border-[var(--origins-edge)] bg-[var(--origins-paper)] p-6 shadow-sm sm:p-8">
      <div className="flex flex-wrap gap-2 text-xs">
        <span className="rounded-full bg-[var(--origins-paper-deep)] px-2.5 py-1 font-mono text-[var(--origins-ink)]">
          {row.estimated_date ?? new Date(row.created_at).toLocaleString()}
        </span>
        {row.theme ? (
          <span className="rounded-full bg-[var(--origins-ember-soft)] px-2.5 py-1 font-mono text-[var(--origins-ember-deep)]">
            {row.theme}
          </span>
        ) : null}
      </div>

      <section>
        <h2 className="text-xs font-medium uppercase tracking-wide text-[var(--origins-ink-muted)]">Question</h2>
        <p className="font-mono mt-2 text-xl leading-snug text-[var(--origins-ink)]">{row.question_text}</p>
      </section>

      <section>
        <h2 className="text-xs font-medium uppercase tracking-wide text-[var(--origins-ink-muted)]">Answer</h2>
        <p className="mt-2 whitespace-pre-wrap leading-relaxed text-[var(--origins-ink-soft)]">
          {row.response_text || "No typed answer — listen below or view photos."}
        </p>
      </section>

      {audioSigned ? (
        <section>
          <h2 className="text-xs font-medium uppercase tracking-wide text-[var(--origins-ink-muted)]">Recording</h2>
          <audio controls className="mt-3 w-full max-w-md" src={audioSigned} preload="metadata" />
        </section>
      ) : null}

      {photoSigned.some(Boolean) ? (
        <section>
          <h2 className="text-xs font-medium uppercase tracking-wide text-[var(--origins-ink-muted)]">Photos</h2>
          <div className="mt-3 grid gap-3 sm:grid-cols-2">
            {photoSigned.map((url, i) =>
              url ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img key={`${row.photo_urls[i]}-${i}`} src={url} alt="" className="max-h-80 w-full rounded-xl object-cover" />
              ) : null,
            )}
          </div>
        </section>
      ) : null}
    </article>
  );
}
