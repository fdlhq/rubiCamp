import Table from "cli-table";
import { baris } from "../university.js";

export function showtableMahasiswa(data = []) {
  var table = new Table({
    head: [
      "NIM",
      "Nama",
      "Tanggal Lahir",
      "Alamat",
      "Kode Jurusan",
      "Nama Jurusan",
    ],
    colWidths: [15, 25, 15, 15, 15, 30],
  });

  data.forEach((item) => {
    table.push([
      item.nim,
      item.namamahasiswa,
      item.tanggallahir ? item.tanggallahir : "",
      item.alamat ? item.alamat : "",
      item.idjurusan ? item.idjurusan : "",
      item.namajurusan ? item.namajurusan : "",
    ]);
  });

  console.log(table.toString());
}

export function showMenu() {
  baris();
  console.log(`
Silahkan pilih opsi di bawah ini :
[1] Daftar Mahasiswa
[2] Cari Mahasiswa
[3] Tambah Mahasiswa
[4] Hapus Mahasiswa
[5] Kembali
            `);
  baris();
}

export function showDetail(data) {
  console.log(`
===========================================
Detail Mahasiswa dengan NIM '${data.nim}' :
NIM             : ${data.nim}
Nama Mahasiswa  : ${data.namamahasiswa}
Alamat          : ${data.alamat}
Jurusan         : ${data.idjurusan}
    `);
}
