const model = require('./model')

async function findAll() {
    return await model.find({}).exec()
}

async function create(data) {
    return await model.create(data)
}

module.exports = {
    findAll, create
}