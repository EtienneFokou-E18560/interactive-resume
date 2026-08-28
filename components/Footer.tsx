import Link from "next/link";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { Layers, Mail } from "lucide-react";
import { profile } from "@/data/profile";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t border-[var(--color-border)] bg-[var(--color-bg-subtle)]">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <div className="flex flex-col items-center justify-between gap-8 md:flex-row md:items-start">
          <div className="text-center md:text-left">
            <p className="text-lg font-semibold text-foreground">{profile.name}</p>
            <p className="mt-1 text-sm text-[var(--color-text-secondary)]">
              {profile.title} · {profile.location}
            </p>
            <p className="mt-3 text-sm text-[var(--color-text-muted)]">
              © {year} {profile.name}. All rights reserved.
            </p>
          </div>

          <div className="flex flex-col items-center gap-4 md:items-end">
            <div className="flex items-center gap-4">
              <Link
                href={profile.portfolio}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--color-text-muted)] transition-colors hover:text-accent"
                aria-label="Portfolio"
              >
                <Layers className="h-5 w-5" />
              </Link>
              <Link
                href={profile.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--color-text-muted)] transition-colors hover:text-accent"
                aria-label="GitHub"
              >
                <FaGithub className="h-5 w-5" />
              </Link>
              <Link
                href={profile.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--color-text-muted)] transition-colors hover:text-accent"
                aria-label="LinkedIn"
              >
                <FaLinkedin className="h-5 w-5" />
              </Link>
              <Link
                href={`mailto:${profile.email}`}
                className="text-[var(--color-text-muted)] transition-colors hover:text-accent"
                aria-label="Email"
              >
                <Mail className="h-5 w-5" />
              </Link>
            </div>
            <nav className="flex flex-wrap justify-center gap-4 text-sm text-[var(--color-text-secondary)]">
              <Link href="/about" className="hover:text-accent">
                About
              </Link>
              <Link href="/experience" className="hover:text-accent">
                Experience
              </Link>
              <Link href="/projects" className="hover:text-accent">
                Projects
              </Link>
              <Link href="/contact" className="hover:text-accent">
                Contact
              </Link>
            </nav>
          </div>
        </div>
      </div>
    </footer>
  );
}
