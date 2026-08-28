"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Moon, Sun, Globe, Menu, X } from "lucide-react";
import { useSyncExternalStore, useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { useLanguage } from "@/hooks/useLanguage";
import { cn } from "@/lib/utils";
import { profile } from "@/data/profile";

const navItems = [
  { href: "/", key: "home" as const },
  { href: "/about", key: "about" as const },
  { href: "/experience", key: "experience" as const },
  { href: "/projects", key: "projects" as const },
  { href: "/skills", key: "skills" as const },
  { href: "/contact", key: "contact" as const },
];

export default function Navbar() {
  const pathname = usePathname();
  const { setTheme, resolvedTheme } = useTheme();
  const { t, locale, setLocale } = useLanguage();
  const [mobileOpen, setMobileOpen] = useState(false);
  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  function closeMobileMenu() {
    setMobileOpen(false);
  }

  return (
    <header className="site-header">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
        <Link
          href="/"
          onClick={closeMobileMenu}
          className="text-lg font-semibold tracking-tight text-foreground"
        >
          {profile.name}
        </Link>

        <ul className="hidden items-center gap-1 md:flex">
          {navItems.map(({ href, key }) => (
            <li key={href}>
              <Link
                href={href}
                className="nav-link"
                aria-current={pathname === href ? "page" : undefined}
              >
                {t.nav[key]}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => setLocale(locale === "en" ? "fr" : "en")}
            className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-[var(--radius-sm)] text-[var(--color-text-muted)] transition-colors hover:bg-[var(--color-surface-hover)] hover:text-foreground"
            aria-label={`Switch language (current: ${locale.toUpperCase()})`}
          >
            <Globe className="h-4 w-4" />
            <span className="sr-only">{locale.toUpperCase()}</span>
          </button>

          {mounted && (
            <button
              type="button"
              onClick={() =>
                setTheme(resolvedTheme === "dark" ? "light" : "dark")
              }
              className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-[var(--radius-sm)] text-[var(--color-text-muted)] transition-colors hover:bg-[var(--color-surface-hover)] hover:text-foreground"
              aria-label="Toggle theme"
            >
              {resolvedTheme === "dark" ? (
                <Sun className="h-4 w-4" />
              ) : (
                <Moon className="h-4 w-4" />
              )}
            </button>
          )}

          <button
            type="button"
            onClick={() => setMobileOpen(!mobileOpen)}
            className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-[var(--radius-sm)] text-[var(--color-text-muted)] transition-colors hover:bg-[var(--color-surface-hover)] hover:text-foreground md:hidden"
            aria-label={mobileOpen ? t.nav.close : t.nav.menu}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      {mobileOpen && (
        <div className="border-t border-[var(--color-border)] bg-[var(--color-bg)] px-4 py-4 md:hidden">
          <ul className="space-y-1">
            {navItems.map(({ href, key }) => (
              <li key={href}>
                <Link
                  href={href}
                  onClick={closeMobileMenu}
                  className={cn("nav-link block py-3")}
                  aria-current={pathname === href ? "page" : undefined}
                >
                  {t.nav[key]}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}
