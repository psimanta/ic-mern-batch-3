const fs = require("fs");

const promise1 = new Promise((resolve, reject) => {
  fs.readFile("./test.txts", "utf-8", (err, data) => {
    if (err) {
      reject(err);
    }
    resolve(data);
  });
});

const writeTextFile = (data) => {
  const promise = new Promise((resolve, reject) => {
    fs.writeFile("./write.txt", data, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve("File read success!");
      }
    });
  });
  return promise;
};

const readAnotherFile = () => {};

promise1
  .then((res) => {
    writeTextFile(res);
  })
  .then((res) => {})
  .catch((err) => {
    console.log(err);
  });
