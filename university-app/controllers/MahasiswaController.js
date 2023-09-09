import Mahasiswa from "../models/Mahasiswa.js";
import Jurusan from "../models/Jurusan.js";
import { showtableJurusan } from "../views/JurusanView.js";
import { menuUtama, rl } from "../university.js";
import {
  showtableMahasiswa,
  showDetail,
  showMenu,
} from "../views/MahasiswaView.js";

export default class MahasiswaController {
  static menu() {
    showMenu();
    rl.question(`Masukkan salah satu nomor dari opsi di atas: `, (answer) => {
      switch (answer) {
        case "1":
          MahasiswaController.daftar();
          break;
        case "2":
          MahasiswaController.cari();
          break;
        case "3":
          MahasiswaController.tambah();
          break;
        case "4":
          MahasiswaController.hapus();
          break;
        case "5":
          menuUtama();
          break;
        default:
          console.log(
            `Nomor yang Anda masukkan tidak sesuai, silahkan coba lagi`
          );
          MahasiswaController.menu();
          break;
      }
    });
  }

  static daftar() {
    Mahasiswa.find()
      .then((data) => {
        showtableMahasiswa(data);
        MahasiswaController.menu();
      })
      .catch(() => {
        console.log(`Terjadi kesalahan pada data, silahkan coba lagi`);
        MahasiswaController.menu();
      });
  }

  static cari() {
    rl.question(`Masukkan NIM Mahasiswa : `, async (answer) => {
      try {
        const result = await Mahasiswa.search(answer);
        showDetail(result);
        MahasiswaController.menu();
      } catch (e) {
        console.log(
          `NIM yang Anda masukkan tidak tersedia, silahkan coba lagi`
        );
        MahasiswaController.cari();
      }
    });
  }

  static tambah() {
    console.log(`Lengkapi data di bawah ini :`);
    Mahasiswa.find()
      .then((data) => {
        showtableMahasiswa(data);
        rl.question(`NIM : `, (nim) => {
          rl.question(`Nama : `, (namamahasiswa) => {
            rl.question(`Tanggal Lahir : `, (tanggallahir) => {
              rl.question(`Alamat : `, (alamat) => {
                Jurusan.find(function (data) {
                  showtableJurusan(data);
                  rl.question(`Kode Jurusan : `, async (idjurusan) => {
                    if (await Mahasiswa.search(nim)) {
                      console.log(
                        `NIM telah tersedia di database, silahkan coba lagi.`
                      );
                      MahasiswaController.menu();
                    } else {
                      Mahasiswa.create(
                        nim,
                        namamahasiswa,
                        tanggallahir,
                        alamat,
                        idjurusan,
                        function () {
                          console.log(`Mahasiswa telah ditambahkan`);
                          MahasiswaController.daftar();
                        }
                      );
                    }
                  });
                });
              });
            });
          });
        });
      })
      .catch(() => {
        console.log(`Terjadi kesalahan pada data, silahkan coba lagi`);
        MahasiswaController.menu();
      });
  }

  static hapus() {
    rl.question(`Masukkan NIM Mahasiswa : `, async (nim) => {
      const mahasiswa = await Mahasiswa.search(nim);
      if (mahasiswa) {
        Mahasiswa.delete(nim).then(() => {
          console.log(`Data Mahasiswa ${nim} telah dihapus`);
          MahasiswaController.menu();
        });
      } else {
        console.log(
          `NIM yang Anda masukkan tidak terdaftar, silahkan coba lagi`
        );
        MahasiswaController.menu();
      }
    });
  }
}
