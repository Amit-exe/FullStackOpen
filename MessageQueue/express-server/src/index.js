import express from 'express'
import {createClient } from 'redis'

const app = express()
app.use(express.json())

const client = createClient()
await client.connect()

app.post('/submit', async (req,res)=>{
    const {problemId,userId,code,language} = req.body
    
    try {
        await client.lPush('submissions', JSON.stringify({problemId, userId, code, language}))
        res.json({message:'received'})
    } catch (err) {
        console.error('Redis error:', err)
        res.status(500).json({message: 'internal server error'})
    }
})

app.listen(3000,()=>{console.log('server started')}
)