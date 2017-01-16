import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

import Stats from '../components/Stats.vue'

export default new Router({
  routes: [
    { path: '/', component: Stats },
  ]
})
