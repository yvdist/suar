# Fase 05 — Halaman detail

Satu halaman per layanan. Isinya semua yang tidak muat di baris daftar,
terutama hal-hal yang menentukan apakah seseorang benar-benar bisa
datang.

**Prasyarat:** Fase 03 selesai.

---

## Deliverable

- `src/pages/layanan/[slug].astro` dengan `getStaticPaths`
- Slug dibuat dari nama layanan, huruf kecil, tanda hubung

---

## Susunan halaman

```
← Kembali ke daftar

Nama layanan
Psikolog klinis · Jakarta Pusat

BIAYA
Rp0 · Ditanggung BPJS

CARA DATANG
Tatap muka dan online
Perlu janji temu, tanpa rujukan
Senin–Jumat, 08.00–14.00

KONTAK
Telepon    021-xxxxxxx
WhatsApp   08xx-xxxx-xxxx
Situs      contoh.id

ALAMAT
Jl. Contoh No. 1, Menteng, Jakarta Pusat

CATATAN
Kuota per hari terbatas, datang pagi.

────────────────────────────────
● DICEK 12 AGU 2026
Sumber: konfirmasi WhatsApp
Ada yang tidak sesuai? Beri tahu kami →
```

Aturan:

- Judul bagian (BIAYA, KONTAK, dst): `font-data` 11px, `redup`,
  letter-spacing longgar. Ini satu-satunya tempat huruf besar dipakai
  selain stempel — dan ini disengaja, meminjam kosakata papan
  informasi publik.
- Lewati bagian yang kosong sepenuhnya. Jangan tampilkan "Alamat: -".
- Nomor telepon jadi tautan `tel:`, WhatsApp jadi `wa.me`
- **Jangan sematkan peta.** Peta berarti memanggil pihak ketiga, dan itu
  membocorkan ke Google bahwa seseorang sedang melihat halaman layanan
  kesehatan mental tertentu. Cukup tautan teks "Buka di peta" yang
  membuka pencarian alamat — dan biarkan pengguna yang memutuskan.

## Bagian "Cara datang"

Ini bagian yang paling sering menentukan apakah orang jadi datang atau
tidak. Tulis dalam kalimat, bukan daftar boolean.

| Kondisi | Kalimat |
|---|---|
| perlu_rujukan | "Perlu rujukan dari faskes tingkat 1" |
| tidak perlu rujukan | "Bisa langsung datang tanpa rujukan" |
| perlu_janji | "Perlu janji temu dulu" |
| tidak perlu janji | "Tidak perlu janji temu" |

Gabungkan jadi satu atau dua kalimat pendek. Pembaca sedang mencari
jawaban atas "apa yang harus saya lakukan", bukan daftar atribut.

## Bagian penutup

Wajib ada tiga hal:

1. Stempel verifikasi, sama persis komponennya dengan di daftar
2. Sumber informasi, apa adanya. Kalau belum dikonfirmasi langsung,
   katakan begitu: "Sumber: situs resmi, belum dikonfirmasi langsung."
3. Tautan lapor perubahan (fungsinya menyusul di Fase 07)

Kejujuran soal tingkat keyakinan itu fitur, bukan kelemahan. Pengguna
yang tahu informasinya mungkin sudah lama akan menelepon dulu sebelum
berangkat — dan itu justru menyelamatkan perjalanan sia-sia.

## Metadata

- `<title>`: `{nama} — biaya dan cara mendaftar | Suar`
- Meta description dari data, bukan teks generik
- Tanpa Open Graph image untuk v1. Kalau nanti ditambah, jangan
  cantumkan nama layanan di gambar — pratinjau tautan bisa terlihat
  oleh orang lain di aplikasi pesan pengguna.

---

## Kriteria selesai

- [ ] Setiap entri punya halamannya sendiri, slug stabil
- [ ] Bagian kosong tidak muncul sama sekali
- [ ] Tautan `tel:` dan `wa.me` berfungsi di HP
- [ ] Nol permintaan ke domain pihak ketiga (cek tab network)
- [ ] Tautan "Kembali ke daftar" mempertahankan filter kalau datang dari daftar terfilter
- [ ] Halaman terbaca tanpa JavaScript
- [ ] Heading berjenjang benar (satu h1, sisanya h2)

## Tidak dikerjakan di fase ini

Layanan serupa, tombol berbagi, cetak. Semua bisa menyusul.
