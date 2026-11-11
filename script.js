/*
  Stylora — script.js
  Isi file ini (urut dari atas):
    1. Alat bantu          5. Halaman-halaman
    2. Favorit             6. Router (pindah halaman)
    3. Toast & modal       7. Event (klik, cari, newsletter)
    4. Komponen HTML       8. Jalankan aplikasi
  Data produk, artikel, dan ulasan ada di data.js
*/

// ===== 1. ALAT BANTU =====

function ambil(selektor) {
  return document.querySelector(selektor);
}

function ambilSemua(selektor) {
  return document.querySelectorAll(selektor);
}

// 349 menjadi "Rp349.000"
function formatRupiah(harga) {
  return 'Rp' + harga.toLocaleString('id-ID') + '.000';
}

// Cari satu produk berdasarkan id. Hasil null jika tidak ada.
function cariProduk(id) {
  for (let i = 0; i < PRODUK.length; i++) {
    if (PRODUK[i].id === id) {
      return PRODUK[i];
    }
  }
  return null;
}

// Ubah daftar id (['w1', 'm1']) menjadi daftar produk
function produkDariId(daftarId) {
  const hasil = [];
  for (let i = 0; i < daftarId.length; i++) {
    const produk = cariProduk(daftarId[i]);
    if (produk) {
      hasil.push(produk);
    }
  }
  return hasil;
}

// Saring produk. Parameter yang dikosongkan ('') tidak dipakai.
function saringProduk(kategori, label, sub) {
  const hasil = [];
  for (let i = 0; i < PRODUK.length; i++) {
    const p = PRODUK[i];
    if (kategori !== '' && p.kategori !== kategori) {
      continue;
    }
    if (label !== '' && p.label !== label) {
      continue;
    }
    if (sub !== '' && p.sub !== sub) {
      continue;
    }
    hasil.push(p);
  }
  return hasil;
}

// Cek email sederhana: tanpa spasi, satu "@", dan ada titik setelah "@"
function emailValid(email) {
  const posisiAt = email.indexOf('@');
  const posisiTitik = email.lastIndexOf('.');

  if (email.indexOf(' ') !== -1) {
    return false;
  }
  if (posisiAt < 1 || posisiAt !== email.lastIndexOf('@')) {
    return false;
  }
  // titik harus ada setelah "@", tidak menempel di "@", dan bukan karakter terakhir
  if (posisiTitik < posisiAt + 2 || posisiTitik === email.length - 1) {
    return false;
  }
  return true;
}

// Hindari karakter HTML berbahaya pada teks yang diketik pengguna
function bersihkanTeks(teks) {
  return teks.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}


// ===== 2. FAVORIT (disimpan di localStorage) =====

const KUNCI_FAVORIT = 'stylora:fav';

function ambilFavorit() {
  try {
    const data = JSON.parse(localStorage.getItem(KUNCI_FAVORIT));
    if (!data) {
      return [];
    }
    // Buang id yang produknya sudah tidak ada
    const bersih = [];
    for (let i = 0; i < data.length; i++) {
      if (cariProduk(data[i])) {
        bersih.push(data[i]);
      }
    }
    return bersih;
  } catch (error) {
    return [];
  }
}

function simpanFavorit(daftar) {
  try {
    localStorage.setItem(KUNCI_FAVORIT, JSON.stringify(daftar));
  } catch (error) {
    // localStorage tidak tersedia (mis. mode privat): abaikan
  }
}

function apakahFavorit(id) {
  return ambilFavorit().indexOf(id) !== -1;
}

// Tambah/hapus produk dari favorit
function ubahFavorit(id) {
  const daftar = ambilFavorit();
  const posisi = daftar.indexOf(id);

  if (posisi === -1) {
    daftar.push(id);
    tampilToast('Disimpan ke favorit');
  } else {
    daftar.splice(posisi, 1);
    tampilToast('Dihapus dari favorit');
  }

  simpanFavorit(daftar);
  perbaruiFavorit();

  // Di halaman Favorit, daftar harus digambar ulang
  if (location.hash === '#/favorit') {
    tampilkanHalaman();
  }
}

// Perbarui angka di navbar dan warna semua ikon hati
function perbaruiFavorit() {
  const daftar = ambilFavorit();
  ambil('#favN').textContent = daftar.length;

  const tombolHati = ambilSemua('[data-fav]');
  for (let i = 0; i < tombolHati.length; i++) {
    const aktif = daftar.indexOf(tombolHati[i].dataset.fav) !== -1;
    tombolHati[i].classList.toggle('on', aktif);
  }
}


// ===== 3. TOAST & MODAL =====

let timerToast = null;

function tampilToast(pesan) {
  const toast = ambil('#toast');
  toast.textContent = pesan;
  toast.classList.add('on');
  clearTimeout(timerToast);
  timerToast = setTimeout(function () {
    toast.classList.remove('on');
  }, 2200);
}

function tutupModal() {
  ambil('#modal').hidden = true;
}

