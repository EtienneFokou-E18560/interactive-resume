interface PageLayoutProps {
  title: string;
  description?: string;
  children: React.ReactNode;
}

export default function PageLayout({
  title,
  description,
  children,
}: PageLayoutProps) {
  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
      <header className="max-w-3xl">
        <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-4xl">
          {title}
        </h1>
        {description && (
          <p className="mt-4 text-lg leading-relaxed text-zinc-600 dark:text-zinc-400">
            {description}
          </p>
        )}
      </header>
      <div className="mt-12">{children}</div>
    </div>
  );
}
