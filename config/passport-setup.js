const passport = require('passport')
const GoogleStrat = require('passport-google-oauth20')
const User = require('../models/User')

if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

passport.serializeUser((user, done) => {
    done(null, user.id)
})

passport.deserializeUser((id, done) => {
    User.findById(id).then((user) => {
        done(null, user)
    })
})

passport.use(
    new GoogleStrat({
        clientID: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        callbackURL: '/auth/google/redirect'
    }, (accessToken, refreshToken, profile, done) => {
        if (profile._json.hd === 'aucklanduni.ac.nz') {
            User.findOne({googleId: profile.id}).then((user) => {
                if (user) {
                    console.log('returning user')
                    done(null, user)
                } else {
                    new User({
                        email: profile._json.email,
                        googleId: profile.id
                    }).save().then((user) => {
                        console.log('user creation success')
                        done(null, user)
                    })
                }
                
            })
        } else {
            return done(null, false, { message: 'Not allow access!' });
        }      
    })
)
