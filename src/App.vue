<template>
  <div class="container main-wrapper overflow-hidden">
    <app-header />
    <app-main-section />
    <app-wallet-section />
    <app-market-section />
    <app-warehouse-section />
    <app-production-section id="production" />
  </div>
  <app-message />
</template>

<script>
import AppHeader from "@/components/AppHeader";
import AppMainSection from "@/components/AppMainSection";
import AppWalletSection from "@/components/AppWalletSection";
import AppMessage from "@/components/AppMessage";
import AppMarketSection from "@/components/AppMarketSection";
import AppWarehouseSection from "@/components/AppWarehouseSection";
import AppProductionSection from "@/components/AppProductionSection";
export default {
  name: "App",
  components: {
    AppProductionSection,
    AppWarehouseSection,
    AppMarketSection,
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
