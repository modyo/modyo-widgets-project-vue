<template>
  <div
    class="switch-button-control"
    :style="{'--active': activeColor, '--inactive': inactiveColor,
             '--activeLabel': activeLabelColor, 'inactiveLabel': inactiveLabelColor}">
    <div
      class="switch-button-label"
      :class="{ enabled: isEnabled }">
      <slot />
    </div>
    <div
      class="switch-button"
      :class="{ enabled: isEnabled }"
      @click="toggle">
      <div class="button" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'SwitchButton',
  model: {
    prop: 'isEnabled',
    event: 'toggle',
  },
  props: {
    isEnabled: Boolean,
    activeColor: {
      type: String,
      default: '#2e4553',
    },
    inactiveColor: {
      type: String,
      default: '#636e72',
    },
    activeLabelColor: {
      type: String,
      default: '#2e4553',
    },
    inactiveLabelColor: {
      type: String,
      default: '#636e72',
    },
  },
  methods: {
    toggle() {
      this.$emit('toggle', !this.isEnabled);
    },
  },
};
</script>

<style lang="scss" scoped>
$switch-button-height: 1.5em;
$switch-button-inactive-color: var(--inactive);
$switch-button-active-color: var(--active);
$switch-label-inactive-color: var(--inactiveLabel);
$switch-label-active-color: var(--activeLabel);
$switch-button-border-thickness: 2px;
$switch-transition: all .3s ease-in-out;
$switch-is-rounded: true;
$button-side-length: calc(#{$switch-button-height} - (2 * #{$switch-button-border-thickness}));

.switch-button-control {
  display: flex;

  flex-direction: row;

  align-items: center;

  justify-content: space-between;

  .switch-button-label {
    flex: 1 0 80%;

    margin-right: 20px;

    color: $switch-label-inactive-color;

    &.enabled {
      color: $switch-label-active-color;
    }
  }

  .switch-button {
    flex: 0 0 auto;

    width: calc(#{$switch-button-height} * 2);

    height: $switch-button-height;

    cursor: pointer;

    border: $switch-button-border-thickness solid $switch-button-inactive-color;
    border-radius: if($switch-is-rounded, $switch-button-height, 0);

    transition: $switch-transition;

    .button {
      width: $button-side-length;
      height: $button-side-length;

      background: $switch-button-inactive-color;
      border: ($switch-button-border-thickness / 2) solid #fff;
      border-radius: if($switch-is-rounded, $button-side-length, 0);

      transition: $switch-transition;
    }

    &.enabled {
      background-color: $switch-button-active-color;
      border: $switch-button-border-thickness solid $switch-button-active-color;

      .button {
        background: #fff;
        border: ($switch-button-border-thickness / 2) solid $switch-button-active-color;

        transform:
          translateX(
            calc(#{$button-side-length} + (2 * #{$switch-button-border-thickness}))
          );
      }
    }
  }
}
</style>