// Modal "Beli di ..." : konfirmasi sebelum menuju toko eksternal
function bukaModalBeli(id, namaToko) {
  const p = cariProduk(id);
  const tombolWarna = ambil('[data-sw].on');
  const tombolUkuran = ambil('[data-sz].on');

  let info = 'Warna ' + tombolWarna.dataset.sw;
  if (tombolUkuran) {
    info += ' · Ukuran ' + tombolUkuran.dataset.sz;
  }

  const kataKunci = encodeURIComponent(p.brand + ' ' + p.nama);

  ambil('#modal').innerHTML = `
    <div class="box" role="dialog" aria-modal="true" aria-label="Beli di ${namaToko}">
      <button class="x" data-close aria-label="Tutup">×</button>
      <h3>Beli di ${namaToko}</h3>
      <div class="mini">
        <img src="img/${p.id}.jpg" alt="">
        <div>
          <b>${p.nama}</b>
          <span>${formatRupiah(p.harga)} · harga referensi</span>
          <span>${info}</span>
        </div>
      </div>
      <p class="small">Kamu akan diarahkan ke toko eksternal. Harga, stok, dan transaksi mengikuti ketentuan toko. Stylora tidak memproses pembayaran.</p>
      <a class="btn" href="${TOKO[namaToko]}${kataKunci}" target="_blank" rel="noopener">Lanjut ke ${namaToko} ↗</a>
      <button class="btn line" data-close>Batal</button>
    </div>`;

  ambil('#modal').hidden = false;
  ambil('.box .btn').focus();
}

// ===== 4. KOMPONEN HTML =====

// Titik warna + teks "3 pilihan warna"
function buatTitikWarna(p) {
  let html = '';
  for (let i = 0; i < p.jumlahWarna; i++) {
    html += '<i style="background:' + WARNA[i] + '"></i>';
  }
  return html + '<span>' + p.jumlahWarna + ' pilihan warna</span>';
}

// Kartu produk (dipakai di banyak halaman)
function buatKartu(p) {
  let badge = '';
  if (p.label !== '') {
    badge = '<span class="badge">' + NAMA_LABEL[p.label] + '</span>';
  }

  let kelasHati = 'heart';
  if (apakahFavorit(p.id)) {
    kelasHati = 'heart on';
  }

  return `
    <article class="card">
      <a class="ph" href="#/produk/${p.id}">
        <img src="img/${p.id}.jpg" alt="${p.nama}" loading="lazy">${badge}
      </a>
      <button class="${kelasHati}" data-fav="${p.id}" aria-label="Simpan ${p.nama} ke favorit">${IKON_HATI}</button>
      <div class="meta">${NAMA_KATEGORI[p.kategori]} · ${p.sub}</div>
      <a class="nm" href="#/produk/${p.id}">${p.nama}</a>
      <div class="pr">${formatRupiah(p.harga)}</div>
      <div class="dots">${buatTitikWarna(p)}</div>
    </article>`;
}

// Gabungkan banyak kartu produk menjadi satu teks HTML
function buatDaftarKartu(daftarProduk) {
  let html = '';
  for (let i = 0; i < daftarProduk.length; i++) {
    html += buatKartu(daftarProduk[i]);
  }
  return html;
}

// Tab filter: Semua / Terbaru / Terlaris / Pilihan esensial
function buatTab() {
  const daftarTab = [
    { nilai: 'semua', teks: 'Semua' },
    { nilai: 'baru', teks: 'Terbaru' },
    { nilai: 'terlaris', teks: 'Terlaris' },
    { nilai: 'pilihan', teks: 'Pilihan esensial' }
  ];

  let html = '<div class="tabs">';
  for (let i = 0; i < daftarTab.length; i++) {
    let kelas = 'tab';
    if (i === 0) {
      kelas = 'tab on';
    }
    html += '<button class="' + kelas + '" data-tab="' + daftarTab[i].nilai + '">' + daftarTab[i].teks + '</button>';
  }
  return html + '</div>';
}

function buatHero(label, judul, deskripsi, gambar, tombol) {
  return `
    <section class="wrap hero">
      <div>
        <p class="eb">${label}</p>
        <h1>${judul}</h1>
        <p class="lead">${deskripsi}</p>
        ${tombol}
      </div>
      <figure>
        <img src="img/${gambar}.jpg" alt="${judul}">
        <figcaption>Esensial untuk setiap hari</figcaption>
      </figure>
    </section>`;
}

// Kartu kategori (gambar + judul), dipakai di Beranda dan Koleksi Terbaru
function buatDaftarKategori(daftar) {
  let html = '';
  for (let i = 0; i < daftar.length; i++) {
    const k = daftar[i];
    html += `
      <a class="cat" href="#/${k.tujuan}">
        <img src="img/${k.gambar}.jpg" alt="" loading="lazy">
        <h3>${k.judul} <i>↗</i></h3>
        <p>${k.teks}</p>
      </a>`;
  }
  return html;
}

function buatDaftarArtikel() {
  let html = '';
  for (let i = 0; i < ARTIKEL.length; i++) {
    const a = ARTIKEL[i];
    html += `
      <a class="art" href="#/inspirasi/${a.id}">
        <img src="img/${a.gambar}.jpg" alt="" loading="lazy">
        <p class="eb">${a.topik}</p>
        <h3>${a.judul}</h3>
        <p>${a.deskripsi}</p>
        <span class="ul">Baca cerita ↗</span>
      </a>`;
  }
  return html;
}


