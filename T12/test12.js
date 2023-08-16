if (!process.argv[2]) {
  console.log(
    "Tolong sertakan nama file sebagai inputan soal-soalnya, Misalnya 'node test12.js data.json'. \n"
  );
  process.exit();
}

const fs = require("fs");
const readline = require("node:readline");
const data = fs.readFileSync(`./${process.argv[2]}`, "utf-8");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: "Jawaban kamu> ",
});
const obj = JSON.parse(data);

let katalisatorArray = 0;
let kesalahan = 0;

console.log(
  "Selamat datang di permainan Tebak-tebakan, kamu akan di berikan pertanyaan dari file ini 'data.json'. untuk bermain, Jawablah dengan jawab yang sesuai."
);
console.log(
  "Gunakan skip untuk menangguhkan pertanyaannya, dan di akhir pertanyaan akan ditanyakan lagi. \n"
);
console.log("pertanyaan:", obj[katalisatorArray].definition);

rl.prompt();

rl.on("line", (isi) => {
  if (
    isi.toString().toLowerCase() == obj[katalisatorArray].term.toLowerCase()
  ) {
    console.log("\nSelamat anda benar! \n");
    katalisatorArray++;

    if (katalisatorArray == obj.length) {
      console.log("Hore Anda Menang! \n");
      rl.close();
    }
    console.log("pertanyaan:", obj[katalisatorArray].definition);
  } else if (isi.toLowerCase() == "skip") {
    obj.push(obj[katalisatorArray]);
    console.log("\t");
    katalisatorArray++;
    console.log("pertanyaan", obj[katalisatorArray].definition.toLowerCase());
    kesalahan = 0;
  } else {
    kesalahan++;
    console.log(
      `\nAnda Kurang Beruntung, anda telah salah ${kesalahan} kali, silahkan coba lagi. \n`
    );
  }

  rl.prompt();
}).on("close", () => {
  process.exit(0);
});
