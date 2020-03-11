<template>
  <div
    class="m-stepper"
    :style="{'--active': activeColor, '--completed': completedColor,
             '--disabled': disabledColor, '--label': labelColor,
             '--default': defaultColor, '--divider': dividerColor}">
    <m-stepper-root>
      <span
        v-if="withDivider"
        class="m-stepper__divider" />
      <m-step
        v-for="(step, $index) in stepsArr"
        :key="$index"
        :name="id"
        :debug="debug"
        :clickable="clickable"
        :index="$index"
        :visited="step.visited"
        :disabled="step.disabled"
        :with-divider="withDivider"
        :active="step.index === toIndex(value.value)"
        @change="handleChange" />
    </m-stepper-root>
  </div>
</template>

<script>
/* eslint-disable no-underscore-dangle */

import MStep from './components/m-step.vue';
import MStepperRoot from './components/m-stepper-root.vue';

export default {
  name: 'MStepper',

  components: {
    MStep,
    MStepperRoot,
  },
  inheritAttrs: false,

  props: {
    /**
     * Contains the current step value. Very similar to a
     * `value` attribute on an input. In most cases, you'll want
     * to set this as a two-way binding, using the `v-model` directive.
     * @type {Number||undefined||null}
     */
    value: {
      type: Object,
      default: () => ({
        value: 1,
        id: undefined,
      }),
      validator: ({ id, value }) => {
        const tests = [];

        tests.push({
          name: 'id',
          type: [undefined, String.name],
          value: id === undefined || typeof id === 'string',
        });

        tests.push({
          name: 'value',
          type: [Number.name],
          value: Number.isInteger(value),
        });

        // eslint-disable-next-line no-shadow
        return tests.every(({ name, type, value }) => {
          if (value) {
            return true;
          }
          console.error(
            `Property "${name}" must be of type ${[]
              .concat(type)
              // eslint-disable-next-line no-shadow
              .map((type) => String(type))
              .join(' or ')}.`,
          );
          return false;
        });
      },
    },

    /**
     * Contains the steps count.
     */
    steps: {
      type: Number,
      default: 0,
    },

    /**
     * Ability to change step at a click in indicator
     * @type {Boolean}
     */
    clickable: {
      type: Boolean,
      default: false,
    },

    /**
     * Adds/Removes a divider to/from each Step component.
     * @type {Boolean}
     */
    withDivider: {
      type: Boolean,
      default: true,
    },

    /**
     * Sets up debug mode, which reveals
     * the actual radio-button behind each step.
     * @type {Boolean}
     */
    debug: {
      type: Boolean,
      default: false,
    },

    /**
     * Sets up colors for the different states of the step.
     */
    activeColor: {
      type: String,
      default: '#34495E',
    },

    completedColor: {
      type: String,
      default: '#34495E',
    },

    disabledColor: {
      type: String,
      default: '#C1C5C7',
    },

    defaultColor: {
      type: String,
      default: '#636E72',
    },

    dividerColor: {
      type: String,
      default: '#C1C5C7',
    },

    labelColor: {
      type: String,
      default: '#F7F8F9',
    },
  },

  data() {
    const { value: { value } } = this;
    return {
      namespace: { kebab: 'm-stepper', capitalize: 'M-Stepper' },
      stepsArr: this.getStepsArr(),
      index: this.toIndex(value),
    };
  },

  computed: {
    id() {
      return `${this.namespace.kebab}-${this._uid}`;
    },

    lastIndex() {
      return this.stepsArr.length - 1;
    },

    /**
     * Creates queries for ease of composition.
     */
    queries() {
      const { steps, index } = this;
      return Array.from(Array(steps)).reduce((queries, step, $index) => {
        const localqueries = queries;
        const query = `isStep${$index + 1}`;
        localqueries[query] = index === $index;
        return localqueries;
      }, {});
    },
  },

  watch: {
    /**
     * When `value` prop changes, update index.
     */
    value: {
      handler({ value }) {
        this.index = this.toIndex(value);
      },
      immediate: true,
    },

    /**
     * When internal property `index` changes,
     * convert to value and update v-model.
     */
    index: {
      handler(index) {
        this.emitValue(this.toValue(index));
      },
      immediate: true,
    },
  },

  created() {
    this.changeStepsStates(this.index);
  },

  methods: {
    /**
     * Converts index to value.
     */
    toValue(index) {
      return index + 1;
    },

    /**
     * Converts value to index.
     */
    toIndex(value = 0) {
      return value - 1;
    },

    /**
     * Whether a step
     * exists or not.
     */
    doesStepExist(index) {
      return !!this.stepsArr[index];
    },

    /**
     * Handle `change` event and
     * programmatic changes.
     */
    handleChange(index) {
      if (this.clickable) {
        this.changeStep(index);
      }
    },

    /**
     * Changes step by index.
     */
    changeStep(index) {
      const isNext = index === this.index + 1;
      const isPrevious = index === this.index - 1;

      if (isNext || isPrevious) {
        this.changeStepsStates(index);

        this.emitValue(this.toValue(index));
      }
    },

    changeStepsStates(index) {
      this.stepsArr.forEach((step) => {
        if (step.index < index) {
          this.setStep(step.index, 'active', false);
          this.setStep(step.index, 'visited', true);
          this.setStep(step.index, 'disabled', false);
        } else if (step.index === index) {
          this.setStep(step.index, 'active', true);
          this.setStep(step.index, 'disabled', false);
          this.setStep(step.index, 'visited', false);
        } else if (step.index === index + 1) {
          this.setStep(step.index, 'active', false);
          this.setStep(step.index, 'disabled', false);
          this.setStep(step.index, 'visited', false);
        } else if (step.index > index + 1) {
          this.setStep(step.index, 'active', false);
          this.setStep(step.index, 'disabled', true);
          this.setStep(step.index, 'visited', false);
        }
      });
    },

    /**
     * Value getter
     */
    getValue() {
      return this.value.value;
    },

    /**
     * Constructs steps array
     * from `steps` prop.
     */
    getStepsArr() {
      return Array.from(
        Array(this.steps), (step, index) => {
          const isFirst = index === 0;
          const isNext = index - 1 === 0;
          let disabled = false;

          if (isFirst || isNext) {
            disabled = false;
          } else {
            disabled = true;
          }

          const visited = false;
          const value = this.toValue(index);

          return {
            index, value, visited, disabled,
          };
        },
      );
    },

    /**
     * Offsets stepper {n} steps.
     */
    offset(offset) {
      const index = this.index + offset;
      if (this.doesStepExist(index)) {
        this.changeStep(index);
      }
    },

    /**
     * Goes to next step.
     */
    next() {
      this.offset(1);
    },

    /**
     * Goes to previous step.
     */
    previous() {
      this.offset(-1);
    },

    /**
     * Resets the stepper.
     */
    reset() {
      this.stepsArr = this.getStepsArr();
      this.index = 0;
      this.$emit('reset');
    },

    /**
     * Sets a step property.
     */
    setStep(index, prop, value) {
      this.$set(this.stepsArr[index], prop, value);
    },

    /**
     * Storage setter.
     */
    setStorage() {
      const { index, stepsArr } = this;
      window[this.storekeeper].setItem(
        this.id,
        JSON.stringify({ index, stepsArr }),
      );
    },

    /**
     * Storage getter.
     */
    getStorage() {
      return JSON.parse(window[this.storekeeper].getItem(this.id));
    },


    /**
     * Update v-model.
     */
    emitValue(value) {
      const { id, queries } = this;
      this.$emit('input', { id, value, queries });
    },
  },
};
</script>

<style lang="scss" scoped>
$step-divider: var(--divider);

.m-stepper {
  z-index: 1;
}

.m-stepper__divider {
  position: absolute;
  top: 40%;
  right: 0;
  left: 0;
  z-index: -1;

  border-bottom: 1px solid $step-divider;
}
</style>
