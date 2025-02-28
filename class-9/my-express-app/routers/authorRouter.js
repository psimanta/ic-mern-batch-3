const express = require("express");
const { Author } = require("../models/author");

const authorRouter = express.Router();

authorRouter.post("/", async (req, res) => {
  const { name, dob } = req.body;
  const result = await Author.create({
    name,
    dob,
  });
  res.status(201).json(result);
});

module.exports = authorRouter;
