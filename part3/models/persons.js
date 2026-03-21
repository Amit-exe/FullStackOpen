const { default: mongoose } = require("mongoose");

const personSchema = new mongoose.Schema({
name:String,
number:String
})

const Personxx = mongoose.model('Person',personSchema)

module.exports =  Personxx


