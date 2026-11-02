export interface PriceInput {
  price_min: number;
  price_max?: number;
  pricing: "free" | "bpjs" | "sliding-scale" | "fixed-rate";
}

function formatThousands(value: number): string {
  return value.toLocaleString("id-ID");
}

function formatCompact(value: number): string {
  if (value >= 1000 && value % 1000 === 0) {
    return `${value / 1000}rb`;
  }
  return formatThousands(value);
}

export function formatPrice(entry: PriceInput): string {
  if (entry.price_min === 0) return "Rp0";
  if (entry.pricing === "sliding-scale" && (entry.price_max === undefined || entry.price_max <= entry.price_min)) {
    return "Sesuai kemampuan";
  }
  if (entry.price_max !== undefined && entry.price_max > entry.price_min) {
    return `Rp${formatCompact(entry.price_min)}–${formatCompact(entry.price_max).replace(/^Rp/, "")}`;
  }
  return `Rp${formatThousands(entry.price_min)}`;
}
