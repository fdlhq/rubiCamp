import Kontrak from "../models/Kontrak.js";
import Mahasiswa from "../models/Mahasiswa.js";
import Matakuliah from "../models/Matakuliah.js";
import Dosen from "../models/Dosen.js";
import { showtableDosen } from "../views/DosenView.js";
import { showtableMatakuliah } from "../views/MatakuliahView.js";
import { showtableMahasiswa } from "../views/MahasiswaView.js";
import { baris, menuUtama, rl } from "../university.js";
import { showKontrak, tabelKontrak, showMenu } from "../views/KontrakView.js";

export default class KontrakController {
  static menu() {
    showMenu();
    rl.question(`Masukkan salah astu nomor dari opsi di atas: `, (answer) => {
      switch (answer) {
        case "1":
          KontrakController.daftar();
          break;
        case "2":
          KontrakController.cari();
          break;
        case "3":
          KontrakController.tambah();
          break;
        case "4":
          KontrakController.hapus();
          break;
        case "5":
          KontrakController.change();
          break;
        case "6":
          menuUtama();
          break;
        default:
          console.log(
            `Nomor yang Anda masukkan tidak sesuai, silahkan coba lagi`
          );
          KontrakController.menu();
          break;
      }
    });
  }

  static daftar() {
    Kontrak.find()
      .then((data) => {
        showKontrak(data);
        KontrakController.menu();
      })
      .catch((err) => {
        console.log(`Terjadi kesalahan pada data, silahkan coba lagi`);
        console.log(err);
        KontrakController.menu();
      });
  }

  static cari() {
    Mahasiswa.find().then((data) => {
      showtableMahasiswa(data);
      rl.question(`Masukkan NIM Mahasiswa : `, async (answer) => {
        const kontrak = await Kontrak.search(answer);
        if (kontrak) {
          console.log(`Daftar kontrak mahasiswa dengan NIM ${answer} adalah: `);
          tabelKontrak(kontrak);
          KontrakController.menu();
        } else {
          console.log(
            `NIM yang Anda masukkan tidak tersedia, silahkan coba lagi`
          );
          KontrakController.cari();
        }
      });
    });
  }

  static tambah() {
    console.log(`Lengkapi data di bawah ini: `);
    Mahasiswa.find().then((data) => {
      showtableMahasiswa(data);
      rl.question(`Masukkan NIM: `, (nim) => {
        Matakuliah.find(function (data) {
          showtableMatakuliah(data);
          rl.question(`Masukkan Kode Mata Kuliah: `, (idmatakuliah) => {
            Dosen.find(function (data) {
              showtableDosen(data);
              rl.question(`Masukkan NIP Dosen: `, async (nip) => {
                if (await Kontrak.findforAdd(nim, idmatakuliah)) {
                  console.log(
                    `Kontrak Mahasiswa telah tersedia, silahkan coba lagi`
                  );
                  KontrakController.menu();
                } else {
                  Kontrak.create(nim, idmatakuliah, nip, function () {
                    console.log(`Kontrak telah ditambahkan`);
                    Kontrak.find().then((data) => {
                      showKontrak(data);
                      KontrakController.menu();
                    });
                  });
                }
              });
            });
          });
        });
      });
    });
  }

  static hapus() {
    rl.question(`Masukkan ID Kontrak : `, async (idkontrak) => {
      const kontrak = await Kontrak.search(idkontrak);
      if (kontrak) {
        Kontrak.delete(idkontrak).then(() => {
          console.log(`Data Kontrak dengan ID ${idkontrak}, telah dihapus`);
          KontrakController.menu();
        });
      } else {
        console.log(
          `NIM yang Anda masukkan tidak terdaftar, silahkan coba lagi`
        );
        KontrakController.menu();
      }
    });
  }

  static change() {
    Kontrak.find()
      .then((data) => {
        showKontrak(data);
        rl.question(`Masukkan NIM Mahasiswa : `, async (nim) => {
          const kontrak = await Kontrak.search(nim);
          if (kontrak) {
            baris();
            console.log(`Detail mahasiswa dengan NIM ${nim} adalah: `);
            tabelKontrak(kontrak);
            baris();
            rl.question(
              `Masukkan ID yang akan diubah nilainya: `,
              async (idkontrak) => {
                if (await Kontrak.findofUpdate(idkontrak, nim)) {
                  baris();
                  rl.question(`Masukkan nilai yang baru: `, async (nilai) => {
                    baris();
                    await Kontrak.update(nilai, nim, idkontrak);
                    console.log(`Nilai telah diupdate`);
                    Kontrak.find().then((data) => {
                      showKontrak(data);
                      KontrakController.menu();
                    });
                  });
                } else {
                  console.log(
                    `ID Kontrak dan NIM Mahasiswa yang Anda masukkan tidak tersedia, silahkan coba lagi`
                  );
                  KontrakController.menu();
                }
              }
            );
          } else {
            console.log(
              `NIM yang Anda masukkan tidak tersedia, silahkan coba lagi`
            );
            KontrakController.search();
          }
        });
      })
      .catch(() => {
        console.log(`Terjadi kesalahan pada data, silahkan coba lagi`);
        KontrakController.menu();
      });
  }
}
