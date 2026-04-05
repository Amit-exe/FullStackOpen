const connectDB = require('./utils/db')
const blogRouter = require('./routers/blog.route')
const {tokenExtractor, errorHandler} =  require("./utils/middleware")

const dns = require('node:dns');
const express = require('express');
require('express-async-errors'); // Added this
const userRouter = require('./routers/user.route');


const app = express()
dns.setServers(['8.8.8.8', '8.8.4.4']);
connectDB()

app.use(express.json())
app.use(tokenExtractor)
app.use('/api/blogs',blogRouter)
app.use('/api/user',userRouter)

app.use(errorHandler)

module.exports = app