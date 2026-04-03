import { PilotsManager } from "./PilotsManager";
import { getPilots } from "@/lib/queries";

export default async function AdminPilotsPage() {
  const pilots = await getPilots();
  return (
    <div>
      <h1 className="display-lg translate-x-0 text-on-surface sm:-translate-x-6">MANIFESTO_DE_PILOTOS</h1>
      <p className="label-md mb-8 mt-2 text-secondary">SINCRONIZAÇÃO_AO_VIVO</p>
      <PilotsManager pilots={pilots} />
    </div>
  );
}
