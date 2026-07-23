"use client";

import { useState } from "react";
import { MessageCircle, X, Send } from "lucide-react";
import { profile } from "@/data/profile";
import { useLanguage } from "@/hooks/useLanguage";

function getResponse(
  message: string,
  t: ReturnType<typeof useLanguage>["t"]
): string {
  const lower = message.toLowerCase();
  if (lower.includes("experience") || lower.includes("work")) {
    return t.chatbot.experience(profile.title);
  }
  if (lower.includes("skill") || lower.includes("tech")) {
    return t.chatbot.skills;
  }
  if (lower.includes("contact") || lower.includes("email")) {
    return t.chatbot.contact(profile.email, profile.linkedin);
  }
  return t.chatbot.default;
}

export default function Chatbot() {
  const { t } = useLanguage();
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<
    { role: "user" | "assistant"; text: string }[]
  >([{ role: "assistant", text: t.chatbot.greeting(profile.name) }]);
  const [input, setInput] = useState("");

  function sendMessage() {
    if (!input.trim()) return;
    const userMsg = input.trim();
    setMessages((prev) => [
      ...prev,
      { role: "user", text: userMsg },
      { role: "assistant", text: getResponse(userMsg, t) },
    ]);
    setInput("");
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="fixed bottom-4 right-4 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-blue-600 text-white shadow-lg transition-transform hover:scale-105 sm:bottom-6 sm:right-6"
        aria-label="Open resume assistant"
      >
        {open ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
      </button>

      {open && (
        <div className="fixed bottom-20 right-4 z-50 flex h-[min(24rem,calc(100vh-6rem))] w-[min(20rem,calc(100vw-2rem))] flex-col overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-2xl sm:bottom-24 sm:right-6 sm:w-80 dark:border-zinc-800 dark:bg-zinc-900">
          <div className="border-b border-zinc-200 px-4 py-3 dark:border-zinc-800">
            <p className="font-medium text-zinc-900 dark:text-zinc-50">
              {t.chatbot.title}
            </p>
          </div>

          <div className="flex-1 space-y-3 overflow-y-auto p-4">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`rounded-lg px-3 py-2 text-sm ${
                  msg.role === "user"
                    ? "ml-6 bg-blue-600 text-white sm:ml-8"
                    : "mr-6 bg-zinc-100 text-zinc-800 sm:mr-8 dark:bg-zinc-800 dark:text-zinc-200"
                }`}
              >
                {msg.text}
              </div>
            ))}
          </div>

          <div className="flex gap-2 border-t border-zinc-200 p-3 dark:border-zinc-800">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              placeholder={t.chatbot.placeholder}
              className="min-w-0 flex-1 rounded-lg border border-zinc-300 px-3 py-2 text-sm outline-none focus:border-blue-500 dark:border-zinc-700 dark:bg-zinc-950"
            />
            <button
              type="button"
              onClick={sendMessage}
              className="shrink-0 rounded-lg bg-blue-600 p-2 text-white"
              aria-label="Send message"
            >
              <Send className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
