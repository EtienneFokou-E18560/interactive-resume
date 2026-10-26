import { NextResponse } from "next/server";
import { profile } from "@/data/profile";
import { clientIp, createRateLimiter } from "@/lib/rateLimit";

interface ContactPayload {
  name?: unknown;
  email?: unknown;
  message?: unknown;
  /** Honeypot: hidden from people, so only bots fill it in. */
  website?: unknown;
}

const MAX_LENGTH = { name: 200, email: 320, message: 5000 };

/** 5 messages per 10 minutes per IP. */
const rateLimit = createRateLimiter({ limit: 5, windowMs: 10 * 60 * 1000 });

export async function POST(request: Request) {
  const limited = rateLimit(clientIp(request));
  if (!limited.ok) {
    return NextResponse.json(
      { error: "Too many messages, please try again later" },
      { status: 429, headers: { "Retry-After": String(limited.retryAfterSec) } }
    );
  }

  let body: ContactPayload;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const { name, email, message, website } = body;

  // Answer bots as if it worked so they don't retry; nothing is sent.
  if (typeof website === "string" && website.trim()) {
    return NextResponse.json({ success: true });
  }

  if (
    typeof name !== "string" ||
    typeof email !== "string" ||
    typeof message !== "string" ||
    !name.trim() ||
    !email.trim() ||
    !message.trim()
  ) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  if (
    name.length > MAX_LENGTH.name ||
    email.length > MAX_LENGTH.email ||
    message.length > MAX_LENGTH.message
  ) {
    return NextResponse.json({ error: "Message is too long" }, { status: 400 });
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(email)) {
    return NextResponse.json({ error: "Invalid email address" }, { status: 400 });
  }

  const payload = {
    name: name.trim(),
    email: email.trim(),
    message: message.trim(),
  };

  const resendKey = process.env.RESEND_API_KEY;
  const contactEmail = process.env.CONTACT_EMAIL ?? profile.email;
  // Resend's test sender only delivers to the Resend account owner; set a verified domain address.
  const fromEmail =
    process.env.CONTACT_FROM ?? "Portfolio Contact <onboarding@resend.dev>";

  if (!resendKey && process.env.NODE_ENV === "production") {
    // Never tell a visitor "sent" when nothing can be delivered.
    console.error("Contact form rejected: RESEND_API_KEY is not set");
    return NextResponse.json(
      { error: "Email delivery is not configured" },
      { status: 503 }
    );
  }

  if (resendKey) {
    try {
      const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${resendKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: fromEmail,
          to: [contactEmail],
          reply_to: payload.email,
          subject: `Portfolio message from ${payload.name}`,
          text: `Name: ${payload.name}\nEmail: ${payload.email}\n\n${payload.message}`,
        }),
      });

      if (!res.ok) {
        const error = await res.text();
        console.error("Resend API error:", error);
        return NextResponse.json(
          { error: "Failed to send message" },
          { status: 502 }
        );
      }
    } catch (error) {
      console.error("Contact form delivery failed:", error);
      return NextResponse.json(
        { error: "Failed to send message" },
        { status: 502 }
      );
    }
  } else {
    // Local dev fallback when RESEND_API_KEY is unset - never log form body contents.
    console.info("Contact form accepted (email delivery not configured)");
  }

  return NextResponse.json({ success: true });
}
