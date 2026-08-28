"use client";

import { motion } from "framer-motion";
import { profile } from "@/data/profile";

export default function StatsGrid() {
  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
      {profile.stats.map((stat, index) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: index * 0.08 }}
          className="rounded-xl border border-zinc-200 bg-white p-4 text-center shadow-sm dark:border-zinc-800 dark:bg-zinc-900"
        >
          <p className="text-2xl font-bold text-blue-600 dark:text-blue-400 sm:text-3xl">
            {stat.value}
          </p>
          <p className="mt-1 text-xs leading-snug text-zinc-600 sm:text-sm dark:text-zinc-400">
            {stat.label}
          </p>
        </motion.div>
      ))}
    </div>
  );
}
