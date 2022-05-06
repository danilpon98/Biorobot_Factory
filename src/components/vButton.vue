<template>
  <component
    :is="tag"
    class="btn"
    :class="{ [`btn_${type}`]: type, btn_responsive: responsive }"
  >
    <span><slot /></span>
  </component>
</template>

<script>
export default {
  name: "vButton",
  props: {
    tag: {
      default: "button",
      validator(value) {
        return ["button", "a", "div"].includes(value);
      },
    },
    type: {
      default: false,
      validator(value) {
        return ["accent", "primary", "accent-border", false].includes(value);
      },
    },
    responsive: {
      default: false,
      type: Boolean,
    },
  },
};
</script>

<style scoped lang="scss">
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 5px 16px;
  text-align: center;
  min-height: 48px;
  text-decoration: none;
  line-height: 1.2;
  cursor: pointer;
  font-weight: 600;
  border: none;
  background: $btn-disabled-bg;
  border-radius: 60px;
  color: #fff;
  transition: all 0.2s;
  position: relative;
  overflow: hidden;
  span {
    position: relative;
    z-index: 2;
  }
  &_responsive {
    width: 100%;
  }
  &:disabled {
    pointer-events: none;
    cursor: default;
    user-select: none;
  }
  &_accent::after,
  &_primary::after {
    position: absolute;
    content: "";
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 1;
    z-index: 1;
    transition: all 0.2s;
  }
  &_accent {
    background-color: $accent-dark;
    &::after {
      background: linear-gradient(180deg, $accent 0%, $accent-dark 100%);
    }
    &:hover {
      &::after {
        opacity: 0;
      }
    }
    &:active {
      background: $accent;
    }
    &:disabled {
      color: $btn-disabled-text;
      background: $btn-disabled-bg;
      &::after {
        opacity: 0;
      }
    }
  }
  &_accent-border {
    background-color: transparent;
    border: 2px solid $accent;
    &:hover {
      background-color: $accent-dark;
      border-color: $accent-dark;
    }
    &:active {
      background-color: $accent;
      border-color: $accent;
    }
    &:disabled {
      color: $btn-disabled-bg;
      border-color: $btn-disabled-bg;
    }
  }
  &_primary {
    font-weight: 500;
    background: $primary;
    transition: all 0.2s;
    &::after {
      border: 2px solid transparent;
      background: linear-gradient($body-bg, $body-bg) padding-box,
        linear-gradient(
            90deg,
            $primary-dark 0%,
            $primary 50%,
            $primary-dark 100%
          )
          border-box;
      color: $primary;
      border-radius: 60px;
      transition: opacity 0s;
    }
    &:hover::after,
    &:disabled::after {
      opacity: 0;
    }
    &:hover {
      color: $text-black;
      box-shadow: 0 0 20px 0 rgba($primary, 0.35);
    }
    &:active {
      box-shadow: 0 0 0 2px $primary-dark inset;
      background: transparent;
      color: $primary;
    }
    &:disabled {
      color: $btn-disabled-bg;
      box-shadow: 0 0 0 2px $btn-disabled-bg inset;
      background: transparent;
      transition: background 0s;
    }
    &:disabled::after {
      transition: opacity 0.2s;
    }
  }
}
</style>
