const fs = require("fs").promises;
const exists = require("fs").exists;
const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static("public"));
app.use("/message", express.static("message"));

app.get("/", (req, res) => {
  const filePath = path.join(__dirname, "page", "message.html");
  res.sendFile(filePath);
});

app.get("/exists", (req, res) => {
  const filePath = path.join(__dirname, "page", "exists.html");
  res.sendFile(filePath);
});

app.post("/create", async (req, res) => {
  const title = req.body.title;
  const text = req.body.text;

  const tempFilePath = path.join(__dirname, "temp", title + ".txt");
  const finalFilePath = path.join(__dirname, "message", title + ".txt");

  await fs.writeFile(tempFilePath, text);
  exists(finalFilePath, async (exists) => {
    if (exists) {
      res.redirect("/exists");
    } else {
      // await fs.rename(tempFilePath, finalFilePath);
      await fs.copyFile(tempFilePath, finalFilePath);
      await fs.unlink(tempFilePath);
      res.redirect("/");
    }
  });
});

app.listen(3000);
