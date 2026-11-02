# Fase 04 — Filter & pencarian

Satu-satunya bagian interaktif di seluruh situs. Semua JavaScript yang
dikirim ke pengguna ada di sini.

**Prasyarat:** Fase 03 selesai.

---

## Deliverable

- `src/components/Filter.tsx` — Preact island
- Integrasi ke halaman daftar dengan `client:load`
- Sinkronisasi state ke URL

---

## 1. Filter yang tersedia

| Filter | Tipe | Opsi |
|---|---|---|
| Biaya | pilihan tunggal | Semua · Gratis · Di bawah 100rb · Sesuai kemampuan |
| Jenis | pilihan ganda | Psikolog · Psikiater · Konseling · Komunitas · Hotline |
| Cara | pilihan ganda | Online · Tatap muka |
| Syarat | pilihan ganda | Tanpa rujukan · Tanpa janji temu |

Pencarian teks: satu kotak, mencocokkan nama dan kecamatan. Cocokkan
substring biasa, tanpa peringkat relevansi. Untuk 50 entri, `filter()`
sudah cukup — jangan pasang Fuse.js.

Filter "Gratis" harus mencakup `skema_biaya` bernilai `gratis` **dan**
`bpjs`. Bagi pengguna, keduanya berarti tidak keluar uang.

## 2. Perilaku

- Filter berlaku langsung, tanpa tombol "terapkan"
- State tersimpan di query string (`?biaya=gratis&jenis=psikolog`)
  supaya bisa dibagikan dan tidak hilang saat halaman dimuat ulang
- Jumlah hasil selalu terlihat: "12 dari 38 layanan"
- Tombol "Atur ulang" muncul hanya kalau ada filter aktif
- Tidak ada animasi saat daftar berubah. Perubahan langsung lebih cepat
  dibaca daripada transisi yang halus.

## 3. Tata letak

Desktop (≥900px): sidebar kiri selebar 200px, menetap saat digulir.
Mobile: tombol "Filter" yang membuka bottom sheet. Tombol menampilkan
jumlah filter aktif.

Kontrol pakai elemen form asli — `input`, `select`, `fieldset`,
`legend`. Jangan bangun dropdown sendiri. Elemen asli sudah benar
perilakunya untuk keyboard, pembaca layar, dan mode kontras tinggi;
tiruan buatan tangan hampir selalu lebih buruk.

Setiap grup filter dibungkus `fieldset` dengan `legend`. `legend` boleh
disembunyikan secara visual, tapi harus ada di DOM.

## 4. Hasil kosong

Kalau tidak ada yang cocok, jangan hanya bilang "tidak ada hasil".
Tawarkan jalan keluar:

> Tidak ada layanan yang cocok dengan filter ini.
> Coba longgarkan filter biaya, atau lihat semua 38 layanan.

Dengan tautan yang benar-benar mengatur ulang filternya.

Ini penting melebihi estetika: seseorang yang menyaring "gratis" lalu
menemui layar kosong bisa menyimpulkan tidak ada bantuan untuknya.
Selalu tunjukkan jalan kembali.

## 5. Tanpa JavaScript

Halaman daftar harus tetap menampilkan **seluruh entri** kalau JS mati.
Filter boleh hilang; daftarnya tidak boleh.

Render daftar lengkap di HTML statis dari Astro. Island hanya menyembunyikan
dan menampilkan baris yang sudah ada di DOM — bukan membangun ulang daftar
dari nol. Dengan begitu, versi tanpa JS otomatis benar tanpa kerja tambahan.

---

## Kriteria selesai

- [ ] Semua kombinasi filter menghasilkan jumlah yang benar
- [ ] Filter "Gratis" memunculkan entri BPJS juga
- [ ] URL berubah saat filter berubah; membuka URL itu memulihkan state
- [ ] Seluruh filter bisa dioperasikan dengan keyboard saja
- [ ] Pembaca layar mengumumkan perubahan jumlah hasil (`aria-live="polite"`)
- [ ] JS dimatikan → semua entri tetap tampil
- [ ] Bottom sheet mobile bisa ditutup dengan Esc dan dengan tombol tutup
- [ ] Total JS yang dikirim di bawah 30KB terkompresi

## Tidak dikerjakan di fase ini

Pengurutan, pencarian berdasarkan jarak, filter berdasarkan jam buka.
Simpan untuk setelah v1 terbit.

## Catatan

Godaan terbesar di fase ini adalah menambah filter. Setiap filter
tambahan terasa berguna saat dibayangkan, tapi memperlambat keputusan
saat dipakai. Empat filter sudah cukup untuk 50 entri. Tambah lagi
hanya kalau ada yang benar-benar mengeluh.
