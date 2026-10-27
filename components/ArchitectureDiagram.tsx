"use client";

import { motion } from "framer-motion";

const layers = [
  "Browser",
  "React / Next.js",
  "API Routes",
  "Azure / AWS / GCP",
  "Terraform",
  "PostgreSQL",
];

export default function ArchitectureDiagram() {
  return (
    <div className="mx-auto max-w-md">
      {layers.map((layer, index) => (
        <div key={layer}>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            whileHover={{ scale: 1.02 }}
            className="rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] px-6 py-4 text-center font-medium text-foreground shadow-sm"
          >
            {layer}
          </motion.div>
          {index < layers.length - 1 && (
            <div className="flex justify-center py-2">
              <div className="h-6 w-px bg-zinc-300 dark:bg-zinc-700" />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
