interface SectionProps {
  title?: string;
  subtitle?: string;
  children: React.ReactNode;
  alt?: boolean;
  centered?: boolean;
  className?: string;
}

export default function Section({
  title,
  subtitle,
  children,
  alt = false,
  centered = false,
  className = "",
}: SectionProps) {
  return (
    <section
      className={`px-4 py-16 sm:px-6 ${alt ? "bg-[var(--color-bg-subtle)]" : ""} ${className}`}
    >
      <div className="mx-auto max-w-6xl">
        {(title || subtitle) && (
          <header
            className={`mb-10 border-b border-[var(--color-border)] pb-6 ${centered ? "text-center" : ""}`}
          >
            {title && (
              <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
                {title}
              </h2>
            )}
            {subtitle && (
              <p className="mx-auto mt-3 max-w-2xl text-lg text-[var(--color-text-secondary)]">
                {subtitle}
              </p>
            )}
          </header>
        )}
        {children}
      </div>
    </section>
  );
}
