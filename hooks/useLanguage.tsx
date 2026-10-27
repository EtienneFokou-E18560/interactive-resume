"use client";

import { createContext, useContext, useCallback, useEffect, useSyncExternalStore } from "react";
import { Locale, translations, TranslationKeys } from "@/lib/i18n";

const LOCALE_KEY = "locale";
const listeners = new Set<() => void>();
// Choice made this page load; also covers browsers where storage is blocked (private mode).
let chosenLocale: Locale | null = null;

/** This load's choice, else the saved one, else English. */
function readLocale(): Locale {
  if (chosenLocale) return chosenLocale;
  try {
    return window.localStorage.getItem(LOCALE_KEY) === "fr" ? "fr" : "en";
  } catch {
    return "en";
  }
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

interface LanguageContextValue {
  locale: Locale;
  t: TranslationKeys;
  setLocale: (locale: Locale) => void;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  // Pages are prerendered in English; the saved choice applies right after hydration.
  const locale = useSyncExternalStore(subscribe, readLocale, () => "en" as Locale);

  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  const setLocale = useCallback((next: Locale) => {
    chosenLocale = next;
    try {
      window.localStorage.setItem(LOCALE_KEY, next);
    } catch {
      // Not saved; the choice still applies until the page reloads.
    }
    listeners.forEach((listener) => listener());
  }, []);

  return (
    <LanguageContext.Provider
      value={{ locale, t: translations[locale], setLocale }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within LanguageProvider");
  return ctx;
}
