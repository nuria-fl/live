import { MAX } from '../data/constants'

const findIndexById = (id, collection) => {
  return collection.findIndex(item => item.id === id)
}

export default {
  decrease (state, {stat, amount}) {
    state.stats[stat] = state.stats[stat] - amount
    if (state.stats[stat] <= 0) {
      state.gameOver = true
      state.disabled = true
    }
  },
  increase (state, {stat, amount}) {
    state.stats[stat] = state.stats[stat] + amount
    if (state.stats[stat] > MAX) {
      state.stats[stat] = MAX
    }
  },
  addInventory (state, {item}) {
    state.inventory.push(item)
  },
  removeInventory (state, {item}) {
    const idx = findIndexById(item, state.inventory)

    if (idx !== -1) {
      state.inventory.splice(idx, 1)
    }
  },
  disable (state) {
    state.disabled = true
  },
  enable (state) {
    state.disabled = false
  }
}
