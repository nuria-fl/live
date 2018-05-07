import Vuex from 'vuex'
import { shallow, createLocalVue } from 'vue-test-utils'
import { __createMocks as createStoreMocks } from '../src/store'

import GameStatusButton from '../src/components/GameStatusButton'

// Tell Jest to use the mock implementation of the store
jest.mock('../src/store')

const localVue = createLocalVue()

localVue.use(Vuex)

// TODO: how to test after pause state has changed?

describe('GameStatusButton', () => {
  let storeMocks
  let wrapper

  beforeEach(() => {
    // Create a fresh store and wrapper instance for every test case.
    storeMocks = createStoreMocks()
    wrapper = shallow(GameStatusButton, {
      store: storeMocks.store,
      localVue
    })
  })

  test('It should match snapshot', () => {
    expect(wrapper.vm.$el).toMatchSnapshot()
  })

  test('Calls pauseGame when clicked', () => {
    wrapper.find('.GameStatusButton').trigger('click')
    expect(storeMocks.mutations.pauseGame).toBeCalled()
  })
})
