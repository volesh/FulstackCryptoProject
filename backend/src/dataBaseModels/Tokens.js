const {Schema, model} = require('mongoose')

const tokenSchema = new Schema({
    tokenName: {type:String, require: true},
    symbol: {type: String, lowercase: true, require: true},
    average: {type: Number, require: true},
    spendMoney:{type:Number, require: true},
    countOfTokens: {type: Number, require: true}
})

module.exports = model('Token', tokenSchema)
