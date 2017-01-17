import { MAX } from '../data/constants'
import items from '../data/items'

function randomize (source, items) {
  return [source[0], source[2]]
}

export default {
  gameOver: false,
  disabled: false,
  stats: {
    water: MAX,
    food: MAX,
    sleep: MAX
  },
  inventory: randomize(items, 2)
}
