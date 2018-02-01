import { shallow } from '@vue/test-utils'
import { createRenderer } from 'vue-server-renderer'
import * as Icons from '@/components/Icon'

const names = Object.keys(Icons)
const renderer = createRenderer({})

names.forEach(
  name => describe(`<${name}Icon>`, () => {
    test(`snapshot`, (done) => {
      const wrapper = shallow(Icons[name])
      
      renderer.renderToString(wrapper.vm, (err, str) => {
        expect(str).toMatchSnapshot()
        done()
      })
    })
  })
)