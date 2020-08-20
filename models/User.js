const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
    email: String,
    googleId: String,
    surveyCompleted: {
        type: Boolean,
        default: false
    },
    activitiesCompleted: {
        type: Boolean,
        default: false
    }
})

const User = mongoose.model('user', userSchema)

module.exports = User
