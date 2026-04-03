/** Parse "M:SS:mmm" (minutes unlimited) to milliseconds. */
export function parseLapToMs(raw: string): number | null {
  const s = raw.trim();
  const m = /^(\d+):(\d{2}):(\d{3})$/.exec(s);
  if (!m) return null;
  const min = Number(m[1]);
  const sec = Number(m[2]);
  const ms = Number(m[3]);
  if (sec > 59 || min < 0) return null;
  return min * 60_000 + sec * 1000 + ms;
}

/**
 * Total time: `M:SS:mmm` or long form `H:MM:SS:mmm` (hours:minutes:seconds:milliseconds).
 */
export function parseDurationToMs(raw: string): number | null {
  const s = raw.trim();
  if (!s) return null;
  const four = /^(\d+):(\d{2}):(\d{2}):(\d{3})$/.exec(s);
  if (four) {
    const h = Number(four[1]);
    const min = Number(four[2]);
    const sec = Number(four[3]);
    const ms = Number(four[4]);
    if (min > 59 || sec > 59 || h < 0) return null;
    return (h * 3600 + min * 60 + sec) * 1000 + ms;
  }
  return parseLapToMs(s);
}

export function formatLapMs(ms: number): string {
  const m = Math.floor(ms / 60_000);
  const s = Math.floor((ms % 60_000) / 1000);
  const milli = ms % 1000;
  return `${m}:${String(s).padStart(2, "0")}:${String(milli).padStart(3, "0")}`;
}

/** Format duration; uses H:MM:SS:mmm when >= 1 hour. */
export function formatDurationMs(ms: number): string {
  if (ms < 3600_000) return formatLapMs(ms);
  const h = Math.floor(ms / 3600_000);
  const rest = ms % 3600_000;
  const m = Math.floor(rest / 60_000);
  const s = Math.floor((rest % 60_000) / 1000);
  const milli = rest % 1000;
  return `${h}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}:${String(milli).padStart(3, "0")}`;
}
