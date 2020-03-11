import { shallowMount } from '@vue/test-utils';
import MDatepicker from './index.vue';

describe('MDatepicker.vue', () => {
  it('renders label when passed', () => {
    const label = 'new message';
    const wrapper = shallowMount(MDatepicker, {
      propsData: { label },
    });
    expect(wrapper.text()).toMatch(label);
  });
});
