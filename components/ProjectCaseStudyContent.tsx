import Link from "next/link";
import { ExternalLink, ArrowLeft } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import type { Project } from "@/data/projects";
import { projectClassificationLabels } from "@/data/projects";

export default function ProjectCaseStudyContent({ project }: { project: Project }) {
  const study = project.caseStudy;
  if (!study) return null;

  return (
    <article className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <Link
        href="/projects"
        className="inline-flex items-center gap-2 text-sm text-[var(--color-text-muted)] hover:text-accent"
      >
        <ArrowLeft className="h-4 w-4" />
        All projects
      </Link>

      <header className="mt-8 border-b border-[var(--color-border)] pb-8">
        <p className="eyebrow">
          {projectClassificationLabels[project.classification]}
        </p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          {project.title}
        </h1>
        <p className="mt-4 text-lg leading-relaxed text-[var(--color-text-secondary)]">
          {project.description}
        </p>
        <div className="button-row mt-6">
          {project.github && (
            <Link
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="button button-primary"
            >
              <FaGithub className="h-4 w-4" />
              View code
            </Link>
          )}
          {project.demo && (
            <Link
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="button button-secondary"
            >
              <ExternalLink className="h-4 w-4" />
              Demo / docs
            </Link>
          )}
          {!project.github && !project.demo && (
            <p className="text-sm text-[var(--color-text-muted)]">
              No public repository - presented as a technical case study.
            </p>
          )}
        </div>
      </header>

      <div className="mt-10 space-y-10">
        <section>
          <h2 className="text-xl font-semibold text-foreground">Problem and constraints</h2>
          <p className="mt-3 leading-relaxed text-[var(--color-text-secondary)]">
            {study.problem}
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground">Role and ownership</h2>
          <p className="mt-3 leading-relaxed text-[var(--color-text-secondary)]">
            {study.role}
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground">
            Key engineering decisions
          </h2>
          <ul className="mt-3 space-y-2">
            {study.decisions.map((item) => (
              <li
                key={item}
                className="flex items-start gap-2 text-[var(--color-text-secondary)]"
              >
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground">
            Tradeoffs and alternatives
          </h2>
          <ul className="mt-3 space-y-2">
            {study.tradeoffs.map((item) => (
              <li
                key={item}
                className="flex items-start gap-2 text-[var(--color-text-secondary)]"
              >
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground">
            Reliability, deployment, and observability
          </h2>
          <p className="mt-3 leading-relaxed text-[var(--color-text-secondary)]">
            {study.reliability}
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground">Results and lessons</h2>
          <ul className="mt-3 space-y-2">
            {study.results.map((item) => (
              <li
                key={item}
                className="flex items-start gap-2 text-[var(--color-text-secondary)]"
              >
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground">Technologies</h2>
          <div className="mt-4 flex flex-wrap gap-2">
            {project.technologies.map((tech) => (
              <span key={tech} className="tag">
                {tech}
              </span>
            ))}
          </div>
        </section>
      </div>
    </article>
  );
}
