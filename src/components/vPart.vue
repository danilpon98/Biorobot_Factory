<template>
  <label class="part">
    <input
      class="part__input"
      type="checkbox"
      :name="name"
      :disabled="disabled"
      :value="value"
      :checked="modelValue.includes(value)"
      @input="onChange($event.target.value)"
    />
    <span class="part__icon" v-if="$slots.icon">
      <slot name="icon"></slot>
    </span>
    <span class="part__label" v-if="$slots.default">
      <slot name="default"></slot>
    </span>
  </label>
</template>

<script>
export default {
  name: "vPart",
  props: {
    modelValue: { type: Array, default: () => [] },
    value: { type: String, default: null },
    name: { type: String, default: "" },
    disabled: { type: Boolean, default: false },
  },
  setup(props, { emit }) {
    const onChange = (value) => {
      if (props.modelValue.includes(props.value)) {
        emit(
          "update:modelValue",
          props.modelValue.filter((cv) => cv !== value)
        );
      } else {
        emit("update:modelValue", props.modelValue.concat(value));
      }
    };

    return { onChange };
  },
};
</script>

<style lang="scss" scoped>
.part {
  position: relative;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  &__input {
    position: absolute;
    z-index: -1;
    opacity: 0;
  }
  &__input:checked + &__icon {
    border-color: $accent;
    background-color: transparent;
  }
  &__input:checked + &__icon :deep(svg) {
    fill: $accent;
  }
  &__input:disabled:checked + &__icon {
    border-color: rgba($accent, 0.5);
  }
  &__input:disabled + &__icon :deep(svg) {
    fill: $checkbox-disabled-icon;
  }
  &__input:disabled ~ &__label {
    color: $text-grey;
  }
  &__icon {
    display: inline-flex;
    flex-shrink: 0;
    align-items: center;
    justify-content: center;
    width: 48px;
    height: 48px;
    border-radius: 4px;
    border: 2px solid $checkbox-bg;
    background-color: $checkbox-bg;
    transition: all 0.15s;
    padding: 4px;
    :deep(svg) {
      fill: #fff;
      width: 100%;
      height: 100%;
      transition: fill opacity 0.15s;
    }
  }
  &__label {
    margin-left: 12px;
  }
}
</style>
