/* Stylora — data.js
   Harga ditulis dalam ribuan rupiah (349 = Rp349.000).
   Nama file gambar produk di folder img/ = id produk (contoh: w1.jpg). */

const NAMA_KATEGORI = {
  "wanita": "Wanita",
  "pria": "Pria",
  "aksesori": "Aksesori"
};

const NAMA_LABEL = {
  "baru": "Baru",
  "terlaris": "Terlaris",
  "pilihan": "Pilihan Kami"
};

const WARNA = ["#d6cbb4","#8f957a","#f1eee6","#2f3128","#a38f73"];
const NAMA_WARNA = ["Natural Oat","Sage","Gading","Arang","Cokelat"];

// Link toko (placeholder: halaman pencarian marketplace)
const TOKO = {
  "Shopee": "https://shopee.co.id/search?keyword=",
  "Tokopedia": "https://www.tokopedia.com/search?q=",
  "WhatsApp": "https://wa.me/?text="
};

const IKON_HATI = "<svg viewBox=\"0 0 24 24\" width=\"16\" height=\"16\"><path d=\"M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.5A4 4 0 0 1 19 10c0 5.6-7 10-7 10z\"/></svg>";

const HEADER_KATEGORI = {
  "wanita": {
    "judul": "Fashion Wanita",
    "deskripsi": "Koleksi esensial wanita dengan warna-warna hangat yang mudah dipadupadankan untuk berbagai suasana."
  },
  "pria": {
    "judul": "Fashion Pria",
    "deskripsi": "Koleksi pakaian kasual pria bernuansa alami yang fleksibel untuk dipadupadankan di berbagai suasana."
  },
  "aksesori": {
    "judul": "Aksesori",
    "deskripsi": "Detail kecil yang melengkapi penampilan sehari-harimu, dari tas dan sepatu hingga perhiasan."
  }
};

