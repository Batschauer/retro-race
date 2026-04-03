"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { getPrismaClient } from "@/lib/prisma";

const pilotSchema = z.object({
  displayName: z
    .string()
    .min(1, "Informe o nome exibido.")
    .max(120, "Nome exibido: no máximo 120 caracteres."),
  team: z.string().max(120, "Equipe: no máximo 120 caracteres.").optional(),
  avatarUrl: z
    .string()
    .max(2048)
    .optional()
    .transform((s) => (s && s.trim() !== "" ? s.trim() : undefined))
    .refine((s) => s === undefined || /^https?:\/\//i.test(s), {
      message: "O avatar precisa ser uma URL http(s) válida.",
    }),
});

export type PilotFormState = { error?: string; ok?: boolean };

export async function createPilot(
  _prev: PilotFormState,
  formData: FormData,
): Promise<PilotFormState> {
  const parsed = pilotSchema.safeParse({
    displayName: formData.get("displayName"),
    team: formData.get("team") || undefined,
    avatarUrl: formData.get("avatarUrl") || undefined,
  });
  if (!parsed.success) {
    const msg =
      parsed.error.flatten().fieldErrors.displayName?.[0] ??
      parsed.error.flatten().fieldErrors.avatarUrl?.[0] ??
      "Dados inválidos.";
    return { error: msg };
  }
  const prisma = getPrismaClient();
  await prisma.pilot.create({
    data: {
      displayName: parsed.data.displayName,
      team: parsed.data.team || null,
      avatarUrl: parsed.data.avatarUrl || null,
    },
  });
  revalidatePath("/admin/pilots");
  revalidatePath("/leaderboard");
  revalidatePath("/");
  return { ok: true };
}

export async function updatePilot(
  _prev: PilotFormState,
  formData: FormData,
): Promise<PilotFormState> {
  const id = formData.get("id");
  if (typeof id !== "string" || !id) {
    return { error: "ID do piloto ausente." };
  }
  const parsed = pilotSchema.safeParse({
    displayName: formData.get("displayName"),
    team: formData.get("team") || undefined,
    avatarUrl: formData.get("avatarUrl") || undefined,
  });
  if (!parsed.success) {
    const msg =
      parsed.error.flatten().fieldErrors.displayName?.[0] ??
      parsed.error.flatten().fieldErrors.avatarUrl?.[0] ??
      "Dados inválidos.";
    return { error: msg };
  }
  const prisma = getPrismaClient();
  await prisma.pilot.update({
    where: { id },
    data: {
      displayName: parsed.data.displayName,
      team: parsed.data.team || null,
      avatarUrl: parsed.data.avatarUrl || null,
    },
  });
  revalidatePath("/admin/pilots");
  revalidatePath("/leaderboard");
  revalidatePath("/");
  return { ok: true };
}

export async function deletePilot(formData: FormData) {
  const id = formData.get("id");
  if (typeof id !== "string" || !id) return;
  const prisma = getPrismaClient();
  await prisma.pilot.delete({ where: { id } });
  revalidatePath("/admin/pilots");
  revalidatePath("/leaderboard");
  revalidatePath("/");
}
