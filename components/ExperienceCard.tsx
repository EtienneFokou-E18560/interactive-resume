"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import type { Experience } from "@/data/experience";

export default function ExperienceCard({ item }: { item: Experience }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <article className="rounded-xl border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900">
      <button
        type="button"
        onClick={() => setExpanded(!expanded)}
        className="flex w-full items-center justify-between p-6 text-left"
        aria-expanded={expanded}
      >
        <div>
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
            {item.role}
          </h3>
          <p className="text-zinc-600 dark:text-zinc-400">
            {item.company} · {item.start} – {item.end}
          </p>
        </div>
        <ChevronDown
          className={`h-5 w-5 text-zinc-400 transition-transform ${
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
              <ul className="list-inside list-disc space-y-2 text-zinc-600 dark:text-zinc-400">
                {item.description.map((line) => (
                  <li key={line}>{line}</li>
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
