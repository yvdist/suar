export type FreshnessStatus = "fresh" | "aging" | "stale";

const MS_PER_DAY = 86_400_000;
const FRESH_MAX_DAYS = 90;
const AGING_MAX_DAYS = 180;

const SHORT_MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "Mei",
  "Jun",
  "Jul",
  "Agu",
  "Sep",
  "Okt",
  "Nov",
  "Des",
] as const;

export function ageInDays(lastVerified: Date, now: Date = new Date()): number {
  return Math.floor((now.getTime() - lastVerified.getTime()) / MS_PER_DAY);
}

export function freshnessStatus(lastVerified: Date, now: Date = new Date()): FreshnessStatus {
  const age = ageInDays(lastVerified, now);
  if (age <= FRESH_MAX_DAYS) return "fresh";
  if (age <= AGING_MAX_DAYS) return "aging";
  return "stale";
}

export function formatShortDate(date: Date): string {
  return `${date.getDate()} ${SHORT_MONTHS[date.getMonth()]} ${date.getFullYear()}`;
}

export function verificationStamp(lastVerified: Date): string {
  const date = formatShortDate(lastVerified);
  if (freshnessStatus(lastVerified) === "stale") {
    return `DICEK ${date} · PERLU DICEK ULANG`;
  }
  return `DICEK ${date}`;
}
