import Vuex from 'vuex'
import { shallow, createLocalVue } from 'vue-test-utils'
import { __createMocks as createStoreMocks } from '../src/store'

import Item from '../src/components/Item'

// Tell Jest to use the mock implementation of the store
jest.mock('../src/store')

const localVue = createLocalVue()

localVue.use(Vuex)

// TODO: test sick/cure

describe('Item', () => {
  let storeMocks
  let wrapper

  beforeEach(() => {
    // Create a fresh store and wrapper instance for every test case.
    storeMocks = createStoreMocks()
    wrapper = shallow(Item, {
      store: storeMocks.store,
      localVue,
      propsData: {
        item: {
          id: 'berries',
          name: 'Berries',
          description: 'Small amount of vitamins and water',
          action: 'scavenge',
          consumable: true,
          value: {
            health: 0,
            food: 3,
            water: 3,
            energy: 0
          },
          risk: 0,
          daysToPerish: 5
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
