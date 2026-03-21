require('dotenv').config()

PORT = process.env.PORT
MONGO_URI = process.env.MONGO_URI

module.exports = {PORT,MONGO_URI}