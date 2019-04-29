import { Router } from "express";
const _router = Router();
var multer = require("multer");
var path = require("path");
var fs = require("fs");

var store = multer.diskStorage({
  destination: function(req, file, cb) {
    var path = __dirname.replace("routes", "") + "uploads/" + req.body.email;
    if (!fs.existsSync(path)) {
      fs.mkdirSync(path);
    }
    cb(null, path);
  },
  filename: function(req, file, cb) {
    cb(null, Date.now() + "." + file.originalname);
  }
});

var upload = multer({ storage: store }).single("file");

_router.post("/upload", function(req, res, next) {
  console.log("Inside upload");
  upload(req, res, function(err) {
    console.log(req.file);
    if (err) {
      return res.status(501).json({ error: err });
    }
    //do all database record saving activity

    return res.json({
      originalname: req.file.originalname,
      uploadname: req.file.filename
    });
  });
});

_router.post("/download", function(req, res, next) {
  let filepath =
    path.join(__dirname, "../uploads") +
    "/" +
    req.body.email +
    "/" +
    req.body.filename;
  console.log(filepath);
  res.download(filepath);
});

module.exports = _router;
