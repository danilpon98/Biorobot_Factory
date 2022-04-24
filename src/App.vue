<template>
  <div class="container main-wrapper">
    <app-header />
    <app-main-section />
    <app-wallet-section />
    <app-message />
  </div>
</template>

<script>
import AppHeader from "@/components/AppHeader";
import AppMainSection from "@/components/AppMainSection";
import AppWalletSection from "@/components/AppWalletSection";
import AppMessage from "@/components/AppMessage";
export default {
  name: "App",
  components: {
    AppMessage,
    AppWalletSection,
    AppMainSection,
    AppHeader,
  },
};
</script>

<style lang="scss">
.main-wrapper {
  padding-bottom: 140px;
  @include media-breakpoint-down(xl) {
    padding-bottom: 120px;
  }
  @include media-breakpoint-down(lg) {
    padding-bottom: 100px;
  }
  @include media-breakpoint-down(md) {
    padding-bottom: 90px;
  }
  @include media-breakpoint-down(sm) {
    padding-bottom: 80px;
  }
}
</style>
