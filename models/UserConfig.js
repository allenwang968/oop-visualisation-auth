const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userConfigSchema = new Schema({
    userId: String,
    theme: String,
    language: String 
})

const UserConfig = mongoose.model('user config', userConfigSchema)

module.exports = UserConfig