// ===== 5. HALAMAN-HALAMAN =====
// Setiap fungsi halaman mengembalikan { judul, html, setelah }
//   judul   : teks untuk tab browser
//   html    : isi halaman
//   setelah : fungsi yang dijalankan setelah html tampil (boleh null)

// Penanda: grid produk (#grid) di halaman saat ini diisi dengan cara apa
let modeGrid = '';          // 'beranda' | 'kategori' | 'terbaru' | 'favorit' | ''
let kategoriAktif = '';     // dipakai saat modeGrid = 'kategori'
const filter = { tab: 'semua', sub: '', urut: '' };

// Isi ulang #grid sesuai modeGrid dan filter yang aktif
function perbaruiGrid() {
  let hasil = [];
  let pesanKosong = 'Belum ada produk yang cocok.';

  if (modeGrid === 'beranda') {
    if (filter.tab === 'semua') {
      hasil = produkDariId(['w1', 'm1', 'w3', 'a1']);
    } else {
      hasil = saringProduk('', filter.tab, '').slice(0, 4);
    }
  } else if (modeGrid === 'kategori') {
    let label = filter.tab;
    if (label === 'semua') {
      label = '';
    }
    hasil = saringProduk(kategoriAktif, label, filter.sub);

    if (filter.urut === 'asc') {
      hasil.sort(function (a, b) { return a.harga - b.harga; });
    } else if (filter.urut === 'desc') {
      hasil.sort(function (a, b) { return b.harga - a.harga; });
    } else if (filter.urut === 'az') {
      hasil.sort(function (a, b) { return a.nama.localeCompare(b.nama); });
    }
  } else if (modeGrid === 'terbaru') {
    hasil = saringProduk('', 'baru', '');
  } else if (modeGrid === 'favorit') {
    hasil = produkDariId(ambilFavorit());
    pesanKosong = 'Tekan ikon hati pada produk untuk menyimpannya di sini.';
  }

  if (hasil.length === 0) {
    ambil('#grid').innerHTML = '<p class="empty">' + pesanKosong + '</p>';
  } else {
    ambil('#grid').innerHTML = buatDaftarKartu(hasil);
  }
}

function halamanTidakAda() {
  return {
    judul: 'Tidak ditemukan',
    html: `<section class="wrap pagehead" style="text-align:center;padding-bottom:80px">
             <h1>Halaman tidak ditemukan</h1>
             <p><a class="ul" href="#/">Kembali ke beranda</a></p>
           </section>`,
    setelah: null
  };
}

function halamanBeranda() {
  modeGrid = 'beranda';
  filter.tab = 'semua';

  const kategori = [
    { tujuan: 'wanita', judul: 'Wanita', teks: 'Potongan ringan, gaya personal', gambar: 'k1' },
    { tujuan: 'pria', judul: 'Pria', teks: 'Esensial untuk berbagai aktivitas', gambar: 'k3' },
    { tujuan: 'aksesori', judul: 'Aksesori', teks: 'Detail kecil yang melengkapi', gambar: 'k4' },
    { tujuan: 'koleksi-terbaru', judul: 'Pilihan esensial', teks: 'Favorit yang selalu relevan', gambar: 'k2' }
  ];

  const tombolHero = '<a class="btn" href="#/koleksi-terbaru">Jelajahi koleksi ↗</a>' +
    '<a class="ul" href="#/inspirasi">Temukan inspirasi gayamu</a>';

  const html = buatHero('Koleksi baru / Edisi esensial', 'Pilih Stylemu',
    'Temukan potongan esensial yang nyaman dipakai, mudah dipadupadankan, dan selalu terasa seperti dirimu.',
    'hero-home', tombolHero) + `

    <section class="wrap sp">
      <p class="eb">Temukan pilihanmu</p>
      <h2>Mulai dari yang kamu suka</h2><br>
      <div class="g4">${buatDaftarKategori(kategori)}</div>
    </section>

    <section class="band">
      <div class="wrap sp">
        <p class="eb">Dikurasi untukmu</p>
        <div class="row">
          <h2>Pilihan yang layak jadi favorit</h2>
          <a class="ul" href="#/koleksi-terbaru">Lihat semua koleksi ↗</a>
        </div>
        <div class="tools">${buatTab()}</div>
        <div class="g4" id="grid"></div>
      </div>
    </section>

    <section class="wrap sp">
      <p class="eb">Jurnal gaya</p>
      <div class="row">
        <h2>Cara baru memakai favoritmu</h2>
        <a class="ul" href="#/inspirasi">Semua inspirasi ↗</a>
      </div><br>
      <div class="g3">${buatDaftarArtikel()}</div>
    </section>

    <section class="wrap sp">
      <div class="split">
        <img src="img/about-home.jpg" alt="Pengrajin menjahit pakaian" loading="lazy">
        <div>
          <p class="eb">Tentang Stylora</p>
          <h2>Satu tempat untuk menemukan gayamu.</h2>
          <p class="lead" style="max-width:none">Stylora mengumpulkan inspirasi dan pilihan fashion lokal. Kami tidak menjual langsung: kamu cukup temukan yang cocok, lalu belanja di toko pilihanmu.</p>
          <div class="tags"><span>Kurasi lokal</span><span>Harga referensi</span><span>Belanja di toko resmi</span></div>
          <a class="btn line" href="#/tentang">Kenali cerita kami ↗</a>
        </div>
      </div>
    </section>`;

  return { judul: 'Beranda', html: html, setelah: perbaruiGrid };
}

