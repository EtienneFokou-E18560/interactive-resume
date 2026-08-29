/**
 * Framer Motion props that no-op when the user prefers reduced motion.
 */
export function fadeUpProps(reduce: boolean | null, delay = 0) {
  if (reduce) {
    return {
      initial: false as const,
      animate: { opacity: 1, y: 0 },
      transition: { duration: 0 },
    };
  }

  return {
    initial: { opacity: 0.35, y: 12 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.3, delay, ease: "easeOut" as const },
  };
}
