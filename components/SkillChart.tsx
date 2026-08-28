"use client";

import { motion } from "framer-motion";
import { skills } from "@/data/skills";

export default function SkillChart() {
  return (
    <div className="grid gap-8 md:grid-cols-2">
      {skills.map((category, catIndex) => (
        <motion.div
          key={category.name}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: catIndex * 0.08 }}
          className="rounded-xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900"
        >
          <h3 className="mb-4 text-lg font-semibold text-zinc-900 dark:text-zinc-50">
            {category.name}
          </h3>
          <ul className="space-y-4">
            {category.skills.map((skill) => (
              <li key={skill.name}>
                <p className="text-sm font-medium text-zinc-900 dark:text-zinc-50">
                  {skill.name}
                </p>
                <p className="mt-1 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                  {skill.evidence}
                </p>
              </li>
            ))}
          </ul>
        </motion.div>
      ))}
    </div>
  );
}
