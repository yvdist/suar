import { useEffect, useMemo, useRef, useState } from "preact/hooks";

type Cost = "all" | "free" | "under-100" | "income-based";

interface FilterState {
  cost: Cost;
  type: string[];
  mode: string[];
  terms: string[];
  q: string;
}

interface RowData {
  el: HTMLLIElement;
  name: string;
  district: string;
  pricing: string;
  price: number;
  type: string;
  online: boolean;
  inPerson: boolean;
  noReferral: boolean;
  noAppointment: boolean;
}

const TYPE_OPTIONS = ["psychologist", "psychiatrist", "counseling", "community", "hotline"];
const TYPE_LABELS: Record<string, string> = {
  psychologist: "Psikolog",
  psychiatrist: "Psikiater",
  counseling: "Konseling",
  community: "Komunitas",
  hotline: "Hotline",
};

function readInitialState(): FilterState {
  const initial: FilterState = { cost: "all", type: [], mode: [], terms: [], q: "" };
  if (typeof window === "undefined") return initial;
  const params = new URLSearchParams(window.location.search);
  const cost = params.get("cost");
  if (cost === "free" || cost === "under-100" || cost === "income-based") {
    initial.cost = cost;
  }
  const list = (key: string) =>
    (params.get(key) ?? "")
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);
  initial.type = list("type").filter((v) => TYPE_OPTIONS.includes(v));
  initial.mode = list("mode").filter((v) => v === "online" || v === "in-person");
  initial.terms = list("terms").filter((v) => v === "no-referral" || v === "no-appointment");
  initial.q = params.get("q") ?? "";
  return initial;
}

function matches(data: RowData, state: FilterState): boolean {
  if (state.cost === "free") {
    if (data.pricing !== "free" && data.pricing !== "bpjs") return false;
  } else if (state.cost === "under-100") {
    if (!(data.price > 0 && data.price < 100000)) return false;
  } else if (state.cost === "income-based") {
    if (data.pricing !== "sliding-scale") return false;
  }
  if (state.type.length > 0 && !state.type.includes(data.type)) return false;
  if (state.mode.length > 0) {
    const modeOk =
      (state.mode.includes("online") && data.online) ||
      (state.mode.includes("in-person") && data.inPerson);
    if (!modeOk) return false;
  }
  if (state.terms.length > 0) {
    const termsOk =
      (!state.terms.includes("no-referral") || data.noReferral) &&
      (!state.terms.includes("no-appointment") || data.noAppointment);
    if (!termsOk) return false;
  }
  const query = state.q.trim().toLowerCase();
  if (query && !data.name.includes(query) && !data.district.includes(query)) return false;
  return true;
}

