import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

import Actions from '../views/Actions.vue'
import Inventory from '../views/Inventory.vue'
import Crafting from '../views/Crafting.vue'

export default new Router({
  linkExactActiveClass: true,
  routes: [
    {
      path: '/',
      name: 'Actions',
      component: Actions
    },
    {
      path: '/inventory',
      name: 'Inventory',
      component: Inventory
    },
    {
      path: '/crafting',
      name: 'Crafting',
      component: Crafting
    }
  ]
})
