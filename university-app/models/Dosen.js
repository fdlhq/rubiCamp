import { db } from "./connect.js";

export default class Dosen {
  constructor(obj) {
    this.nip = obj.nip;
    this.namadosen = obj.namadosen;
  }

  save() {
    db.run(
      "INSERT INTO dosen (nip, namadosen) VALUES (?, ?)",
      [this.nip, this.namadosen],
      (err) => {
        if (err) console.log(err);
      }
    );
  }

  static find(next) {
    db.all("SELECT * FROM dosen", (err, data) => {
      if (err) console.log(err);
      next(data);
    });
  }

  static search(nip) {
    return new Promise(function (resolve, reject) {
      db.get("SELECT * FROM dosen WHERE nip = ?", [nip], (err, data) => {
        if (err) reject(err);
        else resolve(data);
      });
    });
  }

  static create(nip, nama) {
    const databaru = new Dosen({ nip: nip, namadosen: nama });
    return databaru.save();
  }

  static delete(nip) {
    return new Promise(function (resolve, reject) {
      db.run("DELETE FROM dosen WHERE nip = ?", [nip], (err) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });
  }
}
