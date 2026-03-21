const dns = require('node:dns');
const connectDB = require('./utils/db')
const blogRouter = require('./routers/blog.route')

const {info,error} = require('./utils/logger')

const {PORT,MONGO_URI} = require("./utils/config")

dns.setServers(['8.8.8.8', '8.8.4.4']);

const express = require('express')

const app = express()

connectDB()

app.use(express.json())

app.use('/api/blogs',blogRouter)

app.listen(PORT, () => {
  info(`Server running on port ${PORT}`)
})