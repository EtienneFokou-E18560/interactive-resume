"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { classifyLink, trackLinkEvent, trackSecondPage } from "@/lib/siteEvents";
import { recordPage, visitSource } from "@/lib/visitSource";

/**
 * One listener for the whole site, so links in server components (hero, footer,
 * contact page, project cards) are tracked without each needing an onClick.
 * Also records the visit's source on its first page and the second-page funnel step.
 */
export default function TrackLinkClicks() {
  const pathname = usePathname();

  useEffect(() => {
    // Saved before any navigation drops the landing page's utm_source.
    visitSource();
    try {
      if (recordPage(pathname, window.sessionStorage)) trackSecondPage(pathname);
    } catch {
      // Storage blocked: no funnel step for this visit.
    }
  }, [pathname]);

  useEffect(() => {
    function onClick(e: MouseEvent) {
      const anchor = (e.target as Element | null)?.closest?.("a[href]");
      if (!anchor) return;

      const event = classifyLink(anchor.getAttribute("href") ?? "", window.location.origin);
      if (event) trackLinkEvent(event, window.location.pathname);
    }

    // Capture phase, so the event is sent even when a link handler stops propagation.
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, []);

  return null;
}
