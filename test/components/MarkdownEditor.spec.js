import { shallow, mount } from '@vue/test-utils'
import MarkdownEditor from '@/components/MarkdownEditor.vue'
import Editor from '@/components/Editor.vue'
import Markdown from '@/components/Markdown.vue'

describe('<App>', () => {
  describe('Component', () => {
    test('has name', () => {
      expect(MarkdownEditor.name.length).toBeTruthy()
    })

    test('renders editor and markdown preview', () => {
      const wrapper = shallow(MarkdownEditor, { propsData: { value: '' } })

      expect(wrapper.contains(Editor)).toBeTruthy()
      expect(wrapper.contains(Markdown)).toBeTruthy()
    })

    test('should display number of characters', () => {
      const wrapper = shallow(MarkdownEditor, { propsData: { value: 'hello' } })

      expect(wrapper.find('footer > .stats').text()).toEqual(expect.stringContaining('Characters: 5'))
    })

    test('should display number of words', () => {
      const wrapper = shallow(MarkdownEditor, { propsData: { value: 'hello world' } })

      expect(wrapper.find('footer > .stats').text()).toEqual(expect.stringContaining('Words: 2'))
    })
  })
  describe('API', () => {
    const wrapper = mount(MarkdownEditor, {
      propsData: { value: '' },
      slots: {
        default: 'In Header',
        meta: 'In Footer'
      }
    })
    const props = wrapper.vm.$options.props

    test('accepts value prop', () => {
      expect(props.value).toBeTruthy()
    })

    test('value is object', () => {
      expect(props.value.type).toEqual(String)
    })

    test('value is required', () => {
      expect(props.value.required).toEqual(true)
    })

    test('accepts preview prop', () => {
      expect(props.preview).toBeTruthy()
    })

    test('content is string', () => {
      expect(props.preview.type).toEqual(Boolean)
    })

    test('default preview prop', () => {
      expect(props.preview.default).toEqual(true)
    })

    test('fires input event', () => {
      const spy = jest.fn()
      wrapper.vm.$on('input', spy)

      wrapper.find('textarea').element.value = 'foo'
      wrapper.find('textarea').trigger('input')

      expect(spy).toHaveBeenCalled()
    })

    test('renders default slot', () => {
      expect(wrapper.find('header').text()).toEqual(expect.stringContaining('In Header'))
    })

    test('renders meta slot', () => {
      expect(wrapper.find('footer').text()).toEqual(expect.stringContaining('In Footer'))
    })
  })
})