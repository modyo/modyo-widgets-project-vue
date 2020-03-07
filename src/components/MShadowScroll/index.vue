<template>
  <div
    :class="$style.wrap"
    :style="{'--startColor': startColor, '--endColor': endColor, '--verticalSize': verticalSize,
             '--horizontalSize': horizontalSize,}">
    <div
      ref="scrollContainer"
      :class="$style['scroll-container']"
      class="accordion"
      :style="{ width, height }"
      @scroll.passive="toggleShadow">
      <slot />
      <span :class="[$style['shadow-top'], shadow.top && $style['is-active']]" />
      <span :class="[$style['shadow-right'], shadow.right && $style['is-active']]" />
      <span :class="[$style['shadow-bottom'], shadow.bottom && $style['is-active']]" />
      <span :class="[$style['shadow-left'], shadow.left && $style['is-active']]" />
    </div>
  </div>
</template>

<script>
function newResizeObserver(callback) {
  // Skip this feature for browsers which
  // do not support ResizeObserver.
  if (typeof ResizeObserver === 'undefined') return;

  // eslint-disable-next-line consistent-return
  return new ResizeObserver((e) => e.map(callback));
}

export default {
  name: 'ScrollShadow',
  props: {
    verticalSize: {
      type: String,
      default: '5em',
    },
    horizontalSize: {
      type: String,
      default: '5em',
    },
    startColor: {
      type: String,
      default: '#f0f2f3',
    },
    endColor: {
      type: String,
      default: 'rgba(240, 242, 243, 0)',
    },
  },
  data() {
    return {
      width: undefined,
      height: undefined,
      shadow: {
        top: false,
        right: false,
        bottom: false,
        left: false,
      },
    };
  },
  mounted() {
    // Check if shadows are necessary after the element is resized.
    const scrollContainerObserver = newResizeObserver(this.toggleShadow);
    if (scrollContainerObserver) {
      scrollContainerObserver.observe(this.$refs.scrollContainer);
      // Cleanup when the component is destroyed.
      this.$once('hook:destroyed', () => scrollContainerObserver.disconnect());
    }

    // Recalculate the container dimensions when the wrapper is resized.
    const wrapObserver = newResizeObserver(this.calcDimensions);
    if (wrapObserver) {
      wrapObserver.observe(this.$el);
      // Cleanup when the component is destroyed.
      this.$once('hook:destroyed', () => wrapObserver.disconnect());
    }
  },
  methods: {
    async calcDimensions() {
      // Reset dimensions for correctly recalculating parent dimensions.
      this.width = undefined;
      this.height = undefined;
      await this.$nextTick();

      this.width = `${this.$el.clientWidth}px`;
      this.height = `${this.$el.clientHeight}px`;
    },
    // Check if shadows are needed.
    toggleShadow() {
      const hasHorizontalScrollbar = this.$refs.scrollContainer.clientWidth
        < this.$refs.scrollContainer.scrollWidth;
      const hasVerticalScrollbar = this.$refs.scrollContainer.clientHeight
        < this.$refs.scrollContainer.scrollHeight;

      const scrolledFromLeft = this.$refs.scrollContainer.offsetWidth
        + this.$refs.scrollContainer.scrollLeft;
      const scrolledFromTop = this.$refs.scrollContainer.offsetHeight
        + this.$refs.scrollContainer.scrollTop;

      const scrolledToTop = this.$refs.scrollContainer.scrollTop === 0;
      const scrolledToRight = scrolledFromLeft >= this.$refs.scrollContainer.scrollWidth;
      const scrolledToBottom = scrolledFromTop >= this.$refs.scrollContainer.scrollHeight;
      const scrolledToLeft = this.$refs.scrollContainer.scrollLeft === 0;

      this.shadow.top = hasVerticalScrollbar && !scrolledToTop;
      this.shadow.right = hasHorizontalScrollbar && !scrolledToRight;
      this.shadow.bottom = hasVerticalScrollbar && !scrolledToBottom;
      this.shadow.left = hasHorizontalScrollbar && !scrolledToLeft;
    },
  },
};
</script>

<style lang="scss" module>
$start-color: var(--startColor);
$end-color: var(--endColor);
$vertical-size: var(--verticalSize);
$horizontal-size: var(--horizontalSize);

.wrap  {
  position: relative;

  overflow: hidden;
}

.scroll-container {
  overflow: auto;
}

.shadow-top,
.shadow-right,
.shadow-bottom,
.shadow-left {
  position: absolute;

  pointer-events: none;

  opacity: 0;

  transition: opacity .2s;
}

.shadow-top,
.shadow-bottom {
  right: 0;
  left: 0;

  height: $vertical-size;

  background-image: linear-gradient($start-color 0%, $end-color 100%);
}

.shadow-top {
  top: 0;
}

.shadow-bottom {
  bottom: 0;

  transform: rotate(180deg);
}

.shadow-right,
.shadow-left {
  top: 0;
  bottom: 0;

  width: horizontal-size;

  background-image: linear-gradient(90deg, $start-color 0%, $end-color 100%);
}

.shadow-right {
  right: 0;

  transform: rotate(180deg);
}

.shadow-left {
  left: 0;
}

.is-active {
  opacity: 1;
}
</style>
