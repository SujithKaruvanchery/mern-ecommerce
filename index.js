const express = require('express')
const connectDB = require('./config/db')
require('dotenv').config()

const app = express()
connectDB()

app.listen(process.env.PORT, (error) => {
    if (error) {
        console.log(error)
    } else {
        console.log(`Server listening on port ${process.env.PORT}`)
    }
})

// nyfcK180oYCXoXv0
// sujithkaruvanchery

