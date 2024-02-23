var express = require('express');
var router = express.Router();
const Quiz = require('../models/Quiz');

router.get('/start', async (req, res, next) => {
    try {
        const allQuizzes = await Quiz.find({});
        const randomQuizzes = getRandomItems(allQuizzes, 10);

        res.json(randomQuizzes)
    } catch (err) {
        next(err);
    }
});

function getRandomItems(array, count) {
    const shuffled = array.sort(() => 0.5 - Math.random()); 
    return shuffled.slice(0, count); 
}

  
router.post("/finish/:userId", async (req, res, next) => {
    try {
        const userId = req.params.userId
        const {allQuiz, accuracy, userAnswer} = req.body;
        
    } catch(err) {
        next(err);
    }
})

module.exports = router;
