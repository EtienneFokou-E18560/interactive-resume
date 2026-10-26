"use client";

import { Analytics, type BeforeSendEvent } from "@vercel/analytics/next";

const OPT_OUT_KEY = "analytics-opt-out";

/**
 * Visit any page with `?analytics=off` once to stop counting this browser (your own visits),
 * and `?analytics=on` to count it again. Stored per browser in localStorage.
 */
export function isOptedOut(search: string, storage: Pick<Storage, "getItem" | "setItem" | "removeItem">): boolean {
  try {
    const choice = new URLSearchParams(search).get("analytics");
    if (choice === "off") storage.setItem(OPT_OUT_KEY, "1");
    if (choice === "on") storage.removeItem(OPT_OUT_KEY);
    return storage.getItem(OPT_OUT_KEY) === "1";
  } catch {
    // Storage blocked (private mode, disabled cookies): count the visit.
    return false;
  }
}

function beforeSend(event: BeforeSendEvent): BeforeSendEvent | null {
  return isOptedOut(window.location.search, window.localStorage) ? null : event;
}

/** Vercel Analytics with an opt-out for the site owner; covers page views and custom events. */
export default function SiteAnalytics() {
  return <Analytics beforeSend={beforeSend} />;
}
