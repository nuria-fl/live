import Vuex from 'vuex'
import { shallow, createLocalVue } from 'vue-test-utils'
import { __createMocks as createStoreMocks } from '../src/store'

import WaterCollector from '../src/components/WaterCollector'

// Tell Jest to use the mock implementation of the store
jest.mock('../src/store')

const localVue = createLocalVue()

localVue.use(Vuex)

describe('WaterCollector', () => {
  let storeMocks
  let wrapper

  beforeEach(() => {
    // Create a fresh store and wrapper instance for every test case.
    storeMocks = createStoreMocks()
    wrapper = shallow(WaterCollector, {
      store: storeMocks.store,
      localVue,
      propsData: {
        item: {
          id: 'water-collector',
          name: 'Water collector',
          description: 'Collects rain water',
          itemsNeeded: ['plastic', 'rope', 'bottle'],
          toolsNeeded: [],
          isCraftable: true
        }
      }
    })
  })

  test('It should match snapshot', () => {
    wrapper.find('.Btn').trigger('click')
    expect(wrapper.vm.$el).toMatchSnapshot()
  })

  test('It should call removeItemsById when crafted', () => {
    wrapper.find('.Item__actions .Btn').trigger('click')
    expect(storeMocks.actions.removeItemsById).toBeCalled()
  })

  test('It should set hasWaterCollector to true when crafted', () => {
    wrapper.find('.Item__actions .Btn').trigger('click')
    expect(wrapper.vm.hasWaterCollector).toBe(true)
  })

  test('It should set isCollecting to true when crafted', () => {
    wrapper.find('.Item__actions .Btn').trigger('click')
    expect(wrapper.vm.isCollecting).toBe(true)
  })
})
