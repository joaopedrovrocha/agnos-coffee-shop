const express = require('express')
const router = express.Router()

const service = require('./service')

const { log } = require('../utils')

router.post('/', async (req, res) => {
    log('[COMBO] register init')

    const data = req.body

    log(`[COMBO] registering ${JSON.stringify(data)}`)

    const itemCreated = await service.create(data)

    log('[COMBO] register end')

    return res
        .status(201)
        .json(itemCreated)
})

router.get('/', async (req, res) => {
    log('[COMBO] get all init')

    const data = await service.findAll()

    log('[COMBO] get all end')

    return res
        .status(200)
        .json(data)
})

module.exports = router