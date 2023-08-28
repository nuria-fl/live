import Vuex from 'vuex'
import { shallow, createLocalVue } from 'vue-test-utils'
import { __createMocks as createStoreMocks } from '../src/store'

import CraftableItem from '../src/components/CraftableItem'

// Tell Jest to use the mock implementation of the store
jest.mock('../src/store')

const localVue = createLocalVue()

localVue.use(Vuex)

describe('CraftableItem', () => {
  let storeMocks
  let wrapper

  beforeEach(() => {
    // Create a fresh store and wrapper instance for every test case.
    storeMocks = createStoreMocks()
    wrapper = shallow(CraftableItem, {
      store: storeMocks.store,
      localVue,
      propsData: {
        item: {
          name: 'Bow',
          description: '',
          itemsNeeded: ['string', 'wood'],
          toolsNeeded: [],
          upgradesNeeded: [],
          result: ['bow'],
          category: 'weapon',
          isCraftable: true
        }
      }
    })
  })

  test('Emits craft event', () => {
    wrapper.find('.Btn').trigger('click')
    expect(wrapper.emitted('craft')).toBeTruthy()
  })
})
