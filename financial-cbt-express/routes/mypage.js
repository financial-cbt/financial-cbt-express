var express = require('express');
var router = express.Router();
const Test = require('../models/Test');
const Quiz = require('../models/Quiz');

router.get('/:userId', async (req, res, next) => {
    try {
        const allTest = await Test.find({user : req.params.userId});
        
        let dateArray = []
        let quizNumArray = []
        let quizAccuracyArray = []
        
        for (let i = 0 ; i < allTest.length; i++) {
            dateArray.push(allTest[i].date);
            quizNumArray = quizNumArray.concat(allTest[i].allQuiz);
            quizAccuracyArray = quizAccuracyArray.concat(allTest[i].accuracy);
        }

        let newArray = [];

        for (let i = 0; i < quizNumArray.length; i++) {
            newArray.push([quizNumArray[i], quizAccuracyArray[i]])
        }
        
        console.log(newArray)

        let array = [];
        for (let i = 0; i < newArray.length; i++) {
            let isDuplicate = false;
            for (let j = 0; j < array.length; j++) {
                if (array[j][0] === newArray[i][0]) {
                    isDuplicate = true;
                    break;
                }
            }
            if (!isDuplicate) {
                if (newArray[i][1] === true) {
                    array.push(newArray[i]);
                }

                else {
                    let check = 0;
                    for (let k = i+1; k < newArray.length; k++) {
                        if (newArray[i][0] === newArray[k][0]) {
                            check = 1;
                            if(newArray[k][1] === true) {
                                array.push(newArray[k]);
                                break
                            }
                        }
                    }
                    if(check === 0) {
                        array.push(newArray[i]);
                    }
                }
            }
        }

        let questionArray = []
        let accuracyArray = []
        let correctNum = 0;
        let wrongNum = 0;

        for (let i = 0; i < array.length; i++) {
            const sampleQuiz = await Quiz.find({num : array[i][0]}); 
            questionArray.push(sampleQuiz[0].question);
            accuracyArray.push(array[i][1]);
            if(array[i][1] == true) correctNum++;
            else wrongNum++;
        }
        console.log(questionArray);
        console.log(accuracyArray);
        console.log(correctNum, wrongNum);

        res.json({
            questionArray : questionArray, 
            accuracyArray : accuracyArray, 
            correctNum : correctNum, 
            wrongNum : wrongNum, 
            dateArray : dateArray
        })
    }catch(err) {
        next(err);
    }
});

module.exports = router;
