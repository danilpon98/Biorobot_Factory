<template>
  <div class="container">
    <app-header />
    <app-main-section />
  </div>
</template>

<script>
import AppHeader from "@/components/AppHeader";
import AppMainSection from "@/components/AppMainSection";
export default {
  name: "App",
  components: {
    AppMainSection,
    AppHeader,
  },
};
</script>

<style lang="scss"></style>
