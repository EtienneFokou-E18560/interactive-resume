"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { MapPin, GraduationCap } from "lucide-react";
import { experience } from "@/data/experience";
import { education } from "@/data/education";

export default function Timeline() {
  const timelineItems = [
    ...experience.map((item) => ({ type: "experience" as const, item })),
    ...education.map((item) => ({ type: "education" as const, item })),
  ];

  return (
    <div className="relative mx-auto max-w-4xl">
      <div className="absolute bottom-0 left-4 top-0 w-px bg-zinc-200 dark:bg-zinc-800 sm:left-1/2" />

      {timelineItems.map((entry, index) => {
        const isEducation = entry.type === "education";

        if (isEducation) {
          const item = entry.item;
          return (
            <motion.div
              key={`edu-${item.school}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`relative mb-10 flex flex-col sm:mb-12 sm:flex-row ${
                index % 2 === 0 ? "sm:flex-row-reverse" : ""
              }`}
            >
              <div className="absolute left-4 z-10 flex h-6 w-6 -translate-x-1/2 items-center justify-center rounded-full border-2 border-emerald-500 bg-white dark:bg-zinc-950 sm:left-1/2">
                <GraduationCap className="h-3 w-3 text-emerald-500" />
              </div>
              <div className="w-full pl-10 sm:w-1/2 sm:pl-0">
                <div
                  className={`rounded-xl border border-emerald-200 bg-emerald-50/50 p-5 shadow-sm sm:p-6 dark:border-emerald-900/50 dark:bg-emerald-950/20 ${
                    index % 2 === 0 ? "sm:mr-8" : "sm:ml-8"
                  }`}
                >
                  <p className="text-sm font-medium text-emerald-600 dark:text-emerald-400">
                    {item.start} – {item.end}
                  </p>
                  <h3 className="mt-1 text-lg font-semibold text-zinc-900 dark:text-zinc-50">
                    {item.degree} in {item.field}
                  </h3>
                  <p className="text-zinc-600 dark:text-zinc-400">{item.school}</p>
                  {item.location && (
                    <p className="mt-1 flex items-center gap-1 text-sm text-zinc-500">
                      <MapPin className="h-3.5 w-3.5" />
                      {item.location}
                    </p>
                  )}
                </div>
              </div>
            </motion.div>
          );
        }

        const item = entry.item;
        return (
          <motion.div
            key={`${item.company}-${item.start}`}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className={`relative mb-10 flex flex-col sm:mb-12 sm:flex-row ${
              index % 2 === 0 ? "sm:flex-row-reverse" : ""
            }`}
          >
            <div className="absolute left-4 z-10 h-3 w-3 -translate-x-1/2 rounded-full border-2 border-blue-500 bg-white dark:bg-zinc-950 sm:left-1/2" />
            <div className="w-full pl-10 sm:w-1/2 sm:pl-0">
              <div
                className={`rounded-xl border border-zinc-200 bg-white p-5 shadow-sm sm:p-6 dark:border-zinc-800 dark:bg-zinc-900 ${
                  index % 2 === 0 ? "sm:mr-8" : "sm:ml-8"
                }`}
              >
                <p className="text-sm font-medium text-blue-600 dark:text-blue-400">
                  {item.start} – {item.end}
                </p>
                <h3 className="mt-1 text-lg font-semibold text-zinc-900 dark:text-zinc-50">
                  {item.role}
                </h3>
                <p className="text-zinc-600 dark:text-zinc-400">
                  {item.url ? (
                    <Link
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-blue-600 dark:hover:text-blue-400"
                    >
                      {item.company}
                    </Link>
                  ) : (
                    item.company
                  )}
                </p>
                {item.location && (
                  <p className="mt-1 flex items-center gap-1 text-sm text-zinc-500">
                    <MapPin className="h-3.5 w-3.5" />
                    {item.location}
                  </p>
                )}

                <ul className="mt-4 space-y-2">
                  {item.description.slice(0, 3).map((line) => (
                    <li
                      key={line}
                      className="flex items-start gap-2 text-sm text-zinc-600 dark:text-zinc-400"
                    >
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-500" />
                      {line}
                    </li>
                  ))}
                </ul>

                {item.technologies && (
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {item.technologies.slice(0, 6).map((tech) => (
                      <span
                        key={tech}
                        className="rounded-full bg-zinc-100 px-2 py-0.5 text-xs text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
