"use server";

import crypto from "node:crypto";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { getPrismaClient } from "@/lib/prisma";
import { Difficulty } from "@/generated/prisma/client";

const MAX_BYTES = 5 * 1024 * 1024;

const circuitSchema = z.object({
  name: z
    .string()
    .min(1, "Informe o nome da pista.")
    .max(200, "Nome: no máximo 200 caracteres."),
  location: z
    .string()
    .min(1, "Informe o local.")
    .max(120, "Local: no máximo 120 caracteres."),
  difficulty: z.nativeEnum(Difficulty, { message: "Escolha a dificuldade." }),
});

export type CircuitFormState = { error?: string; ok?: boolean };

export async function createCircuit(
  _prev: CircuitFormState,
  formData: FormData,
): Promise<CircuitFormState> {
  const parsed = circuitSchema.safeParse({
    name: formData.get("name"),
    location: formData.get("location"),
    difficulty: formData.get("difficulty"),
  });
  if (!parsed.success) {
    return { error: "Confira todos os campos obrigatórios." };
  }

  let layoutImageUrl: string | null = null;
  const file = formData.get("layout");
  if (file instanceof File && file.size > 0) {
    if (file.size > MAX_BYTES) {
      return { error: "A imagem do layout deve ter no máximo 5 MB." };
    }
    const type = file.type;
    if (type !== "image/png" && type !== "image/jpeg") {
      return { error: "O layout precisa ser PNG ou JPEG." };
    }
    const ext = type === "image/png" ? "png" : "jpg";
    const buf = Buffer.from(await file.arrayBuffer());
    const uploadDir = path.join(process.cwd(), "public", "uploads", "layouts");
    await mkdir(uploadDir, { recursive: true });
    const fname = `${crypto.randomUUID()}.${ext}`;
    await writeFile(path.join(uploadDir, fname), buf);
    layoutImageUrl = `/uploads/layouts/${fname}`;
  }

  const prisma = getPrismaClient();
  await prisma.circuit.create({
    data: {
      name: parsed.data.name,
      location: parsed.data.location,
      difficulty: parsed.data.difficulty,
      layoutImageUrl,
    },
  });
  revalidatePath("/admin/circuits");
  return { ok: true };
}
