import { MAX, MAXINVENTORY } from '../data/constants'
import items from '../data/items'
import craftableItems from '@/data/craftableItems'
import cookableItems from '@/data/cookableItems'

const state = {
  gameOver: false,
  disabled: false,
  stats: {
    health: MAX,
    water: MAX,
    food: MAX,
    sleep: MAX
  },
  existingItems: items,
  inventory: [],
  hasFire: false,
  isSick: false,
  daysSurvived: 0,
  currentPage: 'home'
}

const getters = {
  isInventoryFull: () => state.inventory.length === MAXINVENTORY,
  slotsInInventoryLeft: () => MAXINVENTORY - state.inventory.length,
  craftableItems: () => {
    cookableItems.forEach(item => {
      item.condition = 'fire'
    })

    const craftable = [...craftableItems, ...cookableItems]

    return craftable.map(item => {
      const newItem = {...item}
      const currentItems = []

        // create temporary inventory to see if we have enough items
      const inventory = state.inventory.map(item => item.id)

      newItem.items.forEach(itemNeeded => {
        const idx = inventory.indexOf(itemNeeded)

        if (idx !== -1) {
            // if we find the item we remove it from the temp inventory
          inventory.splice(idx, 1)
          currentItems.push(itemNeeded)
        } else {
          newItem.isCraftable = false
        }
      })

        // if we have all the items we can craft the item
        // TODO: is length enough? deepEqual?

      if (currentItems.length === newItem.items.length) {
        newItem.isCraftable = true
        if (newItem.condition === 'fire' && !state.hasFire) {
          newItem.isCraftable = false
        }
      }

      return newItem
    })
  }
}

export { state, getters }