// Daftar produk
const PRODUK = [
  { id: "w1", nama: "Kemeja Linen Relaxed", kategori: "wanita", sub: "Atasan", harga: 349, label: "baru", brand: "RUANG", bahan: "100% Linen – Adem & Ringan", jumlahWarna: 3 },
  { id: "w2", nama: "Kemeja Pita Putih", kategori: "wanita", sub: "Atasan", harga: 279, label: "terlaris", brand: "Sejenak", bahan: "Satin ringan, jatuh lembut", jumlahWarna: 4 },
  { id: "w3", nama: "Celana Wide Leg", kategori: "wanita", sub: "Bawahan", harga: 429, label: "baru", brand: "RUANG", bahan: "Katun twill", jumlahWarna: 2 },
  { id: "w4", nama: "Kemeja Garis Halus", kategori: "wanita", sub: "Atasan", harga: 319, label: "pilihan", brand: "Anyam", bahan: "Katun poplin", jumlahWarna: 3 },
  { id: "w5", nama: "Jas Jaket Panjang", kategori: "wanita", sub: "Atasan", harga: 599, label: "", brand: "Sejenak", bahan: "Wol campur", jumlahWarna: 4 },
  { id: "w6", nama: "Rok Midi Satin", kategori: "wanita", sub: "Bawahan", harga: 289, label: "", brand: "Sejenak", bahan: "Satin", jumlahWarna: 2 },
  { id: "w7", nama: "Hijab Voal Polos", kategori: "wanita", sub: "Hijab", harga: 89, label: "terlaris", brand: "Anyam", bahan: "Voal premium", jumlahWarna: 3 },
  { id: "w8", nama: "Set Kemeja & Rok", kategori: "wanita", sub: "Setelan", harga: 499, label: "pilihan", brand: "RUANG", bahan: "Linen campur", jumlahWarna: 4 },
  { id: "p1", nama: "Celana Pleats Wide Leg", kategori: "wanita", sub: "Bawahan", harga: 429, label: "", brand: "RUANG", bahan: "Katun twill", jumlahWarna: 3 },
  { id: "p2", nama: "Rok Linen A-Line", kategori: "wanita", sub: "Bawahan", harga: 319, label: "", brand: "Sejenak", bahan: "Linen campur", jumlahWarna: 4 },
  { id: "m1", nama: "Kaos Katun Everyday", kategori: "pria", sub: "Atasan", harga: 179, label: "terlaris", brand: "RUANG", bahan: "Katun combed 30s", jumlahWarna: 3 },
  { id: "m2", nama: "Setelan Kemeja & Celana", kategori: "pria", sub: "Setelan", harga: 549, label: "baru", brand: "Kolektif", bahan: "Katun twill", jumlahWarna: 4 },
  { id: "m3", nama: "Celana Pleats Krem", kategori: "pria", sub: "Bawahan", harga: 329, label: "baru", brand: "RUANG", bahan: "Katun twill", jumlahWarna: 2 },
  { id: "m4", nama: "Celana Hitam Slim", kategori: "pria", sub: "Bawahan", harga: 299, label: "pilihan", brand: "Kolektif", bahan: "Katun stretch", jumlahWarna: 3 },
  { id: "m5", nama: "Kemeja Resort Cokelat", kategori: "pria", sub: "Atasan", harga: 249, label: "", brand: "Kolektif", bahan: "Rayon", jumlahWarna: 4 },
  { id: "m6", nama: "Kemeja Tekstur Hitam", kategori: "pria", sub: "Atasan", harga: 259, label: "terlaris", brand: "Kolektif", bahan: "Katun tekstur", jumlahWarna: 2 },
  { id: "m7", nama: "Hoodie Black", kategori: "pria", sub: "Atasan", harga: 359, label: "", brand: "Kolektif", bahan: "Fleece katun", jumlahWarna: 3 },
  { id: "m8", nama: "Jaket Kemeja Suede", kategori: "pria", sub: "Atasan", harga: 499, label: "pilihan", brand: "Kolektif", bahan: "Suede sintetis", jumlahWarna: 4 },
  { id: "a1", nama: "Tas Tote Kanvas", kategori: "aksesori", sub: "Tas", harga: 249, label: "pilihan", brand: "Anyam", bahan: "Kanvas tebal, kulit sintetis", jumlahWarna: 3 },
  { id: "a2", nama: "Sepatu Derby Kulit", kategori: "aksesori", sub: "Sepatu", harga: 649, label: "baru", brand: "Tapak", bahan: "Kulit asli", jumlahWarna: 4 },
  { id: "a3", nama: "Jam Tangan Klasik", kategori: "aksesori", sub: "Jam", harga: 799, label: "terlaris", brand: "Waktu", bahan: "Stainless steel", jumlahWarna: 2 },
  { id: "a4", nama: "Tas Bahu Satin", kategori: "aksesori", sub: "Tas", harga: 329, label: "baru", brand: "Anyam", bahan: "Satin & rantai", jumlahWarna: 3 },
  { id: "a5", nama: "Sneakers Hitam Putih", kategori: "aksesori", sub: "Sepatu", harga: 459, label: "pilihan", brand: "Tapak", bahan: "Kanvas & karet", jumlahWarna: 4 },
  { id: "a6", nama: "Kalung Bunga Rose Gold", kategori: "aksesori", sub: "Perhiasan", harga: 189, label: "", brand: "Kilau", bahan: "Stainless plating", jumlahWarna: 2 },
  { id: "a7", nama: "Cincin Kepang Rose Gold", kategori: "aksesori", sub: "Perhiasan", harga: 159, label: "", brand: "Kilau", bahan: "Stainless plating", jumlahWarna: 3 },
  { id: "a8", nama: "Flat Shoes Putih", kategori: "aksesori", sub: "Sepatu", harga: 279, label: "", brand: "Tapak", bahan: "Kulit sintetis", jumlahWarna: 4 },
  { id: "a9", nama: "Kalung Daun Perak", kategori: "aksesori", sub: "Perhiasan", harga: 219, label: "", brand: "Kilau", bahan: "Perak 925", jumlahWarna: 2 },
  { id: "p3", nama: "Tas Bahu Rotan Mini", kategori: "aksesori", sub: "Tas", harga: 285, label: "", brand: "Anyam", bahan: "Rotan anyaman tangan", jumlahWarna: 2 },
  { id: "p4", nama: "Sandal Kulit Everyday", kategori: "aksesori", sub: "Sepatu", harga: 389, label: "", brand: "Tapak", bahan: "Kulit asli", jumlahWarna: 3 }
];

