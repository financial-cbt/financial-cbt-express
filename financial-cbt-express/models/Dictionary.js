const mongoose = require('mongoose');

const dictionarySchema = new mongoose.Schema({
    word : String,
    desc : String
});

const Dictionary = mongoose.model("Dictionary", dictionarySchema);

module.exports = Dictionary;
