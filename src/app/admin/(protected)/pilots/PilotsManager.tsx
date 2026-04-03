"use client";

import { useActionState } from "react";
import {
  createPilot,
  deletePilot,
  updatePilot,
  type PilotFormState,
} from "@/app/actions/pilots";
import { PrimaryButton } from "@/components/ui/PrimaryButton";
import { TextField } from "@/components/ui/TextField";
import type { Pilot } from "@/generated/prisma/browser";

const initial: PilotFormState = {};

function PilotRow({ pilot }: { pilot: Pilot }) {
  const [state, formAction] = useActionState(updatePilot, initial);
  return (
    <div className="px-4 py-4">
      <form action={formAction} className="space-y-4">
        <input type="hidden" name="id" value={pilot.id} />
        <TextField
          name="displayName"
          label="NOME_EXIBIDO"
          defaultValue={pilot.displayName}
          required
        />
        <TextField name="team" label="EQUIPE" defaultValue={pilot.team ?? ""} />
        <TextField
          name="avatarUrl"
          label="URL_DO_AVATAR"
          defaultValue={pilot.avatarUrl ?? ""}
          placeholder="https://..."
        />
        {state.error ? (
          <p className="label-md text-error" role="alert">
            {state.error}
          </p>
        ) : null}
        {state.ok ? (
          <p className="label-md text-secondary" role="status">
            SALVO
          </p>
        ) : null}
        <PrimaryButton>ATUALIZAR_PILOTO</PrimaryButton>
      </form>
      <form action={deletePilot} className="mt-4">
        <input type="hidden" name="id" value={pilot.id} />
        <button
          type="submit"
          className="label-md text-error hover:text-primary focus-visible:ghost-outline"
        >
          &gt; EXCLUIR
        </button>
      </form>
    </div>
  );
}

export function PilotsManager({ pilots }: { pilots: Pilot[] }) {
  const [state, formAction] = useActionState(createPilot, initial);

  return (
    <div className="flex flex-col gap-8">
      <section className="bg-surface-container-low px-4 py-6">
        <h2 className="font-display text-xl font-bold text-primary">NOVO_PILOTO</h2>
        <form action={formAction} className="mt-6 space-y-4">
          <TextField name="displayName" label="NOME_EXIBIDO" required />
          <TextField name="team" label="EQUIPE" />
          <TextField name="avatarUrl" label="URL_DO_AVATAR" placeholder="https://..." />
          {state.error ? (
            <p className="label-md text-error" role="alert">
              {state.error}
            </p>
          ) : null}
          {state.ok ? (
            <p className="label-md text-secondary" role="status">
              CRIADO
            </p>
          ) : null}
          <PrimaryButton>ADICIONAR_PILOTO</PrimaryButton>
        </form>
      </section>

      <section>
        <h2 className="font-display text-xl font-bold text-on-surface mb-4">ELENCO</h2>
        {pilots.length === 0 ? (
          <p className="body-lg text-on-surface-muted">Ainda não há pilotos.</p>
        ) : (
          <ul className="flex flex-col gap-4">
            {pilots.map((p, i) => (
              <li
                key={p.id}
                className={
                  i % 2 === 0 ? "bg-surface-container-low" : "bg-surface-container-lowest"
                }
              >
                <PilotRow pilot={p} />
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
