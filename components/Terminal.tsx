"use client";

import { useState, useRef, KeyboardEvent } from "react";
import { Terminal as TerminalIcon } from "lucide-react";
import { profile } from "@/data/profile";
import { experience } from "@/data/experience";
import { projects } from "@/data/projects";

const commands: Record<string, string | string[]> = {
  help: [
    "Available commands:",
    "  about       - About me",
    "  experience  - Work history",
    "  projects    - Portfolio projects",
    "  skills      - Technical skills",
    "  contact     - Contact info",
    "  clear       - Clear terminal",
    "  help        - Show this help",
  ],
  about: [
    `${profile.name} — ${profile.title}`,
    profile.summary,
    "",
    ...profile.highlights.map((h) => `• ${h}`),
  ],
  experience: experience.map(
    (e) => `${e.role} @ ${e.company} (${e.start}–${e.end})`
  ),
  projects: projects.map((p) => `${p.title} — ${p.technologies.join(", ")}`),
  skills:
    "Azure, AWS, GCP, Terraform, Docker, Kubernetes, Python, TypeScript, Node.js, Go, Java, PowerShell, React, Next.js",
  contact: [
    `Email: ${profile.email}`,
    `Phone: ${profile.phone}`,
    `GitHub: ${profile.github}`,
    `LinkedIn: ${profile.linkedin}`,
    `Location: ${profile.location}`,
  ],
};

export default function Terminal() {
  const [lines, setLines] = useState<string[]>([
    "Welcome to Terminal Mode. Type 'help' to get started.",
    "",
    "Try: about | experience | projects | skills | contact",
  ]);
  const [input, setInput] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  function runCommand(cmd: string) {
    const trimmed = cmd.trim().toLowerCase();
    if (trimmed === "clear") {
      setLines([]);
      return;
    }

    const output = commands[trimmed];
    const response = output
      ? Array.isArray(output)
        ? output.join("\n")
        : output
      : `Command not found: ${trimmed}. Type 'help' for available commands.`;

    setLines((prev) => [...prev, `$ ${cmd}`, response]);
  }

  function handleKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter" && input.trim()) {
      runCommand(input);
      setInput("");
    }
  }

  return (
    <div
      className="cursor-text rounded-xl border border-zinc-800 bg-zinc-950 p-4 font-mono text-sm text-green-400 shadow-inner sm:p-6"
      onClick={() => inputRef.current?.focus()}
      role="region"
      aria-label="Terminal mode"
    >
      <div className="mb-3 flex items-center gap-2 text-zinc-500">
        <TerminalIcon className="h-4 w-4" />
        <span>terminal — {profile.name.toLowerCase().replace(" ", "-")}</span>
      </div>

      <div className="mb-2 max-h-80 space-y-1 overflow-y-auto whitespace-pre-wrap">
        {lines.map((line, i) => (
          <div key={`${i}-${line.slice(0, 20)}`}>{line || "\u00A0"}</div>
        ))}
      </div>

      <div className="flex items-center gap-2 border-t border-zinc-800 pt-3">
        <span className="text-green-500">$</span>
        <input
          ref={inputRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          className="flex-1 bg-transparent outline-none"
          aria-label="Terminal input"
          autoComplete="off"
          spellCheck={false}
        />
      </div>
    </div>
  );
}
