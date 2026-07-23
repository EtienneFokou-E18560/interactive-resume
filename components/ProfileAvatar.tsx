import Image from "next/image";
import { profile } from "@/data/profile";

export default function ProfileAvatar({ size = 160 }: { size?: number }) {
  return (
    <div
      className="relative shrink-0 overflow-hidden rounded-full border-4 border-white shadow-xl ring-4 ring-blue-100 dark:border-zinc-800 dark:ring-blue-950"
      style={{ width: size, height: size }}
    >
      <Image
        src={profile.avatar}
        alt={profile.name}
        fill
        className="object-cover"
        priority
        sizes={`${size}px`}
      />
    </div>
  );
}
