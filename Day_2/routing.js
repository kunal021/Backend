const http = require("http");
//routing in node
const server = http.createServer((req, res) => {
  const pathName = req.url;
  if (pathName === "/" || pathName === "/overview") {
    res.end("This is Overview Page");
  } else if (pathName === "/product") {
    res.end("This is Product Page");
  } else {
    res.writeHead(404, {
      "Content-type": "text",
    });
    res.end("Page not found");
  }
});

const port = 8000;
server.listen(port, () => {
  console.log(`Listening to server on port ${port}`);
});
