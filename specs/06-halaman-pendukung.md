# Fase 06 — Halaman pendukung

Halaman yang tidak menampilkan data, tapi menentukan apakah produk ini
bertanggung jawab atau tidak.

**Prasyarat:** Fase 00 selesai. Bisa dikerjakan kapan saja setelahnya.

---

## Deliverable

- `src/pages/tentang.astro`
- `src/pages/batasan.astro`
- `src/components/JalurDarurat.astro` — dipasang di `Base.astro`
- `src/pages/privasi.astro`
- Opsional: `src/pages/panduan.astro`

---

## 1. Jalur darurat — prioritas tertinggi

**Wajib ada di setiap halaman.** Kerjakan ini duluan di fase ini.

Bentuknya: satu blok tenang di bagian bawah setiap halaman, di atas
footer. Bukan banner merah, bukan pop-up, bukan sesuatu yang berkedip.

Isinya:

> **Kalau kamu butuh bantuan sekarang**
> Layanan darurat kesehatan jiwa: 119 ext. 8
> [nama hotline lokal] — [jam operasional]
>
> Kalau situasinya mendesak, hubungi 112 atau IGD rumah sakit terdekat.

Aturan:

- Verifikasi setiap nomor sebelum publish. Nomor krisis yang salah lebih
  buruk daripada tidak ada.
- Cantumkan jam operasional. Hotline yang tidak 24 jam harus jelas
  tertulis jamnya, supaya tidak ada yang menelepon jam 3 pagi lalu
  menyimpulkan tidak ada yang peduli.
- Nada tenang. Jangan pakai warna peringatan, jangan pakai tanda seru.
- Jangan sembunyikan di balik accordion.

Sebelum publish, cek ulang daftar hotline yang masih aktif. Beberapa
layanan yang dulu banyak direkomendasikan sudah tidak beroperasi.

## 2. Halaman batasan

Judulnya "Batasan", bukan "Disclaimer". Bahasa Indonesia, dan lebih
jujur maksudnya.

Isinya, dalam kalimat biasa bukan poin hukum:

- Suar adalah direktori informasi. Bukan layanan kesehatan, bukan
  penyedia terapi, bukan layanan darurat.
- Tidak ada penilaian kualitas. Suar mencantumkan apa yang ada dan
  berapa biayanya — tidak menilai mana yang lebih baik.
- Informasi bisa berubah kapan saja. Setiap entri punya tanggal
  verifikasi; hubungi layanan langsung sebelum datang.
- Suar tidak berafiliasi dengan layanan mana pun dan tidak menerima
  bayaran untuk pencantuman.
- Suar tidak menyimpan data apa pun tentang pengunjung.

Tulis maksimal 300 kata. Halaman batasan yang panjang tidak dibaca
siapa pun, dan itu mengalahkan tujuannya.

## 3. Halaman tentang

Ceritakan kenapa ini dibuat, tanpa menjadikan dirimu sendiri topiknya.

Nada yang tepat: informasi layanan terjangkau di Indonesia tersebar dan
tidak terawat — ada di thread lama, di story yang sudah hilang, di
halaman yang tidak pernah diperbarui. Suar mengumpulkannya di satu
tempat dan mengeceknya secara berkala.

Jelaskan juga cara kerja verifikasinya. Transparansi metode adalah
alasan orang mempercayai direktori.

Kamu tidak perlu menceritakan kondisi pribadimu di sini. Kalau nanti
ingin, itu keputusan yang bisa diambil setelah situsnya jalan — bukan
sesuatu yang harus diputuskan sekarang.

## 4. Halaman privasi

Pendek, karena memang tidak ada yang dikumpulkan:

> Suar tidak menyimpan data apa pun tentang pengunjung. Tidak ada akun,
> tidak ada cookie, tidak ada analytics, tidak ada pelacak pihak ketiga.
> Font dan seluruh aset dimuat dari server Suar sendiri, jadi tidak ada
> pihak lain yang tahu kamu membuka halaman ini.

Kalau nanti kamu memasang Umami self-hosted, perbarui halaman ini dan
jelaskan persis apa yang dicatat. Jangan pernah biarkan halaman ini
menjadi tidak akurat.

## 5. Panduan (opsional untuk v1)

Materi "Peta rute mencari bantuan" dari rencana awal: beda psikolog dan
psikiater, apa yang terjadi di sesi pertama, cara kerja BPJS untuk
layanan jiwa, kisaran biaya umum, dan bahwa berhenti karena merasa tidak
cocok itu wajar.

Kalau waktu mepet, tunda ke setelah v1. Direktori tanpa panduan tetap
berguna; panduan tanpa direktori tidak.

---

## Kriteria selesai

- [ ] Jalur darurat muncul di setiap halaman, termasuk halaman detail
- [ ] Setiap nomor darurat sudah diverifikasi aktif dalam 7 hari terakhir
- [ ] Jam operasional tercantum untuk setiap hotline
- [ ] Halaman batasan di bawah 300 kata
- [ ] Halaman privasi akurat — tidak menjanjikan hal yang tidak benar
- [ ] Semua tertaut dari footer

## Catatan

Blok jalur darurat mungkin terasa berlebihan untuk direktori yang isinya
cuma daftar alamat. Tapi sebagian pengunjung akan datang ke sini pada
malam terburuk mereka, dan mereka tidak akan membaca halaman batasan
dulu. Blok itu ada untuk mereka.
