var express = require('express');
var router = express.Router();
const Quiz = require('../models/Quiz');
const Test = require('../models/Test');

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

        let correct = [];
        let wrong = [];
        for (let i = 0; i < 10; i++) {
            if (accuracy[i] === true) {
                correct.push(allQuiz[i]);
            } 
            else {
                wrong.push(allQuiz[i]);                
            }
        }

        const test = await Test.create({
            user : userId,
            allQuiz : allQuiz,
            correctQuiz : correct,
            wrongQuiz : wrong,
            correctNum : correct.length,
            wrongNum : wrong.length,
            userAnswers : userAnswer,
            date : new Date(),
            accuracy : accuracy
        });

        res.json({message : "Test 저장완료", test});
        
    } catch(err) {
        next(err);
    }
})

module.exports = router;
