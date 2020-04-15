<template>
  <div>
    <label>
      {{ label }}
      <vue-date-picker
        class="vue-datepicker"
        v-bind="$attrs"
        v-on="$listeners">
        <template
          v-for="(_, slot) of $scopedSlots"
          v-slot:[slot]="scope">
          <slot
            :name="slot"
            v-bind="scope" />
        </template>
      </vue-date-picker>
    </label>
  </div>
</template>

<script>
import { VueDatePicker } from '@mathieustan/vue-datepicker';

export default {
  name: 'ModyoDatepicker',
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
