const router = require('express').Router()
const UserStat = require('../models/UserStat')

router.get('/correct', (req, res) => {
    if (req.user) {
        var id = req.user.googleId
    } else if (req.query.token) {
        id = req.query.token
    }
     
    UserStat.updateOne({ googleId: id }, { $inc: { correct: 1 }}, function (err, docs) {
        if (err) {
            console.log(err)
        } else {
            console.log(docs)
        }
    })
})

router.get('/hi', (req, res) => {
    console.log('hi')
})

module.exports = router
