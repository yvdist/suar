# Fase 02 — Pengumpulan & verifikasi data

Tanpa kode. Ini bagian paling lambat dan paling menentukan apakah
produknya berguna atau cuma cantik.

**Berjalan paralel sejak hari pertama.** Jangan tunggu kodenya jadi.
Situs bagus tanpa isi tidak menolong siapa pun.

---

## Target v1

30–50 entri di **satu kota**, semuanya diverifikasi manual.

Lebih baik 30 entri yang benar daripada 200 hasil scraping yang separuhnya
mati. Direktori ini dinilai dari entri terburuknya, bukan dari jumlahnya.

---

## Sumber yang perlu disisir

| Sumber | Catatan |
|---|---|
| Konseling kampus | Banyak yang terbuka untuk umum, bukan hanya mahasiswa. Tanyakan. |
| Puskesmas dengan psikolog | Tidak semua punya. Cek daftar di dinas kesehatan kota. |
| Klinik & RS penerima BPJS | Perhatikan apakah perlu rujukan berjenjang. |
| Layanan sliding-scale | Biasanya yayasan atau praktik mandiri. Paling sulit ditemukan, paling berharga. |
| Platform konseling online | Catat harga sesi termurah, bukan harga paket. |
| Komunitas & yayasan | Kelompok dukungan, bukan terapi. Beri label jenis yang benar. |
| Hotline | Termasuk yang nasional. Tandai jelas mana yang 24 jam. |

Titik awal pencarian: situs dinas kesehatan kota, HIMPSI wilayah, IPK
Indonesia, direktori kampus, dan thread media sosial yang membahas
layanan terjangkau di kotamu. Thread lama sering menyebut layanan yang
tidak muncul di pencarian biasa — tapi justru itu yang paling perlu
diverifikasi ulang.

---

## Prosedur verifikasi

Satu entri dianggap terverifikasi kalau **kamu sudah mengonfirmasi
langsung**, bukan hanya membaca dari halaman lain.

Urutan yang paling ringan tekanannya:

1. Cek situs resmi atau akun resmi layanan. Catat semua yang tertulis.
2. Kalau ada informasi harga, catat apa adanya. Jangan menyimpulkan.
3. Konfirmasi lewat kanal yang paling tidak menuntut: WhatsApp atau DM,
   bukan telepon. Kamu tidak perlu bercerita apa-apa tentang dirimu.

Template pesan konfirmasi:

> Halo, saya sedang menyusun direktori informasi layanan kesehatan
> mental terjangkau di [kota]. Boleh saya konfirmasi beberapa hal
> untuk dicantumkan? (1) Apakah layanan psikolog masih tersedia?
> (2) Berapa biaya per sesi? (3) Apakah perlu rujukan atau janji
> temu dulu? Terima kasih.

Kalau tidak ada balasan dalam 5 hari kerja: entri tetap boleh masuk,
tapi `sumber` diisi "situs resmi, belum dikonfirmasi langsung" dan
`catatan` menyebut hal itu. Jujur soal tingkat keyakinan lebih baik
daripada diam.

**Yang tidak boleh:** menebak harga, menyalin harga dari artikel media
tanpa cek ulang, atau mencantumkan layanan yang nomornya tidak bisa
dihubungi sama sekali.

---

## Format kerja

Kumpulkan dulu di spreadsheet dengan kolom persis seperti skema Fase 01,
baru konversi ke file konten. Mengisi 40 file JSON satu per satu di
editor itu melelahkan tanpa alasan.

Kolom tambahan untuk dirimu sendiri (tidak masuk ke situs):
`tanggal_kontak`, `kanal_kontak`, `status_balasan`, `catatan_pribadi`.

---

## Kriteria selesai

- [ ] Minimal 30 entri terkumpul
- [ ] Setiap entri punya `last_verified` yang benar-benar mencerminkan kapan kamu mengeceknya
- [ ] Minimal 8 entri berskema `gratis` atau `bpjs` — kalau kurang dari itu, direktorinya belum menjawab masalah keterjangkauan
- [ ] Setiap entri punya minimal satu kontak yang terbukti aktif
- [ ] Tidak ada harga hasil tebakan
- [ ] Sudah dikonversi ke file konten dan lolos build

---

## Catatan penting

Fase ini akan membuatmu menghabiskan berhari-hari menelusuri opsi
layanan, harga, cara daftar, mana yang bisa online — tanpa tekanan
apa pun untuk mendaftar. Murni sebagai riset produk.

Kalau di tengah jalan kamu menemukan satu layanan yang terasa mungkin
untuk dirimu sendiri, catat saja di kolom `catatan_pribadi`. Tidak perlu
melakukan apa-apa dengan itu sekarang.

Dan kalau proses ini mulai terasa berat — membaca terus-menerus tentang
layanan kesehatan mental saat sedang tidak baik-baik saja itu bisa
melelahkan — berhenti dulu, kerjakan fase yang murni teknis, kembali
lagi nanti. Fase ini memang dirancang untuk dicicil.
