var express = require('express');
var router = express.Router();
const Test = require('../models/Test');

router.get('/:userId', async (req, res, next) => {
    try {
        const allTest = await Test.find({user : req.params.userId});
        
        let dateArray = []
        let quizArray = []
        let quizQuestionArray = []
        
        for (let i = 0 ; i < allTest.length; i++) {
            dateArray.push(allTest[i].date);
        }
        

        res.send('통신 완료');
    }catch {
        next(err);
    }
});

module.exports = router;
