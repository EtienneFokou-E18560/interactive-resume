import Hero from "@/components/Hero";
import SkillChart from "@/components/SkillChart";
import ProjectCard from "@/components/ProjectCard";
import ExperienceCard from "@/components/ExperienceCard";
import ArchitectureDiagram from "@/components/ArchitectureDiagram";
import Terminal from "@/components/Terminal";
import { projects } from "@/data/projects";
import { experience } from "@/data/experience";
import { certifications } from "@/data/certifications";
import { profile } from "@/data/profile";
import Link from "next/link";

export default function HomePage() {
  return (
    <>
      <Hero />

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <h2 className="mb-8 text-2xl font-bold">About</h2>
        <p className="max-w-3xl text-lg text-zinc-600 dark:text-zinc-400">
          {profile.summary}
        </p>
        <ul className="mt-6 grid gap-3 sm:grid-cols-2">
          {profile.highlights.map((item) => (
            <li
              key={item}
              className="rounded-lg border border-zinc-200 px-4 py-3 text-sm dark:border-zinc-800"
            >
              {item}
            </li>
          ))}
        </ul>
      </section>

      <section className="bg-zinc-50 px-4 py-16 dark:bg-zinc-900/50 sm:px-6">
        <div className="mx-auto max-w-6xl">
          <div className="mb-8 flex items-center justify-between">
            <h2 className="text-2xl font-bold">Skills</h2>
            <Link href="/skills" className="text-sm text-blue-600 hover:underline">
              View all →
            </Link>
          </div>
          <SkillChart />
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="mb-8 flex items-center justify-between">
          <h2 className="text-2xl font-bold">Experience</h2>
          <Link href="/experience" className="text-sm text-blue-600 hover:underline">
            View all →
          </Link>
        </div>
        <div className="space-y-4">
          {experience.slice(0, 2).map((item) => (
            <ExperienceCard key={item.company} item={item} />
          ))}
        </div>
      </section>

      <section className="bg-zinc-50 px-4 py-16 dark:bg-zinc-900/50 sm:px-6">
        <div className="mx-auto max-w-6xl">
          <div className="mb-8 flex items-center justify-between">
            <h2 className="text-2xl font-bold">Projects</h2>
            <Link href="/projects" className="text-sm text-blue-600 hover:underline">
              View all →
            </Link>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {projects.slice(0, 3).map((project) => (
              <ProjectCard key={project.title} project={project} />
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <h2 className="mb-8 text-center text-2xl font-bold">Architecture</h2>
        <ArchitectureDiagram />
      </section>

      <section className="bg-zinc-50 px-4 py-16 dark:bg-zinc-900/50 sm:px-6">
        <div className="mx-auto max-w-6xl">
          <h2 className="mb-8 text-2xl font-bold">Certifications</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {certifications.map((cert) => (
              <div
                key={cert.name}
                className="rounded-xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900"
              >
                <h3 className="font-semibold">{cert.name}</h3>
                <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
                  {cert.issuer} · {cert.year}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <h2 className="mb-8 text-2xl font-bold">Terminal Mode</h2>
        <Terminal />
      </section>
    </>
  );
}
