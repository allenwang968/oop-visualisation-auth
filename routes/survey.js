const router = require('express').Router()
const User = require('../models/User')

router.get('/start', (req, res) => {
    User.updateOne({ googleId: req.user.googleId }, { surveyStartCompleted: true }, function (err, docs) {
        if (err) {
            console.log(err)
        }
    })
    res.redirect('http://localhost:3000/')
})

router.get('/end', (req, res) => {
    User.updateOne({ googleId: req.user.id }, { surveyEndCompleted: true }, function (err, docs) {
        if (err) {
            console.log(err)
        }
    })
    res.redirect('http://localhost:3000/')
})

module.exports = router;
