const fs = require('fs');
const express = require('express');
const router = express.Router();
const Article = require("../models/Article");
const Dictionary = require("../models/Dictionary");

router.get('/:articleid', async function (req, res, next) {
    const articleid = req.params.articleid;

    try {
        const articles = await Article.find({ num: articleid }).lean();
        const populatedArticles = await Promise.all(articles.map(async (article) => {
            const { _id, word, ...rest } = article;
            const populatedWords = await Promise.all(word.map(async (wordItem) => {
                const { _id: wordId, dictionary, ...wordRest } = wordItem;
                const populatedDictionary = await Dictionary.findById(dictionary).select('-_id commentary term').lean();
                const { _id, ...dictionaryRest } = populatedDictionary;
                return { ...wordRest, ...dictionaryRest };
            }));
            return { ...rest, word: populatedWords };
        }));
        res.json(populatedArticles);
    } catch (err) {
        next(err);
    }
});


router.get('/', async function (req, res, next) {
    try {
        const articles = await Article.find().lean();
        const populatedArticles = await Promise.all(articles.map(async (article) => {
            const { _id, word, ...rest } = article;
            const populatedWords = await Promise.all(word.map(async (wordItem) => {
                const { _id: wordId, dictionary, ...wordRest } = wordItem;
                const populatedDictionary = await Dictionary.findById(dictionary).select('-_id commentary term').lean();
                const { _id, ...dictionaryRest } = populatedDictionary;
                return { ...wordRest, ...dictionaryRest };
            }));
            return { ...rest, word: populatedWords };
        }));
        res.json(populatedArticles);
    } catch (err) {
        next(err);
    }
});

const initDictionary = async () => {
    const filePath = './routes/dictionary.json'
    const initDictionary = JSON.parse(fs.readFileSync(filePath));

    Dictionary.insertMany(initDictionary)
        .then(data => console.log("init Dictionary"))
        .catch(err => console.log(err));
}
// initDictionary();

const initArticle = async () => {
    const filePath = './routes/article.json'
    const articles = JSON.parse(fs.readFileSync(filePath));
    const initArticle = [];

    for (const article of articles) {
        let dictionaryId = "";
        const wordArr = [];

        for (const w of article.word) {
            await Dictionary.findOne({ term: w.term })
                .then(data => {
                    dictionaryId = data._id;
                    wordArr.push({
                        start: w.start,
                        end: w.end,
                        dictionary: dictionaryId,
                    });
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