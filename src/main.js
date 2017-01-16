import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'

const app = new Vue(Vue.util.extend({
  router,
  store
}, App))

app.$mount('#app')
