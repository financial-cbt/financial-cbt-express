const fs = require('fs');
const express = require('express');
const router = express.Router();
const Article = require("../models/Article");
const Dictionary = require("../models/Dictionary");

router.get('/', function (req, res, next) {
    Article.find()
        .then(data => { res.json(data) })
        .catch(err => (next(err)));
});

const initArticle = () => {
    const filePath = './routes/article.json'
    const articles = JSON.parse(fs.readFileSync(filePath));
    const initArticle = [];

    for (const article of articles) {
        let dictionaryId = "";
        const wordArr = [];

        for (const w of article.word) {
            Dictionary.findOne({ term: w.term })
                .then(data => {
                    dictionaryId = data._id;
                    wordArr.push({
                        start: w.start,
                        end: w.end,
                        dictionary: dictionaryId,
                    })
                })
                .catch(err => console.log(err));
        }

        initArticle.push({
            num: article.num,
            title: article.title,
            body: article.body,
            word: wordArr,
            date: article.date,
            reporter: article.reporter,
            photoUrl: article.photoUrl,
        })
    }
    Article.insertMany(initArticle)
        .then(data => console.log("init Article"))
        .catch(err => console.log(err));
};
// initArticle();

module.exports = router;