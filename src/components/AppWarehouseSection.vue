<template>
  <v-section :number="4" title="Склад">
    <div class="row gx-5 gy-5 justify-content-center">
      <div class="col-sm-6 col-lg-4" v-for="part in parts" :key="part.id">
        <v-card-part
          :name="part.name"
          :price="part.salePrice"
          :availability="part.availability"
        >
          <template #button>
            <v-button
              type="primary"
              :disabled="part.availability < 1"
              responsive
              @click="sell(part.id)"
              >Продать</v-button
            >
          </template>
        </v-card-part>
      </div>
    </div>
  </v-section>
</template>

<script>
import VSection from "@/components/vSection";
import VButton from "@/components/vButton";
import VCardPart from "@/components/vCardPart";
import { useStore } from "vuex";
import { computed } from "vue";
export default {
  name: "AppWarehouseSection",
  components: { VSection, VButton, VCardPart },
  setup() {
    const store = useStore();
    const parts = computed(() => store.getters["parts/all"]);
    const sell = (id) => store.dispatch("parts/sell", id);

    return {
      parts,
      sell,
    };
  },
};
</script>

<style scoped></style>
