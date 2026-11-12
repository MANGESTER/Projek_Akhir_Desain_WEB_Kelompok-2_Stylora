# Stylora — Direktori & Agregator Inspirasi Fashion Lokal
Proyek Kelompok 2 (Desain Web, PTIK UNS). Website statis (HTML, CSS, JavaScript) tanpa build tool, siap di-deploy ke **GitHub Pages**.

## Struktur Folder
```
index.html   Kerangka halaman (navbar, footer, modal)           -> Ken
style.css    Design system, layout responsif (Grid/Flexbox)      -> Ken
data.js      Data produk, artikel, ulasan (dummy)                -> Adibah / Dika
script.js    Logika: routing, pencarian, filter, sort, PDP,
             modal "Beli di...", favorit (localStorage)          -> Dika
favicon.svg  Logo di tab browser (+ favicon-32.png, apple-touch-icon.png)
img/         Aset gambar (hasil potongan dari mockup)            -> Fatimah
README.md    Dokumentasi + catatan perubahan                     -> Keisha
```

Gaya kode sengaja dibuat sederhana: `function` biasa, `for` loop, `if/else`, nama variabel & komentar berbahasa Indonesia, dan CSS satu properti per baris (tanpa `clamp()`/`min()`; responsif lewat media query 1000px dan 760px). `script.js` berurutan dari atas: alat bantu, favorit, toast & modal, komponen HTML, halaman, router, event, lalu jalankan aplikasi.

## Menjalankan
Buka `index.html` di browser, atau jalankan server lokal (`python3 -m http.server`) lalu buka `http://localhost:8000`.
Deploy: GitHub repo > Settings > Pages > Branch `main` / root. Navigasi memakai hash (`#/wanita`), jadi tidak perlu konfigurasi server.

## Halaman & Fitur
| Halaman | Rute | Sumber mockup |
|---|---|---|
| Beranda | `#/` | Mockup 2 (Beranda) |
| Koleksi Terbaru | `#/koleksi-terbaru` | Mockup 2 |
| Wanita / Pria / Aksesori | `#/wanita` `#/pria` `#/aksesori` | Mockup 2 |
| Detail Produk (PDP) | `#/produk/w1` | Mockup 3 (Stylora) |
| Inspirasi Gaya + artikel | `#/inspirasi`, `#/inspirasi/j1` | Mockup 1 & 2 |
| Tentang Kami | `#/tentang` | Mockup 2 |
| Favorit | `#/favorit` | Mockup 1 (Wishlist) |

Fitur sesuai dokumen: pencarian, penyaringan kategori, sorting, PDP, modal "Beli di...", favorit berbasis `localStorage` (kunci `stylora:fav`).

## Efek & Transisi
- **CSS** (bagian paling bawah `style.css`): hover/klik tombol, kartu naik saat hover, fokus input, kartu muncul bertahap, modal/pencarian/menu HP muncul halus.
- **JavaScript** (`efekPop`, `aktifkanEfekMuncul` di `script.js`): ikon hati "membal" saat diklik, bagian halaman memudar naik saat di-scroll, foto produk memudar saat ganti thumbnail.
- Efek otomatis mati bagi pengguna yang mengaktifkan "kurangi gerakan" di perangkatnya (`prefers-reduced-motion`).

---
## Catatan Perubahan & Tambahan terhadap Mockup / Pembagian Tugas

