const express = require("express");
const app = express();
const { fork } = require("child_process");
const process = fork("./process_fork/new_process.js");

app.get("/data", (req, res) => {
  process.send([1, 2, 3, 4, 5]);
  process.on("message", message => {
    console.log(`${message}`);
  });
  res.send("done");
});

app.listen(5001);
