const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userStatsSchema = new Schema({
    googleId: String,
    correct: {
        type: Number,
        default: 0
    }
})

const UserStat = mongoose.model('userStat', userStatsSchema)

module.exports = UserStat
