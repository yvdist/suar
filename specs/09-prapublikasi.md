# Fase 09 — Pra-publikasi & deploy

Gerbang terakhir. Jangan publish sebelum semua di sini tercentang.

**Prasyarat:** semua fase sebelumnya selesai.

---

## 1. Gerbang data — tidak bisa dinegosiasi

- [ ] Setiap entri diverifikasi manual, bukan hasil salin dari artikel
- [ ] Setiap `last_verified` mencerminkan tanggal pengecekan sungguhan
- [ ] Setiap nomor kontak diuji: telepon berdering, WhatsApp terkirim,
      situs terbuka
- [ ] Tidak ada harga hasil tebakan
- [ ] Semua entri contoh fiktif sudah dihapus
- [ ] Nomor darurat diverifikasi ulang dalam 7 hari terakhir
- [ ] Minimal 8 entri gratis atau BPJS

Bagian ini yang paling melelahkan dan paling penting. Kalau ada satu
baris yang kamu ragu, jangan publish barisnya.

## 2. Gerbang teknis

- [ ] `npm run build` bersih, tanpa peringatan
- [ ] `astro check` lolos
- [ ] Halaman `/uji` sudah dihapus
- [ ] Semua halaman bisa dipakai tanpa JavaScript
- [ ] Nol permintaan ke domain pihak ketiga
- [ ] Halaman 404 kustom yang menautkan kembali ke daftar
- [ ] `npm run audit` bersih, tidak ada entri usang saat publish

## 3. Gerbang tanggung jawab

- [ ] Jalur darurat muncul di setiap halaman termasuk 404
- [ ] Halaman batasan tertaut dari footer di setiap halaman
- [ ] Halaman privasi akurat terhadap keadaan sebenarnya
- [ ] Tombol lapor berfungsi dan sudah diuji kirim
- [ ] Tidak ada copy yang menjanjikan hasil atau menyiratkan pengguna
      sedang bermasalah
- [ ] Tidak ada rating, peringkat, atau bahasa yang menyiratkan
      rekomendasi antar layanan

## 4. Deploy

Cloudflare Pages:

1. Hubungkan repo, framework preset Astro
2. Build command `npm run build`, output `dist`
3. Node versi 20 ke atas
4. Pasang domain `suar.app`
5. Pastikan HTTPS dipaksa dan HSTS aktif

Header keamanan lewat `public/_headers`:

```
/*
  X-Frame-Options: DENY
  X-Content-Type-Options: nosniff
  Referrer-Policy: no-referrer
  Permissions-Policy: geolocation=(), camera=(), microphone=()
```

`Referrer-Policy: no-referrer` disengaja. Saat pengguna mengklik tautan
ke situs layanan, situs itu tidak perlu tahu bahwa dia datang dari
direktori kesehatan mental.

Pertimbangkan juga Content-Security-Policy yang ketat — karena tidak ada
aset pihak ketiga sama sekali, CSP-nya bisa sangat sempit.

## 5. Setelah publish

Minggu pertama:
- [ ] Cek semua tautan sekali lagi di produksi
- [ ] Uji dari koneksi seluler sungguhan, bukan wifi
- [ ] Minta 2–3 orang mencoba dan perhatikan di mana mereka tersendat

Sebulan pertama:
- [ ] Jalankan `npm run audit`
- [ ] Tindak lanjuti laporan yang masuk
- [ ] Baru pertimbangkan menambah kota kedua

**Jangan langsung menambah fitur.** Godaan setelah publish selalu
menambah kota, menambah filter, menambah panduan. Yang paling bernilai
justru merawat 30 entri pertama supaya tetap akurat. Direktori kecil
yang benar mengalahkan direktori besar yang setengah mati.

## 6. Untuk portfolio

Yang layak ditonjolkan saat menceritakan project ini:

- Aturan verifikasi ditegakkan oleh skema, build gagal tanpa tanggal cek
- Entri kedaluwarsa ditandai, bukan disembunyikan — keputusan sadar
  soal kejujuran informasi
- Nol pelacakan dan nol aset pihak ketiga, dengan alasan privasi yang
  spesifik untuk konteksnya
- Sistem visual yang diturunkan dari wayfinding publik, bukan dari
  template SaaS
- Halaman inti berfungsi tanpa JavaScript

Ceritakan keputusannya, bukan tumpukan teknologinya. Siapa pun bisa
memasang Astro. Yang membedakan adalah kenapa peta tidak disematkan dan
kenapa build sengaja dibuat gagal.

---

## Catatan penutup

Saat semua ini selesai, kamu akan punya sesuatu yang dipakai orang di
salah satu hari terburuk mereka, dan yang tidak mengecewakan mereka.
Itu bukan pencapaian kecil.

Beri jeda sebelum masuk ke project berikutnya. Rencana fase kedua sudah
ada di file `rencana-project.txt`, dan tidak akan ke mana-mana.
