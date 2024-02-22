var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const Quiz = require('./models/Quiz');
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

// const readJsonFile = async (filePath) => {
//   return new Promise((resolve, reject) => {
//     fs.readFile(filePath, 'utf8', (err, data) => {
//       if (err) {
//         reject(err);
//       } else {
//         resolve(data);
//       }
//     });
//   });
// };

// const saveDataToMongoDB = async (jsonData) => {
//   try {
//     const quizs = await Quiz.create(jsonData);
//     console.log('저장완료');
//   } catch (err) {
//     console.error('Error saving data to MongoDB:', err);
//   }
// };

// const jsonFilePath = './merge.json';

// const processData = async () => {
//   try {
//     const data = await readJsonFile(jsonFilePath);
//     const jsonData = JSON.parse(data);
//     await saveDataToMongoDB(jsonData);
//   } catch (error) {
//     console.error('Error:', error);
//   }
// };

// processData();

module.exports = app;
