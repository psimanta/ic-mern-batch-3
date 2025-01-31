// Syntactical Sugar
const fs = require("fs/promises"); // fs => file system

async function readFiles() {
  const data = await fs.readFile("example.txt", "utf8");
  console.log(data);
  const data2 = await fs.readFile("example2.txt", "utf8");
  console.log(data2);
}

readFiles();
