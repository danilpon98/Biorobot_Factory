<template>
  <div class="wallet">
    <div class="wallet__coins">
      <span v-for="index in coins" :key="index"></span>
    </div>
    <div class="wallet__sum">
      <strong>{{ coins }}</strong> biorobo
      {{ plural(coins, ["монета", "монеты", "монет"]) }}
    </div>
    <div class="wallet__controls">
      <button type="button" class="wallet__button" @click="incrementCoins">
        Нацыганить
      </button>
      <v-simple-checkbox v-model="fiveCoins" class="wallet__checkbox"
        >Цыганить по 5 монет</v-simple-checkbox
      >
    </div>
  </div>
</template>

<script>
import { computed, ref } from "vue";
import { useStore } from "vuex";
import { plural } from "@/utils/plural";
import VSimpleCheckbox from "@/components/vSimpleCheckbox";

export default {
  name: "vWallet",
  components: { VSimpleCheckbox },
  setup() {
    const store = useStore();
    const fiveCoins = ref(true);
    const coins = computed(() => store.getters["coins/all"]);
    const incrementCoins = () => {
      store.dispatch("coins/update", coins.value + (fiveCoins.value ? 5 : 1));
    };
    return {
      coins,
      fiveCoins,
      plural,
      incrementCoins,
    };
  },
};
</script>

<style lang="scss" scoped>
.wallet {
  &__coins {
    display: flex;
    flex-direction: row-reverse;
    flex-wrap: wrap;
    justify-content: flex-end;
    span {
      display: inline-block;
      width: 8px;
      height: 20px;
      margin-bottom: 8px;
      &::before {
        content: "";
        display: inline-block;
        width: 16px;
        height: 20px;
        background: url("@/assets/img/coin.png");
      }
    }
  }
  &__sum {
    font-size: 24px;
    color: $text-grey;
    margin-top: 20px;
    font-weight: 500;
    @include media-breakpoint-down(xl) {
      font-size: 18px;
    }
  }
  &__controls {
    margin-top: 30px;
    margin-bottom: -10px;
    overflow: hidden;
    @include media-breakpoint-down(xl) {
      margin-top: 20px;
    }
    @include media-breakpoint-down(lg) {
      margin-top: 15px;
    }
    @include media-breakpoint-down(md) {
      margin-top: 10px;
    }
  }
  &__button,
  &__checkbox {
    margin-top: 10px;
    margin-bottom: 10px;
  }
  &__button {
    display: inline-block;
    background: transparent;
    border: none;
    outline: none;
    padding: 0;
    color: $accent;
    font-weight: 500;
    transition: border-bottom-color 0.15s;
    border-bottom: 1px solid rgba($accent, 0.7);
    margin-right: 25px;
    &:hover {
      border-color: $accent;
    }
  }
  &__checkbox {
    vertical-align: middle;
  }
}
</style>
