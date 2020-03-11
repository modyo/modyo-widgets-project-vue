/* eslint-disable import/no-named-as-default */
<template>
  <div :class="['m-step', classes]">
    <input
      v-show="debug"
      :id="id"
      class="m-step__input"
      type="radio"
      :checked="active"
      :name="computedName"
      @change="handleChange">
    <label
      class="m-step__label"
      :for="id">
      <span class="m-step__index">
        <span v-if="!visited">{{ scope.displayIndex }}</span>
        <font-awesome-icon
          v-if="visited"
          icon="check" />
      </span>
    </label>
  </div>
</template>

<script>
/* eslint-disable no-underscore-dangle */

export default {
  name: 'MStep',
  inheritAttrs: false,
  props: {
    index: {
      type: Number,
      default: 0,
    },
    name: {
      type: String,
      default: '',
    },
    clickable: {
      type: Boolean,
      default: false,
    },
    active: {
      type: Boolean,
      default: false,
    },
    visited: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    withDivider: {
      type: Boolean,
      default: false,
    },
    debug: {
      type: Boolean,
      default: false,
    },
  },
  data: () => ({
    namespace: { kebab: 'm-step', capitalize: 'M-Step' },
  }),
  computed: {
    id() {
      return `${this.namespace.kebab}-${this._uid}-${this.index}`;
    },
    displayIndex() {
      return this.index + 1;
    },
    computedName() {
      return this.name || this.id;
    },
    scope() {
      const {
        index, displayIndex, defaultSlot, flags,
      } = this;
      return {
        index, displayIndex, defaultSlot, flags,
      };
    },
    flags() {
      return {
        isActive: this.active,
        isVisited: this.visited,
        isDisabled: this.disabled,
        isClickable: this.clickable,
      };
    },
    classes() {
      return {
        'is-active': this.active,
        'is-visited': this.visited,
        'is-disabled': this.disabled,
        'is-clickable': this.clickable,
      };
    },
  },
  methods: {
    handleChange() {
      if (this.clickable) {
        this.$emit('change', this.index);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
$step-completed: var(--completed);
$step-active: var(--active);
$step-disabled: var(--disabled);
$step-default: var(--default);
$step-label: var(--label);

.m-step__label {
  display: flex;

  flex-direction: row;

  align-items: center;
}

.m-step__index {
  display: flex;

  flex-shrink: 0;

  align-items: center;

  justify-content: center;

  width: 2.5rem;
  height: 2.5rem;

  font-size: 1rem;
  color: #fff;

  background-color: $step-default;
  border: 1px solid $step-default;
  border-radius: 50%;
}

.m-step {
  box-sizing: border-box;

  flex: 0;

  &.is-active,
  &.is-visited {
    .m-step__index {
      color: $step-label;
    }
  }

  &.is-clickable:not(.is-active):not(.is-disabled) {
    .m-step__label {
      cursor: pointer;
    }
  }

  &.is-active {
    .m-step__label {
      .m-step__index {
        background-color: $step-active;
        border-color: $step-active;
      }
    }
  }

  &.is-visited {
    .m-step__index {
      background-color: $step-completed;
      border-color: $step-completed;
    }
  }

  &.is-disabled {
    .m-step__label {
      cursor: default;
    }

    .m-step__index {
      background-color: $step-disabled;
      border: 1px solid $step-disabled;
    }
  }
}

</style>