// Artikel Inspirasi Gaya
const ARTIKEL = [
  {
    "id": "j1",
    "gambar": "j1",
    "topik": "Panduan padu padan",
    "judul": "Satu kemeja, tiga suasana",
    "deskripsi": "Dari agenda kerja hingga makan malam, ubah tampilan lewat detail sederhana.",
    "kutipan": "Bukan lebih banyak pakaian, tapi lebih banyak kemungkinan.",
    "isi": [
      {
        "judul": "Agenda kerja, lebih ringan",
        "teks": "Padukan kemeja linen dengan celana pleats berwarna senada. Siluet rapi, tetap adem dipakai seharian."
      },
      {
        "judul": "Waktu luang, tanpa terburu-buru",
        "teks": "Gulung lengan, biarkan kancing atas terbuka, dan tambahkan tas anyaman untuk nuansa santai."
      },
      {
        "judul": "Makan malam, detail yang berbeda",
        "teks": "Ganti dengan rok satin atau sepatu kulit; satu perubahan kecil sudah cukup mengubah suasana."
      }
    ],
    "produk": [
      "w1",
      "w3",
      "p2",
      "p3"
    ]
  },
  {
    "id": "j2",
    "gambar": "j2",
    "topik": "Inspirasi sehari-hari",
    "judul": "Akhir pekan tanpa terburu-buru",
    "deskripsi": "Siluet santai dan bahan nyaman untuk menikmati waktu luangmu.",
    "kutipan": "",
    "isi": [
      {
        "judul": "Warna tanah, bahan alami",
        "teks": "Palet krem, sage, dan cokelat mudah dipadukan tanpa banyak berpikir."
      },
      {
        "judul": "Potongan longgar yang tetap rapi",
        "teks": "Pilih bahan linen atau katun yang jatuh alami di badan."
      }
    ],
    "produk": [
      "w2",
      "w6",
      "a1",
      "p4"
    ]
  },
  {
    "id": "j3",
    "gambar": "j3",
    "topik": "Lemari esensial",
    "judul": "Lebih sedikit, lebih berarti",
    "deskripsi": "Bangun koleksi personal dengan pilihan yang mudah dipakai berulang.",
    "kutipan": "",
    "isi": [
      {
        "judul": "Mulai dari dasar",
        "teks": "Kaos, celana netral, dan satu jaket ringan membentuk fondasi lemari yang fleksibel."
      },
      {
        "judul": "Tambah detail kecil",
        "teks": "Jam tangan atau sepatu bersih bisa menaikkan tampilan paling sederhana."
      }
    ],
    "produk": [
      "m1",
      "m3",
      "a3",
      "a5"
    ]
  }
];

// Ulasan (hanya untuk produk w1)
const ULASAN = [
  {
    "nama": "Nadia P.",
    "tanggal": "28 Okt 2026",
    "varian": "Natural Oat · 163 cm / 54 kg",
    "sesuaiUkuran": true,
    "teks": "Linen-nya adem, nggak kaku. Ukuran M jatuhnya pas relaxed di badan aku. Warna oat-nya gampang banget dipadukan dengan celana apa pun.",
    "foto": "r1"
  },
  {
    "nama": "Alya R.",
    "tanggal": "22 Okt 2026",
    "varian": "S · Natural Oat · 158 cm / 48 kg",
    "sesuaiUkuran": false,
    "teks": "Biasanya pakai S, ini sedikit lebih loose tapi justru suka. Jahitannya rapi, tekstur linen terasa. Dipakai seharian tetap nyaman meski cuaca panas.",
    "foto": "r2"
  },
  {
    "nama": "Dinda K.",
    "tanggal": "18 Okt 2026",
    "varian": "L · Natural Oat · 168 cm / 62 kg",
    "sesuaiUkuran": true,
    "teks": "Suka detail kancing dan bahannya. Sedikit berkerut setelah dipakai, tapi itu yang bikin linen kelihatan natural. L pas di bahu, tetap leluasa bergerak.",
    "foto": "r3"
  }
];
