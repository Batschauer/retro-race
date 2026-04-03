import { CircuitForm } from "./CircuitForm";

export default function AdminCircuitsPage() {
  return (
    <div>
      <h1 className="display-lg translate-x-0 text-on-surface sm:-translate-x-6">REGISTRO_DE_CIRCUITOS</h1>
      <p className="label-md mb-8 mt-2 text-on-surface-muted">SOMENTE_ADMIN</p>
      <CircuitForm />
    </div>
  );
}
