import Vuex from 'vuex'
import { shallow, createLocalVue } from 'vue-test-utils'
import { __createMocks as createStoreMocks } from '../src/store'

import Fire from '../src/components/Fire'

// Tell Jest to use the mock implementation of the store
jest.mock('../src/store')

const localVue = createLocalVue()

localVue.use(Vuex)

describe('Fire', () => {
  let storeMocks
  let wrapper

  beforeEach(() => {
    // Create a fresh store and wrapper instance for every test case.
    storeMocks = createStoreMocks()
    wrapper = shallow(Fire, {
      store: storeMocks.store,
      localVue,
      propsData: {
        item: {
          id: 'fire',
          name: 'Fire',
          description: 'Will allow you to cook items',
          itemsNeeded: ['wood', 'flint'],
          toolsNeeded: [],
          isCraftable: true
        }
      }
    })
  })

  test('It should call removeItemsById when crafted', () => {
    wrapper.find('.Btn').trigger('click')
    expect(storeMocks.actions.removeItemsById).toBeCalled()
  })

  test('It should call enableFire when crafted', () => {
    wrapper.find('.Btn').trigger('click')
    expect(storeMocks.mutations.enableFire).toBeCalled()
  })

  test('It should set an interval when crafted', () => {
    wrapper.find('.Btn').trigger('click')
    expect(wrapper.vm.fireInterval).not.toBe(null)
  })
})
