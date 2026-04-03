import { getPrismaClient } from "@/lib/prisma";

export async function getRecentRaces(limit = 12) {
  if (!process.env.DATABASE_URL) return [];
  const prisma = getPrismaClient();
  return prisma.race.findMany({
    take: limit,
    orderBy: { heldAt: "desc" },
    include: {
      circuit: true,
      results: {
        include: { pilot: true },
        orderBy: { position: "asc" },
      },
    },
  });
}

export type RecentRaces = Awaited<ReturnType<typeof getRecentRaces>>;

export async function getRaceById(id: string) {
  if (!process.env.DATABASE_URL) return null;
  const prisma = getPrismaClient();
  return prisma.race.findUnique({
    where: { id },
    include: {
      circuit: true,
      results: {
        include: { pilot: true },
        orderBy: { position: "asc" },
      },
    },
  });
}

export async function getCircuits() {
  if (!process.env.DATABASE_URL) return [];
  const prisma = getPrismaClient();
  return prisma.circuit.findMany({
    orderBy: { name: "asc" },
  });
}

export async function getPilots() {
  if (!process.env.DATABASE_URL) return [];
  const prisma = getPrismaClient();
  return prisma.pilot.findMany({
    orderBy: { displayName: "asc" },
  });
}

/** Wins = first place finishes. */
export async function getLeaderboard(limit = 20) {
  if (!process.env.DATABASE_URL) return [];
  const prisma = getPrismaClient();
  const wins = await prisma.raceResult.groupBy({
    by: ["pilotId"],
    where: { position: 1 },
    _count: { pilotId: true },
  });
  const pilotIds = wins.map((w) => w.pilotId);
  const pilots = await prisma.pilot.findMany({
    where: { id: { in: pilotIds } },
  });
  const byId = new Map(pilots.map((p) => [p.id, p]));
  const rows = wins
    .map((w) => ({
      pilot: byId.get(w.pilotId),
      wins: w._count.pilotId,
    }))
    .filter((r) => r.pilot)
    .sort((a, b) => b.wins - a.wins)
    .slice(0, limit);
  return rows as { pilot: NonNullable<(typeof rows)[0]["pilot"]>; wins: number }[];
}
