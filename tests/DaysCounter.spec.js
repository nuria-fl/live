import Vuex from 'vuex'
import { shallow, createLocalVue } from 'vue-test-utils'
import { __createMocks as createStoreMocks } from '../src/store'

import DaysCounter from '../src/components/DaysCounter'

// Tell Jest to use the mock implementation of the store
jest.mock('../src/store')

const localVue = createLocalVue()

localVue.use(Vuex)

// TODO: how to test event loop?

describe('DaysCounter', () => {
  let storeMocks
  let wrapper

  beforeEach(() => {
    // Create a fresh store and wrapper instance for every test case.
    storeMocks = createStoreMocks()
    wrapper = shallow(DaysCounter, {
      store: storeMocks.store,
      localVue
    })
  })

  test('It should match snapshot', () => {
    expect(wrapper.$el).toMatchSnapshot()
  })
})
