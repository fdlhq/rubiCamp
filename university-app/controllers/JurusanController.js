import Jurusan from "../models/Jurusan.js";
import { rl, menuUtama } from "../university.js";
import {
  showDetail,
  showMenu,
  showtableJurusan,
} from "../views/JurusanView.js";

export default class JurusanController {
  static menu() {
    showMenu();
    rl.question(`Masukan salah satu nomor dari opsi di atas : `, (answer) => {
      switch (answer) {
        case "1":
          JurusanController.daftar();
          break;
        case "2":
          JurusanController.cari();
          break;
        case "3":
          JurusanController.tambah();
          break;

        case "4":
          JurusanController.hapus();
          break;

        case "5":
          menuUtama();
          break;
        default:
          console.log(
            `Nomor yang Anda masukkan tidak sesuai, silahkan coba lagi!`
          );
          JurusanController.menu();
          break;
      }
    });
  }

  static daftar() {
    Jurusan.find(function (data) {
      showtableJurusan(data);
      JurusanController.menu();
    });
  }

  static cari() {
    rl.question("Masukan ID jurusan: ", async (answer) => {
      try {
        const data = await Jurusan.search(answer);
        showDetail(data);
        JurusanController.menu();
      } catch (e) {
        console.log(`Terjadi kesalahan, silahkan ulangi lagi!`);
        JurusanController.cari();
      }
    });
  }

  static tambah() {
    console.log(`Lengkapi data di bawah ini :`);
    Jurusan.find(function (data) {
      showtableJurusan(data);
      rl.question(`ID Jurusan : `, async (idjurusan) => {
        rl.question(`Nama Jurusan : `, async (namajurusan) => {
          if (await Jurusan.search(idjurusan)) {
            console.log(
              `ID Jurusan telah tersedia di database, silahkan coba lagi.`
            );
            JurusanController.menu();
          } else {
            Jurusan.create(idjurusan, namajurusan);
            console.log(`Jurusan telah ditambahkan ke database`);
            JurusanController.menu();
          }
        });
      });
    });
  }

  static hapus() {
    rl.question("Masukan ID jurusan: ", (answer) => {
      if (answer)
        Jurusan.delete(answer)
          .then(() => {
            console.log(`Data jurusan ${answer}, telah di hapus.`);
            JurusanController.menu();
          })
          .catch((err) => {
            console.log(err);
            console.log(`Gagal menghapus, silahkan coba lagi.`);
          });
    });
  }
}
