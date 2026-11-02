# Fase 03 — Daftar entri

Membangun tampilan inti produk: satu baris entri, dan halaman yang
menampilkan semuanya.

**Prasyarat:** Fase 00 dan 01 selesai. Minimal 3 entri contoh ada.

---

## Deliverable

- `src/components/StempelVerifikasi.astro`
- `src/components/BarisEntri.astro`
- `src/pages/index.astro` — halaman daftar

---

## 1. Stempel verifikasi

Ini elemen tanda tangan produk. Kalau ada satu hal yang bikin Suar
terlihat dipikirkan matang, ini dia. Kerjakan duluan.

Struktur:

```
[titik 7px] DICEK 12 AGU 2026
```

Spesifikasi:

- Diset `font-data`, 11px, `letter-spacing: 0.03em`, huruf besar
- Titik status: lingkaran 7px, warna sesuai status kesegaran
- Teks: `redup` untuk status `segar` dan `menua`; `usang` untuk status usang
- Diletakkan **di bawah pembatas garis rambut**, bukan di header entri.
  Posisinya menandakan ini catatan kaki jujur, bukan label promosi.
- Untuk status usang, tambahkan ` · PERLU DICEK ULANG`

Aksesibilitas: titik warna saja tidak cukup. Teksnya harus berbeda juga,
supaya terbaca oleh yang tidak bisa membedakan warna. Bungkus dengan
`<time datetime="...">`.

## 2. Baris entri

Susunan dari atas ke bawah:

```
Nama layanan                                    Rp0
Psikolog klinis · Jakarta Pusat · Senin–Jumat
[Ditanggung BPJS] [Tanpa rujukan]
────────────────────────────────────────────────
● DICEK 12 AGU 2026
```

Aturan:

- Nama: `font-display` 500, 17px, `tinta`, `letter-spacing: -0.01em`
- Harga: `font-data` 12px, rata kanan, sejajar baseline dengan nama.
  Warna `aksen` **hanya kalau gratis**; selain itu `redup`.
- Baris keterangan: 14px `redup`, dipisah ` · `. Isinya jenis layanan,
  lokasi, jam. Lewati bagian yang kosong tanpa meninggalkan pemisah ganda.
- Badge: 12px, `border-radius: 4px`, padding `3px 9px`.
  Skema gratis/BPJS pakai latar `gratis-bg` teks gelap dari keluarga
  yang sama. Badge lain pakai `aksen-bg`.
  Maksimal 3 badge; sisanya muncul di halaman detail.
- Latar `permukaan`, `border-radius: 8px`, padding `16px 18px`
- Seluruh baris adalah tautan ke halaman detail

**Dilarang:** box-shadow, border penuh di sekeliling baris, hover yang
mengangkat atau membesarkan. Hover cukup mengubah latar sedikit.

## 3. Format harga

| Kondisi | Tampilan |
|---|---|
| `harga_min` 0 | `Rp0` warna `aksen` |
| tarif tunggal | `Rp75.000` |
| rentang | `Rp50–150rb` |
| sliding-scale | `Sesuai kemampuan` |

Pemisah ribuan pakai titik, sesuai konvensi Indonesia. Bulatkan tampilan
rentang supaya tidak jadi terlalu panjang.

## 4. Halaman daftar

- Judul halaman: `font-display` 500, 32px
- Satu kalimat pembuka, maksimal dua baris. Deskriptif, bukan
  menyemangati. Contoh nada yang benar: "Layanan kesehatan mental di
  [kota] beserta biayanya." Contoh yang salah: "Kamu tidak sendirian.
  Mari mulai perjalanan pemulihanmu."
- Jumlah entri dan kapan terakhir diperbarui, diset `font-data` 12px
- Daftar entri dengan jarak 10px antar baris
- Urutan default: harga menaik. Yang gratis muncul duluan.

Tanpa hero, tanpa gambar, tanpa tombol ajakan bertindak. Halaman ini
adalah papan informasi, bukan halaman pemasaran.

---

## Kriteria selesai

- [ ] Tiga status stempel tampil benar (uji dengan tiga tanggal berbeda)
- [ ] Entri usang tetap muncul di daftar, tidak disembunyikan
- [ ] Warna `aksen` muncul maksimal dua kali per baris entri
- [ ] Semua harga terformat benar, termasuk kasus gratis dan sliding-scale
- [ ] Baris keterangan tidak menghasilkan ` ·  · ` saat ada field kosong
- [ ] Seluruh baris bisa diklik dan bisa dijangkau dengan Tab
- [ ] Halaman tetap terbaca dengan JavaScript dimatikan
- [ ] Terbaca rapi di lebar 320px

## Tidak dikerjakan di fase ini

Filter, pencarian, halaman detail. Daftar boleh menampilkan semua entri
apa adanya dulu.

## Catatan

Kalau tergoda menambah ikon di sebelah nama layanan — jangan. Ikon di
sini hanya akan jadi dekorasi, dan setiap dekorasi mengurangi kecepatan
memindai. Papan petunjuk stasiun yang baik tidak punya ilustrasi.
