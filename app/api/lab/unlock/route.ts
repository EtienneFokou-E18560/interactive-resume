import { timingSafeEqual } from "node:crypto";
import { NextResponse } from "next/server";
import {
  LAB_INVITE_COOKIE,
  LAB_INVITE_MAX_AGE_SEC,
  getLabInviteCode,
  getServerLabWsUrl,
  isInviteConfigured,
} from "@/lib/lab";

function log(event: string, fields: Record<string, unknown> = {}) {
  console.info(JSON.stringify({ ts: new Date().toISOString(), event, ...fields }));
}

function codesEqual(a: string, b: string): boolean {
  const left = Buffer.from(a);
  const right = Buffer.from(b);
  if (left.length !== right.length) {
    // Constant-time compare against itself to avoid leaking length via early return timing.
    timingSafeEqual(left, left);
    return false;
  }
  return timingSafeEqual(left, right);
}

function inviteCookieOptions() {
  return {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax" as const,
    path: "/",
    maxAge: LAB_INVITE_MAX_AGE_SEC,
  };
}

export async function GET(request: Request) {
  const publicUrl = process.env.NEXT_PUBLIC_LAB_WS_URL?.trim() || null;
  const serverUrl = getServerLabWsUrl();
  const inviteConfigured = isInviteConfigured();
  const cookieHeader = request.headers.get("cookie") || "";
  const unlocked = cookieHeader
    .split(";")
    .some((part) => part.trim() === `${LAB_INVITE_COOKIE}=1`);

  if (publicUrl) {
    return NextResponse.json({
      mode: "owner",
      unlocked: true,
      hostAvailable: true,
      inviteConfigured: false,
      wsUrl: publicUrl,
    });
  }

  if (!inviteConfigured) {
    return NextResponse.json({
      mode: "hidden",
      unlocked: false,
      hostAvailable: Boolean(serverUrl),
      inviteConfigured: false,
      wsUrl: null,
    });
  }

  return NextResponse.json({
    mode: "invite",
    unlocked,
    hostAvailable: Boolean(serverUrl),
    inviteConfigured: true,
    wsUrl: unlocked && serverUrl ? serverUrl : null,
  });
}

export async function POST(request: Request) {
  const expected = getLabInviteCode();
  if (!expected) {
    return NextResponse.json(
      { error: "Invite unlock is not configured." },
      { status: 404 }
    );
  }

  let body: { code?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const code = typeof body.code === "string" ? body.code.trim() : "";
  if (!code || !codesEqual(code, expected)) {
    log("invite_rejected");
    return NextResponse.json({ error: "Invalid invite code." }, { status: 401 });
  }

  const wsUrl = getServerLabWsUrl();
  if (!wsUrl) {
    log("invite_host_unavailable");
    return NextResponse.json(
      {
        error:
          "Lab host is not available in this environment. Ask the operator to start the local gateway.",
      },
      { status: 503 }
    );
  }

  log("invite_accepted");
  const res = NextResponse.json({ ok: true, wsUrl });
  res.cookies.set(LAB_INVITE_COOKIE, "1", inviteCookieOptions());
  return res;
}
