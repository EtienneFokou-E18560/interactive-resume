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
    <section className="relative px-4 py-12 sm:px-6 sm:py-20 lg:py-24">
      <div className="relative mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-[1fr_auto] lg:gap-12">
        <div className="order-2 lg:order-1">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="eyebrow mb-4 flex items-center gap-2"
          >
            <MapPin className="h-3.5 w-3.5" />
            {profile.location}
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.05 }}
            className="max-w-2xl text-[clamp(2rem,5vw,3.5rem)] font-bold leading-[1.05] tracking-[-0.04em] text-foreground"
          >
            {profile.headline}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="mt-3 text-lg font-medium text-[var(--color-text-secondary)] sm:text-xl"
          >
            {profile.name}
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.15 }}
            className="reading-width mt-4 text-base leading-relaxed text-[var(--color-text-secondary)] sm:text-lg"
          >
            {profile.summaryHero}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="button-row mt-8"
          >
            <Link href="/projects" className="button button-primary">
              {t.hero.projects}
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link href="/resume/download" className="button button-secondary">
              <Download className="h-4 w-4" />
              {t.hero.download}
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.25 }}
            className="mt-6 flex flex-wrap items-center gap-4"
          >
            <Link
              href={profile.portfolio}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-[var(--color-text-muted)] transition-colors hover:text-accent"
            >
              <Layers className="h-5 w-5" />
              {t.hero.portfolio}
            </Link>
            <Link
              href={profile.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--color-text-muted)] transition-colors hover:text-accent"
              aria-label="GitHub"
            >
              <FaGithub className="h-5 w-5" />
            </Link>
            <Link
              href={profile.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--color-text-muted)] transition-colors hover:text-accent"
              aria-label="LinkedIn"
            >
              <FaLinkedin className="h-5 w-5" />
            </Link>
            <a
              href={`mailto:${profile.email}`}
              className="inline-flex items-center gap-2 text-sm text-[var(--color-text-muted)] transition-colors hover:text-accent"
              aria-label={`Email ${profile.email}`}
            >
              <Mail className="h-4 w-4" />
              <span className="hidden truncate sm:inline">{profile.email}</span>
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.3 }}
            className="mt-8 w-full max-w-2xl lg:hidden"
          >
            <StatsGrid />
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
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
