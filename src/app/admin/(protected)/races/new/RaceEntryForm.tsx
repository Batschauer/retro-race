"use client";

import { useActionState } from "react";
import {
  createRaceWithResults,
  type RaceFormState,
} from "@/app/actions/races";
import { PrimaryButton } from "@/components/ui/PrimaryButton";
import { TextField } from "@/components/ui/TextField";
import type { Circuit, Pilot } from "@/generated/prisma/browser";

const initial: RaceFormState = {};

export function RaceEntryForm({
  circuits,
  pilots,
}: {
  circuits: Circuit[];
  pilots: Pilot[];
}) {
  const [state, formAction] = useActionState(createRaceWithResults, initial);

  if (circuits.length === 0 || pilots.length === 0) {
    return (
      <p className="body-lg text-error">
        Cadastre pelo menos um circuito e um piloto antes de lançar resultados.
      </p>
    );
  }

  return (
    <form action={formAction} className="space-y-8">
      <section className="bg-surface-container-low px-4 py-6">
        <h2 className="font-display text-xl font-bold text-primary">SESSÃO</h2>
        <div className="mt-4 space-y-4">
          <div className="mb-6">
            <label htmlFor="circuitId" className="label-md mb-2 block text-secondary">
              CIRCUITO
            </label>
            <select
              id="circuitId"
              name="circuitId"
              required
              className="input-bottom bg-surface-container-lowest"
            >
              {circuits.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>
          <TextField name="label" label="NOME_DA_SESSÃO" required placeholder="COPA_NEON_04" />
          <div className="mb-6">
            <label htmlFor="heldAt" className="label-md mb-2 block text-secondary">
              DATA_E_HORA
            </label>
            <input
              id="heldAt"
              name="heldAt"
              type="datetime-local"
              required
              className="input-bottom focus:input-bottom-focus"
            />
          </div>
        </div>
      </section>

      <section>
        <h2 className="font-display text-xl font-bold text-on-surface mb-4">LINHAS_POR_PILOTO</h2>
        <p className="label-md mb-4 text-on-surface-muted">
          POSIÇÃO_VAZIA_IGNORA_LINHA · MELHOR_VOLTA M:SS:mmm · TEMPO_TOTAL M:SS:mmm ou H:MM:SS:mmm ·
          ATRASO_AO_LÍDER: tempo M:SS:mmm OU voltas (não os dois)
        </p>
        <ul className="flex flex-col gap-4">
          {pilots.map((p, i) => (
            <li
              key={p.id}
              className={
                i % 2 === 0 ? "bg-surface-container-low" : "bg-surface-container-lowest"
              }
            >
              <div className="px-4 py-4">
                <p className="font-display text-lg font-bold text-on-surface">{p.displayName}</p>
                {p.team ? (
                  <p className="text-sm text-on-surface-muted">{p.team}</p>
                ) : null}
                <div className="mt-4 grid grid-cols-1 gap-4 min-[480px]:grid-cols-2">
                  <div>
                    <label className="label-md mb-1 block text-secondary" htmlFor={`pos-${p.id}`}>
                      POSIÇÃO
                    </label>
                    <input
                      id={`pos-${p.id}`}
                      name={`position_${p.id}`}
                      type="number"
                      min={1}
                      className="input-bottom focus:input-bottom-focus"
                    />
                  </div>
                  <div>
                    <label className="label-md mb-1 block text-secondary" htmlFor={`lap-${p.id}`}>
                      MELHOR_VOLTA
                    </label>
                    <input
                      id={`lap-${p.id}`}
                      name={`lap_${p.id}`}
                      type="text"
                      placeholder="1:23:045"
                      className="input-bottom font-mono focus:input-bottom-focus"
                    />
                  </div>
                  <div>
                    <label className="label-md mb-1 block text-secondary" htmlFor={`avg-${p.id}`}>
                      VEL_MÉDIA_KMH
                    </label>
                    <input
                      id={`avg-${p.id}`}
                      name={`avgSpeed_${p.id}`}
                      type="text"
                      inputMode="decimal"
                      placeholder="142,5"
                      className="input-bottom focus:input-bottom-focus"
                    />
                  </div>
                  <div>
                    <label className="label-md mb-1 block text-secondary" htmlFor={`laps-${p.id}`}>
                      TOTAL_DE_VOLTAS
                    </label>
                    <input
                      id={`laps-${p.id}`}
                      name={`totalLaps_${p.id}`}
                      type="number"
                      min={0}
                      placeholder="12"
                      className="input-bottom focus:input-bottom-focus"
                    />
                  </div>
                  <div className="min-[480px]:col-span-2">
                    <label className="label-md mb-1 block text-secondary" htmlFor={`tt-${p.id}`}>
                      TEMPO_TOTAL
                    </label>
                    <input
                      id={`tt-${p.id}`}
                      name={`totalTime_${p.id}`}
                      type="text"
                      placeholder="15:04:230 ou 1:05:23:045"
                      className="input-bottom font-mono focus:input-bottom-focus"
                    />
                  </div>
                  <div>
                    <label className="label-md mb-1 block text-secondary" htmlFor={`gt-${p.id}`}>
                      ATRASO_AO_LÍDER_TEMPO
                    </label>
                    <input
                      id={`gt-${p.id}`}
                      name={`gapTime_${p.id}`}
                      type="text"
                      placeholder="0:01:234"
                      className="input-bottom font-mono focus:input-bottom-focus"
                    />
                  </div>
                  <div>
                    <label className="label-md mb-1 block text-secondary" htmlFor={`gl-${p.id}`}>
                      ATRASO_AO_LÍDER_VOLTAS
                    </label>
                    <input
                      id={`gl-${p.id}`}
                      name={`gapLaps_${p.id}`}
                      type="number"
                      min={0}
                      placeholder="voltas atrás do P1"
                      className="input-bottom focus:input-bottom-focus"
                    />
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </section>

      {state.error ? (
        <p className="label-md text-error" role="alert">
          {state.error}
        </p>
      ) : null}
      {state.ok ? (
        <p className="label-md text-secondary" role="status">
          RESULTADOS_PUBLICADOS
        </p>
      ) : null}

      <PrimaryButton>PUBLICAR_RESULTADOS</PrimaryButton>
    </form>
  );
}
