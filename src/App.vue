<template>
  <div id="app">
    <m-slide-out-panel ref="slidePanel">
      <h1>hola</h1>
    </m-slide-out-panel>
    <button @click="openSlidePanel">
      open
    </button>
  </div>
</template>

<script>
import MSlideOutPanel from './components/Drawer/index.vue';

export default {
  name: 'App',
  components: {
    MSlideOutPanel,
  },
  methods: {
    openSlidePanel() {
      this.$refs.slidePanel.openDrawer();
    },
  },
};
</script>
