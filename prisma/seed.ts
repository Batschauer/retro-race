import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";
import { Difficulty, PrismaClient } from "../src/generated/prisma/client";

const url = process.env.DATABASE_URL;
if (!url) {
  throw new Error("DATABASE_URL is required for seed");
}
const pool = new Pool({ connectionString: url });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  const c = await prisma.circuit.create({
    data: {
      name: "Drift Cidade Neon",
      location: "CIDADE_NEON",
      difficulty: Difficulty.PRO,
    },
  });
  const p1 = await prisma.pilot.create({
    data: { displayName: "VIPER_X", team: "STREAK_UNIT" },
  });
  const p2 = await prisma.pilot.create({
    data: { displayName: "GHOST_RIDER", team: "VOID_CREW" },
  });
  const race = await prisma.race.create({
    data: {
      circuitId: c.id,
      label: "DISPUTA_INVERNO_01",
      heldAt: new Date(),
    },
  });
  await prisma.raceResult.createMany({
    data: [
      { raceId: race.id, pilotId: p1.id, position: 1, bestLapMs: 1 * 60_000 + 23 * 1000 + 450 },
      { raceId: race.id, pilotId: p2.id, position: 2, bestLapMs: 1 * 60_000 + 24 * 1000 + 120 },
    ],
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
    await pool.end();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    await pool.end();
    process.exit(1);
  });