function halamanTerbaru() {
  modeGrid = 'terbaru';

  const kategori = [
    { tujuan: 'wanita', judul: 'Wanita', teks: '', gambar: 'k1' },
    { tujuan: 'pria', judul: 'Pria', teks: '', gambar: 'k3' },
    { tujuan: 'aksesori', judul: 'Aksesori', teks: '', gambar: 'k4' },
    { tujuan: 'wanita', judul: 'Pilihan esensial', teks: '', gambar: 'k2' }
  ];

  const html = `
    <section class="wrap pagehead">
      <p class="eb">Temukan pilihanmu</p>
      <h1>Koleksi terbaru minggu ini</h1>
    </section>
    <section class="wrap sp"><div class="g4">${buatDaftarKategori(kategori)}</div></section>
    <section class="band">
      <div class="wrap sp"><h2>Baru masuk</h2><br><div class="g4" id="grid"></div></div>
    </section>`;

  return { judul: 'Koleksi Terbaru', html: html, setelah: perbaruiGrid };
}

// Halaman Wanita / Pria / Aksesori (satu template untuk ketiganya)
function halamanKategori(kategori) {
  modeGrid = 'kategori';
  kategoriAktif = kategori;
  filter.tab = 'semua';
  filter.sub = '';
  filter.urut = '';

  const header = HEADER_KATEGORI[kategori];

  // Kumpulkan sub-kategori unik (Atasan, Bawahan, dst.) untuk dropdown
  const daftarSub = [];
  const produkKategori = saringProduk(kategori, '', '');
  for (let i = 0; i < produkKategori.length; i++) {
    if (daftarSub.indexOf(produkKategori[i].sub) === -1) {
      daftarSub.push(produkKategori[i].sub);
    }
  }
  let opsiSub = '<option value="">Semua kategori</option>';
  for (let i = 0; i < daftarSub.length; i++) {
    opsiSub += '<option>' + daftarSub[i] + '</option>';
  }

  const tombolHero = '<button class="btn" data-scroll>Lihat semua koleksi ' + NAMA_KATEGORI[kategori] + ' ↗</button>' +
    '<a class="ul" href="#/inspirasi">Temukan inspirasi gayamu</a>';

  const html = buatHero('Koleksi baru / Edisi esensial', header.judul, header.deskripsi, 'hero-' + kategori, tombolHero) + `
    <section class="band">
      <div class="wrap sp">
        <h2>Pilihan Koleksi ${header.judul}</h2>
        <div class="tools">
          ${buatTab()}
          <div class="sel">
            <select id="sub" aria-label="Filter kategori">${opsiSub}</select>
            <select id="sort" aria-label="Urutkan">
              <option value="">Urutkan: Rekomendasi</option>
              <option value="asc">Harga terendah</option>
              <option value="desc">Harga tertinggi</option>
              <option value="az">Nama A–Z</option>
            </select>
          </div>
        </div>
        <div class="g4" id="grid"></div>
      </div>
    </section>`;

  return { judul: header.judul, html: html, setelah: perbaruiGrid };
}

// Ulasan: filter '' = semua, 'uk' = hanya yang sesuai ukuran
function isiUlasan(jenis) {
  let html = '';
  for (let i = 0; i < ULASAN.length; i++) {
    const u = ULASAN[i];
    if (jenis === 'uk' && !u.sesuaiUkuran) {
      continue;
    }
    html += `
      <div class="rv">
        <header><b>${u.nama}</b><span class="rate">★★★★★</span></header>
        <div class="small">${u.varian} · ${u.tanggal}</div>
        <p>${u.teks}</p>
        <img src="img/${u.foto}.jpg" alt="Foto ulasan">
      </div>`;
  }
  ambil('#rvs').innerHTML = html;
}

