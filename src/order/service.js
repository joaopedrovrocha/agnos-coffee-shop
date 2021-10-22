const comboModel = require('../combo/model')
const itemService = require('../item/service')

async function searchItemOnCombo(itemId) {
    const filter = {
        "items": {
            "$elemMatch": { "item": itemId, "discount": 0 }
        }
    }

    const itemOnCombo = await comboModel.find(filter).exec()

    if (itemOnCombo.length === 0) {
        return null
    }

    return itemOnCombo[0]
}

function getItemFromCombo(comboArr, itemId) {
    return comboArr.filter(el => el.item.toString() === itemId)[0]
}

async function order(items) {
    let itemsHeadCombo = {}
    let generalItems = {}

    for (let i in items) {
        let item = items[i]
        let itemId = item.item

        const itemCombo = await searchItemOnCombo(itemId)

        if (itemCombo) {
            itemsHeadCombo[itemId] = itemCombo
        }

        let itemDatabase = await itemService.getItem(itemId)
        itemDatabase = JSON.parse(JSON.stringify(itemDatabase))

        generalItems[item.item] = { ...itemDatabase, quantity: item.quantity }
    }

    let generalHeadItems = {}
    let generalNormalItems = {}

    for (let i in generalItems) {
        let item = generalItems[i]

        if (Object.keys(itemsHeadCombo).includes(i)) {
            generalHeadItems[i] = item
        } else {
            generalNormalItems[i] = item
        }
    }

    generalItems = { ...generalHeadItems, ...generalNormalItems }

    let itemsToProcess = []
    let itemsInCombo = []

    for (let itemIndex in generalItems) {
        let generalItem = generalItems[itemIndex]

        let itemToProcess = null

        // is this item a head combo?
        if (itemsHeadCombo[itemIndex]) {
            let comboItems = itemsHeadCombo[itemIndex].items.filter(el => el.item.toString() !== itemIndex)
            let comboItemsIds = comboItems.map(el => el.item.toString())

            Object.values(generalItems)
                .filter(el => comboItemsIds.includes(el._id))
                .map(el => {
                    let itemComboInfo = getItemFromCombo(comboItems, el._id)

                    if (el.quantity >= itemComboInfo.quantity) {
                        itemsInCombo.push(el._id)

                        itemToProcess = {
                            ...el,
                            price: el.price - (el.price * (itemComboInfo.discount / 100))
                        }
                    } else {
                        itemToProcess = { ...el }
                    }

                    itemsToProcess.push(itemToProcess)
                })
        }

        if (!itemsInCombo.includes(itemIndex)) {
            itemToProcess = { ...generalItem }
        }

        if (itemToProcess) {
            itemsToProcess.push(itemToProcess)
        }
    }

    return itemsToProcess
        .reduce((prev, curr) => prev + (curr.price * curr.quantity), 0)
}

module.exports = {
    order
}