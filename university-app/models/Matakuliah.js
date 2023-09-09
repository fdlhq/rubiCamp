import { db } from "./connect.js";

export default class Matakuliah {
  constructor(obj) {
    this.idmatakuliah = obj.idmatakuliah;
    this.namamatakuliah = obj.namamatakuliah;
    this.SKS = obj.SKS;
  }

  save() {
    db.run(
      "INSERT INTO matakuliah (idmatakuliah, namamatakuliah, SKS) VALUES (?, ?, ?)",
      [this.idmatakuliah, this.namamatakuliah, this.SKS],
      (err) => {
        if (err) console.log(err);
      }
    );
  }

  static find(next) {
    db.all("SELECT * FROM matakuliah", (err, data) => {
      if (err) console.log(err);
      next(data);
    });
  }

  static search(idmatakuliah) {
    return new Promise(function (resolve, reject) {
      db.get(
        "SELECT * FROM matakuliah WHERE idmatakuliah = ?",
        [idmatakuliah],
        (err, data) => {
          if (err) reject(err);
          else resolve(data);
        }
      );
    });
  }

  static create(idmatakuliah, namamatakuliah, SKS) {
    const databaru = new Matakuliah({
      idmatakuliah: idmatakuliah,
      namamatakuliah: namamatakuliah,
      SKS: SKS,
    });
    return databaru.save();
  }

  static delete(idmatakuliah) {
    return new Promise(function (resolve, reject) {
      db.run(
        "DELETE FROM matakuliah WHERE idmatakuliah = ?",
        [idmatakuliah],
        (err) => {
          if (err) {
            reject(err);
          } else {
            resolve();
          }
        }
      );
    });
  }
}
