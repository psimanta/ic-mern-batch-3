const http = require("http");
const url = require("url");

const PORT = 8080;

// CRUD => Create, Read, Update, Delete
// Method => POST, GET, PUT/PATCH, DELETE

const server = http.createServer((req, res) => {
  const parseUrl = url.parse(req.url, true);
  const method = req.method;
  const endpoint = parseUrl.pathname;

  console.log("Endpoint: ", endpoint);
  console.log("Method: ", method);

  if (endpoint === "/" && method === "GET") {
    res.writeHead(200);
    res.end("Home page!");
  } else if (endpoint === "/users" && method === "GET") {
    res.writeHead(200);
    res.end("GET request to the users page!");
  } else if (endpoint.startsWith("/users/" && method === "GET")) {
    // to do
    const userId = endpoint.split("/")[2];
    res.writeHead(200);
    res.end("GET request to the users page with user id!");
  } else if (endpoint === "/users" && method === "POST") {
    res.writeHead(201);
    res.end("POST request to the users page!");
  } else {
    res.writeHead(404);
    res.end("Not found!");
  }
});

server.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}!`);
});
