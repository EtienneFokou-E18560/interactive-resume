/** Portfolio CLI commands available in the simulated terminal today. */
export const PORTFOLIO_COMMANDS = [
  "about",
  "experience",
  "projects",
  "skills",
  "education",
  "contact",
  "resume",
  "name",
  "clear",
  "help",
] as const;

/** Lab shell demos — listed in help but not executable until Phase 2+. */
export const LAB_PREVIEW_COMMANDS = [
  "ls",
  "pwd",
  "tree",
  "cat",
  "head",
  "tail",
  "grep",
  "find",
  "python",
  "git",
  "kubectl",
  "terraform",
] as const;

export const STARTER_CHIPS = [
  "help",
  "about",
  "experience",
  "projects",
  "skills",
  "contact",
  "resume",
] as const;

export type PortfolioCommand = (typeof PORTFOLIO_COMMANDS)[number];

export function isLabPreviewCommand(cmd: string): boolean {
  const base = cmd.trim().split(/\s+/)[0]?.toLowerCase() ?? "";
  return (LAB_PREVIEW_COMMANDS as readonly string[]).includes(base);
}

export function isPortfolioCommandName(cmd: string): boolean {
  const base = cmd.trim().split(/\s+/)[0]?.toLowerCase() ?? "";
  return (PORTFOLIO_COMMANDS as readonly string[]).includes(base);
}

export function completeCommand(partial: string): string | null {
  const token = partial.trim().toLowerCase();
  if (!token || partial.includes(" ")) return null;
  const matches = PORTFOLIO_COMMANDS.filter((c) => c.startsWith(token));
  if (matches.length === 1) return matches[0];
  if (matches.length > 1) {
    let prefix: string = matches[0];
    for (const m of matches.slice(1)) {
      let i = 0;
      while (i < prefix.length && i < m.length && prefix[i] === m[i]) i += 1;
      prefix = prefix.slice(0, i);
    }
    return prefix.length > token.length ? prefix : null;
  }
  return null;
}

export const LAB_COMING_SOON =
  "Engineering Lab commands are not live yet. Launch Engineering Lab (coming soon) will open a temporary, isolated sandbox for GitOps demos. Portfolio commands still work — try `help`.";

export function helpLines(): string[] {
  return [
    "Portfolio commands",
    "  about       Professional summary",
    "  experience  Work history",
    "  projects    Key projects",
    "  skills      Technical skills",
    "  education   Academic background",
    "  contact     Contact information",
    "  resume      Role-tailored PDF resume",
    "  name        Set or show your name (cookie)",
    "  clear       Clear terminal",
    "  help        Show this help",
    "",
    "Engineering Lab (coming soon)",
    "  ls pwd tree cat head tail grep find",
    "  python git kubectl terraform",
    "  Prepared local demos only — no production clusters or cloud credentials.",
  ];
}
