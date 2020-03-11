<template>
  <div class="m-stepper-root">
    <slot />
  </div>
</template>

<script>
export default {
  name: 'MStepperRoot',
};
</script>

<style lang="scss" scoped>
.m-stepper-root {
  position: relative;

  box-sizing: border-box;
  display: flex;

  justify-content: space-between;

  width: inherit;

  user-select: none;
}
</style>
