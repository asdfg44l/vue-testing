import { shallowMount } from '@vue/test-utils';
import CommonEvent from '@/components/ForTest/CommonEvent.vue';

const factory = (component, option = {}) => {
    return shallowMount(component, option)
}

describe('Test CommentEvent component', () => {
    const wrapper = factory(CommonEvent)

    test('always show apple', () => {
        const title = wrapper.get('.title')
        expect(title.text()).toBe('Apple')
    })

    test('does not show description if is not open', () => {
        const description = wrapper.find('.description')
        expect(description.exists()).toBeFalsy()
    })

    test('show description if is open', async () => {
        const openBtn = wrapper.get('.open')
        await openBtn.trigger('click')
        const description = wrapper.find('.description')
        expect(description.exists()).toBeTruthy()
    })
})