export default function Filter({ total }: { total: number }) {
  const [state, setState] = useState<FilterState>(readInitialState);
  const [sheetOpen, setSheetOpen] = useState(false);
  const [count, setCount] = useState(total);
  const rowsRef = useRef<RowData[]>([]);
  const filterButtonRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    rowsRef.current = Array.from(
      document.querySelectorAll<HTMLLIElement>("li[data-key]"),
    ).map((el) => ({
      el,
      name: el.dataset.name ?? "",
      district: el.dataset.district ?? "",
      pricing: el.dataset.pricing ?? "",
      price: Number(el.dataset.price ?? 0),
      type: el.dataset.type ?? "",
      online: el.dataset.online === "1",
      inPerson: el.dataset.inPerson === "1",
      noReferral: el.dataset.noReferral === "1",
      noAppointment: el.dataset.noAppointment === "1",
    }));
  }, []);

  useEffect(() => {
    const params = new URLSearchParams();
    if (state.cost !== "all") params.set("cost", state.cost);
    if (state.type.length > 0) params.set("type", state.type.join(","));
    if (state.mode.length > 0) params.set("mode", state.mode.join(","));
    if (state.terms.length > 0) params.set("terms", state.terms.join(","));
    if (state.q.trim()) params.set("q", state.q.trim());
    const query = params.toString();
    const url = query ? `${window.location.pathname}?${query}` : window.location.pathname;
    window.history.replaceState(null, "", url);

    let n = 0;
    for (const row of rowsRef.current) {
      const visible = matches(row, state);
      row.el.hidden = !visible;
      if (visible) n += 1;
    }
    setCount(n);
  }, [state]);

  useEffect(() => {
    if (!sheetOpen) return;
    const dialog = dialogRef.current;
    const closeButton = dialog?.querySelector<HTMLElement>("input, button");
    closeButton?.focus();
    const trap = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSheetOpen(false);
        return;
      }
      if (e.key !== "Tab" || !dialog) return;
      const focusables = Array.from(
        dialog.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',
        ),
      ).filter((el) => el.offsetParent !== null);
      if (focusables.length === 0) return;
      const first = focusables[0]!;
      const last = focusables[focusables.length - 1]!;
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", trap);
    return () => document.removeEventListener("keydown", trap);
  }, [sheetOpen]);

  useEffect(() => {
    if (!sheetOpen) filterButtonRef.current?.focus();
  }, [sheetOpen]);

  const activeCount = useMemo(() => {
    let n = 0;
    if (state.cost !== "all") n += 1;
    n += state.type.length + state.mode.length + state.terms.length;
    if (state.q.trim()) n += 1;
    return n;
  }, [state]);

  const reset = () => setState({ cost: "all", type: [], mode: [], terms: [], q: "" });

  const toggleArray = (key: "type" | "mode" | "terms", value: string) =>
    setState((s) => ({
      ...s,
      [key]: s[key].includes(value)
        ? s[key].filter((v) => v !== value)
        : [...s[key], value],
    }));

  const controls = (
    <div class="space-y-5">
      <div>
        <label
          for="search-services"
          class="mb-2 block text-sm font-normal text-ink"
        >
          Cari layanan
        </label>
        <input
          id="search-services"
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
              ["all", "Semua"],
              ["free", "Gratis"],
              ["under-100", "Di bawah 100rb"],
              ["income-based", "Sesuai kemampuan"],
            ] as [Cost, string][]
          ).map(([value, label]) => (
            <label
              key={value}
              class="inline-flex min-h-[44px] cursor-pointer items-center gap-3 text-base font-normal text-ink"
            >
              <input
                type="radio"
                name="cost"
                value={value}
                checked={state.cost === value}
                onChange={() => setState((s) => ({ ...s, cost: value }))}
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
          {TYPE_OPTIONS.map((value) => (
            <label
              key={value}
              class="inline-flex min-h-[44px] cursor-pointer items-center gap-3 text-base font-normal text-ink"
            >
              <input
                type="checkbox"
                checked={state.type.includes(value)}
                onChange={() => toggleArray("type", value)}
                class="h-5 w-5 accent-[#1F5148]"
              />
              {TYPE_LABELS[value]}
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
              ["in-person", "Tatap muka"],
            ] as [string, string][]
          ).map(([value, label]) => (
            <label
              key={value}
              class="inline-flex min-h-[44px] cursor-pointer items-center gap-3 text-base font-normal text-ink"
            >
              <input
                type="checkbox"
                checked={state.mode.includes(value)}
                onChange={() => toggleArray("mode", value)}
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
              ["no-referral", "Tanpa rujukan"],
              ["no-appointment", "Tanpa janji temu"],
            ] as [string, string][]
          ).map(([value, label]) => (
            <label
              key={value}
              class="inline-flex min-h-[44px] cursor-pointer items-center gap-3 text-base font-normal text-ink"
            >
              <input
                type="checkbox"
                checked={state.terms.includes(value)}
                onChange={() => toggleArray("terms", value)}
                class="h-5 w-5 accent-[#1F5148]"
              />
              {label}
            </label>
          ))}
        </div>
      </fieldset>

      {activeCount > 0 && (
        <button
          type="button"
          onClick={reset}
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
        {count} dari {total} layanan
      </p>

      {count === 0 && (
        <div class="mt-4 space-y-2 rounded-[8px] border border-line bg-surface p-[16px_18px]">
          <p class="text-base font-normal text-ink">
            Tidak ada layanan yang cocok dengan filter ini.
          </p>
          <p class="text-sm font-normal leading-relaxed text-muted">
            Coba longgarkan filter biaya, atau{" "}
            <button
              type="button"
              onClick={reset}
              class="inline-flex min-h-[44px] items-center text-accent underline underline-offset-4"
            >
              lihat semua {total} layanan
            </button>
            .
          </p>
        </div>
      )}

      <aside aria-label="Filter layanan" class="mt-4 hidden min-[900px]:block">
        {controls}
      </aside>

      <div class="mt-4 min-[900px]:hidden">
        <button
          ref={filterButtonRef}
          type="button"
          onClick={() => setSheetOpen(true)}
          aria-haspopup="dialog"
          class="inline-flex min-h-[44px] items-center gap-2 rounded-[8px] border border-line bg-surface px-4 text-sm font-normal text-ink"
        >
          Filter{activeCount > 0 ? ` (${activeCount})` : ""}
        </button>
      </div>

      {sheetOpen && (
        <div
          ref={dialogRef}
          role="dialog"
          aria-modal="true"
          aria-label="Filter layanan"
          class="fixed inset-x-0 bottom-0 z-50 max-h-[85vh] overflow-y-auto rounded-t-[12px] border-t border-line bg-surface px-5 pb-8 pt-4 min-[900px]:hidden"
        >
          <div class="mb-4 flex items-center justify-between">
            <p class="font-display text-[17px] font-medium text-ink">
              Filter{activeCount > 0 ? ` (${activeCount})` : ""}
            </p>
            <button
              type="button"
              onClick={() => setSheetOpen(false)}
              class="inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded-[8px] border border-line text-sm font-normal text-ink"
            >
              Tutup
            </button>
          </div>
          {controls}
          <button
            type="button"
            onClick={() => setSheetOpen(false)}
            class="mt-6 inline-flex min-h-[44px] w-full items-center justify-center rounded-[8px] bg-accent px-4 text-base font-medium text-surface"
          >
            Lihat {count} layanan
          </button>
        </div>
      )}
    </div>
  );
}
