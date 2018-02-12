import { MAX, MAXINVENTORY } from '../data/constants'
import items from '../data/items'
import utils from '../utils'

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
  inventory: utils.randomizeItems(items, 2),
  hasFire: false,
  isSick: false,
  daysSurvived: 0
}

const getters = {
  isInventoryFull: () => state.inventory.length === MAXINVENTORY,
  slotsInInventoryLeft: () => MAXINVENTORY - state.inventory.length
}

export { state, getters }
