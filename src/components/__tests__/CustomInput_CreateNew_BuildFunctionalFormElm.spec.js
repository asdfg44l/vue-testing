import { shallowMount } from '@vue/test-utils'
import CustomInput from '@/components/CustomInput.vue'

const factory = (component, { propsData, slots }) => {
  return shallowMount(component, { propsData, slots })
}

describe('測試 CustomInput元件是否正確生成', () => {

  const testList = ['text']

  describe('測試 input:text', () => {
    const wrapperCustomInput = factory(CustomInput, {
      propsData: {
        mode: 'text',
        name: 'test',
        id: 'test',
        value: '測試用的值',
        labelName: '標籤',
        placeholder: '測試用'
      }
    })
    const new_input = wrapperCustomInput.find('input')
    const new_el = new_input.element //input elm

    it('tagName 是否為 input:text', () => {
      expect(new_input).toBeDefined()
      expect(new_input.attributes('type')).toBe('text')
    })

    it('labelName是否正確顯示', () => {
      expect(wrapperCustomInput.find('label').text()).toBe('標籤:')
    })

    it('value是否有正確顯示', () => {
      expect(new_el.value).toBe('測試用的值')
    })
      
    it('是否能正確反應更新值', async() => {
      new_el.value = 'testtest'
      await new_input.trigger('input')
      expect(wrapperCustomInput.emitted().input[0]).toEqual(['testtest'])
    })
  })

  describe('測試 input:radio', () => {
    const wrapperCustomInput = factory(CustomInput, {
      propsData: {
        mode: 'radio',
        name: 'test',
        id: 'test',
        setValue: 'testing',
        checked: false
      },
      slots: {
        default: '標籤:'
      }
    })
    const new_input = wrapperCustomInput.find('input')

    console.log('++++', wrapperCustomInput)
    it('tagName 是否為 input:radio', () => {
      expect(new_input).toBeDefined()
      expect(new_input.attributes('type')).toBe('radio')
    })

    it('labelName 是否正確', () => {
      expect(wrapperCustomInput.find('label').text()).toBe('標籤:')
    })

    it('是否能正確反應更新值', async() => {
      await new_input.trigger('click')
      expect(wrapperCustomInput.emitted().input[0]).toEqual(['testing'])
    })
  })
})


