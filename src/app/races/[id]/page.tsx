import Link from "next/link";
import { notFound } from "next/navigation";
import { formatDurationMs, formatLapMs } from "@/lib/lap";
import { getRaceById } from "@/lib/queries";

type Props = { params: Promise<{ id: string }> };

function ResultExtraStats({
  averageSpeedKmh,
  totalLaps,
  totalTimeMs,
  gapToLeaderMs,
  gapToLeaderLaps,
  position,
}: {
  averageSpeedKmh: number | null;
  totalLaps: number | null;
  totalTimeMs: number | null;
  gapToLeaderMs: number | null;
  gapToLeaderLaps: number | null;
  position: number;
}) {
  const parts: string[] = [];
  if (averageSpeedKmh != null) {
    parts.push(`média ${Number(averageSpeedKmh).toFixed(1)} km/h`);
  }
  if (totalLaps != null) {
    parts.push(`${totalLaps} voltas`);
  }
  if (totalTimeMs != null) {
    parts.push(`tempo total ${formatDurationMs(totalTimeMs)}`);
  }
  if (gapToLeaderLaps != null && gapToLeaderLaps > 0) {
    parts.push(`atraso ao líder +${gapToLeaderLaps} volta(s)`);
  } else if (gapToLeaderMs != null && gapToLeaderMs > 0) {
    parts.push(`atraso ao líder +${formatDurationMs(gapToLeaderMs)}`);
  } else if (position === 1) {
    parts.push("atraso ao líder —");
  }

  if (parts.length === 0) return null;

  return (
    <p className="mt-2 text-xs leading-relaxed text-on-surface-muted">{parts.join(" · ")}</p>
  );
}

export default async function RaceDetailPage({ params }: Props) {
  const { id } = await params;
  const race = await getRaceById(id);
  if (!race) notFound();

  return (
    <div className="mx-auto w-full min-w-0 max-w-lg">
      <Link
        href="/"
        className="label-md mb-4 inline-block text-tertiary hover:text-secondary focus-visible:ghost-outline"
      >
        &gt; VOLTAR_AOS_RESULTADOS
      </Link>
      <h1 className="display-lg translate-x-0 text-balance text-on-surface sm:-translate-x-6">
        {race.label}
      </h1>
      <p className="label-md mt-2 text-on-surface-muted">
        {race.circuit.name} ·{" "}
        {new Intl.DateTimeFormat("pt-BR", {
          dateStyle: "full",
          timeStyle: "short",
        }).format(race.heldAt)}
      </p>

      <div className="mt-8 hidden bg-surface-container-low px-3 py-2 sm:block">
        <div className="grid grid-cols-[2.5rem_1fr_4rem_5.5rem] gap-2 label-md text-on-surface-muted">
          <span>POS</span>
          <span>PILOTO</span>
          <span>CLAS</span>
          <span>VOLTA</span>
        </div>
      </div>

      <ul className="mt-0 flex flex-col gap-4">
        {race.results.map((r, i) => {
          const rowBg =
            i % 2 === 0 ? "bg-surface-container-lowest" : "bg-surface-container-low";
          const rank =
            r.position === 1 ? "S" : r.position <= 3 ? "A" : r.position <= 6 ? "B" : "C";
          const rankColor =
            r.position === 1
              ? "text-primary-container"
              : r.position <= 3
                ? "text-secondary"
                : "text-on-surface-muted";
          return (
            <li
              key={r.id}
              className={`${rowBg} px-3 py-3 ${r.position === 1 ? "shadow-[4px_4px_0_rgba(255,231,146,0.35)]" : ""}`}
            >
              <div className="flex flex-col gap-2 sm:hidden">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <span className="font-display text-xl font-bold tabular-nums text-on-surface">
                    {String(r.position).padStart(2, "0")}
                  </span>
                  <span className={`text-[0.65rem] font-semibold uppercase tracking-[0.08em] ${rankColor}`}>
                    CLASSE_{rank}
                  </span>
                  <span className="font-mono text-sm text-on-surface">{formatLapMs(r.bestLapMs)}</span>
                </div>
                <div className="min-w-0">
                  <p className="break-words font-semibold text-on-surface">{r.pilot.displayName}</p>
                  {r.pilot.team ? (
                    <p className="text-xs text-on-surface-muted">{r.pilot.team}</p>
                  ) : null}
                  <ResultExtraStats
                    averageSpeedKmh={r.averageSpeedKmh}
                    totalLaps={r.totalLaps}
                    totalTimeMs={r.totalTimeMs}
                    gapToLeaderMs={r.gapToLeaderMs}
                    gapToLeaderLaps={r.gapToLeaderLaps}
                    position={r.position}
                  />
                </div>
              </div>
              <div className="hidden sm:block">
                <div className="grid grid-cols-[2.5rem_1fr_4rem_5.5rem] items-center gap-2">
                  <span className="font-display text-lg font-bold text-on-surface">
                    {String(r.position).padStart(2, "0")}
                  </span>
                  <div className="min-w-0">
                    <p className="break-words font-semibold text-on-surface">{r.pilot.displayName}</p>
                    {r.pilot.team ? (
                      <p className="text-xs text-on-surface-muted">{r.pilot.team}</p>
                    ) : null}
                  </div>
                  <span className={`label-md ${rankColor}`}>CLASSE_{rank}</span>
                  <span className="font-mono text-sm text-on-surface tabular-nums">
                    {formatLapMs(r.bestLapMs)}
                  </span>
                </div>
                <div className="pt-2">
                  <ResultExtraStats
                    averageSpeedKmh={r.averageSpeedKmh}
                    totalLaps={r.totalLaps}
                    totalTimeMs={r.totalTimeMs}
                    gapToLeaderMs={r.gapToLeaderMs}
                    gapToLeaderLaps={r.gapToLeaderLaps}
                    position={r.position}
                  />
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
