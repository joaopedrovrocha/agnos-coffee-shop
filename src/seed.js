require('./database')

const itemModel = require('./item/model')
const comboModel = require('./combo/model')

const items = [
    { name: 'Sandwich', price: 10 },
    { name: 'Coke', price: 2 },
    { name: 'Hot Dog', price: 5 },
]

const combos = [
    [
        { item: 'sandwich', quantity: 1, discount: 0 },
        { item: 'coke', quantity: 1, discount: 50 },
    ]
]

async function seed() {
    const itemsCreated = []

    for (let i in items) {
        let item = items[i]

        let itemCreated = await itemModel.create(item)

        itemsCreated.push(JSON.parse(JSON.stringify(itemCreated)))
    }

    for (let i in combos) {
        let combo = combos[i]

        combo = combo.map(el => {
            return {
                ...el,
                item: itemsCreated.filter(item => item.name.toLowerCase() === el.item.toLowerCase())[0]._id.toString()
            }
        })

        await comboModel.create({ items: combo })
    }
}

seed().then(() => {
    console.log('Database Seed Completed!!!')

    process.exit()
})