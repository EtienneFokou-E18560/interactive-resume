"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Download, ArrowRight, Mail, MapPin, Layers } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import ProfileAvatar from "@/components/ProfileAvatar";
import StatsGrid from "@/components/StatsGrid";
import { profile } from "@/data/profile";
import { useLanguage } from "@/hooks/useLanguage";

export default function Hero() {
  const { t } = useLanguage();

  return (
    <section className="relative overflow-hidden px-4 py-12 sm:px-6 sm:py-20 lg:py-24">
      <div className="pointer-events-none absolute inset-0 bg-radial-[at_50%_0%] from-blue-100/50 via-transparent to-transparent dark:from-blue-950/40" />
      <div className="pointer-events-none absolute -right-24 top-0 h-72 w-72 rounded-full bg-violet-200/30 blur-3xl dark:bg-violet-900/20" />
      <div className="pointer-events-none absolute -left-24 bottom-0 h-72 w-72 rounded-full bg-blue-200/30 blur-3xl dark:bg-blue-900/20" />

      <div className="relative mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-[1fr_auto] lg:gap-12">
        <div className="order-2 lg:order-1">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-4 flex items-center gap-2 text-sm font-medium uppercase tracking-widest text-blue-600 dark:text-blue-400"
          >
            <MapPin className="h-4 w-4" />
            {profile.location}
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="max-w-2xl text-3xl font-bold leading-tight tracking-tight text-zinc-900 sm:text-4xl lg:text-5xl dark:text-zinc-50"
          >
            {profile.headline}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-3 text-lg font-medium text-zinc-700 sm:text-xl dark:text-zinc-300"
          >
            {profile.name}
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-4 max-w-2xl text-base leading-relaxed text-zinc-600 sm:text-lg dark:text-zinc-400"
          >
            {profile.summaryHero}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap"
          >
            <Link
              href="/projects"
              className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-full bg-zinc-900 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-zinc-700 sm:w-auto dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-200"
            >
              {t.hero.projects}
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/resume/download"
              className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-full border border-zinc-300 px-6 py-3 text-sm font-medium text-zinc-900 transition-colors hover:bg-zinc-50 sm:w-auto dark:border-zinc-700 dark:text-zinc-50 dark:hover:bg-zinc-900"
            >
              <Download className="h-4 w-4" />
              {t.hero.download}
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.45 }}
            className="mt-6 flex flex-wrap items-center gap-4"
          >
            <Link
              href={profile.portfolio}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-zinc-500 transition-colors hover:text-zinc-900 dark:hover:text-zinc-50"
            >
              <Layers className="h-5 w-5" />
              {t.hero.portfolio}
            </Link>
            <Link
              href={profile.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-zinc-500 transition-colors hover:text-zinc-900 dark:hover:text-zinc-50"
              aria-label="GitHub"
            >
              <FaGithub className="h-6 w-6" />
            </Link>
            <Link
              href={profile.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-zinc-500 transition-colors hover:text-zinc-900 dark:hover:text-zinc-50"
              aria-label="LinkedIn"
            >
              <FaLinkedin className="h-6 w-6" />
            </Link>
            <a
              href={`mailto:${profile.email}`}
              className="inline-flex items-center gap-2 text-sm text-zinc-500 transition-colors hover:text-zinc-900 dark:hover:text-zinc-50"
              aria-label={`Email ${profile.email}`}
            >
              <Mail className="h-4 w-4" />
              <span className="hidden truncate sm:inline">{profile.email}</span>
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="mt-8 w-full max-w-2xl lg:hidden"
          >
            <StatsGrid />
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="order-1 flex flex-col items-center gap-6 lg:order-2 lg:items-end lg:gap-8"
        >
          <div className="hidden sm:block lg:hidden">
            <ProfileAvatar size={160} />
          </div>
          <div className="hidden lg:block">
            <ProfileAvatar size={220} />
          </div>
          <div className="hidden w-full max-w-md lg:block">
            <StatsGrid />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