function halamanProduk(id) {
  const p = cariProduk(id);
  if (p === null) {
    return halamanTidakAda();
  }

  modeGrid = '';
  const adaUlasan = (id === 'w1');                       // hanya produk w1 punya ulasan
  const berukuran = (p.sub === 'Atasan' || p.sub === 'Bawahan' || p.sub === 'Setelan');

  // --- Galeri foto ---
  let gambarUtama = id;
  let thumbnail = '';
  if (adaUlasan) {
    gambarUtama = 'pdp-main';
    const foto = [
      { file: 'pdp-t1', teks: 'Detail tekstur' },
      { file: 'pdp-t2', teks: 'Tampak belakang' },
      { file: 'pdp-t3', teks: 'Detail potongan' }
    ];
    thumbnail = '<div class="thumbs">';
    for (let i = 0; i < foto.length; i++) {
      let kelas = '';
      if (i === 0) {
        kelas = 'on';
      }
      thumbnail += '<button data-thumb="' + foto[i].file + '" class="' + kelas + '">' +
        '<img src="img/' + foto[i].file + '.jpg" alt="' + foto[i].teks + '">' + foto[i].teks + '</button>';
    }
    thumbnail += '</div>';
  }

  // --- Label & rating ---
  let labelProduk = '';
  if (p.label !== '') {
    labelProduk = NAMA_LABEL[p.label];
  }
  let rating = '<div class="small">Belum ada ulasan</div>';
  if (adaUlasan) {
    rating = '<div class="rate">★★★★★ <b>4.8</b> | 24 Ulasan <span>dari komunitas Stylora</span></div>';
  }

  // --- Pilihan warna ---
  let pilihanWarna = '';
  for (let i = 0; i < p.jumlahWarna; i++) {
    let kelas = 'sw';
    if (i === 0) {
      kelas = 'sw on';
    }
    pilihanWarna += '<button class="' + kelas + '" data-sw="' + NAMA_WARNA[i] + '" style="background:' + WARNA[i] + '" aria-label="' + NAMA_WARNA[i] + '"></button>';
  }

  // --- Pilihan ukuran (hanya pakaian) ---
  let pilihanUkuran = '';
  if (berukuran) {
    const ukuran = ['XS', 'S', 'M', 'L', 'XL'];
    let tombolUkuran = '';
    for (let i = 0; i < ukuran.length; i++) {
      let kelas = 'sz';
      if (ukuran[i] === 'M') {
        kelas = 'sz on';
      }
      tombolUkuran += '<button class="' + kelas + '" data-sz="' + ukuran[i] + '">' + ukuran[i] + '</button>';
    }
    pilihanUkuran = '<p class="lbl">Ukuran: <b id="szn">M</b></p><div class="szs">' + tombolUkuran + '</div>' +
      '<p class="small">Warna &amp; ukuran hanya referensi gaya, bukan pemesanan di Stylora.</p>';
  }

  // --- Tabel ukuran (contoh data hanya untuk Atasan) ---
  let panduanUkuran = '<p class="mut">Panduan ukuran lengkap mengikuti ketentuan toko brand.</p>';
  if (p.sub === 'Atasan') {
    const tabel = [
      ['XS', 100, 66, 50], ['S', 104, 68, 51], ['M', 108, 70, 52], ['L', 112, 72, 53], ['XL', 116, 74, 54]
    ];
    let baris = '';
    for (let i = 0; i < tabel.length; i++) {
      let kelas = '';
      if (tabel[i][0] === 'M') {
        kelas = ' class="on"';
      }
      baris += '<tr' + kelas + '><td>' + tabel[i][0] + '</td><td>' + tabel[i][1] + '</td><td>' + tabel[i][2] + '</td><td>' + tabel[i][3] + '</td></tr>';
    }
    panduanUkuran = '<table><tr><th>Ukuran</th><th>Lingkar dada</th><th>Panjang</th><th>Bahu</th></tr>' + baris + '</table>' +
      '<p class="small" style="margin-top:8px">Ukuran dalam cm. Toleransi ±1–2 cm.</p>';
  }

  // --- Cara perawatan ---
  let perawatan = '<li>Bersihkan dengan kain lembut dan kering</li><li>Simpan di tempat kering, hindari parfum langsung</li><li>Hindari paparan air dan panas berlebih</li>';
  if (berukuran) {
    perawatan = '<li>Cuci lembut dengan air dingin, maks. 30°C</li><li>Keringkan alami, hindari pemutih</li><li>Setrika suhu sedang saat lembap</li>';
  }

  // --- Produk yang cocok dipadukan ---
  const idPadu = ['p1', 'p2', 'p3', 'p4'];
  const produkPadu = [];
  for (let i = 0; i < idPadu.length; i++) {
    if (idPadu[i] !== id) {
      produkPadu.push(cariProduk(idPadu[i]));
    }
  }

  // --- Bagian ulasan ---
  let bagianUlasan = `
    <p class="mut" style="margin-top:12px">Belum ada ulasan untuk produk ini.</p><br>
    <button class="btn line" data-soon>Tulis ulasan</button>`;
  if (adaUlasan) {
    bagianUlasan = `
      <div class="rv-h">
        <div class="big">4.8</div>
        <div><div class="rate">★★★★★</div><span class="small">dari 24 ulasan pengguna</span></div>
        <div><b>92% merasa sesuai ukuran</b><br><span class="small">Berdasarkan pengalaman komunitas</span></div>
        <button class="btn line" data-soon>Tulis ulasan</button>
      </div>
      <div class="tabs">
        <button class="tab on" data-rv="">Semua ulasan</button>
        <button class="tab" data-rv="foto">Dengan foto</button>
        <button class="tab" data-rv="uk">Sesuai ukuran</button>
      </div>
      <div class="rvs" id="rvs"></div>`;
  }

  let kelasFav = 'fv';
  if (apakahFavorit(id)) {
    kelasFav = 'fv on';
  }

  const html = `
    <div class="wrap">
      <nav class="crumb"><a href="#/">Beranda</a> › <a href="#/${p.kategori}">${NAMA_KATEGORI[p.kategori]}</a> › ${p.sub} › ${p.nama}</nav>

      <div class="pdp">
        <div class="gal">
          <img id="main" src="img/${gambarUtama}.jpg" alt="${p.nama}">
          ${thumbnail}
        </div>

        <div class="info">
          <p class="eb"><span>${p.brand}</span><span>${labelProduk}</span></p>
          <h1>${p.brand} - ${p.nama}</h1>
          ${rating}
          <div class="price">${formatRupiah(p.harga)}</div>
          <p class="small">Harga referensi dari toko brand · Diperbarui 4 Nov 2026</p>
          <p class="small">🌿 ${p.bahan}</p>
          <hr>
          <p class="lbl">Warna: <b id="swn">${NAMA_WARNA[0]}</b></p>
          <div class="sws">${pilihanWarna}</div>
          ${pilihanUkuran}

          <p class="eb" style="margin-top:18px">Belanja di toko eksternal</p>
          <div class="buy">
            <button class="btn main" data-buy="${id}|Shopee">Beli di Shopee ↗</button>
            <button class="${kelasFav}" data-fav="${id}" aria-label="Simpan ke favorit">${IKON_HATI}</button>
            <div class="alt">
              <button class="btn" data-buy="${id}|Tokopedia">Tokopedia ↗</button>
              <button class="btn" data-buy="${id}|WhatsApp">WhatsApp (WA) ↗</button>
            </div>
          </div>
          <p class="small">Kamu akan diarahkan ke toko eksternal. Harga, stok, dan transaksi mengikuti ketentuan toko. Stylora tidak memproses pembayaran.</p>
        </div>
      </div>

      <div class="details">
        <div>
          <h3>Detail &amp; Bahan</h3>
          <p class="mut">${p.nama} dari ${p.brand}, dirancang untuk dipakai berulang dalam berbagai suasana.</p>
          <ul><li>${p.bahan}</li><li>Palet warna alami, mudah dipadupadankan</li><li>Dibuat oleh brand lokal Indonesia</li></ul>
        </div>
        <div><h3>Panduan Ukuran (Size Chart)</h3>${panduanUkuran}</div>
        <div><h3>Cara Perawatan</h3><ul>${perawatan}</ul></div>
      </div>
    </div>

    <section class="wrap sp">
      <p class="eb">Inspirasi padu padan</p>
      <div class="row"><h2>Cocok Dipadukan Dengan</h2><a class="ul" href="#/inspirasi">Jelajahi inspirasi →</a></div><br>
      <div class="g4">${buatDaftarKartu(produkPadu)}</div>
    </section>

    <section class="wrap sp" style="border-top:1px solid var(--line)">
      <p class="eb">Cerita komunitas</p>
      <h2>Ulasan Pengguna</h2>
      ${bagianUlasan}
    </section>`;

  let setelah = null;
  if (adaUlasan) {
    setelah = function () { isiUlasan(''); };
  }
  return { judul: p.nama, html: html, setelah: setelah };
}

