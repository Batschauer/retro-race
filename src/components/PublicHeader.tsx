import Link from "next/link";

export function PublicHeader() {
  return (
    <header className="hud-glass sticky top-0 z-20 px-3 pt-[max(0.75rem,env(safe-area-inset-top,0px))] pb-3 min-[400px]:px-4">
      <div className="mx-auto flex min-w-0 max-w-lg items-center justify-between gap-2">
        <div className="flex min-w-0 items-center gap-1.5 sm:gap-2">
          <span className="shrink-0 text-xs font-semibold tracking-[0.1em] text-tertiary sm:label-md" aria-hidden>
            ◆
          </span>
          <span className="font-display truncate text-base font-bold tracking-tight text-primary sm:text-lg">
            CRENTE_RACE
          </span>
        </div>
        <div className="flex shrink-0 items-center gap-2 sm:gap-3">
          <Link
            href="/regulamento"
            className="text-[0.65rem] font-semibold uppercase tracking-[0.08em] text-tertiary hover:text-secondary focus-visible:ghost-outline px-1 py-1 sm:label-md"
          >
            &gt; REGULAMENTO
          </Link>
          <Link
            href="/admin/login"
            className="text-[0.65rem] font-semibold uppercase tracking-[0.08em] text-tertiary hover:text-secondary focus-visible:ghost-outline px-1 py-1 sm:label-md"
          >
            &gt; ÁREA_ADMIN
          </Link>
        </div>
      </div>
    </header>
  );
}
