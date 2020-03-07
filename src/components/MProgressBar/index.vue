<template>
  <div
    class="m-progress-bar text-center"
    :style="{'--backgroundColor': backgroundColor, '--borderColor': borderColor}">
    <slot
      name="before"
      :percentage="percentage" />
    <div
      class="wrapper-progress">
      <div class="progress">
        <div
          :aria-valuenow="percentage"
          :style="{width: percentage + '%'}"
          class="progress-bar"
          role="progressbar"
          aria-valuemin="0"
          aria-valuemax="100">
          <span class="sr-only">{{ percentage }} Complete</span>
        </div>
      </div>
    </div>
    <slot
      name="after"
      :percentage="percentage" />
  </div>
</template>

<script>
export default {
  name: 'MProgressBar',
  props: {
    backgroundColor: {
      type: String,
      default: 'rgba(255, 255, 255, .4)',
    },
    borderColor: {
      type: String,
      default: '#c1cbcf',
    },
    percentage: {
      type: Number,
      default: 0,
    },
  },
  computed: {
    barClass() {
      if (this.percentage >= 75) {
        return 'danger';
      }
      if (this.percentage >= 50) {
        return 'warning';
      }
      return '';
    },
  },
};
</script>

<style lang="scss" scoped>
.m-progress-bar .wrapper-progress {
  position: relative;

  padding: 2px;

  margin-bottom: 5px;

  background: var(--backgroundColor);

  border: 1px solid var(--borderColor);
  border-radius: 20px;
}

.m-progress-bar .progress {
  height: 10px;

  background: none;

  border-radius: 20px;
}

.m-progress-bar .progress-bar {
  position: relative;

  background: var(--borderColor);

  border-radius: 40px;
  box-shadow: none;
}

</style>
