import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const MAX = 100

const store = new Vuex.Store({
  state: {
    gameOver: false,
    stats: {
      water: MAX,
      food: MAX,
      sleep: MAX
    },
    inventory: {

    }
  },
  mutations: {
    decrease (state, {stat, amount}) {
      state.stats[stat] = state.stats[stat] - amount
      if(state.stats[stat] <= 0){
        state.gameOver = true
      }
    },
    increase (state, {stat, amount}) {
      state.stats[stat] = state.stats[stat] + amount
      if(state.stats[stat] > MAX){
        state.stats[stat] = MAX
      }
    }
  }
})

export default store
