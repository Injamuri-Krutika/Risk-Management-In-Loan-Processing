const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
var cors = require("cors");
const eligibility = require("./routes/eligibility.route");
const registration = require("./routes/register.route");
const confirmation = require("./routes/confirmation.route");
const login = require("./routes/login.route");
const loan = require("./routes/loan.route");
const file = require("./routes/file.route");

const distPath = path.join(__dirname, "/npviews/dist/Project");
const port = 8000;

const app = express();

// Set up mongoose connection
const mongoose = require("mongoose");
let dev_db_url = "mongodb://localhost:27017/loanProcessingNew";
let mongoDB = process.env.MONGODB_URI || dev_db_url;
mongoose.connect(mongoDB, { useNewUrlParser: true });
mongoose.Promise = global.Promise;
let db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", function callback() {
  app.use(cors());
  app.use(express.static(distPath));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use("/know-eligibility", eligibility);
  app.use("/register", registration);
  app.use("/confirm", confirmation);
  app.use("/login", login);
  app.use("/loan-details", loan);
  app.use("/file", file);

  // app.get("/", (req, res) => {
  //   res.sendFile(distPath + "index.html");
  // });

  app.listen(port, () => {
    console.log(`listening on ${port}`);
  });
});

// const MongoClient = require("mongodb").MongoClient;
// const uri =
//   "mongodb+srv://loan_processing:loan123@loanprocessing-wlptx.mongodb.net/test?retryWrites=true";
// const client = new MongoClient(uri, { useNewUrlParser: true });
// client.connect(err => {
//   const db = client.db("LoanProcessing");
//   // perform actions on the collection object

//   //   app.post('/quotes', (req, res) => {
//   //     db.collection('quotes').save(req.body, (err, result) => {
//   //       if (err) return console.log(err)

//   //       console.log('saved to database')
//   //       res.redirect('/')
//   //     })
//   //   })
//   //   client.close();
// });

// // const MongoClient = require("mongodb").MongoClient;
// // const uri =
// //   "mongodb+srv://loan_processing:loan123@loanprocessing-wlptx.mongodb.net/test?retryWrites=true// const client = new MongoClient(uri, { useNewUrlParser: true })";
// // MongoClient.connect(uri, { useNewUrlParser: true }, (err, client) => {
// //   if (err) return console.log(err);
// //   var db = client.db("LoanProcessing");
// //   // perform actions on the collection object

// //   app.post("/quotes", (req, res) => {
// //     db.collection("quotes").save(req.body, (err, result) => {
// //       if (err) return console.log(err);

// //       console.log("saved to database");
// //       res.redirect("/");
// //     });
// //   });
// //   console.log("connected to DB");
// //   const distPath = "../Project/dist";
// //   const app = express();
// //   var port = 8000;
// //   app.use(express.static(path.join(__dirname, "../Project/dist/Project")));
// //   app.listen(port, () => {
// //     console.log("Server started!");
// //   });

// //   app.get("/", (req, res) => res.sendFile("index.html"));

// //   app.route("/api/cats").get((req, res) => {
// //     res.send({
// //       cats: [{ name: "lilly" }, { name: "lucy" }]
// //     });
// //   });

// //   app.route("/api/cats/:name").get((req, res) => {
// //     const requestedCatName = req.params["name"];
// //   });

// //   client.close();
// // });
