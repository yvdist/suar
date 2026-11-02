# Fase 01 — Skema data

Mendefinisikan bentuk satu entri layanan, dan membuat aturan verifikasi
ditegakkan oleh tipe — bukan oleh niat baik.

**Prasyarat:** Fase 00 selesai.

---

## Prinsip fase ini

Kalau ada orang yang sedang di titik terendah, sudah mengumpulkan
keberanian untuk mencari bantuan, lalu nomor yang ditampilkan sudah mati
atau harganya salah — itu bukan sekadar bug. Itu bisa jadi alasan dia
berhenti mencoba.

Maka: entri tanpa tanggal verifikasi **tidak boleh bisa** masuk ke build.
Bukan peringatan di konsol. Build gagal.

---

## Deliverable

- `src/content/config.ts` dengan skema Zod
- Folder `src/content/layanan/` berisi 2–3 entri contoh
- Helper `src/lib/verifikasi.ts` untuk menghitung status kesegaran data

---

## 1. Skema

Collection `layanan`, format JSON atau YAML (pilih satu, konsisten).

| Field | Tipe | Wajib | Catatan |
|---|---|---|---|
| `nama` | string | ya | nama resmi layanan |
| `jenis` | enum | ya | `psikolog` `psikiater` `konseling` `komunitas` `hotline` |
| `kota` | string | ya | |
| `kecamatan` | string | tidak | |
| `alamat` | string | tidak | kosong untuk layanan online-saja |
| `telepon` | string | tidak | |
| `whatsapp` | string | tidak | |
| `situs` | url | tidak | |
| `instagram` | string | tidak | tanpa tanda @ |
| `harga_min` | number | ya | 0 berarti gratis |
| `harga_max` | number | tidak | kosong berarti tarif tunggal |
| `skema_biaya` | enum | ya | `gratis` `bpjs` `sliding-scale` `tarif-tetap` |
| `online` | boolean | ya | |
| `tatap_muka` | boolean | ya | |
| `perlu_rujukan` | boolean | ya | |
| `perlu_janji` | boolean | ya | |
| `jam_layanan` | string | tidak | teks bebas, apa adanya |
| `catatan` | string | tidak | maksimal 200 karakter |
| `last_verified` | date | **ya** | |
| `verified_by` | string | **ya** | inisial atau nama |
| `sumber` | url atau string | ya | dari mana informasi ini didapat |

Aturan tambahan di skema:

- `harga_min` minimal 0, bukan negatif
- Kalau `skema_biaya` adalah `gratis`, maka `harga_min` harus 0
  (pakai `.refine()`)
- Minimal satu dari `telepon`, `whatsapp`, `situs`, `instagram` harus
  terisi — entri tanpa cara menghubungi tidak berguna
- Minimal satu dari `online` atau `tatap_muka` harus `true`
- `last_verified` tidak boleh tanggal di masa depan

## 2. Status kesegaran

Helper yang menerima `last_verified` dan mengembalikan salah satu dari
tiga status. Ambang waktunya:

| Status | Umur data | Warna | Teks stempel |
|---|---|---|---|
| `segar` | ≤ 90 hari | `aksen` | `DICEK {tanggal}` |
| `menua` | 91–180 hari | `gratis` | `DICEK {tanggal}` |
| `usang` | > 180 hari | `usang` | `DICEK {tanggal} · PERLU DICEK ULANG` |

Format tanggal Indonesia pendek: `12 Agu 2026`.

Entri berstatus `usang` **tetap ditampilkan**. Jangan disembunyikan,
jangan diurutkan ke paling bawah, jangan dihapus. Ditandai saja —
pengguna berhak tahu bahwa informasinya perlu dikonfirmasi ulang, dan
informasi lama masih lebih berguna daripada tidak ada informasi.

## 3. Entri contoh

Buat 2–3 entri untuk keperluan pengembangan. **Beri nama yang jelas
fiktif** — "Contoh Klinik A", "Puskesmas Uji Coba". Jangan pernah
membuat data contoh yang terlihat asli; risikonya ada yang menelepon
nomor karangan saat sedang butuh.

Buat satu entri dengan `last_verified` lama, supaya state `usang` bisa
dilihat selama pengembangan.

---

## Kriteria selesai

- [ ] `astro check` lolos
- [ ] Menghapus `last_verified` dari satu entri → build **gagal**, bukan warning
- [ ] Mengisi `skema_biaya: gratis` dengan `harga_min: 50000` → build gagal
- [ ] Entri tanpa satu pun kontak → build gagal
- [ ] Helper kesegaran mengembalikan tiga status dengan benar (uji manual dengan tiga tanggal)
- [ ] Entri contoh jelas fiktif namanya

## Tidak dikerjakan di fase ini

Tampilan apa pun. Fase ini murni struktur data.

## Catatan

Jangan tambah field "rating", "review", atau "rekomendasi". Menilai
kualitas layanan kesehatan mental bukan sesuatu yang bisa dilakukan
dari kursi pengembang, dan rating palsu di kategori ini berbahaya.
Suar menunjukkan apa yang ada dan berapa biayanya. Titik.
