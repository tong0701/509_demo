"use client";

import type { Person } from "@/lib/types/person";
import { createBrowserClient } from "@/lib/supabase/browser";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";

type Props = { person: Person };

function sanitizeFileName(name: string) {
  return name.replace(/[^\w.\-]+/g, "_").slice(0, 80) || "image";
}

export function InterviewSession({ person }: Props) {
  const [questionText, setQuestionText] = useState("");
  const [questionVisible, setQuestionVisible] = useState(true);
  const [loadingQuestion, setLoadingQuestion] = useState(true);
  const [responseText, setResponseText] = useState("");
  const [photos, setPhotos] = useState<File[]>([]);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const [recordingState, setRecordingState] = useState<"idle" | "recording" | "stopped">("idle");
  const [submitting, setSubmitting] = useState(false);
  const [banner, setBanner] = useState<string | null>(null);
  const [hintNoAi, setHintNoAi] = useState(false);
  const [consecutiveSkips, setConsecutiveSkips] = useState(0);
  const [skipLoading, setSkipLoading] = useState(false);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<BlobPart[]>([]);
  const streamRef = useRef<MediaStream | null>(null);

  const loadQuestion = useCallback(
    async (skipPrevious = false) => {
      const previousQuestion = questionText;
      if (skipPrevious) setSkipLoading(true);
      setLoadingQuestion(true);
      setBanner(null);
      if (skipPrevious) {
        setQuestionVisible(false);
        await new Promise((r) => setTimeout(r, 200));
      }
      try {
        const res = await fetch("/api/interview/next-question", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "same-origin",
          body: JSON.stringify({
            personId: person.id,
            skipPrevious,
            previousQuestion,
          }),
        });
        const data = (await res.json()) as {
          question?: string;
          error?: string;
          openAiConfigured?: boolean;
        };
        if (!res.ok) {
          setBanner(data.error ?? "Could not load the next question.");
          setQuestionText("");
          return;
        }
        setQuestionText(data.question ?? "");
        setQuestionVisible(true);
        setHintNoAi(data.openAiConfigured === false);
        setResponseText("");
        setPhotos([]);
        setAudioBlob(null);
        setRecordingState("idle");
        chunksRef.current = [];
      } catch {
        setBanner("Network error loading question.");
        setQuestionText("");
      } finally {
        setLoadingQuestion(false);
        setSkipLoading(false);
      }
    },
    [person.id, questionText],
  );

  useEffect(() => {
    loadQuestion(false);
  }, [loadQuestion]);

  useEffect(() => () => streamRef.current?.getTracks().forEach((t) => t.stop()), []);

  async function startRecording() {
    setBanner(null);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;
      chunksRef.current = [];
      const recorder = new MediaRecorder(stream);
      mediaRecorderRef.current = recorder;
      recorder.ondataavailable = (e) => {
        if (e.data.size > 0) chunksRef.current.push(e.data);
      };
      recorder.onstop = () => {
        stream.getTracks().forEach((t) => t.stop());
        streamRef.current = null;
        setAudioBlob(new Blob(chunksRef.current, { type: recorder.mimeType || "audio/webm" }));
        setRecordingState("stopped");
      };
      recorder.start(250);
      setRecordingState("recording");
    } catch {
      setBanner("Microphone permission is required.");
    }
  }

  function stopRecording() {
    const rec = mediaRecorderRef.current;
    if (rec && rec.state !== "inactive") rec.stop();
    mediaRecorderRef.current = null;
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = responseText.trim();
    if (!trimmed && !audioBlob && photos.length === 0) {
      setBanner("Write something, record audio, or add at least one photo.");
      return;
    }
    if (!questionText) return;

    setSubmitting(true);
    setBanner(null);
    try {
      const supabase = createBrowserClient();
      let audioStoragePath: string | null = null;
      if (audioBlob && audioBlob.size > 0) {
        const path = `${person.id}/${crypto.randomUUID()}.webm`;
        const { error } = await supabase.storage.from("story-audio").upload(path, audioBlob, {
          contentType: audioBlob.type || "audio/webm",
        });
        if (error) throw new Error(`Audio upload failed: ${error.message}`);
        audioStoragePath = path;
      }

      const photoStoragePaths: string[] = [];
      for (const file of photos) {
        const path = `${person.id}/${crypto.randomUUID()}-${sanitizeFileName(file.name)}`;
        const { error } = await supabase.storage.from("story-photos").upload(path, file, {
          contentType: file.type || "application/octet-stream",
        });
        if (error) throw new Error(`Photo upload failed: ${error.message}`);
        photoStoragePaths.push(path);
      }

      const res = await fetch("/api/interview/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "same-origin",
        body: JSON.stringify({
          personId: person.id,
          questionText,
          responseText: trimmed,
          audioStoragePath,
          photoStoragePaths,
        }),
      });
      const body = (await res.json()) as { error?: string };
      if (!res.ok) throw new Error(body.error ?? "Could not save this answer.");
      setConsecutiveSkips(0);
      await loadQuestion(false);
    } catch (err) {
      setBanner(err instanceof Error ? err.message : "Something went wrong while saving.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="mx-auto max-w-3xl space-y-8">
      <header>
        <p className="text-xs font-medium uppercase tracking-wide text-[var(--origins-ink-muted)]">Interview</p>
        <h1 className="font-display mt-1 text-3xl text-[var(--origins-ink)]">{person.name}</h1>
      </header>

      {hintNoAi ? (
        <p className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-950">
          Add <code className="rounded bg-white/70 px-1">OPENAI_API_KEY</code> to{" "}
          <code className="rounded bg-white/70 px-1">.env.local</code> for richer question generation.
        </p>
      ) : null}
      {banner ? (
        <p className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-900">{banner}</p>
      ) : null}

      <section className="rounded-2xl border border-[var(--origins-edge)] bg-[var(--origins-paper)] p-6 shadow-sm">
        <h2 className="font-display text-lg text-[var(--origins-ink)]">Question</h2>
        {loadingQuestion ? (
          <div className="mt-3 h-6 w-4/5 animate-pulse rounded bg-[var(--origins-paper-deep)]" />
        ) : (
          <p
            className={`mt-3 font-mono text-lg leading-relaxed text-[var(--origins-ink)] transition-opacity duration-200 ${questionVisible ? "opacity-100" : "opacity-0"}`}
          >
            {questionText}
          </p>
        )}
      </section>

      <form onSubmit={onSubmit} className="space-y-6">
        <section className="rounded-2xl border border-[var(--origins-edge)] bg-[var(--origins-paper)] p-6 shadow-sm">
          <textarea
            value={responseText}
            onChange={(e) => setResponseText(e.target.value)}
            rows={6}
            placeholder="Share what you remember..."
            className="field-input resize-y"
          />
          <div className="mt-4 flex flex-wrap gap-3">
            {recordingState === "recording" ? (
              <button type="button" className="rounded-full bg-red-700 px-5 py-2.5 text-sm font-semibold text-white" onClick={stopRecording}>
                Stop recording
              </button>
            ) : (
              <button type="button" className="rounded-full border border-[var(--origins-edge)] bg-[var(--origins-cream)] px-5 py-2.5 text-sm font-semibold text-[var(--origins-ink)]" onClick={startRecording}>
                Record audio
              </button>
            )}
            {audioBlob ? (
              <span className="self-center text-xs text-[var(--origins-ink-muted)]">
                Clip ready ({Math.round(audioBlob.size / 1024)} KB)
              </span>
            ) : null}
          </div>
          <div className="mt-5">
            <input
              type="file"
              accept="image/*"
              multiple
              className="text-sm text-[var(--origins-ink-muted)] file:mr-3 file:rounded-full file:border-0 file:bg-[var(--origins-ember-soft)] file:px-4 file:py-2 file:text-xs file:font-semibold file:text-[var(--origins-ember-deep)]"
              onChange={(e) => setPhotos(Array.from(e.target.files ?? []))}
            />
          </div>
        </section>

        <div className="flex flex-wrap items-center gap-3">
          <button type="submit" disabled={submitting || loadingQuestion || !questionText} className="btn-primary disabled:opacity-50">
            {submitting ? "Saving..." : "Save answer & next question"}
          </button>
          <button
            type="button"
            disabled={skipLoading || loadingQuestion}
            className="btn-ghost text-sm font-semibold disabled:opacity-50"
            onClick={async () => {
              await loadQuestion(true);
              setConsecutiveSkips((n) => n + 1);
            }}
          >
            {skipLoading ? "Skipping..." : "Skip this question"}
          </button>
          {consecutiveSkips >= 3 ? (
            <p className="text-sm text-[var(--origins-ink-muted)]">
              Hard to find one that fits? You can also pause and come back later.{" "}
              <Link href="/dashboard" className="underline">Dashboard</Link>
            </p>
          ) : null}
        </div>
      </form>
    </div>
  );
}
