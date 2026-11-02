# Fase 07 — Lapor perubahan & re-verifikasi

Mekanisme supaya data tidak membusuk diam-diam.

**Prasyarat:** Fase 05 selesai.

---

## Masalah yang diselesaikan

Direktori mati pelan-pelan. Bukan karena kodenya rusak, tapi karena
nomor berubah, harga naik, layanan tutup, dan tidak ada yang tahu. Enam
bulan setelah publish, separuh isinya bisa jadi salah tanpa satu pun
error di log.

Dua pengaman: jalur laporan dari pengguna, dan pengingat internal untuk
dirimu sendiri.

---

## 1. Tombol lapor

Ada di setiap halaman detail, di bawah stempel verifikasi.

Teks: "Ada yang tidak sesuai? Beri tahu kami"

Implementasi untuk v1 — pilih yang paling ringan:

**Opsi A (paling sederhana):** tautan `mailto:` dengan subjek dan isi
yang sudah terisi otomatis, termasuk nama layanan dan slug-nya.

**Opsi B:** form pihak ketiga tanpa pelacakan, misalnya instance
Formspark atau form yang kamu host sendiri.

**Jangan** bangun backend untuk ini di v1. Volume laporannya akan
sangat kecil di awal, dan backend berarti ada tempat penyimpanan yang
harus dijaga.

Formnya, apa pun bentuknya, **tidak boleh meminta identitas pelapor**.
Cukup: layanan mana, apa yang salah, dan opsional kontak balik. Orang
yang melaporkan bahwa nomor psikolog sudah mati tidak perlu
memperkenalkan diri.

Setelah mengirim, tampilkan konfirmasi yang jujur: "Terima kasih. Kami
akan cek dan perbarui." Jangan janjikan tenggat waktu yang tidak bisa
kamu penuhi.

## 2. Skrip audit kesegaran

Skrip Node di `scripts/audit.mjs`, dijalankan manual.

Fungsinya: baca semua entri, hitung umur `last_verified`, cetak laporan.

```
SUAR — audit kesegaran data
Dijalankan: 21 Agu 2026

Usang (>180 hari) — 3 entri, perlu dicek ulang:
  - Contoh Klinik A          dicek 190 hari lalu
  - Contoh Puskesmas B       dicek 210 hari lalu

Menua (91–180 hari) — 7 entri

Segar (≤90 hari) — 28 entri

Rata-rata umur data: 64 hari
```

Tambahkan sebagai skrip npm: `npm run audit`.

Jalankan sebulan sekali. Masukkan ke kalender — ini satu-satunya bagian
pemeliharaan yang tidak boleh dilewat.

## 3. Alur re-verifikasi

Saat menemukan entri usang atau menerima laporan:

1. Konfirmasi ulang lewat kanal yang sama seperti Fase 02
2. Perbarui field yang berubah
3. Perbarui `last_verified` ke tanggal hari ini
4. Commit dengan pesan yang menyebut apa yang berubah

Riwayat Git jadi jejak audit. Kalau nanti ada yang bertanya "kapan
harga ini terakhir benar", jawabannya ada di log.

**Kalau layanan ternyata sudah tutup:** jangan langsung hapus. Tandai
dengan field `status: tutup` dan tampilkan dengan teks jelas di halaman
detail. Orang yang mencari nama itu berhak tahu bahwa layanannya sudah
tidak ada — kalau entri langsung hilang, mereka akan mengira salah
ingat dan mencari lagi.

Hapus permanen setelah 6 bulan bertanda tutup.

---

## Kriteria selesai

- [ ] Tombol lapor ada di setiap halaman detail dan berfungsi
- [ ] Form tidak meminta identitas pelapor
- [ ] `npm run audit` berjalan dan laporannya akurat
- [ ] Field `status` sudah masuk skema Fase 01 dengan nilai `aktif` atau `tutup`
- [ ] Entri bertanda tutup tampil dengan penanda jelas, tidak hilang
- [ ] Pengingat audit bulanan sudah masuk kalender pribadimu

## Catatan

Fase ini yang membedakan direktori yang dirawat dari direktori yang
ditinggalkan. Kode di sini sedikit, tapi kebiasaannya yang penting.

Kalau suatu saat kamu tidak sanggup lagi merawatnya — itu wajar dan
boleh — hal paling bertanggung jawab bukan membiarkannya membusuk, tapi
memasang catatan jujur di beranda bahwa data terakhir diperbarui pada
tanggal tertentu dan tidak lagi dipelihara. Tulis rencana itu sekarang,
selagi belum dibutuhkan.
