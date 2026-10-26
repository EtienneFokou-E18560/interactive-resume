import { track } from "@vercel/analytics";

export type LinkEvent =
  | { name: "email_click" }
  | { name: "linkedin_click" }
  | { name: "github_click" }
  | { name: "resume_download"; format: "pdf" }
  | { name: "case_study_open"; slug: string };

/** Which tracked action a link is, from its href alone; null for links we don't track. */
export function classifyLink(href: string, origin: string): LinkEvent | null {
  if (href.startsWith("mailto:")) return { name: "email_click" };

  let url: URL;
  try {
    url = new URL(href, origin);
  } catch {
    return null;
  }

  const host = url.hostname.replace(/^www\./, "");
  if (host === "linkedin.com" || host.endsWith(".linkedin.com")) {
    return { name: "linkedin_click" };
  }
  if (host === "github.com" || host.endsWith(".github.io")) {
    return { name: "github_click" };
  }
  if (url.origin !== origin) return null;
  if (url.pathname.endsWith(".pdf")) return { name: "resume_download", format: "pdf" };

  const caseStudy = url.pathname.match(/^\/projects\/([\w-]+)\/?$/);
  if (caseStudy) return { name: "case_study_open", slug: caseStudy[1] };

  return null;
}

/** Anonymous site events - only the action and the page it happened on, never PII. */
export function trackLinkEvent(event: LinkEvent, page: string) {
  const { name, ...props } = event;
  track(name, { ...props, page });
}

export function trackResumeGenerated(role: string) {
  track("resume_download", { format: "generated", role });
}

/** `status` is the HTTP status of a failed send, or "network" when the request never completed. */
export function trackContactSubmit(result: "success" | "error", status?: number | "network") {
  track("contact_submit", status === undefined ? { result } : { result, status });
}
