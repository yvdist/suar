export type StatusKesegaran = "segar" | "menua" | "usang";

const MS_PER_DAY = 86_400_000;
const SEGAR_MAX_DAYS = 90;
const MENUA_MAX_DAYS = 180;

const BULAN_PENDEK = [
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

export function umurHari(lastVerified: Date, now: Date = new Date()): number {
  return Math.floor((now.getTime() - lastVerified.getTime()) / MS_PER_DAY);
}

export function statusKesegaran(lastVerified: Date, now: Date = new Date()): StatusKesegaran {
  const umur = umurHari(lastVerified, now);
  if (umur <= SEGAR_MAX_DAYS) return "segar";
  if (umur <= MENUA_MAX_DAYS) return "menua";
  return "usang";
}

export function formatTanggalPendek(tanggal: Date): string {
  return `${tanggal.getDate()} ${BULAN_PENDEK[tanggal.getMonth()]} ${tanggal.getFullYear()}`;
}

export function stempelVerifikasi(lastVerified: Date): string {
  const tanggal = formatTanggalPendek(lastVerified);
  if (statusKesegaran(lastVerified) === "usang") {
    return `DICEK ${tanggal} · PERLU DICEK ULANG`;
  }
  return `DICEK ${tanggal}`;
}
