<template>
  <section>
    <aside class="sidebar" :style="style" ref="element">
      <slot></slot>
    </aside>
    <div class="overlay" ref="overlay"></div>
  </section>
</template>
<script>
export default {
  props: ['direction', 'exist'],
  data() {
    return {
      auto_speed: '0.3s',
      manual_speed: '0.03s',
      threshold: 20,
      startTime: null,
      startPos: null,
      translate: null,
      active: false,
      visible: true,
    };
  },
  computed: {
    element() {
      return this.$refs.element;
    },
    overlay() {
      return this.$refs.overlay;
    },
    enabled() {
      if (this.exist === true) {
        return true;
      }
      return false;
    },
    style() {
      if (this.direction === 'right') {
        return 'transform:translate3d(100%,0,0);right:0;';
      }
      return 'transform:translate3d(-100%,0,0);left:0;';
    },
  },
  mounted() {
    document.addEventListener('touchstart', (e) => { this.handleStart(e); });
    document.addEventListener('touchmove', (e) => { this.handleMove(e); });
    document.addEventListener('touchend', (e) => { this.handleEnd(e); });
    document.addEventListener('touchcancel', (e) => { this.handleEnd(e); });
    window.addEventListener('resize', (e) => { this.setVisibality(e); }, true);
    this.overlay.addEventListener('transitionend', (e) => { this.handleZindex(e); }, false);
    this.overlay.addEventListener('click', (e) => { this.close(e); }, false);
    this.setVisibality();
  },
  methods: {
    setVisibality() {
      if (this.element.offsetWidth === 0) {
        this.visible = false;
      } else {
        this.visible = true;
      }
    },
    handleStart(e) {
      this.startTime = new Date().getTime();
      this.startPos = e.targetTouches[0].pageX;
      this.element.style.transitionDuration = this.manual_speed;
    },
    handleMove(e) {
      const gesture = this.gesture(e);
      const valid = this.validate(this.direction, gesture);
      if (valid) {
        const percent = this.percentage(this.direction, gesture);
        if (this.direction === 'left') {
          this.translate = (e.touches[0].pageX - this.element.offsetWidth);
          if (this.translate < 0) {
            this.element.style.transform = `translate3d(${this.translate}px,0,0)`;
          } else {
            this.open();
          }
        } else {
          this.translate = -(window.screen.width - this.element.offsetWidth - e.touches[0].pageX);
          if (this.translate > 0) {
            this.element.style.transform = `translate3d(${this.translate}px,0,0)`;
          } else {
            this.open();
          }
        }
        this.overlayOpacity(percent / 100);
      }
    },
    handleEnd(e) {
      const speed = this.speed(e);
      const gesture = this.gesture(e);
      const valid = this.validate(this.direction, gesture);

      if (valid) {
        if (speed > 0.6) {
          if (!this.active) {
            this.open();
          } else {
            this.close();
          }
        } else if (this.element.offsetWidth / 2 > Math.abs(this.translate)) {
          this.open();
        } else {
          this.close();
        }
      }
    },
    handleZindex() {
      const opacity = window.getComputedStyle(this.overlay).getPropertyValue('opacity');
      if (opacity <= 0) {
        this.overlay.style.zIndex = -890;
      }
    },
    validate(direction, gesture) {
      if (direction === 'left') {
        if ((this.active && gesture === 'swiperight')
         || (!this.active && (gesture === 'swipeleft' || this.startPos > this.threshold))) {
          return false;
        }
      } else if ((this.active && gesture === 'swipeleft')
      || (!this.active && (gesture === 'swiperight' || this.startPos < (window.screen.width - this.threshold)))) {
        return false;
      }
      if ((document.querySelector('.sidebar.active') && !this.active) || !this.visible) {
        return false;
      }
      return true;
    },
    overlayOpacity(opacity) {
      this.overlay.style.opacity = opacity;
      if (opacity > 0) {
        this.overlay.style.zIndex = 890;
      }
    },
    gesture(e) {
      const directions = [
        'swipeleft',
        'swiperight',
      ];
      const currentPos = e.changedTouches[0].pageX;
      if ((this.startPos - currentPos) < 0) {
        return directions[1];
      }
      return directions[0];
    },

    open() {
      this.translate = 0;
      this.element.style.transform = `translate3d(${this.translate},0,0)`;
      this.element.style.transitionDuration = this.auto_speed;
      this.overlayOpacity(1);
      this.lock(document.querySelector('html'));
      this.lock(document.querySelector('body'));
      this.element.classList.add('active');
      this.active = true;
    },
    close() {
      if (this.direction === 'left') {
        this.translate = `-${this.element.offsetWidth}px`;
      } else {
        this.translate = `${this.element.offsetWidth}px`;
      }
      this.element.style.transform = `translate3d(${this.translate},0,0)`;
      this.element.style.transitionDuration = this.auto_speed;
      this.overlayOpacity(0);
      this.unlock(document.querySelector('html'));
      this.unlock(document.querySelector('body'));
      this.element.classList.remove('active');
      this.active = false;
    },
    speed(e) {
      const time = new Date().getTime() - this.startTime;
      const startP = Math.abs(this.startPos);
      const endP = Math.abs(e.changedTouches[0].pageX);
      const distance = startP > endP ? (startP - endP) : (endP - startP);
      return distance / time;
    },
    percentage(direction, gesture) {
      let percentage = 0;
      let test = [];
      if (direction === 'left') {
        test = ['swipeleft', 'swiperight'];
      } else {
        test = ['swiperight', 'swipeleft'];
      }
      if (this.active && gesture === test[0]) {
        percentage = 100 - Math.round((Math.abs(this.translate) / this.element.offsetWidth) * 100);
      }
      if (!this.active && gesture === test[1]) {
        percentage = Math.round(100 - (Math.abs(this.translate) / this.element.offsetWidth) * 100);
      }
      if (percentage > 100) {
        percentage = 100;
      }
      if (percentage < 0) {
        percentage = 0;
      }
      return percentage;
    },
    lock(element) {
      // eslint-disable-next-line no-param-reassign
      element.style.overflow = 'hidden';
      // eslint-disable-next-line no-param-reassign
      element.style.touchAction = 'none';
    },
    unlock(element) {
      element.style.removeProperty('overflow');
      element.style.removeProperty('touch-action');
    },
  },
};
</script>
<style scoped>
  .overlay{
    position: fixed;
    top: 0;
    left: 0;
    z-index: -900;

    width: 100%;
    height: 100%;

    background: rgba(11, 10, 12, .35);
    opacity: 0;

    transition: opacity .3s ease;
  }

  .sidebar{
    position: fixed;
    top: 0;
    z-index: 900;

    width: 300px;
    height: 100%;
    overflow-x: hidden;
    overflow-y: auto;

    word-wrap: break-word;

    background: #fff;

    transition: transform .3s ease;
    will-change: transform;
  }
</style>
