<template>
  <v-section class="overflow-hidden" :number="3" title="Рынок комплектующих">
    <div class="row gx-5 gy-5 justify-content-center">
      <div class="col-sm-6 col-lg-4" v-for="part in parts" :key="part.id">
        <v-card-part
          :name="part.name"
          :price="part.purchasePrice"
          :icon-name="part.id"
        >
          <template #button>
            <v-button
              type="accent"
              :disabled="!canBuy(part.purchasePrice)"
              responsive
              @click="buy(part.id)"
              >Установить</v-button
            >
          </template>
        </v-card-part>
      </div>
    </div>
  </v-section>
</template>

<script>
import VSection from "@/components/vSection";
import VCardPart from "@/components/vCardPart";
import { useStore } from "vuex";
import { computed } from "vue";
import VButton from "@/components/vButton";
export default {
  name: "AppMarketSection",
  components: { VButton, VCardPart, VSection },
  setup() {
    const store = useStore();
    const parts = computed(() => store.getters["parts/all"]);
    const coins = computed(() => store.getters["coins/all"]);
    const canBuy = (price) => price <= coins.value;
    const buy = (id) => store.dispatch("parts/buy", id);

    return {
      parts,
      canBuy,
      buy,
    };
  },
};
</script>

<style scoped></style>
