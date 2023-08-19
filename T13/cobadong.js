const fs = require("fs");
const object = JSON.parse(fs.readFileSync("todo.json", "utf-8"));
const command = process.argv[2],
  id = process.argv[3];
submit = process.argv.slice(3).join(" ");
let indx = id - 1;
count = object.length + 1;

if (!command || command.toLowerCase() == "help") {
  console.log(` >>> JS TODO <<<
      $ node todo.js <command>
      $ node todo.js list
      $ node todo.js task <task_id>
      $ node todo.js add <task_content>
      $ node todo.js delete <task_id>
      $ node todo.js complete <task_id>
      $ node todo.js uncomplete <task_id>
      $ node todo.js list:outstanding asc|desc
      $ node todo.js list:completed asc|desc
      $ node todo.js tag <tag_name_1> <tag_name_2> ... <tag_name_N>
      $ node todo.js filter:<tag_name> 
      `);
} else {
  switch (command.toLowerCase()) {
    case "list":
      console.log("Daftar Pekerjaan");
      for (let i of object) {
        if (i.complete) {
          i.complete = "[x]";
          console.log(`${i.ID}. ${i.complete} ${i.title}.`);
        } else if (!i.complete) {
          i.complete = "[ ]";
          console.log(`${i.ID}. ${i.complete} ${i.title}.`);
        }
      }
      break;
    case "task":
      for (let i in object[indx]) console.log(`${i}: ${object[indx][i]}`);

      break;
    case "add":
      if (submit) {
        console.log(`${submit} telah ditambahkan`);
        object.push({ ID: count, title: submit, complete: false, tag: "" });
        fs.writeFileSync("todo.json", JSON.stringify(object), "utf-8");
      } else if (!submit || submit == " ") return;
      break;
      case "delete":
        console.log()
  }
}
