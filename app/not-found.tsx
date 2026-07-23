"use client";

import Link from "next/link";
import { useLanguage } from "@/hooks/useLanguage";

export default function NotFound() {
  const { t } = useLanguage();

  return (
    <div className="mx-auto flex max-w-6xl flex-col items-center justify-center px-4 py-24 text-center sm:px-6 sm:py-32">
      <p className="text-sm font-medium uppercase tracking-widest text-blue-600 dark:text-blue-400">
        404
      </p>
      <h1 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
        {t.notFound.title}
      </h1>
      <p className="mt-4 max-w-md text-lg text-zinc-600 dark:text-zinc-400">
        {t.notFound.description}
      </p>
      <Link
        href="/"
        className="mt-8 inline-flex items-center rounded-full bg-zinc-900 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-zinc-700 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-200"
      >
        {t.notFound.backHome}
      </Link>
    </div>
  );
}
