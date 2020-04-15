<template>
  <div id="app">
    <m-slider>
      <div class="slide">
        <h3>slide 1</h3>
      </div>
      <div class="slide">
        <h3>slide n</h3>
      </div>
    </m-slider>
  </div>
</template>

<script>
import MSlider from './components/MSlider/index.vue';

export default {
  name: 'App',
  components: {
    MSlider,
  },
};
</script>
