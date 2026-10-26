"use client";

import { useState, useRef, useEffect, useId } from "react";
import { MessageCircle, X, Send } from "lucide-react";
import {
  getChatbotResponse,
  getChatbotGreeting,
  chatbotSuggestions,
} from "@/lib/chatbot";
import { useLanguage } from "@/hooks/useLanguage";
import type { Locale } from "@/lib/i18n";

function ChatbotPanel({
  id,
  locale,
  onClose,
}: {
  id: string;
  locale: Locale;
  onClose: () => void;
}) {
  const [messages, setMessages] = useState<
    { role: "user" | "assistant"; text: string }[]
  >([{ role: "assistant", text: getChatbotGreeting(locale) }]);
  const [input, setInput] = useState("");
  const outputRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const titleId = `${id}-title`;

  // Move focus into the panel when it opens, so keyboard and screen-reader users land in it.
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

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
    <div
      id={id}
      role="dialog"
      aria-labelledby={titleId}
      onKeyDown={(e) => e.key === "Escape" && onClose()}
      className="card fixed bottom-20 right-4 z-50 flex h-[min(28rem,calc(100vh-6rem))] w-[min(22rem,calc(100vw-2rem))] flex-col overflow-hidden shadow-[var(--shadow-md)] sm:bottom-24 sm:right-6 sm:w-96">
      <div className="flex items-center justify-between border-b border-[var(--color-border)] px-4 py-3">
        <div>
          <p id={titleId} className="font-medium text-foreground">
            Resume Assistant
          </p>
          <p className="text-xs text-[var(--color-text-muted)]">
            {locale === "fr"
              ? "Réponses basées sur le CV du site"
              : "Answers grounded in this site’s résumé"}
          </p>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-[var(--radius-sm)] text-[var(--color-text-muted)] hover:bg-[var(--color-surface-hover)]"
          aria-label="Close chat"
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      <div
        ref={outputRef}
        role="log"
        aria-live="polite"
        className="flex-1 space-y-3 overflow-y-auto p-4"
      >
        {messages.map((msg, i) => (
          <div
            key={`${msg.role}-${i}-${msg.text.slice(0, 24)}`}
            className={`rounded-[var(--radius-md)] px-3 py-2 text-sm break-words whitespace-pre-wrap ${
              msg.role === "user"
                ? "ml-4 bg-[var(--color-text)] text-[var(--color-bg)] sm:ml-8"
                : "mr-4 bg-[var(--color-bg-subtle)] text-[var(--color-text-secondary)] sm:mr-8"
            }`}
          >
            {msg.text}
          </div>
        ))}
      </div>

      <div className="border-t border-[var(--color-border)] px-3 py-2">
        <div className="mb-2 flex flex-wrap gap-1.5">
          {suggestions.map((suggestion) => (
            <button
              key={suggestion}
              type="button"
              onClick={() => sendMessage(suggestion)}
              className="tag transition-colors hover:border-[var(--color-accent)] hover:text-foreground"
            >
              {suggestion}
            </button>
          ))}
        </div>

        <div className="flex gap-2">
          <input
            ref={inputRef}
            aria-label={locale === "fr" ? "Votre question" : "Your question"}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            placeholder={
              locale === "fr" ? "Posez une question..." : "Ask a question..."
            }
            className="field-input min-w-0 flex-1 py-2 text-base sm:text-sm"
          />
          <button
            type="button"
            onClick={() => sendMessage()}
            className="button button-primary shrink-0 px-3"
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
  const panelId = useId();
  const launcherRef = useRef<HTMLButtonElement>(null);

  function close() {
    setOpen(false);
    launcherRef.current?.focus();
  }

  return (
    <>
      <button
        ref={launcherRef}
        type="button"
        onClick={() => setOpen(!open)}
        className="chat-button"
        aria-label={open ? "Close resume assistant" : "Open resume assistant"}
        aria-expanded={open}
        aria-controls={open ? panelId : undefined}
      >
        {open ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
      </button>

      {open && (
        <ChatbotPanel
          key={locale}
          id={panelId}
          locale={locale}
          onClose={close}
        />
      )}
    </>
  );
}
