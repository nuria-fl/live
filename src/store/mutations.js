import { MAX } from '../data/constants'

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
    const idx = state.inventory.indexOf(item)
    state.inventory.splice(idx, 1)
  },
  disable (state) {
    state.disabled = true
  },
  enable (state) {
    state.disabled = false
  }
}
