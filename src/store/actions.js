import utils from '../utils'

export default {
  decreaseAsync ({state, commit}, {stat, amount, time}) {
    return new Promise((resolve, reject) => {
      commit('disable')
      if (!state.gameOver) {
        setTimeout(function () {
          commit('enable')
          commit('decrease', {stat, amount})
          resolve()
        }, time)
      } else {
        reject()
      }
    })
  },
  increaseAsync ({state, commit}, {stat, amount, time}) {
    return new Promise((resolve, reject) => {
      commit('disable')
      if (!state.gameOver) {
        setTimeout(function () {
          commit('enable')
          commit('increase', {stat, amount})
          resolve()
        }, time)
      } else {
        reject()
      }
    })
  },
  scavenge ({state, commit}, {time}) {
    return new Promise((resolve, reject) => {
      commit('disable')
      if (!state.gameOver) {
        setTimeout(function () {
          const scavengeableItems = state.existingItems.filter(item => item.action === 'scavenge')

          const newItems = utils.randomizeItems(scavengeableItems, 3)

          newItems.forEach(item => {
            commit('addInventory', {item: item})
          })

          commit('decrease', {stat: 'sleep', amount: 10})
          commit('decrease', {stat: 'water', amount: 5})
          commit('decrease', {stat: 'sleep', amount: 3})
          commit('enable')

          resolve(newItems)
        }, time)
      } else {
        reject()
      }
    })
  },
  hunt ({state, commit}, {time}) {
    return new Promise((resolve, reject) => {
      commit('disable')
      if (!state.gameOver) {
        setTimeout(function () {
          const huntableItems = state.existingItems.filter(item => item.action === 'hunt')

          const newItems = utils.randomizeItems(huntableItems, 2)

          newItems.forEach(item => {
            commit('addInventory', {item: item})
          })

          commit('decrease', {stat: 'sleep', amount: 20})
          commit('decrease', {stat: 'water', amount: 10})
          commit('decrease', {stat: 'sleep', amount: 6})
          commit('enable')

          resolve(newItems)
        }, time)
      } else {
        reject()
      }
    })
  }
}
