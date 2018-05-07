import Vuex from 'vuex'
import { shallow, createLocalVue } from 'vue-test-utils'
import { __createMocks as createStoreMocks } from '../src/store'

import Consume from '../src/components/Consume'

// Tell Jest to use the mock implementation of the store
jest.mock('../src/store')

const localVue = createLocalVue()

localVue.use(Vuex)

// TODO: test sick/cure

describe('Consume', () => {
  let storeMocks
  let wrapper

  beforeEach(() => {
    // Create a fresh store and wrapper instance for every test case.
    storeMocks = createStoreMocks()
    wrapper = shallow(Consume, {
      store: storeMocks.store,
      localVue,
      propsData: {
        item: {
          type: 'food',
          id: 'berries',
          name: 'Berries',
          value: 3,
          risk: 0,
          action: 'scavenge',
          description: 'Small amount of vitamins and fiber'
        }
      }
    })
  })

  test('It should match snapshot', () => {
    expect(wrapper.vm.$el).toMatchSnapshot()
  })

  test('Calls removeInventory when discarting', () => {
    wrapper.find('.Btn:first-child').trigger('click')
    expect(storeMocks.mutations.removeInventory).toBeCalled()
  })
  test('Calls removeInventory when consuming', () => {
    wrapper.find('.Btn:last-child').trigger('click')
    expect(storeMocks.mutations.removeInventory).toBeCalled()
  })
  test('Calls increase when consuming', () => {
    wrapper.find('.Btn:last-child').trigger('click')
    expect(storeMocks.mutations.increase).toBeCalled()
  })
})
