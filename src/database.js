const mongoose = require("mongoose");

require('dotenv').config()

const {
    DB_HOST,
    DB_PORT,
    DB_NAME
} = process.env

mongoose
    .connect(`mongodb://${DB_HOST}:${DB_PORT}/${DB_NAME}`)
    .then(() => console.log('[DATABASE] MongoDB connected'))
    .catch(err => console.error(`[DATABASE] MongoDB connection failed: ${err}`))
