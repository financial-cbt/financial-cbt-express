var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const Quiz = require('./models/Quiz');
const Dictionary = require('./models/Dictionary');
const fs = require('fs');

const mongoose = require('./utils/Mongoose');
const cors = require('cors');

var app = express();
app.use((cors({
  origin: 'http://localhost:3000',
  credentials: true
})));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

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
