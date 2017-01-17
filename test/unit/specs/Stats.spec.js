/* eslint-env jasmine */

import Vue from 'vue'
import router from 'src/router'
import store from '../mocks/store'
import Stats from 'src/components/Stats'

const vm = new Vue({
  template: '<div><test></test></div>',
  store: store,
  router: router,
  components: {
    'test': Stats
  }
}).$mount()

describe('Stats.vue', () => {
  it('should render its template', function () {
    expect(vm.$el.querySelectorAll('li').length).toBe(3)
  })
})
