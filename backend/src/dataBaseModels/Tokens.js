const {Schema, model} = require('mongoose')

const tokenSchema = new Schema({
    tokenName: {type:String, }
})

module.exports = model('Token', tokenSchema)
