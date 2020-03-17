<template>
<div>
      <label>
        {{label}}
      <VueDatePicker
      class="vue-datepicker"
      v-bind="$attrs"
       v-on="$listeners"
       >
           <template v-for="(_, slot) of $scopedSlots" v-slot:[slot]="scope">
             <slot :name="slot" v-bind="scope"/>
             </template>
          </VueDatePicker>
       </label>
</div>
</template>

<script>
import { VueDatePicker } from '@mathieustan/vue-datepicker';

export default {
  name: 'modyo-datepicker',
  components: {
    VueDatePicker,
  },
  inheritAttrs: false,
  props: {
    label: {
      type: String,
      default: '',
    },
  },
};
</script>
