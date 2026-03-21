const express = require('express')
const connectDB = require('./mongo')
const morgan = require('morgan')
const personRoute = require('./routes/personRoute')
const Personxx = require('./models/persons')
const app = express()
connectDB()


const errorHandler = require('./error')

const defaultErrorHandler = (error, request, response, next) => {
  
  if (response.headersSent) {
    return next(error)
  }
  
  response.status(error.status || 500).json({
    error: 'Internal Server Error',
    message: error.message || 'An unexpected error occurred'
  })
}


const cusm = morgan(function (tokens, req, res) {
  return [
    tokens.method(req, res),
    tokens.url(req, res),
    tokens.status(req, res),
    tokens.res(req, res, 'content-length'), '-',
    tokens['response-time'](req, res), 'ms',
    JSON.stringify(req.body)
  ].join(' ')
})

app.use(express.json())
app.use(cusm)

app.get('/',(req,res)=>{
  return res.status(200).send({'msg':'welcome to phone book'})
})

app.use('/api/persons',personRoute)

app.get('/api/info', async (req,res)=>{
  try {
    const nop = (await Personxx.countDocuments())
    const data = `Phone book has info of ${nop} people\n${new Date().toLocaleString()}`
    return res.status(200).send(data)
  } catch (error) {
    console.log(`Error:${error}`)
    return res.status(500).send({'message':'error'})
  }
  
   
})

app.use((req, res) => {
  res.status(404).json({
    message: 'Ohh you are lost, read the API documentation to find your way back home :)'
  })
})

app.use(errorHandler)
app.use(defaultErrorHandler)
app.listen(process.env.PORT || 3001,()=>{
  console.log('started server')
})

