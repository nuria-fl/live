import { shallow } from 'vue-test-utils'

import List from '../src/components/List'

describe('List', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallow(List, {
      propsData: {
        list: [{}]
      }
    })
  })

  test('It should match snapshot', () => {
    expect(wrapper.vm.$el).toMatchSnapshot()
  })
})
