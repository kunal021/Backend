const http = require("http");

// creating a simple web server
const server = http.createServer((req, res) => {
  res.end("My first Node Server");
});

const port = 8000;
server.listen(port, () => {
  console.log(`Listening to server on port ${port}`);
});
