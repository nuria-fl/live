import Vuex from 'vuex'
import { shallow, createLocalVue } from 'vue-test-utils'
import { __createMocks as createStoreMocks } from '../src/store'

import Stats from '../src/components/Stats'

// Tell Jest to use the mock implementation of the store
jest.mock('../src/store')

const localVue = createLocalVue()

localVue.use(Vuex)

describe('Stats', () => {
  let storeMocks
  let wrapper

  beforeEach(() => {
    // Create a fresh store and wrapper instance for every test case.
    storeMocks = createStoreMocks()
    wrapper = shallow(Stats, {
      store: storeMocks.store,
      localVue
    })
  })

  test('It should match snapshot', () => {
    expect(wrapper.vm.$el).toMatchSnapshot()
  })
})
