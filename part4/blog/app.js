const connectDB = require('./utils/db')
const blogRouter = require('./routers/blog.route')
const dns = require('node:dns');
const express = require('express')

const app = express()
dns.setServers(['8.8.8.8', '8.8.4.4']);
connectDB()

app.use(express.json())

app.use('/api/blogs',blogRouter)

module.exports = app