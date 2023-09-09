import Dosen from "../models/Dosen.js";
import { menuUtama, rl } from "../university.js";
import { showtableDosen, showDetail, showMenu } from "../views/DosenView.js";

export default class DosenController {
  static menu() {
    showMenu();
    rl.question(`Masukkan salah astu nomor dari opsi di atas: `, (answer) => {
      switch (answer) {
        case "1":
          DosenController.daftar();
          break;
        case "2":
          DosenController.cari();
          break;
        case "3":
          DosenController.tambah();
          break;
        case "4":
          DosenController.hapus();
          break;
        case "5":
          menuUtama();
          break;
        default:
          console.log(
            `Nomor yang Anda masukkan tidak sesuai, silahkan coba lagi`
          );
          DosenController.menu();
          break;
      }
    });
  }

  static daftar() {
    Dosen.find(function (data) {
      showtableDosen(data);
      DosenController.menu();
    });
  }

  static cari() {
    rl.question(`Masukkan NIP Dosen : `, async (answer) => {
      try {
        const data = await Dosen.search(answer);
        showDetail(data);
        DosenController.menu();
      } catch (e) {
        console.log(`Terjadi kesalahan`);
        DosenController.cari();
      }
    });
  }

  static tambah() {
    console.log(`Lengkapi data di bawah ini :`);
    Dosen.find(function (data) {
      showtableDosen(data);
      rl.question(`NIP Dosen : `, async (nip) => {
        rl.question(`Nama Dosen : `, async (namadosen) => {
          if (await Dosen.search(nip)) {
            console.log(`NIP telah tersedia di database, silahkan coba lagi.`);
            Dosen.menu();
          } else {
            Dosen.create(nip, namadosen);
            console.log(`Dosen telah ditambahkan ke database`);
            DosenController.menu();
          }
        });
      });
    });
  }

  static hapus() {
    Dosen.find(function (data) {
      showtableDosen(data);
      rl.question(`Masukkan NIP Dosen : `, async (nip) => {
        const dosen = await Dosen.search(nip);
        if (dosen) {
          Dosen.delete(nip).then(() => {
            console.log(`Dosen ${nip} telah dihapus`);
            DosenController.menu();
          });
        } else {
          console.log(
            `NIP Dosen yang Anda masukkan tidak terdaftar, silahkan coba lagi`
          );
          DosenController.menu();
        }
      });
    });
  }
}
