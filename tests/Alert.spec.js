import { mount } from 'vue-test-utils'

import Alert from '../src/components/Alert'

describe('Alert snapshot', () => {
  let wrapper

  beforeEach(() => {
    wrapper = mount(Alert)
  })

  test('should match snapshot', () => {
    wrapper.setData({ visible: true, text: 'hi' })

    expect(wrapper.vm.$el).toMatchSnapshot()
  })
})
