"use client";

import { motion } from "framer-motion";
import { experience } from "@/data/experience";

export default function Timeline() {
  return (
    <div className="relative mx-auto max-w-3xl">
      <div className="absolute left-4 top-0 h-full w-px bg-zinc-200 dark:bg-zinc-800 sm:left-1/2" />

      {experience.map((item, index) => (
        <motion.div
          key={`${item.company}-${item.start}`}
          initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          className={`relative mb-12 flex flex-col sm:flex-row ${
            index % 2 === 0 ? "sm:flex-row-reverse" : ""
          }`}
        >
          <div className="absolute left-4 h-3 w-3 -translate-x-1/2 rounded-full border-2 border-blue-500 bg-white dark:bg-zinc-950 sm:left-1/2" />
          <div className="w-full pl-10 sm:w-1/2 sm:pl-0">
            <div
              className={`rounded-xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900 ${
                index % 2 === 0 ? "sm:mr-8" : "sm:ml-8"
              }`}
            >
              <p className="text-sm font-medium text-blue-600 dark:text-blue-400">
                {item.start} – {item.end}
              </p>
              <h3 className="mt-1 text-lg font-semibold text-zinc-900 dark:text-zinc-50">
                {item.role}
              </h3>
              <p className="text-zinc-600 dark:text-zinc-400">{item.company}</p>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
