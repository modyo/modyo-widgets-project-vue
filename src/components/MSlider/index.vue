<template>
  <vue-agile
    class="vue-agile"
    v-bind="$attrs"
    v-on="$listeners">
    <template
      v-for="(_, slot) of $scopedSlots"
      v-slot:[slot]="scope">
      <slot
        :name="slot"
        v-bind="scope" />
    </template>
  </vue-agile>
</template>

<script>
import { VueAgile } from 'vue-agile';

export default {
  name: 'MSlider',
  components: {
    VueAgile,
  },
  inheritAttrs: false,
  props: {
  },
};
</script>
<style lang="scss">
.agile{ position: relative; }

.agile--rtl .agile__actions,
.agile--rtl .agile__dots,
.agile--rtl .agile__slides,
.agile--rtl .agile__track{
  flex-direction: row-reverse;
}

.agile:active,
.agile :active,
.agile:focus,
.agile :focus{ outline: none; }

.agile__list{
  position: relative;

  display: block;

  width: 100%;
  overflow: hidden;
}

.agile__track{
  flex-direction: row;
  flex-wrap: nowrap;
}

.agile__actions,
.agile__track{
  display: flex;
}

.agile__actions{
  justify-content: space-between;
}

.agile__slides{
  display: flex;

  flex-direction: row;
  flex-grow: 1;
  flex-shrink: 0;
  flex-wrap: nowrap;

  align-items: center;

  justify-content: flex-start;
}

.agile--disabled .agile__slides{ display: block; }

.agile__slide{
  display: block;

  flex-grow: 1;
  flex-shrink: 0;
}

.agile--fade .agile__slide{
  position: relative;
  z-index: 0;

  opacity: 0;
}

.agile--fade .agile__slide--active{
  z-index: 2;

  opacity: 1;
}

.agile--fade .agile__slide--expiring{
  z-index: 1;

  opacity: 1;

  transition-duration: 0s;
}

.agile__nav-button[disabled]{
  cursor: default;
}

.agile__nav-button{
  background: transparent;
  border: none;
}

.agile__dots{
  display: flex;

  align-items: center;

  padding: 0;

  white-space: nowrap;
  list-style: none;
}

.agile__dot button{
  display: block;

  font-size: 0;
  line-height: 0;

  cursor: pointer;
}
</style>
