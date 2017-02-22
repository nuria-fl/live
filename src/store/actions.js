import utils from '../utils'

export default {
  decrease ({state, commit}, {stat, amount, time}) {
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
  increase ({state, commit}, {stat, amount, time}) {
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
    console.log(time)
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
  }
}
