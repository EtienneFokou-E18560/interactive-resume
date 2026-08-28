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
                className={`card flex cursor-pointer gap-3 p-4 transition-colors ${
                  selectedRole === variant.id
                    ? "border-[var(--color-accent)] bg-[var(--color-accent-soft)]"
                    : "hover:border-[var(--color-border-strong)]"
                }`}
              >
                <input
                  type="radio"
                  name="resume-role"
                  value={variant.id}
                  checked={selectedRole === variant.id}
                  onChange={() => setSelectedRole(variant.id)}
                  className="mt-1 h-4 w-4 shrink-0 accent-[var(--color-accent)]"
                />
                <span className="min-w-0">
                  <span className="block font-medium text-foreground">
                    {variant.label}
                  </span>
                  <span className="mt-1 block text-sm text-[var(--color-text-secondary)]">
                    {variant.description}
                  </span>
                </span>
              </label>
            ))}
          </div>
        </fieldset>

        {selected && (
          <div className="card bg-[var(--color-bg-subtle)] p-5">
            <p className="eyebrow mb-0">{t.resumeDownload.previewTitle}</p>
            <p className="mt-2 font-semibold text-foreground">
              {selected.targetTitle}
            </p>
            <p className="mt-2 text-sm leading-relaxed text-[var(--color-text-secondary)]">
              {selected.summary}
            </p>
          </div>
        )}

        <p className="text-sm text-[var(--color-text-muted)]">
          {t.resumeDownload.formatNote}
        </p>

        {error && (
          <p
            className="text-sm"
            style={{ color: "var(--color-danger)" }}
            role="alert"
          >
            {error}
          </p>
        )}

        <div className="button-row">
          <button
            type="button"
            onClick={handleDownload}
            disabled={loading}
            className="button button-primary disabled:opacity-60"
          >
            {loading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Download className="h-4 w-4" />
            )}
            {loading ? t.resumeDownload.generating : t.resumeDownload.generate}
          </button>
          <Link href="/experience" className="button button-secondary">
            {t.resumeDownload.viewExperience}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </PageLayout>
  );
}
