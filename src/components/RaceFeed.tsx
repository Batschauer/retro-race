import Link from "next/link";
import type { RecentRaces } from "@/lib/queries";
import { formatLapMs } from "@/lib/lap";

export function RaceFeed({ races }: { races: RecentRaces }) {
  if (races.length === 0) {
    return (
      <section className="bg-surface-container-low px-4 py-8">
        <p className="body-lg text-on-surface-muted">Nenhuma corrida registrada ainda.</p>
      </section>
    );
  }

  return (
    <ul className="flex flex-col gap-4">
      {races.map((race, i) => {
        const bg =
          i % 2 === 0 ? "bg-surface-container-low" : "bg-surface-container-lowest";
        const top = race.results[0];
        return (
          <li key={race.id} className={bg}>
            <Link
              href={`/races/${race.id}`}
              className="block px-4 py-4 transition-colors hover:bg-surface-container-high focus-visible:ghost-outline"
            >
              <p className="label-md text-secondary">SESSÃO</p>
              <h2 className="font-display text-xl font-bold tracking-tight text-on-surface">
                {race.label}
              </h2>
              <p className="mt-1 text-sm text-on-surface-muted">
                {race.circuit.name} ·{" "}
                {new Intl.DateTimeFormat("pt-BR", {
                  dateStyle: "medium",
                  timeStyle: "short",
                }).format(race.heldAt)}
              </p>
              {top && (
                <p className="label-md mt-3 text-primary-dim">
                  1º {top.pilot.displayName} · melhor volta {formatLapMs(top.bestLapMs)}
                </p>
              )}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
