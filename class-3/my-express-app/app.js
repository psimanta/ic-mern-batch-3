const express = require("express");
const morgan = require("morgan");
const app = express();
const PORT = 8080;

app.use(morgan("tiny"));
app.use(express.json());

// Express app
// Express Routing
// Express Middleware
// Express req => res cycle

// Middleware
app.use((req, res, next) => {
  console.log("I am homepage middleware!");
  next();
});

app.use((req, res, next) => {
  console.log("I am users middleware!");
  next();
});

// routing
app.get("/", (req, res) => {
  return res.status(200).send("Home page!");
});

// Resouce: Users
app.get("/users", (req, res) => {
  return res.status(200).send("GET request to the users page!");
});

app.get("/users/:id", (req, res) => {
  const id = req.params.id;
  // database
  return res.status(200).send(`GET request to the user ${id}`);
});

app.post("/users", (req, res) => {
  console.log(req.body);
  return res.status(200).send("POST request to the users page!");
});

app.use((req, res) => {
  return res.status(404).send("Not found!");
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}!`);
});
