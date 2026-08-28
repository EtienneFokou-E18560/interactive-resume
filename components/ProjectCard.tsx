"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ExternalLink, ArrowRight } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import Link from "next/link";
import type { Project } from "@/data/projects";
import { projectClassificationLabels } from "@/data/projects";
import { useLanguage } from "@/hooks/useLanguage";

export default function ProjectCard({ project }: { project: Project }) {
  const { t } = useLanguage();
  const [imageError, setImageError] = useState(false);
  const showImage = project.image && !imageError;
  const hasCaseStudy = Boolean(project.caseStudy);

  return (
    <motion.article
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="card card-interactive group flex h-full flex-col overflow-hidden"
    >
      <div className="relative flex h-40 items-center justify-center overflow-hidden bg-[var(--color-bg-subtle)]">
        {showImage ? (
          <Image
            src={project.image!}
            alt={project.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            onError={() => setImageError(true)}
          />
        ) : (
          <span className="text-4xl font-bold text-[var(--color-border-strong)]">
            {project.title.charAt(0)}
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <p className="eyebrow mb-2">
          {projectClassificationLabels[project.classification]}
        </p>
        <h3 className="text-lg font-semibold tracking-tight text-foreground">
          {project.title}
        </h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-[var(--color-text-secondary)]">
          {project.description}
        </p>

        <ul className="mt-3 space-y-1.5">
          {project.highlights.slice(0, 2).map((highlight) => (
            <li
              key={highlight}
              className="flex items-start gap-2 text-xs text-[var(--color-text-secondary)]"
            >
              <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-accent" />
              {highlight}
            </li>
          ))}
        </ul>

        <div className="mt-4 flex flex-wrap gap-2">
          {project.technologies.slice(0, 5).map((tech) => (
            <span key={tech} className="tag">
              {tech}
            </span>
          ))}
        </div>

        <div className="mt-4 flex flex-wrap gap-3">
          {hasCaseStudy && (
            <Link
              href={`/projects/${project.slug}`}
              className="inline-flex items-center gap-1 text-sm font-medium text-accent hover:text-[var(--color-accent-hover)]"
            >
              {t.projects.caseStudy}
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          )}
          {project.github && (
            <Link
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-sm text-[var(--color-text-muted)] hover:text-accent"
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
              className="inline-flex items-center gap-1 text-sm text-[var(--color-text-muted)] hover:text-accent"
            >
              <ExternalLink className="h-4 w-4" />
              {t.projects.demo}
            </Link>
          )}
          {!hasCaseStudy && !project.github && !project.demo && (
            <span className="text-sm text-[var(--color-text-muted)]">
              {t.projects.caseStudyOnly}
            </span>
          )}
        </div>
      </div>
    </motion.article>
  );
}
