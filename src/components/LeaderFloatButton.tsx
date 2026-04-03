"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function LeaderFloatButton() {
  const pathname = usePathname();
  const onLeader = pathname === "/leaderboard";

  if (onLeader) {
    return (
      <span
        className="fixed bottom-5 right-4 z-40 flex min-h-14 min-w-14 cursor-default items-center justify-center px-3 py-3 font-display text-base font-bold tabular-nums text-on-surface bg-surface-container-highest shadow-[4px_4px_0_rgba(37,171,253,0.45)] max-[380px]:bottom-4 max-[380px]:right-3"
        aria-current="page"
        title="Classificação"
      >
        #1
      </span>
    );
  }

  return (
    <Link
      href="/leaderboard"
      className="fixed bottom-5 right-4 z-40 flex min-h-14 min-w-14 items-center justify-center px-3 py-3 font-display text-base font-bold tabular-nums text-on-primary shadow-none transition-shadow hover:shadow-[4px_4px_0_rgba(240,242,245,0.4)] focus-visible:ghost-outline max-[380px]:bottom-4 max-[380px]:right-3"
      style={{
        background: "linear-gradient(45deg, var(--primary), var(--primary-container))",
      }}
      aria-label="Abrir classificação"
    >
      #1
    </Link>
  );
}
