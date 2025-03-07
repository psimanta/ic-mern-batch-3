const express = require("express");
const fs = require("fs");

const adminRouter = express.Router();

adminRouter.get("/", (req, res, next) => {
    // express cannot handled this error because this was a synchronous operation

    setTimeout(() => {
        try {
            hello();
        } catch (err) {
            next(err);
        }
    }, 3000);

    // hello();

    res.status(200).send("Hello admin");
});

module.exports = adminRouter;
