import { RaceFeed } from "@/components/RaceFeed";
import { getRecentRaces } from "@/lib/queries";

export default async function HomePage() {
  const races = await getRecentRaces();
  return (
    <div className="mx-auto w-full min-w-0 max-w-lg">
      <h1 className="display-lg translate-x-0 text-balance text-on-surface sm:-translate-x-6">
        RESULTADOS
      </h1>
      <p className="label-md mb-6 mt-2 text-on-surface-muted">
        HISTÓRICO · TODAS_AS_SESSÕES
      </p>
      <RaceFeed races={races} />
    </div>
  );
}
