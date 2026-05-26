import { NextRequest } from "next/server";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { updateSession } from "@/lib/supabase/middleware";

const { getUserMock, createServerClientMock } = vi.hoisted(() => ({
  getUserMock: vi.fn(),
  createServerClientMock: vi.fn(),
}));

vi.mock("@/lib/supabase/env", () => ({
  getSupabaseUrlAndKey: vi.fn(() => ({
    url: "https://example.supabase.co",
    key: "sb_publishable_placeholder",
  })),
}));

vi.mock("@supabase/ssr", () => ({
  createServerClient: createServerClientMock,
}));

describe("dashboard auth access", () => {
  beforeEach(() => {
    getUserMock.mockResolvedValue({ data: { user: null } });
    createServerClientMock.mockReturnValue({
      auth: {
        getUser: getUserMock,
      },
    });
  });

  it("redirects unauthenticated users away from /dashboard", async () => {
    const req = new NextRequest("https://origins.example/dashboard");
    const res = await updateSession(req);

    expect(res.status).toBe(307);
    expect(res.headers.get("location")).toBe("https://origins.example/login");
  });
});
