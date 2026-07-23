import type { Metadata } from "next";
import { profile } from "@/data/profile";

export const metadata: Metadata = {
  title: "About",
  description: `About ${profile.name} — ${profile.title}`,
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6">
      <h1 className="text-3xl font-bold">About Me</h1>
      <p className="mt-6 text-lg leading-relaxed text-zinc-600 dark:text-zinc-400">
        {profile.summary}
      </p>

      <h2 className="mt-12 text-xl font-semibold">Career Highlights</h2>
      <ul className="mt-4 space-y-3">
        {profile.highlights.map((item) => (
          <li
            key={item}
            className="flex items-start gap-3 text-zinc-600 dark:text-zinc-400"
          >
            <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-blue-500" />
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
