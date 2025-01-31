const fs = require("fs");
// // Blocking
const data = fs.readFileSync("example.txt", "utf8");

// console.log('Hello world!')
// console.log(data)

// Non-blocking Code
fs.readFile("example.txt", "utf8", (err, data) => {
  console.log(data);
});

console.log("Hello world!");
console.log("Hello world!");
console.log("Hello world!");
console.log("Hello world!");
console.log("Hello world!");
console.log("Hello world!");
console.log("Hello world!");
console.log("Hello world!");
console.log("Hello world!");
console.log("Hello world!");
console.log("Hello world!");
console.log("Hello world!");
