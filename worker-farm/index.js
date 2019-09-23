const express = require("express");
const app = express();

let workerFarm = require("worker-farm"),
  workers = workerFarm(require.resolve("./child")),
  ret = 0;

app.get("/data", (req, res) => {
  for (let i = 0; i < 10; i++) {
    workers("#" + i + " FOO", function(err, outp) {
      console.log(outp);
      if (++ret == 10) workerFarm.end(workers);
    });
  }
  res.send("done");
});

app.listen(5001);
