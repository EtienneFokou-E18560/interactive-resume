"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, MapPin } from "lucide-react";
import type { Experience } from "@/data/experience";

export default function ExperienceCard({ item }: { item: Experience }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <article className="card overflow-hidden">
      <button
        type="button"
        onClick={() => setExpanded(!expanded)}
        className="flex w-full items-center justify-between gap-4 p-5 text-left sm:p-6"
        aria-expanded={expanded}
      >
        <div className="min-w-0 flex-1">
          <h3 className="text-lg font-semibold tracking-tight text-foreground">
            {item.role}
          </h3>
          <p className="mt-1 text-sm text-[var(--color-text-secondary)]">
            {item.url ? (
              <Link
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-accent"
                onClick={(e) => e.stopPropagation()}
              >
                {item.company}
              </Link>
            ) : (
              item.company
            )}
            {" · "}
            {item.start} - {item.end}
          </p>
          {item.location && (
            <p className="mt-1 flex items-center gap-1.5 text-sm text-[var(--color-text-muted)]">
              <MapPin className="h-3.5 w-3.5 shrink-0" />
              {item.location}
            </p>
          )}
          {item.scope && (
            <p className="mt-2 text-sm leading-relaxed text-[var(--color-text-secondary)]">
              {item.scope}
            </p>
          )}
        </div>
        <ChevronDown
          className={`h-5 w-5 shrink-0 text-[var(--color-text-muted)] transition-transform ${
            expanded ? "rotate-180" : ""
          }`}
        />
      </button>

      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden"
          >
            <div className="border-t border-[var(--color-border)] px-5 pb-6 pt-4 sm:px-6">
              <ul className="space-y-2 text-[var(--color-text-secondary)]">
                {item.description.map((line) => (
                  <li key={line} className="flex items-start gap-2 text-sm">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                    <span>{line}</span>
                  </li>
                ))}
              </ul>
              {item.technologies && (
                <div className="mt-4 flex flex-wrap gap-2">
                  {item.technologies.map((tech) => (
                    <span key={tech} className="tag">
                      {tech}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </article>
  );
}
