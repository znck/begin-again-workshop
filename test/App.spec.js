import { shallow } from '@vue/test-utils'
import App from '@/App.vue'

describe('<App>', () => {
  test('renders', () => {
    const wrapper = shallow(App)

    expect(wrapper.text()).toEqual(expect.stringContaining('Hello World'))
  })
})
