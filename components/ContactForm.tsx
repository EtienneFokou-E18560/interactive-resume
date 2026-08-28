"use client";

import { useState, FormEvent } from "react";
import { Send, Loader2 } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";
import { setVisitorName } from "@/lib/visitor";

export default function ContactForm() {
  const { t } = useLanguage();
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle"
  );

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");

    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form));

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error("Failed");
      if (typeof data.name === "string") {
        setVisitorName(data.name);
      }
      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mx-auto max-w-lg space-y-5">
      <div>
        <label
          htmlFor="name"
          className="mb-2 block text-sm font-medium text-[var(--color-text-secondary)]"
        >
          {t.contact.name}
        </label>
        <input id="name" name="name" required className="field-input" />
      </div>

      <div>
        <label
          htmlFor="email"
          className="mb-2 block text-sm font-medium text-[var(--color-text-secondary)]"
        >
          {t.contact.email}
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          className="field-input"
        />
      </div>

      <div>
        <label
          htmlFor="message"
          className="mb-2 block text-sm font-medium text-[var(--color-text-secondary)]"
        >
          {t.contact.message}
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          className="field-input resize-none"
        />
      </div>

      <button
        type="submit"
        disabled={status === "loading"}
        className="button button-primary w-full disabled:opacity-50"
      >
        {status === "loading" ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <Send className="h-4 w-4" />
        )}
        {t.contact.send}
      </button>

      {status === "success" && (
        <p
          className="text-center text-sm"
          style={{ color: "var(--color-success)" }}
          role="status"
        >
          {t.contact.success}
        </p>
      )}
      {status === "error" && (
        <p
          className="text-center text-sm"
          style={{ color: "var(--color-danger)" }}
          role="alert"
        >
          {t.contact.error}
        </p>
      )}
    </form>
  );
}
