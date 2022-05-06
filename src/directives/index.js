import scrollToDirective from "@/directives/scrollToDirective";
export default {
  install(Vue) {
    Vue.directive("scroll-to", scrollToDirective);
  },
};
