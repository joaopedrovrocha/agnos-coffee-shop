const model = require('./model')

async function findAll() {
    return await model.find({}).exec()
}

async function create(data) {
    return await model.create(data)
}

async function getItem(itemId) {
    return await model.findById(itemId).exec()
}

module.exports = {
    findAll, create, getItem
}