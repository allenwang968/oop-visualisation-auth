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

    res.send(200)
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

    res.send(200)
})

router.post('/question', (req, res) => {
    if (req.user) {
        var id = req.user.googleId
    } else if (req.query.token) {
        id = req.query.token
    }

    new Question({
        userId: id,
        section: req.body.section,
        questionId: req.body.questionId,
        timeTaken: req.body.timeTaken,
    }).save()

    User.updateOne({ googleId: id }, { $inc: { questionsCompleted: 1 }}, function (err, docs) {
        if (err) {
            console.log(err)
        }
    })

    res.send(200)
})

router.post('/complete', (req, res) => {
    if (req.user) {
        var id = req.user.googleId
    } else if (req.query.token) {
        id = req.query.token
    }

    if (req.body.section === '1') {
        User.updateOne({ googleId: id }, { section1Completed: true }, function (err, docs) {
            if (err) {
                console.log(err)
            }
        })
    } else if (req.body.section === '2') {
        User.updateOne({ googleId: id }, { section2Completed: true }, function (err, docs) {
            if (err) {
                console.log(err)
            }
        })
    } else if (req.body.section === '3') {
        User.updateOne({ googleId: id }, { section3Completed: true }, function (err, docs) {
            if (err) {
                console.log(err)
            }
        })
    }

    res.send(200)
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
                res.status(200).send('3')
            } else if (user.section2Completed) {
                res.status(200).send('2')
            } else if (user.section1Completed) {
                res.status(200).send('1')
            } else {
                res.status(200).send('0')
            }
        } else {
            console.log('user not found')
        }
    })
})

module.exports = router
