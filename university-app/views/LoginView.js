import { baris } from "../university.js";
import { login } from "../models/Login.js";

export function enter(data) {
  baris();
  console.log(
    `Welcome ${data.username}, your access level is ${data.role.toUpperCase()}`
  );
}
