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

    test('renders emoji', () => {
      const wrapper = shallow(Markdown, {
        propsData: { content: 'Test :tada: imoji' }
      })

      wrapper.update()

      expect(wrapper.element.querySelector('img')).toBeTruthy()
      expect(wrapper.element.querySelector('img').getAttribute('alt')).toEqual('tada emoji')
      expect(wrapper.element.querySelector('img').getAttribute('src')).toEqual(expect.stringContaining('tada'))
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