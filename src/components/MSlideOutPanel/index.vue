<template>
  <div
    :id="cssId"
    class="m-drawer">
    <transition name="fade-in">
      <div
        v-if="drawerVisible && !drawerBgRemoved"
        class="m-drawer__bg"
        :class="{ 'transparent' : !drawerBgVisible }"
        :style="{ 'z-index' : drawerZIndex }"
        @click="onBgClicked" />
    </transition>
    <transition-group
      class="m-drawer__wrapper"
      tag="div"
      name="slide-in">
      <div
        v-show="visible"
        :key="id"
        class="m-drawer__panel"
        :style="styles"
        :class="getDrawerClasses()"
        @click.stop>
        <slot />
      </div>
    </transition-group>
  </div>
</template>

<script>
import domUtils from '../../helpers/domUtils';
import generateGuid from '../../helpers/generateGuid';

const Z_INDEX_BASE = 100;

export default {
  name: 'MSlideOutPanel',
  props: {
    width: {
      type: [String, Number],
      default: '50%',
    },
    height: {
      type: [String, Number],
      default: '50%',
    },
    openOn: {
      type: String,
      default: 'left',
    },
    classes: {
      type: String,
      default: '',
    },
    transparentBg: {
      type: Boolean,
      default: false,
    },
    removeBg: {
      type: Boolean,
      default: false,
    },
    disableBgClick: {
      type: Boolean,
      default: false,
    },
    disableEscClick: {
      type: Boolean,
      default: false,
    },
    closeIcon: {
      type: String,
      default: 'times-circle',
    },
  },
  data() {
    return {
      id: generateGuid(),
      styles: {},
      visible: false,
      cssId: '',
    };
  },
  computed: {
    drawerVisible() {
      return this.visible;
    },
    drawerBgVisible() {
      return !this.transparentBg;
    },
    drawerBgRemoved() {
      return this.removeBg;
    },
    drawerZIndex() {
      return Z_INDEX_BASE;
    },
  },
  created() {
    document.addEventListener('keydown', this.onEscapeKeypress);
  },
  destroyed() {
    document.removeEventListener('keydown', this.onEscapeKeypress);
  },
  methods: {
    getDrawerClasses() {
      const drawerPanelClasses = {};

      if (this.openOn === 'left') {
        drawerPanelClasses['open-on-left'] = true;
      } else if (this.openOn === 'bottom') {
        drawerPanelClasses['open-on-bottom'] = true;
      } else if (this.openOn === 'top') {
        drawerPanelClasses['open-on-top'] = true;
      } else {
        drawerPanelClasses['open-on-right'] = true;
      }

      if (this.classes) {
        drawerPanelClasses[this.classes] = true;
      }

      return drawerPanelClasses;
    },

    closeDrawer() {
      this.$emit('closeDrawer', {
        id: this.id,
      });

      this.visible = false;

      if (!this.drawerVisible) {
        this.removeBodyClass();
      }
    },

    openDrawer() {
      this.styles = {
        'z-index': Z_INDEX_BASE,
      };

      if (this.openOn === 'top' || this.openOn === 'bottom') {
        this.styles.width = '100%';

        if (!this.height) {
          this.styles.height = '50%';
        } else if (this.height.endsWith('px') || this.height.endsWith('%')) {
          this.styles.height = this.height;
        } else {
          this.styles.height = `${this.height}%`;
        }
      } else {
        this.styles.height = '100%';

        if (!this.width) {
          this.styles.width = '50%';
        } else if (this.width.endsWith('px') || this.width.endsWith('%')) {
          this.styles.width = this.width;
        } else {
          this.styles.width = this.width;
        }
      }

      this.visible = true;
       this.cssId = `m-drawer-${this.id}`;

      this.addBodyClass();

      this.$emit('openDrawer', {
        id: this.id,
      });
    },

    addBodyClass() {
      domUtils.addClass(document.body, 'm-drawer--open');
    },

    removeBodyClass() {
      domUtils.removeClass(document.body, 'm-drawer--open');
    },

    onBgClicked() {
      if (this.disableBgClick) {
        return;
      }

      this.closeDrawer();
    },

    onEscapeKeypress(event) {
      if ((event.keyCode && event.keyCode === 27) || (event.key && event.key === 'Escape')) {
        if (this.disableEscClick) {
          return;
        }

        this.closeDrawer();
      }
    },
  },
};
</script>

<style lang="scss">

.m-drawer--open {
  overflow: hidden;
}

.m-drawer {
  position: relative;

  display: block;

  transition: opacity .15s;

  .m-drawer__bg {
    position: fixed;
    top: 0;
    left: 0;

    z-index: 100;

    width: 100%;
    height: 100%;
    overflow-y: hidden;

    background-color: rgba(0, 0, 0, .5);

    transition: opacity .3s ease;

    &.transparent {
      background-color: transparent;
    }

    &.fade-in-enter {
      opacity: 0;
    }

    &.fade-in-enter-to {
      opacity: 1;
    }

    &.fade-in-leave {
      opacity: 1;
    }

    &.fade-in-leave-to {
      opacity: 0;
    }

    &.fade-in-leave-active {
      transition-delay: 400ms;
    }
  }

  .m-drawer__wrapper {
    position: static;
  }

  .m-drawer__panel {
    position: fixed;
    top: 0;
    bottom: 0;

    max-width: 100%;
    max-height: 100%;

    padding: 32px;

    overflow-y: auto;

    background: #fff;

    transition: transform 180ms ease-out;
    transition-delay: 200ms;

    &.open-on-left {
      right: auto;
      left: 0;

      &.slide-in-enter {
        transform: translateX(-100%);
      }

      &.slide-in-enter-to {
        transform: translateX(0);
      }

      &.slide-in-leave {
        transform: translateX(0);
      }

      &.slide-in-leave-to {
        transform: translateX(-100%);
      }

      &.slide-in-leave-active {
        transition-delay: 0;
      }
    }

    &.open-on-top {
      top: 0;
      right: 0;
      bottom: auto;
      left: 0;

      &.slide-in-enter {
        transform: translateY(-100%);
      }

      &.slide-in-enter-to {
        transform: translateY(0);
      }

      &.slide-in-leave {
        transform: translateY(0);
      }

      &.slide-in-leave-to {
        transform: translateY(-100%);
      }

      &.slide-in-leave-active {
        transition-delay: 0;
      }
    }

    &.open-on-bottom {
      top: auto;
      right: 0;
      bottom: 0;
      left: 0;

      &.slide-in-enter {
        transform: translateY(100%);
      }

      &.slide-in-enter-to {
        transform: translateY(0);
      }

      &.slide-in-leave {
        transform: translateY(0);
      }

      &.slide-in-leave-to {
        transform: translateY(100%);
      }

      &.slide-in-leave-active {
        transition-delay: 0;
      }
    }

    &.open-on-right {
      right: 0;
      left: auto;

      &.slide-in-enter {
        transform: translateX(100%);
      }

      &.slide-in-enter-to {
        transform: translateX(0);
      }

      &.slide-in-leave {
        transform: translateX(0);
      }

      &.slide-in-leave-to {
        transform: translateX(100%);
      }
    }
  }
}

@media (max-width: 767.98px) {
  .m-drawer {
    position: relative;

    display: block;

    transition: opacity .15s;

    .m-drawer__panel {
      min-width: 100%;
      min-height: 100%;
    }
  }
}

</style>
