const express = require("express");

const fileUpload = require("express-fileupload");
const path = require("path");
const fs = require("fs");
const bodyParser = require("body-parser");

const filespayloadExists = require("./middleware/filesPayloadExists");
const fileExeLimiter = require("./middleware/fileExeLimiter");
const fileSizeLimiter = require("./middleware/fileSizeLimiter");

const PORT = process.env.PORT || 3500;

const app = express();
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.post(
  "/upload",
  fileUpload({ createParentPath: true }),
  filespayloadExists,
  fileExeLimiter([".png", ".jpg", "jpeg",'.mp4']),
  fileSizeLimiter,

  (req, res) => {
    const files = req.files;

    console.log(files);

    Object.keys(files).forEach((key) => {
      const filePath = path.join(__dirname, "files", files[key].name);

      files[key].mv(filePath, (err) => {
        if (err) return res.status(500).json({ status: "error", message: err });
      });
    });

    return res.json({ status: "logged", message: "logged" });
  }
);

app.get("/image/:name", (req, res) => {
  try {
    const name = req.params.name;
    console.log(name);
    return res.sendFile(path.join(__dirname, "files", name));
  } catch (error) {
    res.send("not found");
  }
  //    res.redirect("*");
});

app.get('/image', (req, res) => {
    fs.readdir(path.join(__dirname, 'files'), (err, files) => {
      if (err) {
        return res.status(500).json({ error: 'Failed to retrieve files' });
      }
      res.json(files);
    });
  });
  
app.get("*", (req, res) => {
  return res.json({ message: "Route not found !" });
});

app.listen(PORT, () => console.log(`Server running on port ${PORT} `));
