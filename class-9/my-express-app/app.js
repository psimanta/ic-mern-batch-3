const express = require("express");
require("dotenv").config();

const mongoose = require("mongoose");

const app = express();

app.use(express.json());

mongoose
  .connect(
    "mongodb+srv://simanta:FtpjoIY6AZlKZWEe@ic-mern-03.hw3zr.mongodb.net/library"
  )
  .then(() => console.log("Mongodb connected successfully!"))
  .catch((err) => {
    console.error(err);
  });

const PORT = process.env.PORT || 8000;

require("./routers/root")(app);

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
