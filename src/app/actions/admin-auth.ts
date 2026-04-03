"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { COOKIE_NAME, signAdminToken, timingSafePasswordEqual } from "@/lib/auth";

export type AuthState = { error?: string };

export async function adminLogin(
  _prev: AuthState,
  formData: FormData,
): Promise<AuthState> {
  const password = formData.get("password");
  const expected = process.env.ADMIN_PASSWORD;
  if (typeof password !== "string" || !expected) {
    return { error: "Erro de configuração do servidor." };
  }
  if (!timingSafePasswordEqual(password, expected)) {
    return { error: "Credenciais inválidas." };
  }
  let token: string;
  try {
    token = await signAdminToken();
  } catch {
    return { error: "Servidor mal configurado (segredo de sessão)." };
  }
  const jar = await cookies();
  jar.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });
  redirect("/admin");
}

export async function adminLogout() {
  const jar = await cookies();
  jar.delete(COOKIE_NAME);
  redirect("/admin/login");
}
