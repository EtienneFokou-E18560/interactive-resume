"use client";

import {
  useState,
  useRef,
  useEffect,
  KeyboardEvent,
  useMemo,
  useSyncExternalStore,
} from "react";
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
import {
  STARTER_CHIPS,
  completeCommand,
  helpLines,
  isLabPreviewCommand,
  isPortfolioCommandName,
  LAB_COMING_SOON,
} from "@/lib/terminalCommands";
import {
  trackTerminalCommand,
  type TerminalCommandCategory,
} from "@/lib/terminalEvents";

/** Cookie has no push API; empty subscribe keeps the client snapshot after hydration. */
function subscribeVisitorName() {
  return () => {};
}

type LineKind =
  | "welcome"
  | "hint"
  | "header"
  | "input"
  | "stdout"
  | "stderr"
  | "blank";

type TerminalLine = { kind: LineKind; text: string };

function buildPortfolioOutputs(): Record<string, string | string[]> {
  return {
    help: helpLines(),
    about: [profile.summary, "", ...profile.highlights.map((h) => `• ${h}`)],
    experience: experience.flatMap((e) => [
      `${e.role} @ ${e.company} (${e.start} - ${e.end})`,
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
        `${e.degree} in ${e.field} - ${e.school} (${e.end})${e.location ? `, ${e.location}` : ""}`
    ),
    contact: [
      `Name:  ${profile.name}`,
      `Email: ${profile.email}`,
      `Phone: Available on request for scheduled calls`,
      `Location: ${profile.location}`,
      `LinkedIn: ${profile.linkedin}`,
      `GitHub: ${profile.github}`,
      `Portfolio: ${profile.portfolio}`,
    ],
    resume:
      "Generate a role-tailored PDF at /resume/download - choose SRE, DevOps, backend, cloud, or Agentic AI.",
  };
}

function linesFromOutput(output: string | string[]): TerminalLine[] {
  const texts = Array.isArray(output) ? output : [output];
  return texts.map((text) => {
    if (!text) return { kind: "blank" as const, text: "" };
    if (
      text === "Portfolio commands" ||
      text === "Engineering Lab (coming soon)"
    ) {
      return { kind: "header", text };
    }
    return { kind: "stdout", text };
  });
}

function defaultTranscript(visitorName: string | null): TerminalLine[] {
  return [
    { kind: "welcome", text: welcomeMessage(visitorName) },
    { kind: "blank", text: "" },
    {
      kind: "hint",
      text: "Try a chip below, or type help. Up/Down for history, Tab to complete.",
    },
  ];
}

function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export default function Terminal() {
  const outputs = useMemo(() => buildPortfolioOutputs(), []);
  const visitorName = useSyncExternalStore(
    subscribeVisitorName,
    getVisitorName,
    () => null
  );
  const defaults = useMemo(
    () => defaultTranscript(visitorName),
    [visitorName]
  );
  /** null = show default welcome; otherwise session transcript (incl. cleared []). */
  const [lines, setLines] = useState<TerminalLine[] | null>(null);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState<number | null>(null);
  const [focused, setFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const outputRef = useRef<HTMLDivElement>(null);
  const displayLines = lines ?? defaults;

  useEffect(() => {
    outputRef.current?.scrollTo({
      top: outputRef.current.scrollHeight,
      behavior: prefersReducedMotion() ? "auto" : "smooth",
    });
  }, [displayLines]);

  function handleNameCommand(raw: string): string {
    const arg = raw.trim().slice(4).trim();
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

  function appendLines(...next: TerminalLine[]) {
    setLines((prev) => [...(prev ?? defaults), ...next]);
  }

  function categorize(cmd: string): TerminalCommandCategory {
    if (isLabPreviewCommand(cmd)) return "lab_preview";
    if (isPortfolioCommandName(cmd) || cmd.toLowerCase().startsWith("name ")) {
      return "portfolio";
    }
    return "unknown";
  }

  function runCommand(cmd: string) {
    const trimmed = cmd.trim();
    if (!trimmed) return;

    const category = categorize(trimmed);
    trackTerminalCommand(category);

    setHistory((prev) => {
      if (prev[prev.length - 1] === trimmed) return prev;
      return [...prev, trimmed];
    });
    setHistoryIndex(null);

    const lower = trimmed.toLowerCase();
    const echo: TerminalLine = { kind: "input", text: `$ ${trimmed}` };

    if (lower === "clear") {
      setLines([]);
      return;
    }

    if (isLabPreviewCommand(trimmed)) {
      appendLines(echo, { kind: "stderr", text: LAB_COMING_SOON });
      return;
    }

    if (lower === "name" || lower.startsWith("name ")) {
      appendLines(echo, {
        kind: "stdout",
        text: handleNameCommand(trimmed),
      });
      return;
    }

    const output = outputs[lower];
    if (output) {
      appendLines(echo, ...linesFromOutput(output));
      return;
    }

    appendLines(echo, {
      kind: "stderr",
      text: `Command not found: ${trimmed}. Type 'help' for available commands.`,
    });
  }

  function handleKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      e.preventDefault();
      if (input.trim()) {
        runCommand(input);
        setInput("");
      }
      return;
    }

    if (e.key === "ArrowUp") {
      e.preventDefault();
      if (history.length === 0) return;
      const next =
        historyIndex === null
          ? history.length - 1
          : Math.max(0, historyIndex - 1);
      setHistoryIndex(next);
      setInput(history[next] ?? "");
      return;
    }

    if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIndex === null) return;
      if (historyIndex >= history.length - 1) {
        setHistoryIndex(null);
        setInput("");
        return;
      }
      const next = historyIndex + 1;
      setHistoryIndex(next);
      setInput(history[next] ?? "");
      return;
    }

    if (e.key === "Tab") {
      e.preventDefault();
      const completed = completeCommand(input);
      if (completed) setInput(completed);
    }
  }

  return (
    <div
      className="terminal"
      onClick={() => inputRef.current?.focus()}
      role="region"
      aria-label="Portfolio terminal"
    >
      <div className="terminal-chrome">
        <div className="flex shrink-0 gap-1.5" aria-hidden="true">
          <span className="h-2.5 w-2.5 rounded-full bg-red-500/80" />
          <span className="h-2.5 w-2.5 rounded-full bg-yellow-500/80" />
          <span className="h-2.5 w-2.5 rounded-full bg-green-500/80" />
        </div>
        <div className="flex min-w-0 flex-1 items-center gap-2 text-[var(--terminal-muted)]">
          <TerminalIcon className="h-3.5 w-3.5 shrink-0 sm:h-4 sm:w-4" />
          <span className="truncate font-mono text-xs sm:text-sm">
            {profile.name.toLowerCase().replace(/\s+/g, "-")} ~ portfolio
          </span>
        </div>
      </div>

      <div
        ref={outputRef}
        className="terminal-output"
        aria-live="polite"
        aria-relevant="additions"
      >
        <div className="min-w-0 space-y-0.5">
          {displayLines.map((line, i) => (
            <div
              key={`${i}-${line.kind}-${line.text.slice(0, 32)}`}
              className={`terminal-line terminal-line-${line.kind}${line.kind === "blank" ? " terminal-line-blank" : ""}`}
            >
              {line.kind === "blank" ? "\u00A0" : line.text}
            </div>
          ))}
        </div>
      </div>

      <div className="terminal-input-row">
        <span className="terminal-prompt shrink-0 font-mono text-sm sm:text-base">
          $
        </span>
        <input
          ref={inputRef}
          value={input}
          onChange={(e) => {
            setInput(e.target.value);
            setHistoryIndex(null);
          }}
          onKeyDown={handleKeyDown}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          className="terminal-input"
          aria-label="Terminal input"
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
          spellCheck={false}
        />
        {focused && !input ? (
          <span className="terminal-cursor" aria-hidden="true" />
        ) : null}
      </div>

      <div
        className="terminal-chips"
        role="group"
        aria-label="Suggested commands"
      >
        {STARTER_CHIPS.map((cmd) => (
          <button
            key={cmd}
            type="button"
            className="terminal-chip"
            onClick={(e) => {
              e.stopPropagation();
              runCommand(cmd);
              inputRef.current?.focus();
            }}
          >
            {cmd}
          </button>
        ))}
      </div>
    </div>
  );
}
