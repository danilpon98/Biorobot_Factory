<template>
  <div class="section">
    <div class="section__number" v-if="numberString">{{ numberString }}</div>
    <div class="section__scroll" v-if="scroll">Скролл</div>
    <h2 class="section__title" v-if="title">{{ title }}</h2>
    <slot />
  </div>
</template>

<script>
import { computed } from "vue";
export default {
  name: "vSection",
  props: {
    number: {
      type: Number,
      required: false,
      validate(value) {
        return value > 0;
      },
    },
    scroll: {
      type: Boolean,
      required: false,
    },
    title: {
      type: String,
      required: false,
    },
  },
  setup(props) {
    const numberString = computed(() => {
      return String(props.number).padStart(2, "0");
    });

    return {
      numberString,
    };
  },
};
</script>

<style lang="scss" scoped>
.section {
  position: relative;
  padding-left: 130px;
  margin-top: 110px;
  @include media-breakpoint-down(xl) {
    padding-left: 0;
    margin-top: 90px;
  }
  @include media-breakpoint-down(lg) {
    margin-top: 80px;
  }
  @include media-breakpoint-down(md) {
    margin-top: 70px;
  }
  @include media-breakpoint-down(sm) {
    margin-top: 60px;
  }
  &__number,
  &__scroll {
    display: inline-block;
    color: $text-grey;
    font-weight: 500;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    font-size: 12px;
    position: absolute;
    @include media-breakpoint-down(xl) {
      display: none;
    }
  }
  &__number {
    top: 20px;
    left: 0;
  }
  &__scroll {
    padding-left: 30px;
    left: 0;
    bottom: -10px;
    transform: rotate(-90deg);
    transform-origin: 0 0;
    &::before,
    &::after {
      content: "";
      display: inline-block;
      position: absolute;
      top: 50%;
    }
    &::before {
      width: 8px;
      height: 8px;
      left: 0;
      border-bottom: 1.5px solid $text-grey;
      border-left: 1.5px solid $text-grey;
      transform: translateY(-50%) rotate(45deg);
      z-index: 2;
    }
    &::after {
      width: 16px;
      height: 1px;
      left: -0.5px;
      background-color: $text-grey;
      transform: translateY(-50%);
      z-index: 1;
    }
  }
  &__title {
    margin-bottom: 60px;
    @include media-breakpoint-down(xl) {
      margin-bottom: 40px;
    }
  }
}
</style>
