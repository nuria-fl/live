// import { shallow } from '@vue/test-utils'
// import Modal from '@/components/Modal.vue'
//
// describe('Modal.vue', () => {
//   test('renders when passed visible prop as true', () => {
//     const wrapper = shallow(Modal, {
//       propsData: {
//         visible: true
//       }
//     })
//     expect(wrapper.isEmpty()).toBe(false)
//   })
// })


import { shallow } from '@vue/test-utils'
import Counter from '../src/components/Modal.vue'

describe('Counter.vue', () => {
  it('increments count when button is clicked', () => {
    const wrapper = shallow(Counter)
    // wrapper.find('button').trigger('click')
    expect(wrapper.find('div').text()).toMatch('1')
  })
})
