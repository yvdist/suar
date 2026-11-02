import { useEffect, useMemo, useRef, useState } from "preact/hooks";

type Biaya = "semua" | "gratis" | "bawah-100" | "sesuai-kemampuan";

interface FilterState {
  biaya: Biaya;
  jenis: string[];
  cara: string[];
  syarat: string[];
  q: string;
}

interface BarisData {
  el: HTMLLIElement;
  nama: string;
  kecamatan: string;
  skema: string;
  harga: number;
  jenis: string;
  online: boolean;
  tatap: boolean;
  tanpaRujukan: boolean;
  tanpaJanji: boolean;
}

const JENIS_OPSI = ["psikolog", "psikiater", "konseling", "komunitas", "hotline"];
const LABEL_JENIS: Record<string, string> = {
  psikolog: "Psikolog",
  psikiater: "Psikiater",
  konseling: "Konseling",
  komunitas: "Komunitas",
  hotline: "Hotline",
};

function bacaStateAwal(): FilterState {
  const awal: FilterState = { biaya: "semua", jenis: [], cara: [], syarat: [], q: "" };
  if (typeof window === "undefined") return awal;
  const params = new URLSearchParams(window.location.search);
  const biaya = params.get("biaya");
  if (biaya === "gratis" || biaya === "bawah-100" || biaya === "sesuai-kemampuan") {
    awal.biaya = biaya;
  }
  const daftar = (kunci: string) =>
    (params.get(kunci) ?? "")
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);
  awal.jenis = daftar("jenis").filter((v) => JENIS_OPSI.includes(v));
  awal.cara = daftar("cara").filter((v) => v === "online" || v === "tatap-muka");
  awal.syarat = daftar("syarat").filter((v) => v === "tanpa-rujukan" || v === "tanpa-janji");
  awal.q = params.get("q") ?? "";
  return awal;
}

function cocok(data: BarisData, state: FilterState): boolean {
  if (state.biaya === "gratis") {
    if (data.skema !== "gratis" && data.skema !== "bpjs") return false;
  } else if (state.biaya === "bawah-100") {
    if (!(data.harga > 0 && data.harga < 100000)) return false;
  } else if (state.biaya === "sesuai-kemampuan") {
    if (data.skema !== "sliding-scale") return false;
  }
  if (state.jenis.length > 0 && !state.jenis.includes(data.jenis)) return false;
  if (state.cara.length > 0) {
    const caraOk =
      (state.cara.includes("online") && data.online) ||
      (state.cara.includes("tatap-muka") && data.tatap);
    if (!caraOk) return false;
  }
  if (state.syarat.length > 0) {
    const semuaSyarat =
      (!state.syarat.includes("tanpa-rujukan") || data.tanpaRujukan) &&
      (!state.syarat.includes("tanpa-janji") || data.tanpaJanji);
    if (!semuaSyarat) return false;
  }
  const kata = state.q.trim().toLowerCase();
  if (kata && !data.nama.includes(kata) && !data.kecamatan.includes(kata)) return false;
  return true;
}

