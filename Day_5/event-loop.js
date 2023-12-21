const fs = require("fs");

//so when a program runs inside a callback function than it is running inside of event loop

//outside event loop
setTimeout(() => console.log("Timer function 1"), 0);
setImmediate(() => console.log("Executed immediately 1"));

fs.readFile("./test-file.txt", () => {
  console.log("I/O finsihed");

  console.log("---------------------");

  //inside event loop
  setTimeout(() => console.log("Timer function 2"), 0);
  setTimeout(() => console.log("Timer function 3"), 3000);
  setImmediate(() => console.log("Executed immediately 2"));

  //process.nextTick will be executed immediately while setImmediate will be executed after every nextTick
  process.nextTick(() => console.log("process.nextTick"));
});

console.log("This is top level code");
