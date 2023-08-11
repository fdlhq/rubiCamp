const readline = require("node:readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: "Jawaban kamu> ",
});
const fs = require("fs");
const data = fs.readFileSync("data.json", "utf-8");
const obj = JSON.parse(data);
let katalisatorArray = 0;

console.log(
  "Selamat datang di permainan Tebak Kata, silahkan isi jawabannya dengan benar ya! \n"
);
console.log("pertanyaan:", obj[katalisatorArray].definition);

rl.prompt();

rl.on("line", (isi) => {
  if (
    isi.toString().toLowerCase() == obj[katalisatorArray].term.toLowerCase()
  ) {
    console.log("Selamat anda benar! \n");
    katalisatorArray++;
  } else {
    console.log("Wkwkwkwk, Anda kurang beruntung! \n");
  }

  if (katalisatorArray == obj.length) {
    rl.close();
  }

  console.log("pertanyaan:", obj[katalisatorArray].definition);

  rl.prompt();
}).on("close", () => {
  console.log("Hore Anda Menang!");
  process.exit(0);
});
