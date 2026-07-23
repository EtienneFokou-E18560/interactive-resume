import { NextResponse } from "next/server";
import { profile } from "@/data/profile";

interface ContactPayload {
  name?: string;
  email?: string;
  message?: string;
}

export async function POST(request: Request) {
  let body: ContactPayload;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const { name, email, message } = body;

  if (!name?.trim() || !email?.trim() || !message?.trim()) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
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

  if (resendKey) {
    try {
      const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${resendKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: "Portfolio Contact <onboarding@resend.dev>",
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
    console.info("Contact form submission:", payload);
  }

  return NextResponse.json({ success: true });
}
