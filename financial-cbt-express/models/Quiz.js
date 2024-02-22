const mongoose = require('mongoose');

const quizSchema = new mongoose.Schema({
    num : Number,
    question : String,
    answer : String,
    option : Array
});

const Quiz = mongoose.model("Quiz", quizSchema, "Quiz");

module.exports = Quiz;
