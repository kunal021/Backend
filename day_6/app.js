const express = require("express");

const app = express();

const port = 3000;

app.get("/", (req, res) => {
  // res.status(200).send("My first Express app");
  //sending json data
  res.json({ name: "Kunal", age: 20, "current-occupation": "Student" });
});

app.post("/", (req, res) => {
  res.send("You can post here");
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
