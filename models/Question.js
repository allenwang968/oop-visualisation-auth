const mongoose = require('mongoose')
const Schema = mongoose.Schema

const questionSchema = new Schema({
    userId: String,
    section: String,
    questionId: String,
    timeTaken: String,
    overallQuestionNumber: Number
})

const Question = mongoose.model('question', questionSchema)

module.exports = Question
