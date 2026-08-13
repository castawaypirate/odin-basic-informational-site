import http from "node:http";
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

// const http = require("http");
// const fs = require("fs").promises;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const host = "localhost";
const port = 8000;

let htmlFiles = {};
let cssFiles = {};

try {
  const publicDir = path.join(__dirname, "/public/");
  const files = await fs.readdir(publicDir);
  for (const dirContent of files) {
    if (dirContent.includes("html")) {
      const htmlFilename = dirContent.split(".")[0];
      const htmlFile = await fs.readFile(path.join(publicDir, dirContent));
      htmlFiles["/" + htmlFilename] = htmlFile;
    }
    if (dirContent === "css") {
      const cssDir = await fs.readdir(publicDir + "/" + dirContent);

      for (const css of cssDir) {
        const cssFile = await fs.readFile(
          path.join(publicDir, dirContent + "/" + css),
        );
        cssFiles["/css/" + css] = cssFile;
      }
    }
  }
} catch (err) {
  console.error(err);
}

const requestListener = function (req, res) {
  try {
    const ext = req.url.split(".");
    if (ext.includes("css")) {
      res.setHeader("content-type", "text/css");
      if (cssFiles.hasOwnProperty(req.url)) {
        res.writeHead(200);
        res.end(cssFiles[req.url]);
      } else {
        return;
      }
    } else {
      res.setHeader("content-type", "text/html");
      if (req.url === "/") {
        res.writeHead(200);
        res.end(htmlFiles["/index"]);
      } else if (htmlFiles.hasOwnProperty(req.url)) {
        res.writeHead(200);
        res.end(htmlFiles[req.url]);
      } else {
        res.writeHead(404);
        res.end(htmlFiles["/404"]);
      }
    }
  } catch (err) {
    console.error(err);
    res.writeHead(500);
    res.end("<h1>500 Internal Server Error</h1>");
  }
};

const server = http.createServer(requestListener);
server.listen(port, host, () => {
  console.log(`Server is running on http://${host}:${port}`);
});

// fs.readFile(__dirname + "/public/index.html")
//   .then((contents) => {
//     htmlFiles["index"] = contents;
//   })
//   .catch((err) => {
//     res.writeHead(500);
//     res.end("Internal Server Error");
//     return;
//   });
//
// fs.readFile(__dirname + "/public/about.html")
//   .then((contents) => {
//     htmlFiles["about"] = contents;
//   })
//   .catch((err) => {
//     res.writeHead(500);
//     res.end("Internal Server Error");
//     return;
//   });
//
// fs.readFile(__dirname + "/public/contact.html")
//   .then((contents) => {
//     htmlFiles["contact"] = contents;
//   })
//   .catch((err) => {
//     res.writeHead(500);
//     res.end("Internal Server Error");
//     return;
//   });
//
// fs.readFile(__dirname + "/public/404.html")
//   .then((contents) => {
//     htmlFiles["404"] = contents;
//   })
//   .catch((err) => {
//     res.writeHead(500);
//     res.end("Internal Server Error");
//     return;
//   });

// if (req.url === "/") {
//   res.end(htmlFiles["index"]);
// } else if (req.url === "/about") {
//   res.end(htmlFiles["about"]);
// } else if (req.url === "/contact") {
//   res.end(htmlFiles["contact"]);
// } else {
//   res.end(htmlFiles["404"]);
// }

// const requestListener = function (req, res) {
//   fs.readFile(__dirname + "/public/index.html")
//     .then((contents) => {
//       res.setHeader("content-type", "text/html");
//       res.writeHead(200);
//       res.end(contents);
//     })
//     .catch((err) => {
//       res.writeHead(500);
//       res.end("Internal Server Error");
//       return;
//     });
// };

// import http from "node:http";
// import fs from "node:fs/promises";
// import fs from "fs";
// const http = require("http");
// const fs = require("fs");
//
// const port = 3000;
// const host = "localhost";
//
// const server = http.createServer((req, res) => {
//   let htmlFile;
//   if (req.url === "/") {
//     htmlFile = "index.html";
//     res.statusCode = 200;
//     res.setHeader("content-type", "text/html");
//     fs.createReadStream(htmlFile).pipe(res);
//   } else if (req.url === "/about") {
//     htmlFile = "about.html";
//     res.statusCode = 200;
//     res.setHeader("content-type", "text/html");
//     fs.createReadStream(htmlFile).pipe(res);
//   } else if (req.url === "/contact") {
//     htmlFile = "contact.html";
//     res.statusCode = 200;
//     res.setHeader("content-type", "text/html");
//     fs.createReadStream(htmlFile).pipe(res);
//   } else {
//     htmlFile = "404.html";
//     res.statusCode = 200;
//     res.setHeader("content-type", "text/html");
//     fs.createReadStream(htmlFile).pipe(res);
//   }
// });

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

// server.listen(3000);

// const server = http.createServer((req, res) => {
//   res.end(index);
// });

// server.listen(port, host, () => {
// });
