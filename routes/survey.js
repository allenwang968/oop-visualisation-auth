const router = require('express').Router()
const User = require('../models/User')

router.get('/start', (req, res) => {
    User.updateOne({ googleId: req.user.googleId }, { surveyStartCompleted: true }, function (err, docs) {
        if (err) {
            console.log(err)
        }
    })
    res.redirect('https://oop-visualisation.herokuapp.com/')
})

module.exports = router;
