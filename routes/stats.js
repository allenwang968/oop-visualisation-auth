const router = require('express').Router()
const bodyParser = require('body-parser')
const User = require('../models/User')
const UserConfig = require('../models/UserConfig')
const Question = require('../models/Question')
const Attempt = require('../models/Attempt')

router.use(
    bodyParser.urlencoded({
        extended: true
    })
)
  
router.use(bodyParser.json())

router.post('/config', (req, res) => {
    if (req.user) {
        var id = req.user.googleId
    } else if (req.query.token) {
        id = req.query.token
    }

    new UserConfig({
        userId: id,
        theme: req.body.theme,
        language: req.body.language
    }).save()
})

router.post('/attempt', (req, res) => {
    if (req.user) {
        var id = req.user.googleId
    } else if (req.query.token) {
        id = req.query.token
    }
    
    new Attempt({
        userId: id,
        section: req.body.section,
        questionId: req.body.questionId,
        userAnswer: req.body.userAnswer,
        correctAnswer: req.body.correctAnswer
    }).save()
})

router.post('/question', (req, res) => {
    if (req.user) {
        var id = req.user.googleId
    } else if (req.query.token) {
        id = req.query.token
    }

    var questionNumber = 0
    
    User.findOne({googleId: id}).then((user) => {
        if (user) {
            console.log('yues')
        } else { 
            console.log(';bnio')
        }
        questionNumber = user.questionsCompleted
    })

    new Question({
        userId: id,
        section: req.body.section,
        questionId: req.body.questionId,
        timeTaken: req.body.timeTaken,
        overQuestionNumber: questionNumber
    }).save()

    User.updateOne({ googleId: id }, { $inc: { questionsCompleted: 1 }}, function (err, docs) {
        if (err) {
            console.log(err)
        } else {
            console.log(docs)
        }
    })

})

router.get('/sections-completed', (req, res) => {
    if (req.user) {
        var id = req.user.googleId
    } else if (req.query.token) {
        id = req.query.token
    }

    User.findOne({googleId: id}).then((user) => {
        if (user) {
            if (user.section3Completed) {
                res.send('3')
            } else if (user.section2Completed) {
                res.send('2')
            } else if (user.section1Completed) {
                res.send('1')
            } else {
                res.send('0')
            }
        } else {
            console.log('user not found')
        }
    })
})

module.exports = router
