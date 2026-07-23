"use client";

import { motion } from "framer-motion";
import { skills } from "@/data/skills";

export default function SkillChart() {
  return (
    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
      {skills.map((category, catIndex) => (
        <motion.div
          key={category.name}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: catIndex * 0.1 }}
          className="rounded-xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900"
        >
          <h3 className="mb-4 text-lg font-semibold text-zinc-900 dark:text-zinc-50">
            {category.name}
          </h3>
          <div className="space-y-4">
            {category.skills.map((skill) => (
              <div key={skill.name}>
                <div className="mb-1 flex justify-between text-sm">
                  <span className="text-zinc-700 dark:text-zinc-300">
                    {skill.name}
                  </span>
                  <span className="text-zinc-500">{skill.level}%</span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-zinc-100 dark:bg-zinc-800">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.level}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="h-full rounded-full bg-blue-500"
                  />
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      ))}
    </div>
  );
}
