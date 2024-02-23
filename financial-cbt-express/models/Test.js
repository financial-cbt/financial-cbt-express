const mongoose = require('mongoose');

const testSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    allQuiz : Array,
    correctQuiz : Array,
    wrongQuiz : Array,
    correctNum : Number,
    wrongNum : Number,
    userAnswers : Array,
    date : Date
});

const Test = mongoose.model("Test", testSchema, "Test");

module.exports = Test;