require('dotenv').config()

const { PORT } = process.env

const express = require('express')
const bodyParser = require('body-parser')

const app = express()

app.use(bodyParser.json())

app.listen(PORT, () => {
    console.log(`[SERVER] Running on port ${PORT}`)
})

module.exports = app