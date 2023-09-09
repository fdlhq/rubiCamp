import { rl, baris, menuUtama, welcome } from "../university.js";
import { enter } from "../views/LoginView.js";
import { login } from "../models/Login.js";

export default class LoginController {
  static masuk() {
    rl.question(`username: `, async (answer) => {
      await login(answer)
        .then((x) => {
          if (answer == x.username) {
            rl.question(`password: `, (answer2) => {
              if (answer2 == x.password) {
                enter(x);
                menuUtama();
              } else {
                console.log(
                  `Username dan Password tidak sesuai, silahkan coba lagi`
                );
                LoginController.login();
              }
            });
          }
        })
        .catch((x) => {
          console.log(`Username tidak tersedia, silahkan coba lagi`);
          LoginController.masuk();
        });
    });
  }
}
