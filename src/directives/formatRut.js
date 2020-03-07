/* eslint-disable no-param-reassign */
import { rutUtilities } from '../helpers';

export default {
  bind(el, binding, vnode) {
    el.addEventListener('blur', () => {
      vnode.context[binding.expression] = rutUtilities.format(el.value);
    });
    el.addEventListener('keyup', () => {
      vnode.context[binding.expression] = rutUtilities.format(el.value);
    });
  },
  updated() {},
};
