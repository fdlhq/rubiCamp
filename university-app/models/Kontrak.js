import { db } from "./connect.js";

export default class Kontrak {
  constructor(obj) {
    this.nim = obj.nim;
    this.idmatakuliah = obj.idmatakuliah;
    this.nip = obj.nip;
    this.nilai = " ";
  }

  save(next) {
    db.run(
      "INSERT INTO kontrak (nim, idmatakuliah, nip, nilai ) VALUES (?, ?, ?, ?)",
      [this.nim, this.idmatakuliah, this.nip, this.nilai],
      (err) => {
        if (err) console.log(err);
        else next();
      }
    );
  }

  static find() {
    return new Promise(function (resolve, reject) {
      db.all(
        "SELECT idkontrak, kontrak.nim AS nim, mahasiswa.namamahasiswa AS nama, matakuliah.namamatakuliah AS matkul, dosen.namadosen AS dosen, kontrak.nilai AS nilai FROM kontrak LEFT JOIN mahasiswa ON kontrak.nim=mahasiswa.nim LEFT JOIN matakuliah ON kontrak.idmatakuliah=matakuliah.idmatakuliah LEFT JOIN dosen ON kontrak.nip=dosen.nip;",
        (err, data) => {
          if (err) reject(err);
          else resolve(data);
        }
      );
    });
  }

  static search(nim) {
    return new Promise(function (resolve, reject) {
      db.all("SELECT * FROM kontrak WHERE nim = ?", [nim], (err, data) => {
        if (err) reject(err);
        else resolve(data);
      });
    });
  }

  static create(nim, idmatakuliah, nip, next) {
    const databaru = new Kontrak({
      nim: nim,
      idmatakuliah: idmatakuliah,
      nip: nip,
    });
    databaru.save(function () {
      next();
    });
  }

  static delete(idkontrak) {
    return new Promise(function (resolve, reject) {
      db.run("DELETE FROM Kontrak WHERE idkontrak = ?", [idkontrak], (err) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });
  }

  static update(nilai, nim, idkontrak) {
    return new Promise(function (resolve, reject) {
      db.run(
        `UPDATE kontrak SET nilai = ? WHERE nim = ? AND idkontrak = ?`,
        [nilai, nim, idkontrak],
        (err) => {
          if (err) reject(err);
          else resolve();
        }
      );
    });
  }

  static findforAdd(nim, idmatakuliah) {
    return new Promise(function (resolve, reject) {
      db.get(
        `SELECT * FROM kontrak WHERE nim = ? AND idmatakuliah = ?`,
        [nim, idmatakuliah],
        (err, data) => {
          if (err) reject(err);
          else resolve(data);
        }
      );
    });
  }

  static findofUpdate(idkontrak, nim) {
    return new Promise(function (resolve, reject) {
      db.get(
        `SELECT * FROM kontrak WHERE idkontrak = ? AND nim = ? `,
        [idkontrak, nim],
        (err, data) => {
          if (err) reject(err);
          else resolve(data);
        }
      );
    });
  }
}
