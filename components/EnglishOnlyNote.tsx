"use client";

import { useLanguage } from "@/hooks/useLanguage";

/** Project write-ups exist in English only; say so when the site is in another language. */
export default function EnglishOnlyNote({ className = "" }: { className?: string }) {
  const { locale, t } = useLanguage();
  if (locale === "en") return null;

  return (
    <p className={`text-sm text-[var(--color-text-muted)] ${className}`} role="note">
      {t.projects.englishOnly}
    </p>
  );
}
