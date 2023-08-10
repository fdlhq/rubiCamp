const readline = require("node:readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: "tulis kalimatmu disini> ",
});

rl.prompt();

rl.on("line", (line) => {
  var vocal = "aiueo";
  var consonant = line.split(" ");
  let hasil = "";

  for (let i = 0; i < consonant.length; i++) {
    if (vocal.includes(consonant[i].charAt(0))) {
      hasil += consonant[i] + " ";
    } else if (!vocal.includes(consonant[i].charAt(0))) {
      hasil += consonant[i].slice(1) + consonant[i].charAt(0) + "nyo ";
    }
  }
  console.log(`hasil konversi: ${hasil}`);

  rl.prompt();
}).on("close", () => {
  console.log("Good bye!");
  process.exit(0);
});
