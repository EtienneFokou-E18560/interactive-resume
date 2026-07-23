"use client";

import { motion } from "framer-motion";

const layers = [
  { label: "Browser", color: "bg-blue-500" },
  { label: "React / Next.js", color: "bg-cyan-500" },
  { label: "API Routes", color: "bg-emerald-500" },
  { label: "Azure / AWS / GCP", color: "bg-violet-500" },
  { label: "Terraform", color: "bg-amber-500" },
  { label: "PostgreSQL", color: "bg-rose-500" },
];

export default function ArchitectureDiagram() {
  return (
    <div className="mx-auto max-w-md">
      {layers.map((layer, index) => (
        <div key={layer.label}>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            whileHover={{ scale: 1.02 }}
            className={`${layer.color} rounded-lg px-6 py-4 text-center font-medium text-white shadow-md`}
          >
            {layer.label}
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
