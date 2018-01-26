import { shallow } from '@vue/test-utils'
import Markdown from '@/components/Markdown.vue'

describe('<Preview>', () => {
  describe('Component', () => {
    test('has name', () => {
      expect(Markdown.name.length).toBeTruthy()
    })

    test('renders markdown', () => {
      const content = `Time is ${new Date()}`
      const wrapper = shallow(Markdown, {
        propsData: { content: `# ${content}\n` }
      })

      wrapper.update()

      expect(wrapper.element.querySelector('h1')).toBeTruthy()
      expect(wrapper.element.textContent).toEqual(expect.stringContaining(content))
    })

    test('should sanitize markdown', () => {
      const wrapper = shallow(Markdown, {
        propsData: { content: `<div id="foo">Hello</div>\n` }
      })

      wrapper.update()

      expect(wrapper.element.querySelector('#foo')).toBeFalsy()
      expect(wrapper.element.textContent).toEqual(expect.stringContaining('<div id="foo">Hello</div>'))
    })
  })
  describe('API', () => {
    const wrapper = shallow(Markdown, { propsData: { content: '' } })
    const props = wrapper.vm.$options.props

    test('accepts content prop', () => {
      expect(props.content).toBeTruthy()
    })

    test('content is string', () => {
      expect(props.content.type).toEqual(String)
    })

    test('content is required', () => {
      expect(props.content.required).toEqual(true)
    })
  })
})