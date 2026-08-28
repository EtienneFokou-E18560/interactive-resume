"use client";

import { motion } from "framer-motion";
import { skills } from "@/data/skills";

export default function SkillChart() {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      {skills.map((category, catIndex) => (
        <motion.div
          key={category.name}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: catIndex * 0.06 }}
          className="card p-5 sm:p-6"
        >
          <h3 className="mb-4 text-base font-semibold tracking-tight text-foreground">
            {category.name}
          </h3>
          <ul className="space-y-4">
            {category.skills.map((skill) => (
              <li key={skill.name}>
                <p className="text-sm font-medium text-foreground">{skill.name}</p>
                <p className="mt-1 text-sm leading-relaxed text-[var(--color-text-secondary)]">
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
