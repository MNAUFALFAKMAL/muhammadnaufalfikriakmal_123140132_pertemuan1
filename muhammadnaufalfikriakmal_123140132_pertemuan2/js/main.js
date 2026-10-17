// js/main.js
// Entry point: DOM, event, dan pemanggilan fungsi
import { DashboardApp } from "./app.js";
import { tugasAwal } from "./modules/data.js";

const app = new DashboardApp("tugas_naufal_123140132", "https://dummyjson.com/quotes/random");

// Variabel mode edit (berubah-ubah nilainya, jadi pakai let)
let idSedangEdit = "";

// Render ulang daftar + progres
const renderUlang = () => {
  app.tampilkanTugas();
  app.tampilkanProgres();
};

// ---- jam sederhana ----
const jalankanJam = () => {
  const jam = document.getElementById("jam");
  jam.textContent = new Date().toLocaleString("id-ID", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
};
setInterval(jalankanJam, 1000);

// ---- ambil kutipan (async / await) ----
const muatKutipan = async () => {
  const teks = document.getElementById("teksKutipan");
  const penulis = document.getElementById("penulisKutipan");
  try {
    const { quote, author } = await app.ambilKutipan(); // destructuring
    teks.textContent = `"${quote}"`;
    penulis.textContent = `— ${author}`;
  } catch {
    teks.textContent = "Kutipan gagal dimuat.";
  }
};

// ---- isi form saat klik edit ----
const mulaiEdit = (id) => {
  const tugas = app.cariTugas(id);
  idSedangEdit = id;
  document.getElementById("idTugas").value = id;
  document.getElementById("judulTugas").value = tugas.judul;
  document.getElementById("tenggatTugas").value = tugas.tenggat;
  document.getElementById("judulForm").lastChild.textContent = " Edit Tugas";
  document.getElementById("batalEdit").classList.remove("hidden");
};

// ---- kembalikan form ke mode tambah ----
const batalEdit = () => {
  document.getElementById("formTugas").reset();
  document.getElementById("idTugas").value = "";
  idSedangEdit = "";
  document.getElementById("judulForm").lastChild.textContent = " Tambah Tugas";
  document.getElementById("batalEdit").classList.add("hidden");
};

// ---- event: simpan tugas (tambah atau edit) ----
document.getElementById("formTugas").addEventListener("submit", (event) => {
  event.preventDefault();

  const judul = document.getElementById("judulTugas").value.trim();
  const tenggat = document.getElementById("tenggatTugas").value;

  if (!judul) return;

  if (idSedangEdit) {
    app.ubahTugas(idSedangEdit, { judul, tenggat });
  } else {
    app.tambahTugas({ judul, tenggat });
  }

  batalEdit();
  renderUlang();
});

document.getElementById("batalEdit").addEventListener("click", batalEdit);

// ---- event: edit / hapus satu tugas (delegasi) ----
document.getElementById("daftarTugas").addEventListener("click", (event) => {
  const tombol = event.target.closest("[data-aksi]");
  if (!tombol) return;

  const { aksi, id } = tombol.dataset;

  if (aksi === "edit") mulaiEdit(id);
  if (aksi === "hapus") {
    app.hapusTugas(id);
    renderUlang();
  }
});

document.getElementById("daftarTugas").addEventListener("change", (event) => {
  const centang = event.target.closest('[data-aksi="centang"]');
  if (!centang) return;
  app.centangTugas(centang.dataset.id);
  renderUlang();
});

// ---- event: hapus semua tugas (konfirmasi dulu) ----
document.getElementById("tombolHapusSemua").addEventListener("click", () => {
  const yakin = confirm("Yakin ingin menghapus SEMUA tugas? Data tidak bisa dikembalikan.");
  if (!yakin) return;
  app.hapusSemuaTugas();
  batalEdit();
  renderUlang();
});

// ---- event: filter tugas (Semua / Belum / Selesai) ----
document.getElementById("filterTugas").addEventListener("click", (event) => {
  const tombol = event.target.closest("[data-filter]");
  if (!tombol) return;

  document.querySelectorAll("[data-filter]").forEach((b) => b.classList.remove("aktif"));
  tombol.classList.add("aktif");

  app.filterSaatIni = tombol.dataset.filter;
  app.tampilkanTugas();
});

// ---- event: tombol muat ulang kutipan ----
document.getElementById("tombolKutipan").addEventListener("click", muatKutipan);

// ---- mulai aplikasi ----
app.muatTugas();

// kalau storage masih kosong, isi tugas awal
if (app.tugas.length === 0) {
  tugasAwal.forEach((t) => app.tambahTugas({ ...t }));
}

renderUlang();
muatKutipan();
jalankanJam();
