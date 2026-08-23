import http from "node:http";
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// const host = "localhost";
const port = process.env.PORT || 8000;

let htmlFiles = {};
let cssFiles = {};
let jsFiles = {};
let faviconFile;
let images = {};

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
    if (dirContent === "js") {
      const jsDir = await fs.readdir(publicDir + "/" + dirContent);

      for (const js of jsDir) {
        const jsFile = await fs.readFile(
          path.join(publicDir, dirContent + "/" + js),
        );
        jsFiles["/js/" + js] = jsFile;
      }
    }
    if (dirContent === "assets") {
      const imagesDir = await fs.readdir(publicDir + "/" + dirContent);

      for (const image of imagesDir) {
        const imageFile = await fs.readFile(
          path.join(publicDir, dirContent + "/" + image),
        );
        images["/assets/" + image] = imageFile;
      }
    }
  }
  faviconFile = await fs.readFile(path.join(__dirname, "/favicon.ico"));
} catch (err) {
  console.error(err);
}

const requestListener = function(req, res) {
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
    } else if (ext.includes("js")) {
      res.setHeader("content-type", "text/javascript");
      if (jsFiles.hasOwnProperty(req.url)) {
        res.writeHead(200);
        res.end(jsFiles[req.url]);
      } else {
        return;
      }
    } else if (req.url === "/favicon.ico") {
      res.setHeader("content-type", "image/x-icon");
      res.writeHead(200);
      res.end(faviconFile);
    } else if (ext.includes("svg")) {
      res.setHeader("content-type", "image/svg+xml");
      if (images.hasOwnProperty(req.url)) {
        res.writeHead(200);
        res.end(images[req.url]);
      } else {
        return;
      }
    } else if (ext.includes("png")) {
      res.setHeader("content-type", "image/png");
      if (images.hasOwnProperty(req.url)) {
        res.writeHead(200);
        res.end(images[req.url]);
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
server.listen(port, () => {
  // console.log(`Server is running on http://${host}:${port}`);
  console.log(`Server is running on port:${port}`);
});
