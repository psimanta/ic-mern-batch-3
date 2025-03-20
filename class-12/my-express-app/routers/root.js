const booksRouter = require("./booksRouter");
const adminRouter = require("./adminRouter");
const authorRouter = require("./authorRouter");
const userRouter = require("./userRouter");

module.exports = (app) => {
  app.use("/books", booksRouter);
  app.use("/admin", adminRouter);
  app.use("/author", authorRouter);
  app.use("/user", userRouter);
};
