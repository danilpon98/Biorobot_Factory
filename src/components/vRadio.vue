<template>
  <label class="radio">
    <input
      class="radio__input"
      type="radio"
      :name="name"
      :disabled="disabled"
      :checked="value === modelValue"
      :value="value"
      @input="$emit('update:modelValue', $event.target.value)"
    />
    <span class="radio__indicator"></span>
    <span class="radio__label"><slot /></span>
  </label>
</template>

<script>
export default {
  name: "vRadio",
  props: {
    disabled: { type: Boolean, default: false },
    name: { type: String, default: "" },
    value: { type: String, default: null },
    modelValue: { type: String, default: null },
  },
};
</script>

<style lang="scss" scoped>
.radio {
  position: relative;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
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
    margin-left: 12px;
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
    border-radius: 50%;
    flex-shrink: 0;
    position: relative;
    transition: border-color 0.15s;
    &::before {
      content: "";
      display: inline-block;
      position: absolute;
      width: 16px;
      height: 16px;
      background-color: $accent;
      border-radius: 50%;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      opacity: 0;
      transition: opacity 0.15s;
    }
  }
}
</style>
