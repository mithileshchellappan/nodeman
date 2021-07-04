require("dotenv").config();
const debug = require("debug")("app:startup");
const morgan = require("morgan");
const express = require("express");
const app = express();
const helmet = require("helmet");
const cors = require("cors");
app.use(cors());

const courses = require("./routes/courses");
const home = require("./routes/home");

app.set("view engine", "pug");
app.set("views", "./views");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(helmet());
app.use("/api/courses", courses);
app.use("/", home);

if (app.get("env") === "development") {
  app.use(morgan("tiny"));
  debug("Starting app in development mode");
}

const port = process.env.PORT || 3001;
app.listen(port, () => console.log(`Listening on port ${port}`));
