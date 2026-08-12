// import http from "node:http";
// import fs from "node:fs/promises";
// import fs from "fs";
const http = require("http");
const fs = require("fs");

const port = 3000;
const host = "localhost";

const server = http.createServer((req, res) => {
  let htmlFile;
  if (req.url === "/") {
    htmlFile = "index.html";
    res.statusCode = 200;
    res.setHeader("content-type", "text/html");
    fs.createReadStream(htmlFile).pipe(res);
  } else if (req.url === "/about") {
    htmlFile = "about.html";
    res.statusCode = 200;
    res.setHeader("content-type", "text/html");
    fs.createReadStream(htmlFile).pipe(res);
  } else if (req.url === "/contact") {
    htmlFile = "contact.html";
    res.statusCode = 200;
    res.setHeader("content-type", "text/html");
    fs.createReadStream(htmlFile).pipe(res);
  } else {
    htmlFile = "404.html";
    res.statusCode = 200;
    res.setHeader("content-type", "text/html");
    fs.createReadStream(htmlFile).pipe(res);
  }
});

// try {
//   const index = await fs.readFile("index.html", { encoding: "utf8" });
//   console.log(index);
// } catch (err) {
//   console.log(err);
// }

// const server = http.createServer();
//
// server.on("request", (req, res) => {
//   res.statusCode = 200;
//   res.setHeader("content-type", "text/html");
//   fs.readFile("./index.html", null, (error, data) => {
//     if (error) {
//       res.writeHead(404);
//       res.write("whoops");
//     } else {
//       console.log(data);
//       res.write(data);
//     }
//   });
//   res.end();
// });

server.listen(3000);

// const server = http.createServer((req, res) => {
//   res.end(index);
// });

// server.listen(port, host, () => {
// });
