import { db } from "./connect.js";

export function login(username) {
  return new Promise(function (resolve, reject) {
    db.get(
      `SELECT * FROM account WHERE username = ? `,
      [username],
      (err, data) => {
        if (err) reject(err);
        else resolve(data);
      }
    );
  });
}
