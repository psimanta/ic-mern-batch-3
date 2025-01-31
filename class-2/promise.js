const fs = require("fs/promises");

fs.readFile("example.txt", "utf8")
  .then((data) => {
    console.log(data);
    return fs.readFile("example2.txt", "utf8");
  })
  .then((data) => {
    console.log(data);
    return;
  });
