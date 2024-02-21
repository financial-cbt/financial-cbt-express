const mongoose = require('mongoose');

const articleSchema = new mongoose.Schema({
    num : Number,
    title : String,
    body : String,
    word : [ {
        start : Number,
        end : Number,
        desc : String
    }]
});

const Article = mongoose.model("Article", articleSchema);

module.exports = Article;
