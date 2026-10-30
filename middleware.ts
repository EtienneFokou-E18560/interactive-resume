import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { LAB_BUCKET_COOKIE, LAB_BUCKET_MAX_AGE_SEC } from "@/lib/lab";

/** Ensure an anonymous lab rollout bucket cookie exists (no PII). */
export function middleware(request: NextRequest) {
  const response = NextResponse.next();
  if (!request.cookies.get(LAB_BUCKET_COOKIE)?.value) {
    response.cookies.set(LAB_BUCKET_COOKIE, crypto.randomUUID(), {
      httpOnly: true,
      sameSite: "lax",
      path: "/",
      maxAge: LAB_BUCKET_MAX_AGE_SEC,
      secure: process.env.NODE_ENV === "production",
    });
  }
  return response;
}

export const config = {
  matcher: ["/terminal", "/api/lab/:path*"],
};
