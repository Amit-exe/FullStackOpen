const { default: mongoose } = require("mongoose")
const User = require("../models/user")
const bcrypt = require("bcrypt")

const getUser = async (request, response) => {
    // await User.deleteMany({})
   const users = await User.find({}).populate('blogs',{title:1,author:1,url:1,likes:1})
    response.json(users)
  
}

const createUser= async (request, response) => {

    const {name,username,password} = request.body
    const salt = 10
    if(!name || !username || !password)
        return response.status(400).json({message:"some field is missing"})

    if(password.length<4 || username.length<4)
        return response.status(400).json({message:"password and name should be greater than 3 characters"})

  
    
    const passwordHash = await bcrypt.hash(password,salt)
  
    const user = new User({name,username,passwordHash})

    const result = await user.save()
    response.status(201).json(result)
  
}



module.exports = {getUser,createUser}