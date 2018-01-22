import Vue from 'vue'
import App from './App'
import store from './store'

const app = new Vue(Vue.util.extend({
  store
}, App))

app.$mount('#app')
