import { shallow } from 'vue-test-utils'

import Alert from '../src/components/Alert'

describe('Alert', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallow(Alert)
  })

  test('It should match snapshot', () => {
    expect(wrapper.$el).toMatchSnapshot()
  })
})
