const { Schema, model } = require('mongoose')
const {regexConfig} = require('../configs')

const userSchema = new Schema({
    name: {type: String, minLength:2, maxLength: 30, require:true},
    email: {type: String, require: true, lowercase: true, required: true, validate: regexConfig.email},
    password: {type: String, require: true},
    investedMoney: {type: Number}
},
    {timestamps: true})

module.exports = model('User', userSchema)
