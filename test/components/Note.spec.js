import { shallow } from '@vue/test-utils'
import Note from '@/components/Note.vue'

describe('<Note>', () => {
  describe('Component', () => {
    test('has name', () => {
      expect(Note.name.length).toBeTruthy()
    })
  })
  describe('API', () => {
    const wrapper = shallow(Note, { propsData: { title: '', body: '' } })
    const props = wrapper.vm.$options.props

    test('accepts title prop', () => {
      expect(props.title).toBeTruthy()
    })

    test('value is string', () => {
      expect(props.title.type).toEqual(String)
    })

    test('value is required', () => {
      expect(props.title.required).toEqual(true)
    })

    test('accepts body prop', () => {
      expect(props.body).toBeTruthy()
    })

    test('body is string', () => {
      expect(props.body.type).toEqual(String)
    })

    test('body is required', () => {
      expect(props.body.required).toEqual(true)
    })
  })
})