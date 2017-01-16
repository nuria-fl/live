import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    stats: {
      water: 100,
      food: 100,
      sleep: 100
    },
    inventory: {

    }
  },
  mutations: {
    decrease (stat, amount) {
      state[stat] = state[stat] - amount
    }
  }
})

export default store
