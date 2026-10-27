import express from "express";
import favicon from "serve-favicon";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 8000;

app.use(favicon(path.join(__dirname, "favicon.ico")));
app.use(express.static('public', { extensions: ['html'] }));

app.get("/", (req, res) => {
  res.sendFile("index.html", { root: "public" });
});

app.get("/about", (req, res) => {
  res.sendFile("about.html", { root: "public" });
});

app.get("/contact", (req, res) => {
  res.sendFile("contact.html", { root: "public" });
});

app.use((req, res) => {
  res.status(404).sendFile("404.html", { root: "public" });
});

app.listen(port);

