const express = require('express')
const authRoutes = require('./routes/auth')
const passportSetup = require('./config/passport-setup')
const mongoose = require('mongoose')
const cookieSession = require('cookie-session')
const passport = require('passport')
const { render } = require('ejs')

if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

const app = express()

var port = process.env.PORT || 3000

app.set('view-engine', 'ejs')

app.use(cookieSession({
    maxAge: 24 * 60 * 60 * 1000,
    keys: [process.env.COOKIE_KEY]
}))

app.use(passport.initialize())
app.use(passport.session())

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true }, () => {
    console.log('connected to mongodb')
})

app.use('/auth', authRoutes)

app.get('/', (req, res) => {
    if (!req.user) {
        res.render('index.ejs')
    } else {
        // if (req.user.surveyCompleted) {
        //     res.render('home.ejs')
        // } else {
        //     res.render('survey.ejs')
        // }  
        // res.redirect('https://webgl-build-oop-visualisation.herokuapp.com/')
        res.redirect('/')
    }
})

app.listen(port, function() {
    console.log('running on: ' + port)
})
