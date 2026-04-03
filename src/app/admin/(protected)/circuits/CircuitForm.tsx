"use client";

import { useActionState } from "react";
import {
  createCircuit,
  type CircuitFormState,
} from "@/app/actions/circuits";
import { PrimaryButton } from "@/components/ui/PrimaryButton";
import { TextField } from "@/components/ui/TextField";
import { Difficulty } from "@/generated/prisma/browser";

const initial: CircuitFormState = {};

const difficulties = [
  Difficulty.EASY,
  Difficulty.PRO,
  Difficulty.INSANE,
] as const;

const difficultyLabel: Record<Difficulty, string> = {
  [Difficulty.EASY]: "Fácil",
  [Difficulty.PRO]: "Pro",
  [Difficulty.INSANE]: "Insano",
};

export function CircuitForm() {
  const [state, formAction] = useActionState(createCircuit, initial);

  return (
    <form
      action={formAction}
      className="bg-surface-container-low px-4 py-6"
    >
      <h2 className="font-display text-xl font-bold text-primary">NOVO_CIRCUITO</h2>
      <div className="mt-6 space-y-4">
        <TextField name="name" label="NOME_DA_PISTA" placeholder="DIGITE_O_NOME" required />
        <TextField name="location" label="LOCAL" placeholder="CIDADE_NEON" required />
        <div className="mb-6">
          <p className="label-md mb-2 text-secondary">DIFICULDADE</p>
          <div className="flex flex-col gap-2">
            {difficulties.map((d) => (
              <label
                key={d}
                className="flex cursor-pointer items-center gap-3 bg-surface-container-lowest px-3 py-3 hover:bg-surface-variant has-[:checked]:bg-surface-container-high"
              >
                <input type="radio" name="difficulty" value={d} required className="accent-secondary" />
                <span className="text-on-surface">{difficultyLabel[d]}</span>
              </label>
            ))}
          </div>
        </div>
        <div className="mb-6">
          <label htmlFor="layout" className="label-md mb-2 block text-secondary">
            IMAGEM_DO_LAYOUT
          </label>
          <div className="border-b-4 border-primary bg-surface-container-lowest px-3 py-4">
            <input
              id="layout"
              name="layout"
              type="file"
              accept="image/png,image/jpeg"
              className="w-full text-sm text-on-surface-muted file:mr-4 file:border-0 file:bg-surface-container-high file:px-3 file:py-2 file:text-on-surface"
            />
            <p className="label-md mt-2 text-on-surface-muted">
              PNG_OU_JPEG · MÁX_5MB
            </p>
          </div>
        </div>
      </div>
      {state.error ? (
        <p className="label-md mb-4 text-error" role="alert">
          {state.error}
        </p>
      ) : null}
      {state.ok ? (
        <p className="label-md mb-4 text-secondary" role="status">
          CIRCUITO_CADASTRADO
        </p>
      ) : null}
      <PrimaryButton>CRIAR_PISTA</PrimaryButton>
    </form>
  );
}
