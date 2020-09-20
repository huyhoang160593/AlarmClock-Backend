const config = require('./utils/config')
const express = require('express')
const app = express()
require('express-async-errors')
const cors = require('cors')
const alarmRouter = require('./controllers/alarmMessage')
const middleware = require('./utils/middleware')
const mongoose = require('mongoose')
const logger = require('./utils/logger')

mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false })
    .then(() => {
        logger.info('connected to MongoDB')
    })
    .catch((error) => {
        logger.error('error connection to MongoDB:', error.message)
    })

app.get('/',(req,res)=>{
    res.send('<h1>This is Main Page</h1>')
})

app.use(cors())
app.use(express.json())
app.use(middleware.requestLogger)

app.use('/api/alarmMessages', alarmRouter)

app.use(middleware.unknownEndpoint)

module.exports = app