<template>
  <label class="checkbox">
    <input
      class="checkbox__input"
      type="checkbox"
      :name="name"
      :disabled="disabled"
      :checked="modelValue"
      @input="$emit('update:modelValue', $event.target.checked)"
    />
    <span class="checkbox__indicator"></span>
    <span class="checkbox__label"><slot /></span>
  </label>
</template>

<script>
export default {
  name: "vSimpleCheckbox",
  props: {
    modelValue: {
      type: Boolean,
      default: false,
    },
    name: {
      type: String,
      default: "",
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style lang="scss" scoped>
.checkbox {
  position: relative;
  cursor: pointer;
  display: inline-flex;
  &:hover &__indicator {
    border-color: $checkbox-border-hover;
  }
  &__input {
    position: absolute;
    z-index: -1;
    opacity: 0;
  }
  &__label {
    transition: color 0.15s;
  }
  &__input:checked + &__indicator::before {
    opacity: 1;
  }
  &__input:checked + &__indicator {
    border-color: $checkbox-border-active;
  }
  &__input:disabled + &__indicator {
    border-color: $checkbox-border-disabled;
  }
  &__input:disabled ~ &__label {
    color: $text-grey;
  }
  &__indicator {
    display: block;
    width: 24px;
    height: 24px;
    border: 2px solid $checkbox-border;
    flex-shrink: 0;
    margin-right: 12px;
    position: relative;
    transition: border-color 0.15s;
    &::before {
      content: "";
      display: inline-block;
      position: absolute;
      width: 12px;
      height: 6px;
      border-bottom: solid 2px $accent;
      border-left: solid 2px $accent;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -75%) rotate(-45deg);
      opacity: 0;
      transition: opacity 0.15s;
    }
  }
}
</style>
