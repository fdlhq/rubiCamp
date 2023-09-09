import { db } from "./connect.js";

export default class Mahasiswa {
  constructor(obj) {
    this.nim = obj.nim;
    this.namamahasiswa = obj.namamahasiswa;
    this.tanggallahir = obj.tanggallahir;
    this.alamat = obj.alamat;
    this.idjurusan = obj.idjurusan;
  }

  save(next) {
    db.run(
      "INSERT INTO mahasiswa (nim, namamahasiswa, tanggallahir, alamat, idjurusan) VALUES (?, ?, ?, ?, ?)",
      [
        this.nim,
        this.namamahasiswa,
        this.tanggallahir,
        this.alamat,
        this.idjurusan,
      ],
      (err) => {
        if (err) console.log(err);
        else next();
      }
    );
  }

  static find() {
    return new Promise(function (resolve, reject) {
      db.all(
        "SELECT nim, namamahasiswa, tanggallahir, alamat, jurusan.idjurusan, jurusan.namajurusan FROM mahasiswa LEFT JOIN jurusan ON mahasiswa.idjurusan=jurusan.idjurusan;",
        (err, data) => {
          if (err) reject(err);
          else resolve(data);
        }
      );
    });
  }

  static search(nim) {
    return new Promise(function (resolve, reject) {
      db.get("SELECT * FROM mahasiswa WHERE nim = ?", [nim], (err, data) => {
        if (err) reject(err);
        else resolve(data);
      });
    });
  }

  static create(nim, namamahasiswa, tanggallahir, alamat, idjurusan, next) {
    const databaru = new Mahasiswa({
      nim: nim,
      namamahasiswa: namamahasiswa,
      tanggallahir: tanggallahir,
      alamat: alamat,
      idjurusan: idjurusan,
    });
    databaru.save(function () {
      next();
    });
  }

  static delete(nim) {
    return new Promise(function (resolve, reject) {
      db.run("DELETE FROM mahasiswa WHERE nim = ?", [nim], (err) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });
  }
}
