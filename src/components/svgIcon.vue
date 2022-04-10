<template>
  <svg :class="svgClass" aria-hidden="true">
    <use :xlink:href="name"></use>
  </svg>
</template>

<script>
const requireAll = (requireContext) =>
  requireContext.keys().map(requireContext);
const req = require.context("../assets/svg-icons", false, /\.svg$/);
requireAll(req);
import { computed } from "vue";
export default {
  name: "svgIcon",
  props: {
    iconName: {
      type: String,
      required: true,
    },
    className: {
      type: String,
      default: "",
    },
  },
  setup(props) {
    const name = computed(() => {
      const icon = props.iconName;
      return icon ? `#icon-${icon}` : "";
    });

    const svgClass = computed(() => {
      const className = props.className;
      return className ? `svg-icon ${className}` : "svg-icon";
    });

    return { name, svgClass };
  },
};
</script>

<style lang="scss" scoped>
.svg-icon {
  width: 2em;
  height: 2em;
  fill: #fff;
  overflow: hidden;
}
</style>
