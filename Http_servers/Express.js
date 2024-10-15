const express = require("express");
const http = require("http");

const app = express();

app.get("/", (req, res) => {
  res.send("Hello ji this is Home Page JI");
});

app.get("/about", (req, res) => {
  res.send("Hello ji this is About Page JI");
});

const myServer = http.createServer(app);
myServer.listen(5000, () =>
  console.log("I don't know how but this is working")
);
