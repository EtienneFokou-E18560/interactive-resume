import Link from "next/link";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { Mail } from "lucide-react";
import { profile } from "@/data/profile";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t border-zinc-200 bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900/50">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <div className="flex flex-col items-center justify-between gap-8 md:flex-row md:items-start">
          <div className="text-center md:text-left">
            <p className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
              {profile.name}
            </p>
            <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
              {profile.title} · {profile.location}
            </p>
            <p className="mt-3 text-sm text-zinc-500">
              © {year} {profile.name}. All rights reserved.
            </p>
          </div>

          <div className="flex flex-col items-center gap-4 md:items-end">
            <div className="flex items-center gap-4">
              <Link
                href={profile.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-zinc-500 transition-colors hover:text-zinc-900 dark:hover:text-zinc-50"
                aria-label="GitHub"
              >
                <FaGithub className="h-5 w-5" />
              </Link>
              <Link
                href={profile.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-zinc-500 transition-colors hover:text-zinc-900 dark:hover:text-zinc-50"
                aria-label="LinkedIn"
              >
                <FaLinkedin className="h-5 w-5" />
              </Link>
              <Link
                href={`mailto:${profile.email}`}
                className="text-zinc-500 transition-colors hover:text-zinc-900 dark:hover:text-zinc-50"
                aria-label="Email"
              >
                <Mail className="h-5 w-5" />
              </Link>
            </div>
            <nav className="flex flex-wrap justify-center gap-4 text-sm text-zinc-600 dark:text-zinc-400">
              <Link href="/about" className="hover:text-zinc-900 dark:hover:text-zinc-50">
                About
              </Link>
              <Link href="/experience" className="hover:text-zinc-900 dark:hover:text-zinc-50">
                Experience
              </Link>
              <Link href="/projects" className="hover:text-zinc-900 dark:hover:text-zinc-50">
                Projects
              </Link>
              <Link href="/contact" className="hover:text-zinc-900 dark:hover:text-zinc-50">
                Contact
              </Link>
            </nav>
          </div>
        </div>
      </div>
    </footer>
  );
}
