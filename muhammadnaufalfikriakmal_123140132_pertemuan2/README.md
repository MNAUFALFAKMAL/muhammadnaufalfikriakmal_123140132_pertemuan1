# To-Do List Kuliah — Muhammad Naufal Fikri Akmal (123140132)

Praktikum Pengembangan Aplikasi Web — Pertemuan 2: JavaScript Next Gen (ES6+)
Teknik Informatika · ITERA · T.A. 2026/2027

---

## 1. Tentang Aplikasi

Aplikasi **To-Do List Kuliah** bertema **hijau** untuk mencatat dan memantau tugas kuliah harian.

Fitur:

- Tambah tugas (judul + tenggat)
- Edit tugas (klik ikon pensil, formulir terisi otomatis)
- Hapus satu tugas (ikon tempat sampah) — dan **hapus semua tugas** sekaligus (dengan konfirmasi)
- Centang tugas selesai
- **Bar progres** persentase tugas selesai + ringkasan total/selesai/belum
- **Filter daftar tugas**: Semua / Belum Selesai / Selesai
- Tag status (Belum / Selesai) pada setiap baris
- Data tersimpan otomatis di `localStorage`
- Kutipan motivasi acak dari API DummyJSON (async/await), bisa dimuat ulang
- Jam berjalan di bagian atas
- Ikon asli dari Lucide Icons (SVG), bukan emoticon

## 2. Cara Menjalankan

1. Buka folder ini di VS Code.
2. Klik kanan `index.html` → **Open with Live Server** (jangan double-click, karena `type="module"` diblokir CORS).
3. Buka `http://127.0.0.1:5500` di browser.

## 3. Struktur Folder

```text
muhammadnaufalfikriakmal_123140132_pertemuan2/
├── index.html
├── README.md
├── css/style.css
├── docs/
│   ├── CARA_BUAT_SCREENSHOT.md
│   └── screenshot.png
└── js/
    ├── main.js          entry point (event + DOM)
    ├── app.js           class TaskItem & DashboardApp
    └── modules/
        ├── utils.js     fungsi bantuan
        └── data.js      tugas awal
```

## 4. Screenshot

Simpan screenshot hasil run di `docs/screenshot.png` (lihat `docs/CARA_BUAT_SCREENSHOT.md`).

![Tampilan aplikasi](docs/screenshot.png)

## 5. Fitur ES6+ dan Lokasi Kodenya

| Fitur ES6+ | Penjelasan | File : Baris |
|---|---|---|
| `const` | Konstanta (URL API, key storage, elemen DOM) | `js/main.js:5–7`, `js/modules/utils.js:5–19`, `js/app.js:93–95` |
| `let` | Variabel mode edit yang berubah | `js/main.js:9` (`idSedangEdit`) |
| Arrow function | Fungsi pendek + callback | `js/modules/utils.js:5, 8` · `js/main.js:12, 18, 29, 42, 53, 104, 113` · `js/app.js:42, 46, 56, 67–69, 75` |
| Template literals | Merender HTML daftar tugas, bar progres, ringkasan | `js/app.js:98, 101–122, 134–136` · `js/main.js:20–25, 32–33` |
| Destructuring | Membongkar properti objek | `js/app.js:42, 97, 133` · `js/main.js:31, 45` |
| Spread operator | Update array state immutable | `js/app.js:37, 42, 58` · `js/main.js:132` |
| Classes | `TaskItem` (model) & `DashboardApp` (pengelola) | `js/app.js:6` dan `js/app.js:16` |
| Async/Await | Ambil kutipan dari API | `js/app.js:86–88` · `js/main.js:29–38` |
| localStorage | Simpan/muat data tugas | `js/app.js:26–31` |
| Modern array methods | `.map()`, `.filter()`, `.find()`, `.forEach()` | `js/app.js:42, 46, 50, 56, 62, 67–69, 75` · `js/main.js:117, 132` |
| ES Modules | `import`/`export` | `js/app.js:3` · `js/main.js:3–4` |

## 6. API yang Digunakan

- DummyJSON Quotes: `https://dummyjson.com/quotes/random` — kutipan motivasi acak.

## 7. Pemenuhan Kriteria Penilaian

- Fungsionalitas dan interaktivitas (30%) — tambah, edit, hapus satu tugas, hapus semua tugas, centang selesai, filter status.
- Fitur ES6+ (25%) — lihat tabel bagian 5.
- localStorage dan pengelolaan data (20%) — `js/app.js:26–31`.
- Desain UI dan UX (15%) — tema hijau, bar progres animasi, filter pill, tag status, ikon SVG Lucide.
- Dokumentasi dan kerapian kode (10%) — README dan komentar di setiap file.
