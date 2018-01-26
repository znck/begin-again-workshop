import { shallow } from '@vue/test-utils'
import App from '@/App.vue'
import Editor from '@/components/Editor.vue'

describe('<App>', () => {
  describe('Component', () => {
    test('has name', () => {
      expect(App.name.length).toBeTruthy()
    })

    test('renders editor and markdown preview', () => {
      const wrapper = shallow(App)

      expect(wrapper.contains(Editor)).toBeTruthy()
    })
  })
})