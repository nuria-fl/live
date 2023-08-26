import { createStore } from 'vuex'
import { state, getters } from './state'
import mutations from './mutations'
import actions from './actions'

const store = createStore({
  state,
  getters,
  mutations,
  actions
})

export default store
