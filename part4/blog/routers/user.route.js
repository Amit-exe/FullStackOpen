const {getUser,createUser} = require("../controllers/user.controller")
const {loginUser} = require("../controllers/login.controller")
const userRouter = require('express').Router()

userRouter.get('/', (request, response) => 
  getUser(request,response)
)

userRouter.post('/', (request, response) => 
  createUser(request,response)
)

userRouter.post('/login', (request, response) => 
  loginUser(request,response)
)


module.exports = userRouter