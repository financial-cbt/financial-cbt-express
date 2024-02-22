const mongoose = require('mongoose');

const testSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    allquiz : Array,
    correctquiz : Array,
    wrongquiz : Array,
    correctnum : Number,
    wrongnum : Number,
    useranswers : Array
});

const Test = mongoose.model("Test", testSchema, "Test");

module.exports = Test;
