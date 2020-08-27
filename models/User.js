const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
    email: String,
    googleId: String,
    surveyStartCompleted: {
        type: Boolean,
        default: false
    },
    surveyEndCompleted: {
        type: Boolean,
        default: false
    },
    section1Completed: {
        type: Boolean,
        default: false
    },
    section2Completed: {
        type: Boolean,
        default: false
    },
    section3Completed: {
        type: Boolean,
        default: false
    },
    questionsCompleted: {
        type: Number,
        default: 0
    }
})

const User = mongoose.model('user', userSchema)

module.exports = User
