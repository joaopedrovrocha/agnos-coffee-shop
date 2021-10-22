const express = require('express')
const router = express.Router()

const service = require('./service')

router.post('/', async (req, res) => {
    const { items } = req.body

    const orderTotalPrice = await service.order(items)

    return res
        .status(200)
        .json({ total: orderTotalPrice })
})

module.exports = router