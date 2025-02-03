const fs = require("fs");
const path = require("path");
const FILE_PATH = path.join(__dirname, "..", "books.json");

const readFile = () => {
    if (!fs.existsSync(FILE_PATH)) return [];
    const books = fs.readFileSync(FILE_PATH);
    return JSON.parse(books);
};

const writeFile = (data) => {
    fs.writeFileSync(FILE_PATH, JSON.stringify(data, null, 2));
};

module.exports = {
    readFile,
    writeFile,
};
