<template>
  <button class="button is-primary" @click="onClick">
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: 'my-button',

  methods: {
    onClick() {
      this.$emit('click');
    },
  },
};
</script>

<style scoped>
button {
  padding: 3px 10px;
  margin: 10px;

  font-size: 15pt;

  cursor: pointer;

  background-color: #fff;
  border: 1px solid #eee;
  border-radius: 3px;
}
</style>
