import { shallowMount } from '@vue/test-utils';
import MStorybook from './index.vue';

describe('MStorybook.vue', () => {
  it('renders label when passed', () => {
    const label = 'new message';
    const wrapper = shallowMount(MStorybook, {
      propsData: { label },
    });
    expect(wrapper.text()).toMatch(label);
  });
});
