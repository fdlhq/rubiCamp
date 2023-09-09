import Table from "cli-table";
import { baris } from "../university.js";

export function showtableMatakuliah(data = []) {
  var table = new Table({
    head: ["Kode Mata Kuliah", "Mata Kuliah", "Jumlah SKS"],
    colWidths: [20, 30, 15],
  });

  data.forEach((item) => {
    table.push([item.idmatakuliah, item.namamatakuliah, item.SKS]);
  });

  console.log(table.toString());
}

export function showMenu() {
  baris();
  console.log(`
Silahkan pilih opsi di bawah ini :
[1] Daftar Mata Kuliah
[2] Cari Mata Kuliah
[3] Tambah Mata Kuliah
[4] Hapus Mata Kuliah
[5] Kembali
            `);
  baris();
}

export function showDetail(data) {
  console.log(`
===========================================
Detail Mata Kuliah dengan Kode '${data.idmatakuliah}' :
Kode Mata Kuliah    : ${data.idmatakuliah}
Mata Kuliah         : ${data.namamatakuliah}
Jumlah SKS          : ${data.SKS}
    `);
}
