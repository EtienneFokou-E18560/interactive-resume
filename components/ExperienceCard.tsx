"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, MapPin } from "lucide-react";
import type { Experience } from "@/data/experience";

export default function ExperienceCard({ item }: { item: Experience }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <article className="rounded-xl border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900">
      <button
        type="button"
        onClick={() => setExpanded(!expanded)}
        className="flex w-full items-center justify-between gap-4 p-6 text-left"
        aria-expanded={expanded}
      >
        <div className="min-w-0 flex-1">
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
            {item.role}
          </h3>
          <p className="mt-1 text-zinc-600 dark:text-zinc-400">
            {item.url ? (
              <Link
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-blue-600 dark:hover:text-blue-400"
                onClick={(e) => e.stopPropagation()}
              >
                {item.company}
              </Link>
            ) : (
              item.company
            )}
            {" · "}
            {item.start} – {item.end}
          </p>
          {item.location && (
            <p className="mt-1 flex items-center gap-1.5 text-sm text-zinc-500 dark:text-zinc-500">
              <MapPin className="h-3.5 w-3.5 shrink-0" />
              {item.location}
            </p>
          )}
        </div>
        <ChevronDown
          className={`h-5 w-5 shrink-0 text-zinc-400 transition-transform ${
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
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="border-t border-zinc-100 px-6 pb-6 pt-4 dark:border-zinc-800">
              <ul className="space-y-2 text-zinc-600 dark:text-zinc-400">
                {item.description.map((line) => (
                  <li key={line} className="flex items-start gap-2">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-500" />
                    <span>{line}</span>
                  </li>
                ))}
              </ul>
              {item.technologies && (
                <div className="mt-4 flex flex-wrap gap-2">
                  {item.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-full bg-zinc-100 px-3 py-1 text-xs font-medium text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300"
                    >
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
