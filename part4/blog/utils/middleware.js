
const User = require("../models/user")
const connectDB = require("../utils/db")

const jwt = require('jsonwebtoken')

// connectDB()

const tokenExtractor = (request, response, next) => {

const authorization = request.get('authorization');


  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    // Extract the token after the "Bearer " prefix
    request.token = authorization.substring(7);
  } else {
    request.token = null;
  }

  next(); // Move to the next middleware or route handler
};

const userExtractor = async (request, response, next)=>{
     const decodedToken = jwt.verify(request.token, process.env.SECRET)
      if (!decodedToken.id) {
        return response.status(401).json({ error: 'token invalid' })
      }
      const user = await User.findById(decodedToken.id)

      if(user) {
        request.user = user.id
      } else {
        request.user = null
      }

next()
}

const errorHandler = (error, request, response, next) => {
  console.log(error)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  } else if (error.name === 'JsonWebTokenError') {
    return response.status(401).json({ error: 'token invalid' })
  } else if (error.name === 'TokenExpiredError') {
    return response.status(401).json({ error: 'token expired' })
  }

  next(error)
}

module.exports = { tokenExtractor,userExtractor,errorHandler };
