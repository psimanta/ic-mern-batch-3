const express = require("express");
const { Author } = require("../models/author");
const { authenticate } = require("../middlewares/authenticate");

const authorRouter = express.Router();

authorRouter.use(authenticate);

authorRouter.post("/", async (req, res) => {
  const { name, dob } = req.body;
  const result = await Author.create({
    name,
    dob,
  });
  res.status(201).json(result);
});

module.exports = authorRouter;
