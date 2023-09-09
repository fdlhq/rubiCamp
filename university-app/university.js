import readline from "readline";
import JurusanController from "./controllers/JurusanController.js";
import MahasiswaController from "./controllers/MahasiswaController.js";
import MatakuliahController from "./controllers/MatakuliahController.js";
import DosenController from "./controllers/DosenController.js";
import KontrakController from "./controllers/KontrakController.js";
import LoginController from "./controllers/LoginController.js";

export const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

export function welcome() {
  baris();
  console.log(
    "Welcome to Universitas Pendidikan Indonesia\nJl. Setiabudi No. 225"
  );
  baris();

  LoginController.masuk();
}

export function baris() {
  let line = "";
  for (let i = 0; i < 100; i++) line += "=";
  return console.log(line);
}

export function menuUtama() {
  console.log(`
Silahkan pilih opsi di bawah ini:
=================================
[1] Mahasiswa
[2] Jurusan
[3] Dosen
[4] Mata Kuliah
[5] Kontrak
[6] Keluar
`);

  rl.question("Masukan salah satu nomor dari opsi diatas:", (answer) => {
    switch (answer) {
      case "1":
        MahasiswaController.menu();
        break;
      case "2":
        JurusanController.menu();
        break;
      case "3":
        DosenController.menu();
        break;
      case "4":
        MatakuliahController.menu();
        break;
      case "5":
        KontrakController.menu();
        break;
      case "6":
        process.exit(0);
      default:
        console.log(
          "Anda memasukan nomor yang salah, silahkan pilih nomor yang sesuai!"
        );
        menuUtama();
        break;
    }
  });
}

welcome();
