-- AlterTable
ALTER TABLE "RaceResult" ADD COLUMN     "averageSpeedKmh" DOUBLE PRECISION,
ADD COLUMN     "gapToLeaderLaps" INTEGER,
ADD COLUMN     "gapToLeaderMs" INTEGER,
ADD COLUMN     "totalLaps" INTEGER,
ADD COLUMN     "totalTimeMs" INTEGER;
