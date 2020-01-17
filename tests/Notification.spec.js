import { mount } from 'vue-test-utils'

import Notification from '../src/components/Notification'

describe('Notification snapshot', () => {
  let wrapper

  beforeEach(() => {
    wrapper = mount(Notification)
  })

  test('should match snapshot', () => {
    wrapper.setData({ visible: true, text: 'hi' })

    expect(wrapper.vm.$el).toMatchSnapshot()
  })
})