### A. Perubahan karena mockup tidak konsisten dengan konsep Stylora
1. **Branding RUANG -> Stylora.** Mockup 1 & 2 masih memuat sisa template toko "RUANG" (footer, "Cerita RUANG", email halo@ruang.id). Semua diganti Stylora; email menjadi `halo@stylora.id` (placeholder, mohon dikonfirmasi).
2. **Konsep toko online dihapus.** Mockup 1 & 2 memuat keranjang, Ringkasan Pesanan, "Tambah ke keranjang", dan "Gratis ongkir". Dokumen mendefinisikan Stylora sebagai direktori/agregator (transaksi di toko eksternal), sehingga ikon keranjang -> **Favorit** (dengan penghitung), banner ongkir -> "Direktori inspirasi fashion lokal...", dan footer "Pengiriman & pengembalian" dihapus. Halaman Keranjang tidak dibuat.
3. **Tombol beli mengikuti Mockup 3 (versi terbaru):** Shopee, Tokopedia, WhatsApp. Ketiganya membuka **modal "Beli di..."** (sesuai dokumen) berisi ringkasan warna/ukuran dan disclaimer sebelum menuju toko.
4. **Navigasi digabung.** Mockup 2: Beranda, Koleksi terbaru, Wanita, Pria, Aksesori, Cerita kami. Mockup 3: Wanita, Pria, Aksesoris, Inspirasi Gaya. Hasil: Beranda, Koleksi Terbaru, Wanita, Pria, Aksesori, **Inspirasi Gaya**; "Tentang Kami" dipindah ke footer. Ejaan memakai "Aksesori".
5. **PDP berupa halaman penuh, bukan modal.** Dokumen menyebut "modal detail produk (PDP)", tetapi Mockup 3 berupa halaman. Mengikuti mockup; modal hanya dipakai untuk "Beli di...".
6. **Tipografi.** Dokumen: Plus Jakarta Sans. Mockup: judul berserif. Dipakai Plus Jakarta Sans (teks/UI) + Lora (judul/logo). Warna earth-tone diambil langsung dari mockup (olive `#62674f`, krem `#faf8f4`, sage `#e5e5d9`).
7. **Perbaikan salin teks mockup:** deskripsi Aksesori yang tertulis "Koleksi esensial wanita" diperbaiki; judul "Koleksi terbaru minggu ini !!!" dirapikan; "Cerita RUANG" -> "Cerita Stylora".
8. **Nama & harga produk.** Mockup hanya menampilkan nama generik ("Kemeja", "Sepatu") dengan harga berulang. Dibuat **data dummy** bernama dan berharga berbeda di `script.js`. **Perlu diganti data asli.**

### B. Tambahan di luar mockup (diminta dokumen / agar fungsional)
1. **Pencarian** (ikon Cari di navbar) dengan hasil langsung. Dokumen: Dika.
2. **Sorting** (harga, nama) dan **filter sub-kategori** pada halaman kategori; tab Semua/Terbaru/Terlaris/Pilihan tetap dari mockup.
3. **Halaman Favorit** dengan data tersimpan di `localStorage` + "Hapus semua"; ikon hati di kartu/PDP tersinkron.
4. **Newsletter**: validasi email dan simpan ke `localStorage` (`stylora:news`); belum terhubung ke layanan email.
5. **4 produk tambahan** dari bagian "Cocok Dipadukan Dengan" Mockup 3 dimasukkan ke katalog; **halaman artikel** (3 buah) dibuat dari kartu Jurnal Gaya. Teks artikel adalah draf.
6. **Menu mobile (hamburger)**, status "tidak ditemukan", toast notifikasi.
7. Aset foto **dipotong dari mockup** (resolusi terbatas); Fatimah perlu mengganti dengan hasil ekspor Figma ke folder `img/` (nama file = id produk, mis. `w1.jpg`).

### C. Belum dikerjakan
- Slider hero (indikator 01/03), dropdown mega-menu, tulis ulasan (tombol menampilkan notifikasi), halaman Keranjang/Checkout, ulasan untuk produk selain `w1`.
- Link toko memakai pencarian marketplace sebagai placeholder; ganti dengan tautan produk asli per toko.

### D. Pembagian tugas (tetap, hanya penambahan)
Struktur peran pada dokumen tidak diubah. Tambahan kecil: Adibah memvalidasi data ulasan/label bahan pada data dummy, dan Keisha memakai daftar di atas sebagai checklist QA (filter, sort, favorit, modal, responsif HP/tablet/desktop).
