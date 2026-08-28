"use client";

import { useState } from "react";
import Link from "next/link";
import { Download, ArrowRight, Loader2 } from "lucide-react";
import PageLayout from "@/components/PageLayout";
import {
  defaultResumeVariantId,
  resumeVariants,
} from "@/data/resumeVariants";
import { useLanguage } from "@/hooks/useLanguage";

export default function ResumeDownloadContent() {
  const { t } = useLanguage();
  const [selectedRole, setSelectedRole] = useState(defaultResumeVariantId);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const selected = resumeVariants.find((v) => v.id === selectedRole);

  async function handleDownload() {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`/api/resume?role=${encodeURIComponent(selectedRole)}`);

      if (!response.ok) {
        throw new Error("Download failed");
      }

      const blob = await response.blob();
      const disposition = response.headers.get("Content-Disposition");
      const match = disposition?.match(/filename="(.+)"/);
      const filename = match?.[1] ?? `Etienne-Fokou-${selectedRole}.pdf`;

      const url = URL.createObjectURL(blob);
      const anchor = document.createElement("a");
      anchor.href = url;
      anchor.download = filename;
      anchor.click();
      URL.revokeObjectURL(url);
    } catch {
      setError(t.resumeDownload.error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <PageLayout
      title={t.resumeDownload.title}
      description={t.resumeDownload.description}
    >
      <div className="max-w-2xl space-y-8">
        <fieldset>
          <legend className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">
            {t.resumeDownload.roleLabel}
          </legend>
          <div className="mt-4 space-y-3">
            {resumeVariants.map((variant) => (
              <label
                key={variant.id}
                className={`flex cursor-pointer gap-3 rounded-xl border p-4 transition-colors ${
                  selectedRole === variant.id
                    ? "border-blue-500 bg-blue-50/50 dark:border-blue-400 dark:bg-blue-950/30"
                    : "border-zinc-200 bg-white hover:border-zinc-300 dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-zinc-700"
                }`}
              >
                <input
                  type="radio"
                  name="resume-role"
                  value={variant.id}
                  checked={selectedRole === variant.id}
                  onChange={() => setSelectedRole(variant.id)}
                  className="mt-1 h-4 w-4 shrink-0 accent-blue-600"
                />
                <span className="min-w-0">
                  <span className="block font-medium text-zinc-900 dark:text-zinc-50">
                    {variant.label}
                  </span>
                  <span className="mt-1 block text-sm text-zinc-600 dark:text-zinc-400">
                    {variant.description}
                  </span>
                </span>
              </label>
            ))}
          </div>
        </fieldset>

        {selected && (
          <div className="rounded-xl border border-zinc-200 bg-zinc-50 p-5 dark:border-zinc-800 dark:bg-zinc-900/50">
            <p className="text-xs font-medium uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
              {t.resumeDownload.previewTitle}
            </p>
            <p className="mt-2 font-semibold text-zinc-900 dark:text-zinc-50">
              {selected.targetTitle}
            </p>
            <p className="mt-2 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
              {selected.summary}
            </p>
          </div>
        )}

        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          {t.resumeDownload.formatNote}
        </p>

        {error && (
          <p className="text-sm text-red-600 dark:text-red-400" role="alert">
            {error}
          </p>
        )}

        <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <button
            type="button"
            onClick={handleDownload}
            disabled={loading}
            className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-zinc-900 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-zinc-700 disabled:opacity-60 sm:w-auto dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-200"
          >
            {loading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Download className="h-4 w-4" />
            )}
            {loading ? t.resumeDownload.generating : t.resumeDownload.generate}
          </button>
          <Link
            href="/experience"
            className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-zinc-300 px-6 py-3 text-sm font-medium text-zinc-900 transition-colors hover:bg-zinc-50 sm:w-auto dark:border-zinc-700 dark:text-zinc-50 dark:hover:bg-zinc-900"
          >
            {t.resumeDownload.viewExperience}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </PageLayout>
  );
}
