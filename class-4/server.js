const express = require("express");
require("dotenv").config();
const booksRouter = require("./booksRouter");
const adminRouter = require("./adminRouter");

const app = express();

app.use(express.json());

const PORT = process.env.PORT || 8000;

app.use("/books", booksRouter);
app.use("/admin", adminRouter);

// 404 handler
app.use((req, res, next) => {
    res.status(404).json({
        message: "The requested resource was not found!",
    });
});

// error handling middleware
app.use((err, req, res, next) => {
    if (err.message) {
        res.status(500).json({
            mesage: err.message,
        });
    } else {
        res.status(500).json({
            mesage: "An unknown error occured!",
        });
    }
});

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});
