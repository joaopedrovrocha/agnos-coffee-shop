const express = require('express')
const router = express.Router()

const itemRoutes = require('./item/routes')
const comboRoutes = require('./combo/routes')
const orderRoutes = require('./order/routes')

router.get('/', (req, res) => {
    return res.end('Hello, there.')
})

router.use('/item', itemRoutes)
router.use('/combo', comboRoutes)
router.use('/order', orderRoutes)

module.exports = router