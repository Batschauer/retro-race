"use client";

import { usePathname } from "next/navigation";
import { LeaderFloatButton } from "@/components/LeaderFloatButton";
import { PublicHeader } from "@/components/PublicHeader";

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith("/admin");

  if (isAdmin) {
    return <div className="flex min-h-full flex-col bg-surface">{children}</div>;
  }

  return (
    <div className="flex min-h-full flex-col overflow-x-hidden bg-surface">
      <PublicHeader />
      <main className="relative flex min-w-0 flex-1 flex-col px-3 pb-24 pt-3 min-[400px]:px-4 min-[400px]:pb-28 min-[400px]:pt-4">
        {children}
      </main>
      <LeaderFloatButton />
    </div>
  );
}
