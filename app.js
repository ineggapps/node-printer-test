var express = require("express");
require("dotenv").config();
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var indexRouter = require("./routes/index");
var printerRouter = require("./routes/printer");
const bodyParser = require("body-parser");
const session = require("express-session");
const FileStore = require("session-file-store")(session);
var app = express();
app.use(bodyParser.json());

app.use(
  session({
    // 2
    secret: "keyboard cat", // 암호화
    resave: false,
    saveUninitialized: true,
    store: new FileStore(),
  })
);
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/printer", printerRouter);

module.exports = app;
