var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const Quiz = require("./models/Quiz");
const Dictionary = require("./models/Dictionary");
const fs = require("fs");
const mongoose = require("./utils/Mongoose");
const cors = require("cors");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var testRouter = require("./routes/test");
var articleRouter = require("./routes/article.js");
var mypageRouter = require("./routes/mypage");
var boardRouter = require("./routes/board");
var app = express();

app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "/home/ubuntu/miniproject/financial-react/financial-cbt-react/dist")));

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, '/home/ubuntu/miniproject/financial-react/financial-cbt-react/dist/index.html'))
});

app.use("/", indexRouter);
app.use("/api/users", usersRouter);
app.use("/api/test", testRouter);
app.use("/api/article", articleRouter);
app.use("/api/mypage", mypageRouter);
app.use("/api/board", boardRouter);
// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
});

// const find = async () => {
//   try {
//     const quizs = await Quiz.find({});
//     console.log(quizs.length)

//     const dictionarys = await Dictionary.find({});
//     console.log(dictionarys.length)

//   } catch (error) {
//     console.error('Error finding comments:', error);
//   }
// };

// find();

module.exports = app;
