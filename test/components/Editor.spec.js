import { shallow } from '@vue/test-utils'
import Editor from '@/components/Editor.vue'

describe('<Editor>', () => {
  describe('Component', () => {
    test('has name', () => {
      expect(Editor.name.length).toBeTruthy()
    })
  })
  describe('API', () => {
    const wrapper = shallow(Editor, { propsData: { value: '' } })
    const props = wrapper.vm.$options.props

    test('accepts value prop', () => {
      expect(props.value).toBeTruthy()
    })

    test('value is string', () => {
      expect(props.value.type).toEqual(String)
    })

    test('value is required', () => {
      expect(props.value.required).toEqual(true)
    })

    test('fires input event', () => {
      const spy = jest.fn()
      wrapper.vm.$on('input', spy)
      wrapper.find('.input').trigger('input')
      
      expect(spy).toHaveBeenCalled()
    })
  })
})