import { MAX } from '../data/constants'
import items from '../data/items'
import utils from '../utils'

const existingItems = [...items.food, ...items.drink, ...items.junk]
const state = {
  gameOver: false,
  disabled: false,
  stats: {
    water: MAX,
    food: MAX,
    sleep: MAX
  },
  existingItems: existingItems,
  inventory: utils.randomizeItems(existingItems, 5),
  fire: false
}

export default state
