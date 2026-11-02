export interface HargaInput {
  harga_min: number;
  harga_max?: number;
  skema_biaya: "gratis" | "bpjs" | "sliding-scale" | "tarif-tetap";
}

function formatRibuan(nilai: number): string {
  return nilai.toLocaleString("id-ID");
}

function formatRingkas(nilai: number): string {
  if (nilai >= 1000 && nilai % 1000 === 0) {
    return `${nilai / 1000}rb`;
  }
  return formatRibuan(nilai);
}

export function formatHarga(entry: HargaInput): string {
  if (entry.harga_min === 0) return "Rp0";
  if (entry.skema_biaya === "sliding-scale") return "Sesuai kemampuan";
  if (entry.harga_max !== undefined && entry.harga_max > entry.harga_min) {
    return `Rp${formatRingkas(entry.harga_min)}–${formatRingkas(entry.harga_max)}`;
  }
  return `Rp${formatRibuan(entry.harga_min)}`;
}
