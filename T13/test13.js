const fs = require("fs");
const data = JSON.parse(fs.readFileSync("todo.json", "utf-8"));
const command = process.argv[2],
  id = process.argv[3];
tambahKegiatan = process.argv.slice(3).join(" ");
let indx = id - 1;
tambahID = data.length + 1;

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
      data.forEach((item, index) => {
        console.log(
          `${index + 1}. [${item.complete ? "x" : " "}] ${item.title}`
        );
      });

      break;
    case "task":
      for (let i in data[indx]) console.log(`${i}: ${data[indx][i]}`);
      break;
    case "add":
      if (tambahKegiatan) {
        console.log(`'${tambahKegiatan}' telah ditambahkan`);
        data.push({
          ID: tambahID,
          title: tambahKegiatan,
          complete: false,
          tag: "",
        });
        fs.writeFileSync("todo.json", JSON.stringify(data), "utf-8");
      } else if (!tambahKegiatan || tambahKegiatan == " ") return;
      break;
    case "delete":
      console.log(`"${data[indx].title}" telah dihapus dari daftar`);
      data.splice(indx, 1);
      for (let i = 0; i < data.length; i++) data[i].ID = i + 1;
      fs.writeFileSync("todo.json", JSON.stringify(data), "utf-8");
      break;
    case "complete":
      console.log(`"${data[indx].title}" telah selesai`);
      data[indx].complete = true;
      fs.writeFileSync("todo.json", JSON.stringify(data), "utf-8");
      break;
    case "uncomplete":
      console.log(`"${data[indx].title}" status selesai dibatalkan`);
      data[indx].complete = false;
      fs.writeFileSync("todo.json", JSON.stringify(data), "utf-8");
      break;
    case "list:outstanding":
      console.log("Daftar Pekerjaan");
      let out = [];
      for (let i of data) {
        if (!i.complete) {
          i.complete = "[ ]";
          out.push(`${i.ID}: ${i.complete} ${i.title}.`);
        }
      }
      if (id == "asc") console.log(out.join("\n"));
      else if (id == "desc") console.log(out.reverse().join("\n"));
      break;
    case "list:completed":
      console.log("Daftar Pekerjaan");
      let complete = [];
      for (let i of data) {
        if (i.complete) {
          i.complete = "[x]";
          complete.push(`${i.ID}: ${i.complete} ${i.title}.`);
        }
      }
      if (id == "asc") console.log(complete.join("\n"));
      else if (id == "desc") console.log(complete.reverse().join("\n"));
      break;
    case "tag":
      console.log(
        `Tag ${process.argv.slice(4)} telah ditambahkan ke dalam daftar '${
          data[data.findIndex((i) => i.ID == id)].title
        }'`
      );
      data[indx].tag = process.argv.slice(4);
      fs.writeFileSync("todo.json", JSON.stringify(data), "utf-8");
    case `filter:${command.slice(7)}`:
      console.log("Daftar Pekerjaan");
      console.log(command.slice(7));
      for (let i of data) {
        if (i.tag.includes(command.slice(7))) {
          if (i.complete) {
            i.complete = "[x]";
            console.log(`${i.ID}. ${i.complete} ${i.title}.`);
          } else if (!i.complete) {
            i.complete = "[ ]";
            console.log(`${i.ID}. ${i.complete} ${i.title}.`);
          }
        }
      }
  }
}
