const { Schema, model } = require('mongoose')

const transactionSchema = new Schema({
    tokenName: {type: String, require: true},
    symbol: {type: String, require: true},
    date: {type: Date, default: new Date()},
    status: {type: Boolean, require: true},
    tokenPrice: {type: Number, require: true},
    countOfTokens: {type: Number, require: true},
    investedMoney: {type: Number, require: true}
},
    {timestamps: true});

module.exports = model('Transaction', transactionSchema)
