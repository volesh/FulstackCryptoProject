const express = require('express')
require('dotenv').config()
const {envs} = require('./src/configs')
const mongoose = require('mongoose')
const {userRouter} = require("./src/routers");
const app = express()

app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use('/users', userRouter)

app.use((err, req, res, next)=>{
    res.status(err.statusCode || 500)
        .json({
            message:err.message || 'Unknown error',
            statusCode: err.statusCode || 500
        })
})

app.listen(envs.PORT, async ()=>{
    await mongoose.connect(envs.MONGO_SERVER)
    console.log('Back-End is working')
})
