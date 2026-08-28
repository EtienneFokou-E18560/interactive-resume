"use client";

import { useState, useRef, useEffect, KeyboardEvent, useMemo } from "react";
import { Terminal as TerminalIcon } from "lucide-react";
import { profile } from "@/data/profile";
import { experience } from "@/data/experience";
import { projects } from "@/data/projects";
import { education } from "@/data/education";
import { techStack } from "@/data/techStack";
import {
  clearVisitorName,
  getVisitorName,
  setVisitorName,
  welcomeMessage,
} from "@/lib/visitor";

function buildCommands(): Record<string, string | string[]> {
  return {
    help: [
      "Available commands:",
      "  about       - Professional summary",
      "  experience  - Work history",
      "  projects    - Key projects",
      "  skills      - Technical skills",
      "  education   - Academic background",
      "  contact     - Contact information",
      "  resume      - Download a role-tailored PDF resume",
      "  name        - Set or show your name (saved in a cookie)",
      "  clear       - Clear terminal",
      "  help        - Show this help",
    ],
    about: [profile.summary, "", ...profile.highlights.map((h) => `• ${h}`)],
    experience: experience.flatMap((e) => [
      `${e.role} @ ${e.company} (${e.start} – ${e.end})`,
      ...e.description.slice(0, 2).map((d) => `  - ${d}`),
      "",
    ]),
    projects: projects.flatMap((p) => [
      `${p.title}`,
      `  ${p.description}`,
      ...p.highlights.slice(0, 2).map((h) => `  - ${h}`),
      `  Tech: ${p.technologies.join(", ")}`,
      "",
    ]),
    skills: techStack.join(", "),
    education: education.map(
      (e) =>
        `${e.degree} in ${e.field} — ${e.school} (${e.end})${e.location ? `, ${e.location}` : ""}`
    ),
    contact: [
      `Name:  ${profile.name}`,
      `Email: ${profile.email}`,
      `Phone: ${profile.phone}`,
      `Location: ${profile.location}`,
      `LinkedIn: ${profile.linkedin}`,
      `GitHub: ${profile.github}`,
      `Portfolio: ${profile.portfolio}`,
    ],
    resume:
      "Generate a role-tailored PDF at /resume/download — choose SRE, DevOps, backend, cloud, or Agentic AI.",
  };
}

const DEFAULT_LINES = [
  welcomeMessage(null),
  "",
  "Commands: about | experience | projects | skills | education | contact | resume | name",
];

export default function Terminal() {
  const commands = useMemo(() => buildCommands(), []);
  const [lines, setLines] = useState<string[]>(DEFAULT_LINES);
  const [input, setInput] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const outputRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const name = getVisitorName();
    if (!name) return;
    setLines((prev) => {
      if (prev[0] !== welcomeMessage(null)) return prev;
      return [welcomeMessage(name), ...prev.slice(1)];
    });
  }, []);

  useEffect(() => {
    outputRef.current?.scrollTo({
      top: outputRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [lines]);

  function handleNameCommand(raw: string): string {
    const arg = raw.trim().slice(4).trim(); // drop "name"
    if (!arg) {
      const current = getVisitorName();
      return current
        ? `Your name is set to "${current}". Use "name <value>" to change it, or "name clear" to remove it.`
        : 'No name saved. Use "name <your name>" to set one (stored in a cookie).';
    }
    if (arg.toLowerCase() === "clear") {
      clearVisitorName();
      return "Name cleared.";
    }
    const saved = setVisitorName(arg);
    if (!saved) {
      return "Invalid name. Use letters, numbers, spaces, or simple punctuation (max 40 characters).";
    }
    return `Nice to meet you, ${saved}. Welcome message will use your name next time.`;
  }

  function runCommand(cmd: string) {
    const trimmed = cmd.trim();
    const lower = trimmed.toLowerCase();

    if (lower === "clear") {
      setLines([]);
      return;
    }

    if (lower === "name" || lower.startsWith("name ")) {
      setLines((prev) => [...prev, `$ ${cmd}`, handleNameCommand(trimmed)]);
      return;
    }

    const output = commands[lower];
    const response = output
      ? Array.isArray(output)
        ? output.join("\n").trim()
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
      className="w-full max-w-full overflow-hidden rounded-xl border border-zinc-300 bg-zinc-50 shadow-inner dark:border-zinc-800 dark:bg-zinc-950"
      onClick={() => inputRef.current?.focus()}
      role="region"
      aria-label="Terminal mode"
    >
      <div className="flex items-center gap-2 border-b border-zinc-300 px-3 py-2.5 sm:px-4 sm:py-3 dark:border-zinc-800">
        <div className="flex shrink-0 gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-red-500/80" />
          <span className="h-2.5 w-2.5 rounded-full bg-yellow-500/80" />
          <span className="h-2.5 w-2.5 rounded-full bg-green-500/80" />
        </div>
        <div className="flex min-w-0 flex-1 items-center gap-2 text-zinc-500 dark:text-zinc-500">
          <TerminalIcon className="h-3.5 w-3.5 shrink-0 sm:h-4 sm:w-4" />
          <span className="truncate font-mono text-xs sm:text-sm">
            {profile.name.toLowerCase().replace(/\s+/g, "-")} ~ terminal
          </span>
        </div>
      </div>

      <div
        ref={outputRef}
        className="max-h-[min(50vh,28rem)] overflow-x-auto overflow-y-auto px-3 py-3 font-mono text-xs leading-relaxed text-emerald-700 sm:px-4 sm:py-4 sm:text-sm dark:text-green-400"
      >
        <div className="min-w-0 space-y-1 break-words whitespace-pre-wrap">
          {lines.map((line, i) => (
            <div key={`${i}-${line.slice(0, 24)}`} className="break-words">
              {line || "\u00A0"}
            </div>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-2 border-t border-zinc-300 px-3 py-2.5 sm:px-4 sm:py-3 dark:border-zinc-800">
        <span className="shrink-0 font-mono text-sm text-emerald-600 sm:text-base dark:text-green-500">
          $
        </span>
        <input
          ref={inputRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          className="min-w-0 flex-1 bg-transparent font-mono text-base text-emerald-700 outline-none sm:text-sm dark:text-green-400"
          aria-label="Terminal input"
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
          spellCheck={false}
        />
      </div>
    </div>
  );
}
