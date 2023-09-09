import Matakuliah from "../models/Matakuliah.js";
import { rl, menuUtama } from "../university.js";
import {
  showDetail,
  showMenu,
  showtableMatakuliah,
} from "../views/MatakuliahView.js";

export default class MatakuliahController {
  static menu() {
    showMenu();
    rl.question(`Masukkan salah astu nomor dari opsi di atas: `, (answer) => {
      switch (answer) {
        case "1":
          MatakuliahController.daftar();
          break;
        case "2":
          MatakuliahController.cari();
          break;
        case "3":
          MatakuliahController.tambah();
          break;
        case "4":
          MatakuliahController.hapus();
          break;
        case "5":
          menuUtama();
          break;
        default:
          console.log(
            `Nomor yang Anda masukkan tidak sesuai, silahkan coba lagi`
          );
          MatakuliahController.menu();
          break;
      }
    });
  }

  static daftar() {
    Matakuliah.find(function (data) {
      showtableMatakuliah(data);
      MatakuliahController.menu();
    });
  }

  static cari() {
    rl.question(`Masukkan ID Mata Kuliah : `, async (answer) => {
      try {
        const data = await Matakuliah.search(answer);
        showDetail(data);
        MatakuliahController.menu();
      } catch (e) {
        console.log(`Terjadi kesalahan`);
        MatakuliahController.cari();
      }
    });
  }

  static tambah() {
    console.log(`Lengkapi data di bawah ini :`);
    Matakuliah.find(function (data) {
      showtableMatakuliah(data);
      rl.question(`ID Mata Kuliah : `, async (idmatakuliah) => {
        rl.question(`Nama Mata Kuliah : `, async (namamatakuliah) => {
          rl.question(`Jumlah SKS : `, async (SKS) => {
            if (await Matakuliah.search(idmatakuliah)) {
              console.log(
                `ID Mata Kuliah telah tersedia di database, silahkan coba lagi.`
              );
              Matakuliah.menu();
            } else {
              Matakuliah.create(idmatakuliah, namamatakuliah, SKS);
              console.log(`Mata Kuliah telah ditambahkan ke database`);
              MatakuliahController.menu();
            }
          });
        });
      });
    });
  }

  static hapus() {
    rl.question(`Masukkan ID Mata Kuliah : `, async (idmatakuliah) => {
      const matakuliah = await Matakuliah.search(idmatakuliah);
      if (matakuliah) {
        Matakuliah.delete(idmatakuliah).then(() => {
          console.log(`Mata Kuliah dengan ID ${idmatakuliah} telah dihapus`);
          MatakuliahController.menu();
        });
      } else {
        console.log(
          `ID Mata Kuliah yang Anda masukkan tidak terdaftar, silahkan coba lagi`
        );
        MatakuliahController.menu();
      }
    });
  }
}
