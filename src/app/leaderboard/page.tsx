import Link from "next/link";
import { getLeaderboard } from "@/lib/queries";

export default async function LeaderboardPage() {
  const rows = await getLeaderboard();

  return (
    <div className="mx-auto w-full min-w-0 max-w-lg">
      <Link
        href="/"
        className="label-md mb-4 inline-block text-tertiary hover:text-secondary focus-visible:ghost-outline"
      >
        &gt; VOLTAR_AOS_RESULTADOS
      </Link>
      <h1 className="display-lg translate-x-0 text-on-surface sm:-translate-x-6">CLASSIFICAÇÃO</h1>
      <p className="label-md mb-6 mt-2 text-on-surface-muted">VITÓRIAS_POR_PILOTO</p>
      {rows.length === 0 ? (
        <section className="bg-surface-container-low px-4 py-8">
          <p className="body-lg text-on-surface-muted">Ainda não há resultados.</p>
        </section>
      ) : (
        <ul className="flex flex-col gap-4">
          {rows.map((row, i) => {
            const bg =
              i % 2 === 0 ? "bg-surface-container-low" : "bg-surface-container-lowest";
            return (
              <li
                key={row.pilot.id}
                className={`${bg} flex items-center justify-between px-4 py-4`}
              >
                <div>
                  <p className="label-md text-primary-dim">#{i + 1}</p>
                  <p className="font-display text-lg font-bold text-on-surface">
                    {row.pilot.displayName}
                  </p>
                  {row.pilot.team ? (
                    <p className="text-sm text-on-surface-muted">{row.pilot.team}</p>
                  ) : null}
                </div>
                <div className="text-right">
                  <p className="label-md text-secondary">VITÓRIAS</p>
                  <p className="font-display text-2xl font-bold text-secondary">{row.wins}</p>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
