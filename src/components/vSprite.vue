<template>
  <div :class="['sprite', `sprite-${name}`]"></div>
</template>

<script>
export default {
  name: "vSprite",
  props: {
    name: {
      type: String,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/scss/modules/sprites/sprite-robots";
</style>
