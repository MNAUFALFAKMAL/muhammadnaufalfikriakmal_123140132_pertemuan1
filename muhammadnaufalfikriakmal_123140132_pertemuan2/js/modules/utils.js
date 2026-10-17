// js/modules/utils.js
// Fungsi bantuan sederhana (arrow function)

// Bikin ID unik sederhana
export const buatId = () => "_" + Math.random().toString(36).slice(2, 9);

// Format tanggal ISO (yyyy-mm-dd) jadi 12 Okt 2026
export const formatTanggal = (tanggal) => {
  if (!tanggal) return "Tanpa tenggat";
  const bulan = ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Agu", "Sep", "Okt", "Nov", "Des"];
  const [tahun, bulanAngka, hari] = tanggal.split("-");
  return `${Number(hari)} ${bulan[Number(bulanAngka) - 1]} ${tahun}`;
};
