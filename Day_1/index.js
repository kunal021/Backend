//file system module require to work with files
const fs = require("fs");

//reading and writing file synchronously or Blocking way

//reading a file
const textRead = fs.readFileSync("./txt/input.txt", "utf-8");
console.log(textRead);

//writing in file
const newText = `This is what we know about Acacado.\n${textRead}`;
fs.writeFileSync("./txt/input.txt", newText);

//reading and writing file asynchronously or Non-Blocking way

//reading a file
fs.readFile("./txt/start.txt", "utf-8", (err, data) => {
  if (err) console.log("Error");
  //this will be executed after, reading consumes time
  console.log(data);
  const write = `writing in file.\n${data}`;
  //writing in a file
  fs.writeFile("./txt/start.txt", write, "utf-8", (err) => {
    console.log("file has been written");
  });

  console.log(data);
});
console.log("This will be executed first");
