//creating a simple api
const fs = require("fs");
const http = require("http");

const server = http.createServer((req, res) => {
  const pathName = req.url;

  if (pathName === "/" || pathName === "/overview") {
    res.end("This is Overview Page");
  } else if (pathName === "/product") {
    res.end("This is Product Page");
  } else if (pathName === "/api") {
    //reading file from data.json and sending on server on api route
    //__dirname will locate to current working directory
    fs.readFile(`${__dirname}/data.json`, (err, data) => {
      //   const productData = JSON.parse(data);
      res.writeHead(200, {
        "Content-type": "application/json",
      });
      res.end(data);
    });
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
