"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import Link from "next/link";
import type { Project } from "@/data/projects";
import { useLanguage } from "@/hooks/useLanguage";

export default function ProjectCard({ project }: { project: Project }) {
  const { t } = useLanguage();
  const [imageError, setImageError] = useState(false);
  const showImage = project.image && !imageError;

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -4 }}
      className="group flex h-full flex-col overflow-hidden rounded-xl border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900"
    >
      <div className="relative flex h-44 items-center justify-center overflow-hidden bg-linear-to-br from-blue-50 to-indigo-100 dark:from-zinc-800 dark:to-zinc-900">
        {showImage ? (
          <Image
            src={project.image!}
            alt={project.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            onError={() => setImageError(true)}
          />
        ) : (
          <span className="text-4xl font-bold text-blue-200 dark:text-zinc-700">
            {project.title.charAt(0)}
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col p-6">
        <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
          {project.title}
        </h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
          {project.description}
        </p>

        <div className="mt-4 flex flex-wrap gap-2">
          {project.technologies.map((tech) => (
            <span
              key={tech}
              className="rounded-full bg-zinc-100 px-2 py-0.5 text-xs text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400"
            >
              {tech}
            </span>
          ))}
        </div>

        <div className="mt-4 flex flex-wrap gap-3">
          {project.github && (
            <Link
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-sm text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50"
            >
              <FaGithub className="h-4 w-4" />
              {t.projects.code}
            </Link>
          )}
          {project.demo && (
            <Link
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-sm text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50"
            >
              <ExternalLink className="h-4 w-4" />
              {t.projects.demo}
            </Link>
          )}
        </div>
      </div>
    </motion.article>
  );
}
