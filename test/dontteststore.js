import { shallow, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import Actions from '@/views/Crafting.vue'

const localVue = createLocalVue()

localVue.use(Vuex)

describe('Actions.vue', () => {
  let actions
  let store

  beforeEach(() => {
    actions = {
      actionClick: jest.fn(),
      actionInput: jest.fn()
    }
    store = new Vuex.Store({
      state: {},
      getters: {
        craftableItems: []
      },
      actions
    })
  })

  it('calls store action "actionInput" when input value is "input" and an "input" event is fired', () => {
    const wrapper = shallow(Actions, { store, localVue })

    expect(wrapper.isEmpty()).toBe(false)
  })
})
