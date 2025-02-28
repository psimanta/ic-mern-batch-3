const booksRouter = require("./booksRouter");
const adminRouter = require("./adminRouter");
const authorRouter = require("./authorRouter");

module.exports = (app) => {
  app.use("/books", booksRouter);
  app.use("/admin", adminRouter);
  app.use("/author", authorRouter);
};
