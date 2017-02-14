import { MAX } from '../data/constants'
import items from '../data/items'
import utils from '../utils'

const mergedItems = [...items.food, ...items.drink, ...items.junk]

function randomizeItems (source, items) {
  const arr = []

  for (let i = 0; i < items; i++) {
    const idx = utils.randomizeWithinRange(source.length)
    arr.push(source[idx])
  }

  return arr
}

export default {
  gameOver: false,
  disabled: false,
  stats: {
    water: MAX,
    food: MAX,
    sleep: MAX
  },
  inventory: randomizeItems(mergedItems, 5)
}
