"use client";

import { motion } from "framer-motion";
import { techStack } from "@/data/techStack";

export default function TechStack() {
  return (
    <div className="flex flex-wrap justify-center gap-3">
      {techStack.map((tech, index) => (
        <motion.span
          key={tech}
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3, delay: index * 0.03 }}
          whileHover={{ scale: 1.05 }}
          className="rounded-full border border-zinc-200 bg-white px-4 py-2 text-sm font-medium text-zinc-700 shadow-sm dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-300"
        >
          {tech}
        </motion.span>
      ))}
    </div>
  );
}
