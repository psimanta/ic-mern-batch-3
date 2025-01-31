const fs = require("fs");

fs.readFile("./test.txt", "utf-8", (err, data) => {
  if (err) {
    console.log(err);
  }
  fs.writeFile("./write.txt", data, (err) => {
    if (!err) {
      fs.readFile("./text2.txt", "utf-8", (err, data) => {
        if (!err) {
          console.log(data);
        }
      });
    }
  });
});