function halamanInspirasi() {
  modeGrid = '';
  const html = `
    <section class="wrap pagehead">
      <p class="eb">Jurnal gaya</p>
      <h1>Cara baru memakai favoritmu</h1>
      <p>Ide padu padan dan cerita untuk menemukan gaya yang terasa paling kamu.</p>
    </section>
    <section class="wrap sp"><div class="g3">${buatDaftarArtikel()}</div></section>`;
  return { judul: 'Inspirasi Gaya', html: html, setelah: null };
}

function halamanArtikel(id) {
  let artikel = null;
  for (let i = 0; i < ARTIKEL.length; i++) {
    if (ARTIKEL[i].id === id) {
      artikel = ARTIKEL[i];
    }
  }
  if (artikel === null) {
    return halamanTidakAda();
  }

  modeGrid = '';
  let isi = '';
  for (let i = 0; i < artikel.isi.length; i++) {
    isi += '<h3>' + artikel.isi[i].judul + '</h3><p>' + artikel.isi[i].teks + '</p>';
  }
  if (artikel.kutipan !== '') {
    isi += '<blockquote>“' + artikel.kutipan + '”</blockquote>';
  }

  const html = `
    <div class="wrap bare">
      <article class="article">
        <nav class="crumb"><a href="#/inspirasi">Inspirasi Gaya</a> › ${artikel.judul}</nav>
        <p class="eb">${artikel.topik}</p>
        <h1>${artikel.judul}</h1>
        <p class="mut" style="margin-top:12px">${artikel.deskripsi}</p>
        <img src="img/${artikel.gambar}.jpg" alt="${artikel.judul}">
        <div class="txt">${isi}</div>
      </article>
    </div>
    <section class="band">
      <div class="wrap sp">
        <h2>Produk dalam cerita ini</h2><br>
        <div class="g4">${buatDaftarKartu(produkDariId(artikel.produk))}</div>
      </div>
    </section>`;

  return { judul: artikel.judul, html: html, setelah: null };
}

