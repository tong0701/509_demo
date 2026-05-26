import { beforeEach, describe, expect, it, vi } from "vitest";
import { POST } from "@/app/api/persons/route";

const { createServerClientMock } = vi.hoisted(() => ({
  createServerClientMock: vi.fn(),
}));

vi.mock("@/lib/supabase/server", () => ({
  createServerClient: createServerClientMock,
}));

describe("create person profile API", () => {
  const insertMock = vi.fn();
  const selectMock = vi.fn();
  const singleMock = vi.fn();
  const fromMock = vi.fn();

  beforeEach(() => {
    insertMock.mockReturnValue({ select: selectMock });
    selectMock.mockReturnValue({ single: singleMock });
    singleMock.mockResolvedValue({
      data: {
        id: "person-1",
        user_id: "user-1",
        name: "Jane Doe",
        relationship: "Mother",
        birth_year: 1960,
        photo_url: null,
        created_at: "2026-05-25T00:00:00Z",
      },
      error: null,
    });

    fromMock.mockReturnValue({ insert: insertMock });

    createServerClientMock.mockResolvedValue({
      auth: { getUser: vi.fn().mockResolvedValue({ data: { user: { id: "user-1" } } }) },
      from: fromMock,
    });
  });

  it("saves expected profile fields to database", async () => {
    const req = new Request("https://origins.example/api/persons", {
      method: "POST",
      body: JSON.stringify({
        name: "  Jane Doe  ",
        relationship: "Mother",
        birth_year: 1960,
      }),
      headers: { "content-type": "application/json" },
    });

    const res = await POST(req);
    const body = await res.json();

    expect(res.status).toBe(201);
    expect(fromMock).toHaveBeenCalledWith("persons");
    expect(insertMock).toHaveBeenCalledWith({
      user_id: "user-1",
      name: "Jane Doe",
      relationship: "Mother",
      birth_year: 1960,
      photo_url: null,
    });
    expect(body.person).toMatchObject({
      id: "person-1",
      user_id: "user-1",
      name: "Jane Doe",
    });
  });
});
