"use client";

import { useState } from "react";
import { MessageCircle, X, Send } from "lucide-react";
import { profile } from "@/data/profile";

const faq: Record<string, string> = {
  experience: `I have experience at Microsoft, Aflac, and Urgent2k as a ${profile.title}.`,
  skills: "My core skills include Azure, AWS, Terraform, Docker, Kubernetes, Python, and TypeScript.",
  contact: `You can reach me at ${profile.email} or via LinkedIn.`,
  default:
    "I can answer questions about my experience, skills, and contact info. Try asking about those topics!",
};

function getResponse(message: string): string {
  const lower = message.toLowerCase();
  if (lower.includes("experience") || lower.includes("work")) return faq.experience;
  if (lower.includes("skill") || lower.includes("tech")) return faq.skills;
  if (lower.includes("contact") || lower.includes("email")) return faq.contact;
  return faq.default;
}

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<
    { role: "user" | "assistant"; text: string }[]
  >([{ role: "assistant", text: "Hi! Ask me about Etienne's experience, skills, or contact info." }]);
  const [input, setInput] = useState("");

  function sendMessage() {
    if (!input.trim()) return;
    const userMsg = input.trim();
    setMessages((prev) => [
      ...prev,
      { role: "user", text: userMsg },
      { role: "assistant", text: getResponse(userMsg) },
    ]);
    setInput("");
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-blue-600 text-white shadow-lg transition-transform hover:scale-105"
        aria-label="Open resume assistant"
      >
        {open ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
      </button>

      {open && (
        <div className="fixed bottom-24 right-6 z-50 flex h-96 w-80 flex-col overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-2xl dark:border-zinc-800 dark:bg-zinc-900">
          <div className="border-b border-zinc-200 px-4 py-3 dark:border-zinc-800">
            <p className="font-medium text-zinc-900 dark:text-zinc-50">
              Resume Assistant
            </p>
          </div>

          <div className="flex-1 space-y-3 overflow-y-auto p-4">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`rounded-lg px-3 py-2 text-sm ${
                  msg.role === "user"
                    ? "ml-8 bg-blue-600 text-white"
                    : "mr-8 bg-zinc-100 text-zinc-800 dark:bg-zinc-800 dark:text-zinc-200"
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
              placeholder="Ask a question..."
              className="flex-1 rounded-lg border border-zinc-300 px-3 py-2 text-sm outline-none dark:border-zinc-700 dark:bg-zinc-950"
            />
            <button
              type="button"
              onClick={sendMessage}
              className="rounded-lg bg-blue-600 p-2 text-white"
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
