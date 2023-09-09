import { db } from "./connect.js";

export default class Jurusan {
  constructor(obj) {
    this.idjurusan = obj.idjurusan;
    this.namajurusan = obj.namajurusan;
  }

  save() {
    db.run(
      "INSERT INTO jurusan (idjurusan, namajurusan) VALUES (?, ?)",
      [this.idjurusan, this.namajurusan],
      (err) => {
        if (err) {
          console.log(err);
        }
      }
    );
  }

  static find(next) {
    let sql = "SELECT * FROM jurusan";
    db.all(sql, (err, rows) => {
      if (err) {
        console.log(err);
      }
      next(rows);
    });
  }

  static search(idjurusan) {
    return new Promise(function (resolve, reject) {
      db.get(
        "SELECT * FROM jurusan WHERE idjurusan = ?",
        [idjurusan],
        (err, data) => {
          if (err) reject(err);
          else resolve(data);
        }
      );
    });
  }

  static create(idjurusan, nama) {
    const databaru = new Jurusan({ idjurusan: idjurusan, namajurusan: nama });
    return databaru.save();
  }

  static delete(idjurusan) {
    return new Promise(function (resolve, reject) {
      db.run("DELETE FROM jurusan WHERE idjurusan = ?", [idjurusan], (err) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });
  }
}
