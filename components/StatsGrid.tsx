"use client";

import { motion } from "framer-motion";
import { profile } from "@/data/profile";

export default function StatsGrid() {
  return (
    <div className="proof-grid">
      {profile.stats.map((stat, index) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.35, delay: index * 0.06 }}
          className="card proof-card text-center sm:text-left"
        >
          <span className="proof-value">{stat.value}</span>
          <span className="proof-label">{stat.label}</span>
        </motion.div>
      ))}
    </div>
  );
}
