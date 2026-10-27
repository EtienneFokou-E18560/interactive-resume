const SOURCE_KEY = "visit-source";
const PAGES_KEY = "visit-pages";
const MAX_SOURCE_LENGTH = 40;

/**
 * Where a visit came from, judged on its first page: the `utm_source` tag if the link had one,
 * else the referring site (LinkedIn and Google grouped), else "direct".
 */
export function landingSource(search: string, referrer: string, origin: string): string {
  const utm = new URLSearchParams(search).get("utm_source")?.trim().toLowerCase();
  if (utm) return utm.slice(0, MAX_SOURCE_LENGTH);

  let host: string;
  try {
    const url = new URL(referrer);
    if (url.origin === origin) return "direct";
    host = url.hostname.replace(/^www\./, "");
  } catch {
    return "direct";
  }

  if (host === "lnkd.in" || host === "linkedin.com" || host.endsWith(".linkedin.com")) return "linkedin";
  if (/^google\.[a-z.]+$/.test(host)) return "google";
  return host.slice(0, MAX_SOURCE_LENGTH);
}

/** The source saved for this tab's visit; set on the first page and kept until the tab closes. */
export function visitSource(): string {
  try {
    let source = window.sessionStorage.getItem(SOURCE_KEY);
    if (!source) {
      source = landingSource(window.location.search, document.referrer, window.location.origin);
      window.sessionStorage.setItem(SOURCE_KEY, source);
    }
    return source;
  } catch {
    // Storage blocked: judge from this page alone.
    return landingSource(window.location.search, document.referrer, window.location.origin);
  }
}

/**
 * Records a page as seen this visit. Returns true exactly once per visit: when a second
 * distinct page is opened, the step between landing and acting in the funnel.
 */
export function recordPage(path: string, storage: Pick<Storage, "getItem" | "setItem">): boolean {
  try {
    const pages: string[] = JSON.parse(storage.getItem(PAGES_KEY) ?? "[]");
    if (pages.includes(path) || pages.length >= 2) return false;
    pages.push(path);
    storage.setItem(PAGES_KEY, JSON.stringify(pages));
    return pages.length === 2;
  } catch {
    return false;
  }
}
