# Fase 00 — Fondasi

Menyiapkan token desain, font, aturan agen, dan kerangka layout.
Setelah fase ini, setiap keputusan visual berikutnya tinggal memanggil
token — tidak ada lagi warna yang diketik manual.

**Prasyarat:** repo Astro sudah dibuat, Tailwind v4 dan Preact sudah
terpasang, paket Fontsource sudah di-install.

---

## Deliverable

- `src/styles/global.css` berisi seluruh token
- `AGENTS.md` di root
- `src/layouts/Base.astro` sebagai kerangka semua halaman
- Satu halaman uji yang membuktikan token dan font terpasang benar

---

## 1. Token desain

Isi `src/styles/global.css`. Tulis sendiri, jangan serahkan ke agen —
kalau dibuat otomatis hasilnya hampir pasti melenceng ke palet bawaan
Tailwind.

```css
@import "tailwindcss";

@theme {
  --color-naungan: #EFF2EF;
  --color-permukaan: #FFFFFF;
  --color-tinta: #1C2420;
  --color-redup: #5F6B64;
  --color-aksen: #1F5148;
  --color-gratis: #8C6A16;
  --color-usang: #8A4B3A;

  --color-garis: #DDE3E0;
  --color-gratis-bg: #F0E9D4;
  --color-aksen-bg: #E3EAE7;

  --font-display: "Bricolage Grotesque Variable", system-ui, sans-serif;
  --font-body: "Public Sans Variable", system-ui, sans-serif;
  --font-data: "IBM Plex Mono", ui-monospace, monospace;
}
```

Aturan pemakaian:

| Token | Dipakai untuk | Jangan dipakai untuk |
|---|---|---|
| `naungan` | latar halaman | latar baris entri |
| `permukaan` | latar baris entri | latar halaman |
| `tinta` | judul, teks utama | teks sekunder |
| `redup` | teks sekunder, tanggal, keterangan | judul |
| `aksen` | harga gratis, status terverifikasi, tautan | dekorasi, latar besar |
| `gratis` | badge subsidi/BPJS | teks biasa |
| `usang` | status perlu dicek ulang | apa pun selain itu |

`aksen` tidak boleh muncul lebih dari dua kali dalam satu baris entri.
Begitu satu warna dipakai untuk menghias, seluruh sistemnya kehilangan
makna.

## 2. Font

Impor dari Fontsource di `Base.astro`, bukan dari CDN:

```js
import "@fontsource-variable/bricolage-grotesque";
import "@fontsource-variable/public-sans";
import "@fontsource/ibm-plex-mono/400.css";
import "@fontsource/ibm-plex-mono/500.css";
```

Alasannya bukan performa. Orang yang mencari layanan kesehatan mental
tidak seharusnya IP-nya terkirim ke pihak ketiga hanya karena membuka
halaman ini.

Skala tipografi:

| Peran | Ukuran | Font | Bobot |
|---|---|---|---|
| Judul halaman | 32px | display | 500 |
| Nama entri | 17px | display | 500 |
| Teks isi | 16px | body | 400 |
| Keterangan entri | 14px | body | 400 |
| Badge | 12px | body | 400 |
| Stempel verifikasi | 11px | data | 400, letter-spacing 0.03em |

Minimum 16px untuk teks isi. Banyak pengguna akan membuka ini di HP
murah dengan layar kecil.

## 3. AGENTS.md

Buat di root. Cursor membacanya tiap sesi. Tanpa file ini kamu akan
menghabiskan lebih banyak token untuk mengoreksi daripada membangun.

```markdown
# Aturan untuk Suar

Suar adalah direktori layanan kesehatan mental terjangkau di Indonesia.
Penggunanya sering sedang dalam kondisi sulit. Kejelasan dan akurasi
lebih penting daripada kelengkapan fitur.

## Visual — dilarang

- Kartu melayang, box-shadow, gradient, glassmorphism
- Grid kartu untuk daftar entri (pakai list + pembatas garis rambut)
- Sudut membulat berlebihan (maksimal 8px, kartu 12px)
- Emoji sebagai ikon
- Warna hex mentah di komponen — selalu lewat token
- Animasi selain fade sederhana
- Hero besar dengan teks di tengah

## Visual — wajib

- Rata kiri, bukan rata tengah
- Daftar entri: list dengan pembatas garis rambut
- Sentence case di seluruh antarmuka
- Kontras minimal WCAG AA
- Target sentuh minimal 44x44px

## Data

- Setiap entri wajib punya last_verified dan verified_by
- Entri tanpa keduanya harus menggagalkan build
- Entri kedaluwarsa DITANDAI, tidak disembunyikan dan tidak dihapus
- Jangan pernah membuat data entri contoh yang terlihat asli — kalau
  butuh placeholder, beri nama yang jelas fiktif

## Teknis

- Astro dengan output statis. Preact island hanya untuk filter.
- Halaman inti harus bisa dijelajahi tanpa JavaScript
- Font dari Fontsource, tidak ada permintaan ke CDN pihak ketiga
- Tanpa analytics, tanpa cookie, tanpa akun

## Copy

- Jangan menjanjikan hasil ("sembuh", "lebih baik", "pulih")
- Jangan menyiratkan pengguna sedang bermasalah
- Deskriptif dan tenang, bukan menyemangati
- Sebut layanan dengan nama yang dipakai orang, bukan istilah sistem
```

## 4. Layout shell

`src/layouts/Base.astro`:

- `lang="id"` pada tag html
- Latar `naungan`, teks `tinta`
- Lebar konten maksimal 720px, rata kiri, padding 20px di mobile
- Header: wordmark "suar" di `font-display` 500, ukuran 20px, tanpa ikon
- Footer: tautan ke halaman batasan, privasi, dan lapor perubahan
- **Jalur bantuan darurat** wajib ada di setiap halaman (isi menyusul
  di Fase 06 — untuk sekarang cukup slot kosongnya)
- Skip link ke konten utama sebagai elemen pertama yang bisa difokus

Jangan buat toggle dark mode. Untuk v1, satu mode saja, dikerjakan
dengan benar.

---

## Kriteria selesai

- [ ] `global.css` berisi seluruh token, tidak ada warna Tailwind bawaan yang dipakai
- [ ] Ketiga font ter-render benar di halaman uji (cek visual, jangan percaya build lolos)
- [ ] Tab network di DevTools: nol permintaan ke domain selain milik sendiri
- [ ] `AGENTS.md` ada di root
- [ ] `Base.astro` dipakai oleh halaman uji, skip link berfungsi
- [ ] Halaman uji menampilkan seluruh swatch warna dan skala tipografi

## Tidak dikerjakan di fase ini

Skema data, komponen entri, filter, halaman apa pun selain halaman uji.

## Catatan

Halaman uji itu untuk kamu, bukan untuk pengguna. Simpan di
`src/pages/uji.astro` dan hapus sebelum publish, atau kunci di balik
pengecekan `import.meta.env.DEV`.
