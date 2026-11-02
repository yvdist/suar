# Fase 08 — Aksesibilitas, performa, SEO

Menjadikan situs benar-benar bisa dipakai oleh orang yang akan
memakainya — sering di HP murah, koneksi lambat, layar kecil, dan dalam
kondisi sulit berkonsentrasi.

**Prasyarat:** Fase 03–06 selesai.

---

## 1. Aksesibilitas

Target: Lighthouse aksesibilitas 100, dan lolos pemeriksaan manual.

Checklist:

- [ ] Satu `h1` per halaman, jenjang heading tidak melompat
- [ ] Semua kontrol form punya label yang terhubung
- [ ] Fokus keyboard terlihat jelas di setiap elemen interaktif —
      jangan pernah `outline: none` tanpa pengganti
- [ ] Urutan Tab mengikuti urutan visual
- [ ] Skip link ke konten utama sebagai elemen fokus pertama
- [ ] Kontras minimal 4.5:1 untuk teks biasa, 3:1 untuk teks besar.
      Periksa `redup` di atas `permukaan` — ini yang paling rawan gagal.
- [ ] Status verifikasi tidak hanya dibedakan warna; teksnya juga berbeda
- [ ] Perubahan jumlah hasil filter diumumkan lewat `aria-live="polite"`
- [ ] Bottom sheet mobile menjebak fokus saat terbuka, mengembalikan
      fokus ke tombol pemicu saat ditutup, dan tertutup dengan Esc
- [ ] `prefers-reduced-motion` dihormati
- [ ] Tetap terbaca dan bisa dipakai pada zoom 200%
- [ ] Target sentuh minimal 44×44px

Uji dengan keyboard saja selama lima menit penuh. Kalau ada yang tidak
bisa dicapai, itu bug, bukan detail kecil.

## 2. Performa

Target Lighthouse: performa ≥ 95 pada simulasi 4G lambat.

- [ ] JS yang dikirim di bawah 30KB terkompresi (hanya island filter)
- [ ] CSS di bawah 15KB terkompresi
- [ ] Font di-subset ke `latin` saja; pakai `font-display: swap`
- [ ] Preload hanya font display dan body, jangan mono
- [ ] Tidak ada gambar di jalur render kritis
- [ ] Tidak ada permintaan ke domain pihak ketiga — nol, bukan sedikit
- [ ] Cumulative Layout Shift di bawah 0.1
- [ ] Halaman daftar bisa dipakai di bawah 2 detik pada 4G lambat

Uji di perangkat sungguhan, bukan hanya throttling di desktop. Pinjam
HP paling murah yang bisa kamu akses.

## 3. SEO

Yang harus dimenangkan bukan kata "suar", tapi kata kunci layanan.
Tidak ada yang mengetik nama brand untuk mencari psikolog.

Kata kunci sasaran:
- "psikolog murah [kota]"
- "konseling gratis [kota]"
- "psikiater BPJS [kota]"
- "konseling mahasiswa [kota]"
- "puskesmas psikolog [kota]"

Yang perlu dikerjakan:

- [ ] `<title>` tiap halaman deskriptif dan berbeda
- [ ] Meta description dari data asli, bukan template generik
- [ ] `sitemap.xml` (pakai `@astrojs/sitemap`)
- [ ] `robots.txt` mengizinkan semua
- [ ] Data terstruktur `schema.org/MedicalClinic` atau `LocalBusiness`
      di halaman detail — bantu mesin pencari memahami harga dan lokasi
- [ ] URL kanonik
- [ ] Halaman daftar punya teks pembuka yang menyebut kota dan jenis
      layanan secara alami

Jangan buat halaman doorway atau menumpuk kata kunci. Selain merusak
nada situs, ini kategori yang dipantau ketat oleh mesin pencari — dan
konten kesehatan yang terlihat manipulatif justru akan diturunkan.

## 4. Metadata sosial

- [ ] Open Graph dasar untuk beranda saja
- [ ] Halaman detail **tidak** punya OG image berisi nama layanan.
      Pratinjau tautan muncul di aplikasi pesan, dan bisa terlihat oleh
      orang lain yang membuka HP pengguna.

---

## Kriteria selesai

- [ ] Lighthouse: performa ≥95, aksesibilitas 100, best practices 100
- [ ] Lolos uji keyboard-only selama lima menit
- [ ] Diuji di HP Android kelas bawah sungguhan
- [ ] Tab network: nol domain pihak ketiga
- [ ] Diuji dengan JS mati di semua halaman

## Catatan

Aksesibilitas di produk ini bukan formalitas. Sebagian pengguna akan
membukanya dalam kondisi sulit fokus, dengan tangan gemetar, atau lewat
pembaca layar. Situs yang menuntut ketelitian untuk dipakai akan gagal
tepat pada orang yang paling membutuhkannya.
