import Link from "next/link";

const cards = [
  { href: "/admin/pilots", title: "MANIFESTO_DE_PILOTOS", desc: "Criar e editar pilotos." },
  { href: "/admin/circuits", title: "CIRCUITOS", desc: "Cadastrar pistas e arte do layout." },
  { href: "/admin/races/new", title: "LANÇAR_RESULTADOS", desc: "Publicar posições e tempos de volta." },
  { href: "/admin/invites", title: "LINKS_DE_CONVITE", desc: "Em breve." },
] as const;

export default function AdminDashboardPage() {
  return (
    <div>
      <h1 className="display-lg translate-x-0 text-on-surface sm:-translate-x-6">SALA_DE_COMANDO</h1>
      <p className="label-md mb-8 mt-2 text-on-surface-muted">SESSÃO_ATIVA</p>
      <ul className="flex flex-col gap-4">
        {cards.map((c, i) => (
          <li
            key={c.href}
            className={
              i % 2 === 0 ? "bg-surface-container-low" : "bg-surface-container-lowest"
            }
          >
            <Link
              href={c.href}
              className="block px-4 py-6 transition-colors hover:bg-surface-container-high focus-visible:ghost-outline"
            >
              <h2 className="font-display text-xl font-bold text-primary">{c.title}</h2>
              <p className="mt-2 body-lg text-on-surface-muted">{c.desc}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
