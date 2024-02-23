const mongoose = require('mongoose');

const articleSchema = new mongoose.Schema({
    num: Number,
    title: String,
    body: Array,
    word: [{
        start: Number,
        end: Number,
        dictionary: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'dictionary'
        }],
    }],
    date: String,
    reporter: String,
    photoUrl: String
});

const Article = mongoose.model("Article", articleSchema, "Article");

module.exports = Article;
