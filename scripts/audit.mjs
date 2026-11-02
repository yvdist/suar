// SUAR freshness audit — run manually: npm run audit
// Reads every entry in src/content/layanan, computes last_verified age,
// and prints a report grouped by freshness status.
import { readdirSync, readFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const dir = join(root, "src", "content", "layanan");

const SEGAR_MAX = 90;
const MENUA_MAX = 180;
const MS_PER_DAY = 86_400_000;

function umurHari(tanggal) {
  return Math.floor((Date.now() - tanggal.getTime()) / MS_PER_DAY);
}

function formatTanggal(tanggal) {
  const bulan = [
    "Jan", "Feb", "Mar", "Apr", "Mei", "Jun",
    "Jul", "Agu", "Sep", "Okt", "Nov", "Des",
  ];
  return `${tanggal.getDate()} ${bulan[tanggal.getMonth()]} ${tanggal.getFullYear()}`;
}

const berkas = readdirSync(dir).filter((f) => f.endsWith(".json"));
const baris = berkas.map((f) => {
  const data = JSON.parse(readFileSync(join(dir, f), "utf8"));
  const dicek = new Date(data.last_verified);
  const umur = umurHari(dicek);
  const status = umur <= SEGAR_MAX ? "segar" : umur <= MENUA_MAX ? "menua" : "usang";
  return { nama: data.nama, slug: f.replace(/\.json$/, ""), dicek, umur, status };
});

const usang = baris.filter((b) => b.status === "usang").sort((a, b) => b.umur - a.umur);
const menua = baris.filter((b) => b.status === "menua").sort((a, b) => b.umur - a.umur);
const segar = baris.filter((b) => b.status === "segar").sort((a, b) => b.umur - a.umur);

const rataRata = baris.length
  ? Math.round(baris.reduce((j, b) => j + b.umur, 0) / baris.length)
  : 0;

console.log("SUAR — audit kesegaran data");
console.log(`Dijalankan: ${formatTanggal(new Date())}`);
console.log("");
console.log(`Usang (>180 hari) — ${usang.length} entri, perlu dicek ulang:`);
for (const b of usang) {
  console.log(`  - ${b.nama}          dicek ${b.umur} hari lalu (${formatTanggal(b.dicek)})`);
}
console.log("");
console.log(`Menua (91–180 hari) — ${menua.length} entri`);
for (const b of menua) {
  console.log(`  - ${b.nama}          dicek ${b.umur} hari lalu`);
}
console.log("");
console.log(`Segar (≤90 hari) — ${segar.length} entri`);
console.log("");
console.log(`Rata-rata umur data: ${rataRata} hari`);
