const mongoose = require('mongoose')
const Schema = mongoose.Schema

const attemptSchema = new Schema({
    userId: String,
    section: String,
    questionId: String,
    userAnswer: String,
    correctAnswer: String
})

const Attempt = mongoose.model('attempt', attemptSchema)

module.exports = Attempt
