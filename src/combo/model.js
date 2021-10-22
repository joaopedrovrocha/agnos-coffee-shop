const mongoose = require('mongoose')

const comboSchema = new mongoose.Schema({
    items: [
        {
            item: {type: mongoose.Schema.Types.ObjectId, ref: 'item'},
            quantity: Number,
            discount: Number
        }
    ]
})

module.exports = mongoose.model('combo', comboSchema)