"use client";

import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send } from "lucide-react";
import {
  getChatbotResponse,
  getChatbotGreeting,
  chatbotSuggestions,
} from "@/lib/chatbot";
import { useLanguage } from "@/hooks/useLanguage";
import type { Locale } from "@/lib/i18n";

function ChatbotPanel({ locale, onClose }: { locale: Locale; onClose: () => void }) {
  const [messages, setMessages] = useState<
    { role: "user" | "assistant"; text: string }[]
  >([{ role: "assistant", text: getChatbotGreeting(locale) }]);
  const [input, setInput] = useState("");
  const outputRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    outputRef.current?.scrollTo({
      top: outputRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages]);

  function sendMessage(text?: string) {
    const userMsg = (text ?? input).trim();
    if (!userMsg) return;

    const response = getChatbotResponse(userMsg, locale);
    setMessages((prev) => [
      ...prev,
      { role: "user", text: userMsg },
      { role: "assistant", text: response },
    ]);
    setInput("");
  }

  const suggestions = chatbotSuggestions[locale];

  return (
    <div className="fixed bottom-20 right-4 z-50 flex h-[min(28rem,calc(100vh-6rem))] w-[min(22rem,calc(100vw-2rem))] flex-col overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-2xl sm:bottom-24 sm:right-6 sm:w-96 dark:border-zinc-800 dark:bg-zinc-900">
      <div className="flex items-center justify-between border-b border-zinc-200 px-4 py-3 dark:border-zinc-800">
        <div>
          <p className="font-medium text-zinc-900 dark:text-zinc-50">
            Resume Assistant
          </p>
          <p className="text-xs text-zinc-500">
            {locale === "fr" ? "Posez une question" : "Ask a question"}
          </p>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="rounded-lg p-1 text-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-800"
          aria-label="Close chat"
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      <div ref={outputRef} className="flex-1 space-y-3 overflow-y-auto p-4">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`rounded-lg px-3 py-2 text-sm break-words whitespace-pre-wrap ${
              msg.role === "user"
                ? "ml-4 bg-blue-600 text-white sm:ml-8"
                : "mr-4 bg-zinc-100 text-zinc-800 sm:mr-8 dark:bg-zinc-800 dark:text-zinc-200"
            }`}
          >
            {msg.text}
          </div>
        ))}
      </div>

      <div className="border-t border-zinc-200 px-3 py-2 dark:border-zinc-800">
        <div className="mb-2 flex flex-wrap gap-1.5">
          {suggestions.map((suggestion) => (
            <button
              key={suggestion}
              type="button"
              onClick={() => sendMessage(suggestion)}
              className="rounded-full border border-zinc-200 px-2.5 py-1 text-xs text-zinc-600 transition-colors hover:bg-zinc-100 dark:border-zinc-700 dark:text-zinc-400 dark:hover:bg-zinc-800"
            >
              {suggestion}
            </button>
          ))}
        </div>

        <div className="flex gap-2">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            placeholder={
              locale === "fr" ? "Posez une question..." : "Ask a question..."
            }
            className="min-w-0 flex-1 rounded-lg border border-zinc-300 px-3 py-2 text-base outline-none focus:border-blue-500 sm:text-sm dark:border-zinc-700 dark:bg-zinc-950"
          />
          <button
            type="button"
            onClick={() => sendMessage()}
            className="shrink-0 rounded-lg bg-blue-600 p-2 text-white hover:bg-blue-700"
            aria-label="Send message"
          >
            <Send className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default function Chatbot() {
  const { locale } = useLanguage();
  const [open, setOpen] = useState(false);

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
        <ChatbotPanel
          key={locale}
          locale={locale}
          onClose={() => setOpen(false)}
        />
      )}
    </>
  );
}
