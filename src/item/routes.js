const express = require('express')
const router = express.Router()

const service = require('./service')

const { log } = require('../utils')

router.post('/', async (req, res) => {
    log('[ITEM] register init')

    const data = req.body

    log(`[ITEM] registering ${JSON.stringify(data)}`)

    const itemCreated = await service.create(data)

    log('[ITEM] register end')

    return res
        .status(201)
        .json(itemCreated)
})

router.get('/', async (req, res) => {
    log('[ITEM] get all init')

    const data = await service.findAll()

    log('[ITEM] get all end')

    return res
        .status(200)
        .json(data)
})

module.exports = router