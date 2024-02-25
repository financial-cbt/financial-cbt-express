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
    date : Date,
    accuracy : Array // 틀렸는지, 맞았는지
});

const Test = mongoose.model("Test", testSchema, "Test");

module.exports = Test;