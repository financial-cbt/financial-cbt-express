const mongoose = require('mongoose');

const dictionarySchema = new mongoose.Schema({
    term : String,
    commentary : String
});

const Dictionary = mongoose.model("Dictionary", dictionarySchema, "Dictionary");

module.exports = Dictionary;
