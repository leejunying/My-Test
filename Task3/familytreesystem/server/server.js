const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const Router = require("./src/Routers/Routers");
const DB_Connect = require("./src/Config/Database");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");

var server = require("http").Server(app);
app.use(bodyParser.json());
server.listen(process.env.PORT, () => {
  console.log(`Sever on ${process.env.PORT}`);
});

var corsOptions = {
  origin: "http://localhost:3000",
  optionsSuccessStatus: 200,
  credentials: true,
};

app.use(cors(corsOptions));
app.all("/", function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
});

app.get("/", function (req, res, next) {
  // Handle the get for this route
});
app.post("/", function (req, res, next) {
  // Handle the post for this route
});
mongoose
  .connect(DB_Connect.URL_DB, {})
  .then(() => {
    console.log("Successfully connected to the database ");
  })
  .catch((err) => {
    console.log(err);
    process.exit();
  });
app.use("/", Router);
