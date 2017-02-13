import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

import Splash from '../views/Splash.vue'
import Main from '../views/Main.vue'

export default new Router({
  routes: [
    { path: '/', component: Splash },
    { path: '/play', component: Main }
  ]
})