export default function Filter({ total }: { total: number }) {
  const [state, setState] = useState<FilterState>(bacaStateAwal);
  const [sheetTerbuka, setSheetTerbuka] = useState(false);
  const [jumlah, setJumlah] = useState(total);
  const barisRef = useRef<BarisData[]>([]);
  const tombolFilterRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    barisRef.current = Array.from(
      document.querySelectorAll<HTMLLIElement>("li[data-key]"),
    ).map((el) => ({
      el,
      nama: el.dataset.nama ?? "",
      kecamatan: el.dataset.kecamatan ?? "",
      skema: el.dataset.skema ?? "",
      harga: Number(el.dataset.harga ?? 0),
      jenis: el.dataset.jenis ?? "",
      online: el.dataset.online === "1",
      tatap: el.dataset.tatap === "1",
      tanpaRujukan: el.dataset.tanpaRujukan === "1",
      tanpaJanji: el.dataset.tanpaJanji === "1",
    }));
  }, []);

  useEffect(() => {
    const params = new URLSearchParams();
    if (state.biaya !== "semua") params.set("biaya", state.biaya);
    if (state.jenis.length > 0) params.set("jenis", state.jenis.join(","));
    if (state.cara.length > 0) params.set("cara", state.cara.join(","));
    if (state.syarat.length > 0) params.set("syarat", state.syarat.join(","));
    if (state.q.trim()) params.set("q", state.q.trim());
    const query = params.toString();
    const url = query ? `${window.location.pathname}?${query}` : window.location.pathname;
    window.history.replaceState(null, "", url);

    let n = 0;
    for (const baris of barisRef.current) {
      const tampil = cocok(baris, state);
      baris.el.hidden = !tampil;
      if (tampil) n += 1;
    }
    setJumlah(n);
  }, [state]);

  useEffect(() => {
    if (!sheetTerbuka) return;
    const tutup = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSheetTerbuka(false);
    };
    document.addEventListener("keydown", tutup);
    return () => document.removeEventListener("keydown", tutup);
  }, [sheetTerbuka]);

  useEffect(() => {
    if (!sheetTerbuka) tombolFilterRef.current?.focus();
  }, [sheetTerbuka]);

  const jumlahAktif = useMemo(() => {
    let n = 0;
    if (state.biaya !== "semua") n += 1;
    n += state.jenis.length + state.cara.length + state.syarat.length;
    if (state.q.trim()) n += 1;
    return n;
  }, [state]);

  const aturUlang = () => setState({ biaya: "semua", jenis: [], cara: [], syarat: [], q: "" });

  const alihArray = (kunci: "jenis" | "cara" | "syarat", nilai: string) =>
    setState((s) => ({
      ...s,
      [kunci]: s[kunci].includes(nilai)
        ? s[kunci].filter((v) => v !== nilai)
        : [...s[kunci], nilai],
    }));

  const kontrol = (
    <div class="space-y-5">
      <div>
        <label
          for="cari-layanan"
          class="mb-2 block text-sm font-normal text-ink"
        >
          Cari layanan
        </label>
        <input
          id="cari-layanan"
          type="search"
          value={state.q}
          onInput={(e) => setState((s) => ({ ...s, q: (e.target as HTMLInputElement).value }))}
          placeholder="Nama atau kecamatan"
          class="min-h-[44px] w-full rounded-[8px] border border-line bg-surface px-3 text-base font-normal text-ink placeholder:text-muted focus:outline-2 focus:outline-accent"
        />
      </div>

      <fieldset>
        <legend class="mb-2 text-sm font-normal text-ink">Biaya</legend>
        <div class="flex flex-col gap-1">
          {(
            [
              ["semua", "Semua"],
              ["gratis", "Gratis"],
              ["bawah-100", "Di bawah 100rb"],
              ["sesuai-kemampuan", "Sesuai kemampuan"],
            ] as [Biaya, string][]
          ).map(([nilai, label]) => (
            <label
              key={nilai}
              class="inline-flex min-h-[44px] cursor-pointer items-center gap-3 text-base font-normal text-ink"
            >
              <input
                type="radio"
                name="biaya"
                value={nilai}
                checked={state.biaya === nilai}
                onChange={() => setState((s) => ({ ...s, biaya: nilai }))}
                class="h-5 w-5 accent-[#1F5148]"
              />
              {label}
            </label>
          ))}
        </div>
      </fieldset>

      <fieldset>
        <legend class="mb-2 text-sm font-normal text-ink">Jenis</legend>
        <div class="flex flex-col gap-1">
          {JENIS_OPSI.map((nilai) => (
            <label
              key={nilai}
              class="inline-flex min-h-[44px] cursor-pointer items-center gap-3 text-base font-normal text-ink"
            >
              <input
                type="checkbox"
                checked={state.jenis.includes(nilai)}
                onChange={() => alihArray("jenis", nilai)}
                class="h-5 w-5 accent-[#1F5148]"
              />
              {LABEL_JENIS[nilai]}
            </label>
          ))}
        </div>
      </fieldset>

      <fieldset>
        <legend class="mb-2 text-sm font-normal text-ink">Cara</legend>
        <div class="flex flex-col gap-1">
          {(
            [
              ["online", "Online"],
              ["tatap-muka", "Tatap muka"],
            ] as [string, string][]
          ).map(([nilai, label]) => (
            <label
              key={nilai}
              class="inline-flex min-h-[44px] cursor-pointer items-center gap-3 text-base font-normal text-ink"
            >
              <input
                type="checkbox"
                checked={state.cara.includes(nilai)}
                onChange={() => alihArray("cara", nilai)}
                class="h-5 w-5 accent-[#1F5148]"
              />
              {label}
            </label>
          ))}
        </div>
      </fieldset>

      <fieldset>
        <legend class="mb-2 text-sm font-normal text-ink">Syarat</legend>
        <div class="flex flex-col gap-1">
          {(
            [
              ["tanpa-rujukan", "Tanpa rujukan"],
              ["tanpa-janji", "Tanpa janji temu"],
            ] as [string, string][]
          ).map(([nilai, label]) => (
            <label
              key={nilai}
              class="inline-flex min-h-[44px] cursor-pointer items-center gap-3 text-base font-normal text-ink"
            >
              <input
                type="checkbox"
                checked={state.syarat.includes(nilai)}
                onChange={() => alihArray("syarat", nilai)}
                class="h-5 w-5 accent-[#1F5148]"
              />
              {label}
            </label>
          ))}
        </div>
      </fieldset>

      {jumlahAktif > 0 && (
        <button
          type="button"
          onClick={aturUlang}
          class="inline-flex min-h-[44px] items-center text-sm font-normal text-accent underline underline-offset-4"
        >
          Atur ulang
        </button>
      )}
    </div>
  );

  return (
    <div>
      <p aria-live="polite" class="font-data text-xs font-normal text-muted">
        {jumlah} dari {total} layanan
      </p>

      {jumlah === 0 && (
        <div class="mt-4 space-y-2 rounded-[8px] border border-line bg-surface p-[16px_18px]">
          <p class="text-base font-normal text-ink">
            Tidak ada layanan yang cocok dengan filter ini.
          </p>
          <p class="text-sm font-normal leading-relaxed text-muted">
            Coba longgarkan filter biaya, atau{" "}
            <button
              type="button"
              onClick={aturUlang}
              class="inline-flex min-h-[44px] items-center text-accent underline underline-offset-4"
            >
              lihat semua {total} layanan
            </button>
            .
          </p>
        </div>
      )}

      <aside aria-label="Filter layanan" class="mt-4 hidden min-[900px]:block">
        {kontrol}
      </aside>

      <div class="mt-4 min-[900px]:hidden">
        <button
          ref={tombolFilterRef}
          type="button"
          onClick={() => setSheetTerbuka(true)}
          aria-haspopup="dialog"
          class="inline-flex min-h-[44px] items-center gap-2 rounded-[8px] border border-line bg-surface px-4 text-sm font-normal text-ink"
        >
          Filter{jumlahAktif > 0 ? ` (${jumlahAktif})` : ""}
        </button>
      </div>

      {sheetTerbuka && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Filter layanan"
          class="fixed inset-x-0 bottom-0 z-50 max-h-[85vh] overflow-y-auto rounded-t-[12px] border-t border-line bg-surface px-5 pb-8 pt-4 min-[900px]:hidden"
        >
          <div class="mb-4 flex items-center justify-between">
            <p class="font-display text-[17px] font-medium text-ink">
              Filter{jumlahAktif > 0 ? ` (${jumlahAktif})` : ""}
            </p>
            <button
              type="button"
              onClick={() => setSheetTerbuka(false)}
              class="inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded-[8px] border border-line text-sm font-normal text-ink"
            >
              Tutup
            </button>
          </div>
          {kontrol}
          <button
            type="button"
            onClick={() => setSheetTerbuka(false)}
            class="mt-6 inline-flex min-h-[44px] w-full items-center justify-center rounded-[8px] bg-accent px-4 text-base font-medium text-surface"
          >
            Lihat {jumlah} layanan
          </button>
        </div>
      )}
    </div>
  );
}
