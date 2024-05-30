const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const path = require("path");
const cors = require("cors"); // Import cors

const app = express();
const PORT = 3456;

app.use(bodyParser.json());
app.use(cors()); // Use cors

const TODOS_PATH = path.join(__dirname, "todos.json");
const NEWS_PATH = path.join(__dirname, "company-news.json");

app.get("/todos", (req, res) => {
  fs.readFile(TODOS_PATH, "utf8", (err, data) => {
    if (err) {
      res.status(500).send("Error reading todos file");
      return;
    }
    res.send(JSON.parse(data));
  });
});

app.get("/company-news", (req, res) => {
  fs.readFile(NEWS_PATH, "utf8", (err, data) => {
    if (err) {
      res.status(500).send("Error reading company news file");
      return;
    }
    res.send(JSON.parse(data));
  });
});

app.post("/todos", (req, res) => {
  const todos = req.body;
  fs.writeFile(TODOS_PATH, JSON.stringify(todos, null, 2), (err) => {
    if (err) {
      res.status(500).send("Error writing to todos file");
      return;
    }
    res.send("Todos updated successfully");
  });
});

app.post("/company-news", (req, res) => {
  const news = req.body;
  fs.writeFile(NEWS_PATH, JSON.stringify(news, null, 2), (err) => {
    if (err) {
      res.status(500).send("Error writing to company news file");
      return;
    }
    res.send("Company news updated successfully");
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
