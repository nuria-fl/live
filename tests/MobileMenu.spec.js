import Vuex from 'vuex'
import { shallow, createLocalVue } from 'vue-test-utils'
import { __createMocks as createStoreMocks } from '../src/store'

import MobileMenu from '../src/components/MobileMenu'

// Tell Jest to use the mock implementation of the store
jest.mock('../src/store')

const localVue = createLocalVue()

localVue.use(Vuex)

describe('MobileMenu', () => {
  let storeMocks
  let wrapper

  beforeEach(() => {
    // Create a fresh store and wrapper instance for every test case.
    storeMocks = createStoreMocks()
    wrapper = shallow(MobileMenu, {
      store: storeMocks.store,
      localVue
    })
  })

  test('It should match snapshot', () => {
    expect(wrapper.vm.$el).toMatchSnapshot()
  })

  test('Shows menu on click', () => {
    wrapper.find('.Menu__toggle').trigger('click')
    expect(wrapper.vm.isMenuVisible).toBe(true)
  })
})
