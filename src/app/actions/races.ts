"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { parseDurationToMs, parseLapToMs } from "@/lib/lap";
import { getPrismaClient } from "@/lib/prisma";

const raceSchema = z.object({
  circuitId: z.string().min(1, "Escolha um circuito."),
  label: z
    .string()
    .min(1, "Informe o nome da sessão.")
    .max(200, "Nome da sessão: no máximo 200 caracteres."),
  heldAt: z.string().min(1, "Informe data e hora."),
});

export type RaceFormState = { error?: string; ok?: boolean };

type ResultRow = {
  pilotId: string;
  position: number;
  bestLapMs: number;
  averageSpeedKmh: number | null;
  totalLaps: number | null;
  totalTimeMs: number | null;
  gapToLeaderMs: number | null;
  gapToLeaderLaps: number | null;
};

function parseOptionalInt(raw: unknown): number | null {
  if (typeof raw !== "string") return null;
  const t = raw.trim();
  if (t === "") return null;
  const n = Number.parseInt(t, 10);
  return Number.isFinite(n) ? n : NaN;
}

function parseOptionalFloat(raw: unknown): number | null {
  if (typeof raw !== "string") return null;
  const t = raw.trim().replace(",", ".");
  if (t === "") return null;
  const n = Number.parseFloat(t);
  return Number.isFinite(n) ? n : NaN;
}

export async function createRaceWithResults(
  _prev: RaceFormState,
  formData: FormData,
): Promise<RaceFormState> {
  const circuitId = formData.get("circuitId");
  const label = formData.get("label");
  const heldAt = formData.get("heldAt");
  const parsed = raceSchema.safeParse({ circuitId, label, heldAt });
  if (!parsed.success) {
    return { error: "Dados da corrida inválidos." };
  }
  const held = new Date(parsed.data.heldAt);
  if (Number.isNaN(held.getTime())) {
    return { error: "Data inválida." };
  }

  const prisma = getPrismaClient();
  const pilots = await prisma.pilot.findMany({ select: { id: true } });
  const rows: ResultRow[] = [];
  const positions = new Set<number>();

  for (const p of pilots) {
    const posRaw = formData.get(`position_${p.id}`);
    const lapRaw = formData.get(`lap_${p.id}`);
    if (typeof posRaw !== "string" || posRaw.trim() === "") continue;
    const position = Number.parseInt(posRaw, 10);
    if (!Number.isFinite(position) || position < 1) {
      return { error: `Posição inválida para o piloto (linha ${p.id}).` };
    }
    if (positions.has(position)) {
      return { error: "Há posições duplicadas." };
    }
    positions.add(position);
    if (typeof lapRaw !== "string") {
      return { error: "Falta o tempo de melhor volta nas linhas preenchidas." };
    }
    const bestLapMs = parseLapToMs(lapRaw);
    if (bestLapMs === null) {
      return { error: "Melhor volta: use M:SS:mmm (por piloto)." };
    }

    const avgSpeed = parseOptionalFloat(formData.get(`avgSpeed_${p.id}`));
    if (avgSpeed !== null && Number.isNaN(avgSpeed)) {
      return { error: "Velocidade média precisa ser um número (km/h)." };
    }
    if (avgSpeed !== null && (avgSpeed < 0 || avgSpeed > 999)) {
      return { error: "Velocidade média fora do intervalo (0–999 km/h)." };
    }

    const totalLaps = parseOptionalInt(formData.get(`totalLaps_${p.id}`));
    if (totalLaps !== null && Number.isNaN(totalLaps)) {
      return { error: "Total de voltas precisa ser um número inteiro." };
    }
    if (totalLaps !== null && totalLaps < 0) {
      return { error: "Total de voltas não pode ser negativo." };
    }

    const totalTimeRaw = formData.get(`totalTime_${p.id}`);
    let totalTimeMs: number | null = null;
    if (typeof totalTimeRaw === "string" && totalTimeRaw.trim() !== "") {
      totalTimeMs = parseDurationToMs(totalTimeRaw);
      if (totalTimeMs === null) {
        return {
          error: `Tempo total: use M:SS:mmm ou H:MM:SS:mmm (piloto ${p.id}).`,
        };
      }
    }

    const gapTimeRaw = formData.get(`gapTime_${p.id}`);
    const gapLapsRaw = formData.get(`gapLaps_${p.id}`);
    const gapTimeStr = typeof gapTimeRaw === "string" ? gapTimeRaw.trim() : "";
    const gapLapsStr = typeof gapLapsRaw === "string" ? gapLapsRaw.trim() : "";

    let gapToLeaderMs: number | null = null;
    let gapToLeaderLaps: number | null = null;

    if (gapTimeStr !== "" && gapLapsStr !== "") {
      return {
        error: "Use tempo de atraso ao líder (M:SS:mmm) ou voltas de atraso — não os dois por piloto.",
      };
    }
    if (gapTimeStr !== "") {
      gapToLeaderMs = parseDurationToMs(gapTimeStr);
      if (gapToLeaderMs === null) {
        return { error: "Atraso ao líder (tempo): use M:SS:mmm ou H:MM:SS:mmm." };
      }
    }
    if (gapLapsStr !== "") {
      const gl = Number.parseInt(gapLapsStr, 10);
      if (!Number.isFinite(gl) || gl < 0) {
        return { error: "Atraso em voltas precisa ser um inteiro ≥ 0." };
      }
      gapToLeaderLaps = gl;
    }

    rows.push({
      pilotId: p.id,
      position,
      bestLapMs,
      averageSpeedKmh: avgSpeed,
      totalLaps,
      totalTimeMs,
      gapToLeaderMs,
      gapToLeaderLaps,
    });
  }

  if (rows.length === 0) {
    return { error: "Informe pelo menos um resultado." };
  }

  await prisma.$transaction(async (tx) => {
    const race = await tx.race.create({
      data: {
        circuitId: parsed.data.circuitId,
        label: parsed.data.label,
        heldAt: held,
      },
    });
    await tx.raceResult.createMany({
      data: rows.map((r) => ({
        raceId: race.id,
        pilotId: r.pilotId,
        position: r.position,
        bestLapMs: r.bestLapMs,
        averageSpeedKmh: r.averageSpeedKmh,
        totalLaps: r.totalLaps,
        totalTimeMs: r.totalTimeMs,
        gapToLeaderMs: r.gapToLeaderMs,
        gapToLeaderLaps: r.gapToLeaderLaps,
      })),
    });
  });

  revalidatePath("/");
  revalidatePath("/leaderboard");
  return { ok: true };
}
