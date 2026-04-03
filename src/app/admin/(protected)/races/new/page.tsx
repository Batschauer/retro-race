import { RaceEntryForm } from "./RaceEntryForm";
import { getCircuits, getPilots } from "@/lib/queries";

export default async function AdminNewRacePage() {
  const [circuits, pilots] = await Promise.all([getCircuits(), getPilots()]);
  return (
    <div>
      <h1 className="display-lg translate-x-0 text-on-surface sm:-translate-x-6">LANÇAR_RESULTADOS</h1>
      <p className="label-md mb-8 mt-2 text-secondary">PESSOAL_AUTORIZADO</p>
      <RaceEntryForm circuits={circuits} pilots={pilots} />
    </div>
  );
}
