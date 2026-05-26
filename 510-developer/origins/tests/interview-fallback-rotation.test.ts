import { describe, expect, it } from "vitest";
import { pickFallbackQuestion } from "@/lib/ai/interview-engine";
import type { Person } from "@/lib/types/person";

describe("interview fallback question rotation", () => {
  const person: Person = {
    id: "p-1",
    user_id: "u-1",
    name: "Alex Rivera",
    relationship: "Father",
    birth_year: 1958,
    photo_url: null,
    created_at: "2026-05-25T00:00:00Z",
  };

  it("cycles through fallback questions and wraps around", () => {
    const first = pickFallbackQuestion(person, 0);
    const second = pickFallbackQuestion(person, 1);
    const eighth = pickFallbackQuestion(person, 7);
    const wrapped = pickFallbackQuestion(person, 8);

    expect(first).not.toEqual(second);
    expect(eighth).not.toEqual(first);
    expect(wrapped).toEqual(first);
  });
});
