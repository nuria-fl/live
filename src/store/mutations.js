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
  removeInventory (state, {item}) {

  },
  disable (state, {time}) {
    state.disabled = true
    if (!state.gameOver) {
      setTimeout(function () {
        state.disabled = false
      }, time)
    }
  }
}
