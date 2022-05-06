<template>
  <header class="header">
    <img src="img/logo.svg" class="logo" alt="Biorobots logo" />
    <v-button
      class="header__btn"
      type="accent-border"
      v-scroll-to="'#production'"
      >Произвести биоробота
    </v-button>
  </header>
</template>

<script>
import VButton from "@/components/vButton";

export default {
  name: "AppHeader",
  components: { VButton },
};
</script>

<style lang="scss" scoped>
.header {
  margin-top: 48px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  @include media-breakpoint-down(md) {
    margin-top: 24px;
  }

  &__btn {
    @media (max-width: 360px) {
      width: 100%;
    }
  }
}

.logo {
  display: inline-block;
  width: 78px;
  height: auto;
  flex-shrink: 0;
  margin-right: 20px;
  @media (max-width: 360px) {
    display: none;
  }
}
</style>
