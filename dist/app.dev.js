"use strict";

require("dotenv").config();

var debug = require("debug")("app:startup");

var morgan = require("morgan");

var express = require("express");

var app = express();

var helmet = require("helmet");

var cors = require("cors");

app.use(cors());

var courses = require("./routes/courses");

var home = require("./routes/home");

app.set("view engine", "pug");
app.set("views", "./views");
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));
app.use(express["static"]("public"));
app.use(helmet());
app.use("/api/courses", courses);
app.use("/", home);

if (app.get("env") === "development") {
  app.use(morgan("tiny"));
  debug("Starting app in development mode");
}

var port = process.env.PORT || 3001;
app.listen(port, function () {
  return console.log("Listening on port ".concat(port));
});