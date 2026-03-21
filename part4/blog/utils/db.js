const {info,error} = require('./logger')
const mongoose = require('mongoose')
const {PORT,MONGO_URI} = require("./config")


const connectDB = ()=>{
    try {
        mongoose.connect(MONGO_URI, { family: 4 })
    } catch (err) {
        error(err)
    }
}


module.exports = connectDB;