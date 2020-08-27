const express = require('express')
const authRoutes = require('./routes/auth')
const statsRoutes = require('./routes/stats')
const passportSetup = require('./config/passport-setup')
const mongoose = require('mongoose')
const cookieSession = require('cookie-session')
const passport = require('passport')
const cors = require('cors')
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

app.use(cors())

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true }, () => {
    console.log('connected to mongodb')
})

app.use('/auth', authRoutes)

app.use('/stats', statsRoutes)

var token = ''

app.get('/', (req, res) => {
    if (!req.user) {
        res.render('index.ejs')
    } else {
        // if (req.user.surveyCompleted) {
        //     res.render('home.ejs')
        // } else {
        //     res.render('survey.ejs')
        // } 
        token = req.user.googleId
        res.redirect('https://oop-visualisation-webgl.herokuapp.com/')
    }
})

app.get('/token', (req, res) => {
    console.log(token)
    res.send(token)
})

app.listen(port, function() {
    console.log('running on: ' + port)
})
