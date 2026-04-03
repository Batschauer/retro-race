"use client";

import { useActionState } from "react";
import {
  adminLogin,
  type AuthState,
} from "@/app/actions/admin-auth";
import { PrimaryButton } from "@/components/ui/PrimaryButton";
import { TextField } from "@/components/ui/TextField";

const initial: AuthState = {};

export function LoginForm() {
  const [state, formAction] = useActionState(adminLogin, initial);

  return (
    <form action={formAction} className="mx-auto min-w-0 max-w-md px-3 py-12 min-[400px]:px-4 min-[400px]:py-16">
      <h1 className="display-lg translate-x-0 text-on-surface sm:-translate-x-6">PORTAL_ADMIN</h1>
      <p className="label-md mb-8 mt-2 text-secondary">APENAS_PESSOAL_AUTORIZADO</p>
      <TextField
        name="password"
        label="SENHA"
        type="password"
        required
        error={!!state.error}
      />
      {state.error ? (
        <p className="label-md mb-4 text-error" role="alert">
          {state.error}
        </p>
      ) : null}
      <PrimaryButton>ACESSAR_CONSOLE</PrimaryButton>
    </form>
  );
}
