"use client";

import { motion, useReducedMotion } from "framer-motion";
import { profile } from "@/data/profile";

export default function StatsGrid() {
  const reduce = useReducedMotion();

  return (
    <div className="proof-grid">
      {profile.stats.map((stat, index) => (
        <motion.div
          key={stat.label}
          initial={reduce ? false : { opacity: 0.35, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={
            reduce
              ? { duration: 0 }
              : { duration: 0.3, delay: index * 0.05, ease: "easeOut" }
          }
          className="card proof-card text-center sm:text-left"
        >
          <span className="proof-value">{stat.value}</span>
          <span className="proof-label">{stat.label}</span>
        </motion.div>
      ))}
    </div>
  );
}
