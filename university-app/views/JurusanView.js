import Table from "cli-table";
import { baris } from "../university.js";

export function showtableJurusan(data = []) {
  var table = new Table({
    head: ["ID Jurusan", "Nama Jurusan"],
    colWidths: [20, 40],
  });

  data.forEach((item) => {
    table.push([item.idjurusan, item.namajurusan]);
  });
  console.log(table.toString());
}

export function showMenu() {
  baris();
  console.log(`
[1] Daftar jurusan
[2] Cari jurusan
[3] Tambah jurusan
[4] Hapus jurusan
[5] Kembali
               `);
}

export function showDetail(data) {
  console.log(`
==============================================

    Detail jurusan dengan id jurusan '${data.idjurusan}' :    
    Kode Jurusan    : ${data.idjurusan}
    Nama Jurusan    : ${data.namajurusan}
    `);
}