function halamanTentang() {
  modeGrid = '';
  const html = `
    <div class="wrap">
      <section class="pagehead" style="text-align:center"><h1>Tentang Kami</h1></section>

      <section class="about">
        <div class="split">
          <img src="img/about1.jpg" alt="Pasangan berjalan sore hari" style="max-width:360px">
          <div>
            <h2>Cerita Stylora</h2>
            <p>Stylora adalah direktori dan agregator inspirasi fashion lokal. Kami menjembatani kebingungan memilih gaya dengan kurasi produk, ide padu padan, dan ulasan komunitas, lalu mengarahkanmu ke toko resmi untuk membeli.</p>
            <div class="tags"><span>Kurasi lokal</span><span>Ulasan komunitas</span><span>Transparan</span></div>
          </div>
        </div>
      </section>

      <section class="about">
        <div class="split">
          <img src="img/about2.jpg" alt="Penata busana merapikan koleksi" style="max-width:360px">
          <div>
            <h2>Nilai &amp; komitmen</h2>
            <p>Kami berkomitmen menampilkan informasi yang jujur: bahan, ukuran, dan harga referensi ditampilkan apa adanya. Stylora tidak memproses pembayaran; setiap transaksi mengikuti ketentuan toko pilihanmu.</p>
            <a class="btn line" href="#/wanita">Mulai jelajahi ↗</a>
          </div>
        </div>
      </section>
    </div>`;
  return { judul: 'Tentang Kami', html: html, setelah: null };
}

function halamanFavorit() {
  modeGrid = 'favorit';
  const jumlah = ambilFavorit().length;

  let keterangan = 'Belum ada produk yang disimpan.';
  let tombolHapus = '';
  if (jumlah > 0) {
    keterangan = jumlah + ' produk disimpan di perangkat ini.';
    tombolHapus = '<button class="ul" data-clear>Hapus semua</button>';
  }

  const html = `
    <section class="wrap pagehead">
      <div class="row">
        <div>
          <p class="eb">Koleksi pribadi</p>
          <h1>Favoritmu, tersimpan.</h1>
          <p>${keterangan}</p>
        </div>
        ${tombolHapus}
      </div>
    </section>
    <section class="wrap sp"><div class="g4" id="grid"></div></section>`;
  return { judul: 'Favorit', html: html, setelah: perbaruiGrid };
}

// ===== 6. ROUTER =====
// Alamat memakai hash, contoh: index.html#/produk/w1
// "#/produk/w1" dipecah menjadi ['', 'produk', 'w1']

function tampilkanHalaman() {
  const alamat = location.hash.slice(1) || '/';
  const bagian = alamat.split('/');
  const menu = bagian[1];
  const parameter = bagian[2];

  modeGrid = '';
  let halaman;

  if (menu === '') {
    halaman = halamanBeranda();
  } else if (menu === 'koleksi-terbaru') {
    halaman = halamanTerbaru();
  } else if (menu === 'wanita' || menu === 'pria' || menu === 'aksesori') {
    halaman = halamanKategori(menu);
  } else if (menu === 'produk') {
    halaman = halamanProduk(parameter);
  } else if (menu === 'inspirasi' && parameter) {
    halaman = halamanArtikel(parameter);
  } else if (menu === 'inspirasi') {
    halaman = halamanInspirasi();
  } else if (menu === 'tentang') {
    halaman = halamanTentang();
  } else if (menu === 'favorit') {
    halaman = halamanFavorit();
  } else {
    halaman = halamanTidakAda();
  }

  ambil('#app').innerHTML = halaman.html;
  document.title = halaman.judul + ' — Stylora';
  if (halaman.setelah) {
    halaman.setelah();
  }

  // Tandai menu navbar yang aktif
  const linkMenu = ambilSemua('#menu a');
  for (let i = 0; i < linkMenu.length; i++) {
    if (linkMenu[i].dataset.r === menu) {
      linkMenu[i].setAttribute('aria-current', 'page');
    } else {
      linkMenu[i].removeAttribute('aria-current');
    }
  }

  // Rapikan tampilan: tutup menu HP, pencarian, modal, lalu ke atas halaman
  ambil('#menu').classList.remove('open');
  ambil('#search').hidden = true;
  ambil('#q').value = '';
  ambil('#sres').innerHTML = '';
  tutupModal();
  window.scrollTo(0, 0);
}

// ===== 7. EVENT =====

// Beri tanda "on" pada satu tombol saja di dalam satu kelompok
function aktifkanSatu(daftarTombol, tombolAktif) {
  for (let i = 0; i < daftarTombol.length; i++) {
    daftarTombol[i].classList.toggle('on', daftarTombol[i] === tombolAktif);
  }
}

