// js/app.js
// Class TaskItem (model tugas) dan DashboardApp (pengelola data + API)
import { buatId, formatTanggal } from "./modules/utils.js";

// Model satu tugas
export class TaskItem {
  constructor({ id = buatId(), judul = "", tenggat = "", selesai = false }) {
    this.id = id;
    this.judul = judul;
    this.tenggat = tenggat;
    this.selesai = selesai;
  }
}

// Pengelola aplikasi: data, localStorage, dan ambil kutipan
export class DashboardApp {
  constructor(kunciSimpan, urlKutipan) {
    this.kunciSimpan = kunciSimpan;
    this.urlKutipan = urlKutipan;
    this.tugas = [];
    this.filterSaatIni = "semua"; // semua | belum | selesai
  }

  // ---- localStorage ----
  muatTugas() {
    const data = localStorage.getItem(this.kunciSimpan);
    this.tugas = data ? JSON.parse(data) : [];
  }

  simpanTugas() {
    localStorage.setItem(this.kunciSimpan, JSON.stringify(this.tugas));
  }

  // ---- operasi data ----
  tambahTugas({ judul, tenggat }) {
    const tugasBaru = new TaskItem({ judul, tenggat });
    this.tugas = [...this.tugas, tugasBaru]; // spread operator
    this.simpanTugas();
  }

  ubahTugas(id, { judul, tenggat }) {
    this.tugas = this.tugas.map((t) => (t.id === id ? { ...t, judul, tenggat } : t)); // spread + destructuring
    this.simpanTugas();
  }

  hapusTugas(id) {
    this.tugas = this.tugas.filter((t) => t.id !== id);
    this.simpanTugas();
  }

  // Menghapus seluruh isi daftar tugas sekaligus
  hapusSemuaTugas() {
    this.tugas = [];
    this.simpanTugas();
  }

  centangTugas(id) {
    this.tugas = this.tugas.map((t) => (t.id === id ? { ...t, selesai: !t.selesai } : t));
    this.simpanTugas();
  }

  cariTugas(id) {
    return this.tugas.find((t) => t.id === id);
  }

  // Menyaring tugas sesuai filter aktif (modern array method .filter)
  tugasTersaring() {
    if (this.filterSaatIni === "belum") return this.tugas.filter((t) => !t.selesai);
    if (this.filterSaatIni === "selesai") return this.tugas.filter((t) => t.selesai);
    return this.tugas;
  }

  // Menghitung persentase tugas yang sudah selesai
  hitungProgres() {
    const total = this.tugas.length;
    const selesai = this.tugas.filter((t) => t.selesai).length;
    return {
      total,
      selesai,
      belum: total - selesai,
      persen: total === 0 ? 0 : Math.round((selesai / total) * 100),
    };
  }

  // ---- operasi asinkron: ambil kutipan dari API ----
  async ambilKutipan() {
    const respon = await fetch(this.urlKutipan);
    return respon.json();
  }

  // ---- tampilkan ke layar (template literals) ----
  tampilkanTugas() {
    const wadah = document.getElementById("daftarTugas");
    const jumlah = document.getElementById("jumlahTugas");
    const daftar = this.tugasTersaring();

    jumlah.textContent = `${daftar.length} dari ${this.tugas.length} tugas`;

    if (daftar.length === 0) {
      wadah.innerHTML = `<p class="daftar-kosong">Tidak ada tugas pada filter ini.</p>`;
      return;
    }

    wadah.innerHTML = daftar
      .map((t) => {
        const { id, judul, tenggat, selesai } = t;
        const labelStatus = selesai ? "selesai" : "belum";
        const teksStatus = selesai ? "Selesai" : "Belum";

        return `
          <div class="baris-tugas ${selesai ? "selesai" : ""}">
            <input type="checkbox" class="centang" data-aksi="centang" data-id="${id}" ${selesai ? "checked" : ""}>
            <div class="flex-1">
              <p class="judul-tugas">${judul}</p>
              <p class="text-xs text-emerald-800/50">Tenggat: ${formatTanggal(tenggat)}</p>
            </div>
            <span class="tag-status ${labelStatus}">${teksStatus}</span>
            <button type="button" class="tombol-ikon" data-aksi="edit" data-id="${id}" title="Edit tugas">
              <i data-lucide="pencil" class="w-4 h-4"></i>
            </button>
            <button type="button" class="tombol-ikon bahaya" data-aksi="hapus" data-id="${id}" title="Hapus tugas">
              <i data-lucide="trash-2" class="w-4 h-4"></i>
            </button>
          </div>`;
      })
      .join("");

    window.lucide?.createIcons(); // hidupkan ikon Lucide
  }

  // Memperbarui bar progres dan teks ringkasan
  tampilkanProgres() {
    const { total, selesai, belum, persen } = this.hitungProgres(); // destructuring
    document.getElementById("barProgres").style.width = `${persen}%`;
    document.getElementById("teksProgres").textContent = `${persen}%`;
    document.getElementById("ringkasan").textContent = `${total} total · ${selesai} selesai · ${belum} belum`;
  }
}
