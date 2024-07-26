const express = require('express')
const morgan = require('morgan')
const dotenv = require('dotenv')
const {errorHandling} = require('./middlewares/errorHandling')
const { notFoundErrorHandling } = require('./middlewares/notFoundErrorHandling')
const {route} = require('./routes')
const mongodb = require('./config/mongodb')

const app = express()
dotenv.config()
const port = process.env.PORT || 3000
//connect to db
mongodb.connect()

//middilewares
app.use(morgan('short'))
app.use(express.json())
app.use(express.urlencoded({extended: false}))

//route
route(app)

//handle errors
app.use(notFoundErrorHandling)
app.use(errorHandling)

app.listen(port, () => console.log(`Website API started at port ${port}, http://localhost:${port}`))