// Satu pendengar klik untuk seluruh halaman (event delegation)
document.addEventListener('click', function (e) {
  const target = e.target;
  let el;

  // Ikon hati
  el = target.closest('[data-fav]');
  if (el) {
    ubahFavorit(el.dataset.fav);
    return;
  }

  // Tombol "Beli di ..." (nilainya: "id|NamaToko")
  el = target.closest('[data-buy]');
  if (el) {
    const potongan = el.dataset.buy.split('|');
    bukaModalBeli(potongan[0], potongan[1]);
    return;
  }

  // Tutup modal: klik latar gelap atau tombol tutup
  if (target === ambil('#modal') || target.closest('[data-close]')) {
    tutupModal();
    return;
  }

  // Tab filter produk
  el = target.closest('[data-tab]');
  if (el) {
    filter.tab = el.dataset.tab;
    aktifkanSatu(el.parentNode.querySelectorAll('.tab'), el);
    perbaruiGrid();
    return;
  }

  // Tab filter ulasan
  el = target.closest('[data-rv]');
  if (el) {
    aktifkanSatu(el.parentNode.querySelectorAll('.tab'), el);
    isiUlasan(el.dataset.rv);
    return;
  }

  // Pilih warna
  el = target.closest('[data-sw]');
  if (el) {
    aktifkanSatu(ambilSemua('[data-sw]'), el);
    ambil('#swn').textContent = el.dataset.sw;
    return;
  }

  // Pilih ukuran
  el = target.closest('[data-sz]');
  if (el) {
    aktifkanSatu(ambilSemua('[data-sz]'), el);
    ambil('#szn').textContent = el.dataset.sz;
    return;
  }

  // Ganti foto utama dengan thumbnail
  el = target.closest('[data-thumb]');
  if (el) {
    ambil('#main').src = 'img/' + el.dataset.thumb + '.jpg';
    aktifkanSatu(ambilSemua('[data-thumb]'), el);
    return;
  }

  // Tombol "Lihat semua koleksi": gulir ke daftar produk
  if (target.closest('[data-scroll]')) {
    ambil('#grid').scrollIntoView({ behavior: 'smooth', block: 'start' });
    return;
  }

  // Tombol yang fiturnya belum dibuat
  if (target.closest('[data-soon]')) {
    tampilToast('Fitur tulis ulasan akan segera hadir');
    return;
  }

  // Hapus semua favorit
  if (target.closest('[data-clear]')) {
    simpanFavorit([]);
    perbaruiFavorit();
    tampilkanHalaman();
    return;
  }

  // Buka/tutup kotak pencarian
  if (target.closest('#sbtn')) {
    const kotak = ambil('#search');
    kotak.hidden = !kotak.hidden;
    if (!kotak.hidden) {
      ambil('#q').focus();
    }
    return;
  }

  // Menu hamburger (HP)
  if (target.closest('#burger')) {
    ambil('#menu').classList.toggle('open');
  }
});

// Dropdown filter sub-kategori dan urutan
document.addEventListener('change', function (e) {
  if (e.target.id === 'sub') {
    filter.sub = e.target.value;
    perbaruiGrid();
  }
  if (e.target.id === 'sort') {
    filter.urut = e.target.value;
    perbaruiGrid();
  }
});

// Tombol Escape menutup modal dan pencarian
document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape') {
    tutupModal();
    ambil('#search').hidden = true;
  }
});

// Pencarian: tampilkan maksimal 6 hasil
ambil('#q').addEventListener('input', function (e) {
  const kata = e.target.value.trim().toLowerCase();
  const kotakHasil = ambil('#sres');

  if (kata === '') {
    kotakHasil.innerHTML = '';
    return;
  }

  let html = '';
  let jumlah = 0;
  for (let i = 0; i < PRODUK.length && jumlah < 6; i++) {
    const p = PRODUK[i];
    const teks = (p.nama + ' ' + p.brand + ' ' + p.sub + ' ' + NAMA_KATEGORI[p.kategori]).toLowerCase();
    if (teks.indexOf(kata) !== -1) {
      html += `
        <a href="#/produk/${p.id}">
          <img src="img/${p.id}.jpg" alt="">
          <div>${p.nama}<small>${NAMA_KATEGORI[p.kategori]} · ${p.sub} · ${formatRupiah(p.harga)}</small></div>
        </a>`;
      jumlah++;
    }
  }

  if (jumlah === 0) {
    html = '<p class="empty">Tidak ada hasil untuk “' + bersihkanTeks(kata) + '”.</p>';
  }
  kotakHasil.innerHTML = html;
});

// Newsletter: cek format email, lalu simpan di localStorage
ambil('#nl').addEventListener('submit', function (e) {
  e.preventDefault();
  const email = ambil('#em').value.trim();
  const pesan = ambil('#nlmsg');

  if (!emailValid(email)) {
    pesan.textContent = 'Masukkan alamat email yang valid.';
    return;
  }

  try {
    localStorage.setItem('stylora:news', email);
  } catch (error) {
    // abaikan jika localStorage tidak tersedia
  }
  pesan.textContent = 'Terima kasih, kamu sudah terdaftar.';
  ambil('#em').value = '';
});

// ===== 8. JALANKAN APLIKASI =====

window.addEventListener('hashchange', tampilkanHalaman);
perbaruiFavorit();
tampilkanHalaman();
