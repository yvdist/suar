// SUAR freshness audit — run manually: npm run audit
// Reads every entry in src/content/services, computes last_verified age,
// and prints a report grouped by freshness status.
import { readdirSync, readFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const dir = join(root, "src", "content", "services");

const FRESH_MAX = 90;
const AGING_MAX = 180;
const MS_PER_DAY = 86_400_000;

function ageInDays(date) {
  return Math.floor((Date.now() - date.getTime()) / MS_PER_DAY);
}

function formatDate(date) {
  const months = [
    "Jan", "Feb", "Mar", "Apr", "Mei", "Jun",
    "Jul", "Agu", "Sep", "Okt", "Nov", "Des",
  ];
  return `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`;
}

const files = readdirSync(dir).filter((f) => f.endsWith(".json"));
const rows = files.map((f) => {
  const data = JSON.parse(readFileSync(join(dir, f), "utf8"));
  const checked = new Date(data.last_verified);
  const age = ageInDays(checked);
  const status = age <= FRESH_MAX ? "fresh" : age <= AGING_MAX ? "aging" : "stale";
  return { name: data.name, slug: f.replace(/\.json$/, ""), checked, age, status };
});

const stale = rows.filter((r) => r.status === "stale").sort((a, b) => b.age - a.age);
const aging = rows.filter((r) => r.status === "aging").sort((a, b) => b.age - a.age);
const fresh = rows.filter((r) => r.status === "fresh").sort((a, b) => b.age - a.age);

const average = rows.length
  ? Math.round(rows.reduce((sum, r) => sum + r.age, 0) / rows.length)
  : 0;

console.log("SUAR — audit kesegaran data");
console.log(`Dijalankan: ${formatDate(new Date())}`);
console.log("");
console.log(`Usang (>180 hari) — ${stale.length} entri, perlu dicek ulang:`);
for (const r of stale) {
  console.log(`  - ${r.name}          dicek ${r.age} hari lalu (${formatDate(r.checked)})`);
}
console.log("");
console.log(`Menua (91–180 hari) — ${aging.length} entri`);
for (const r of aging) {
  console.log(`  - ${r.name}          dicek ${r.age} hari lalu`);
}
console.log("");
console.log(`Segar (≤90 hari) — ${fresh.length} entri`);
console.log("");
console.log(`Rata-rata umur data: ${average} hari`);
