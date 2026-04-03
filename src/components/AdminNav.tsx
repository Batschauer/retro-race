"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { adminLogout } from "@/app/actions/admin-auth";

const links = [
  { href: "/admin", label: "PAINEL" },
  { href: "/admin/pilots", label: "PILOTOS" },
  { href: "/admin/circuits", label: "PISTAS" },
  { href: "/admin/races/new", label: "LANÇAR" },
  { href: "/admin/invites", label: "CONVITES" },
] as const;

function linkIsActive(href: string, pathname: string): boolean {
  if (href === "/admin") return pathname === "/admin";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function AdminNav() {
  const pathname = usePathname();

  return (
    <header className="bg-surface-container-low px-4 pb-4 pt-[max(1rem,env(safe-area-inset-top,0px))]">
      <div className="mx-auto flex max-w-2xl flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <nav className="flex flex-wrap gap-3" aria-label="Administração">
          {links.map((l) => {
            const active = linkIsActive(l.href, pathname);
            return (
              <Link
                key={l.href}
                href={l.href}
                aria-current={active ? "page" : undefined}
                className={`label-md px-1 focus-visible:ghost-outline ${
                  active
                    ? "text-secondary"
                    : "text-tertiary hover:text-secondary"
                }`}
              >
                &gt; {l.label}
              </Link>
            );
          })}
        </nav>
        <form action={adminLogout}>
          <button
            type="submit"
            className="label-md text-on-surface-muted hover:text-error focus-visible:ghost-outline"
          >
            &gt; SAIR
          </button>
        </form>
      </div>
    </header>
  );
}
