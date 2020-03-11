import { shallowMount } from '@vue/test-utils';
import Drawer from './index.vue';

describe('Drawer Component', () => {
  it('renders props.msg when passed', () => {
    const wrapper = shallowMount(Drawer, {
      slots: {
        default: '<div class="fake-msg">Hola</div>',
      },
    });
    const sidebar = wrapper.find('.sidebar');
    expect(sidebar.findAll('.fake-msg').length).toBe(1);
    expect(sidebar.find('.fake-msg').text()).toBe('Hola');
  });
});
