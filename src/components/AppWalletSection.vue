<template>
  <v-section :number="2" title="Кошелёк криптовалют">
    <v-wallet></v-wallet>
  </v-section>
</template>

<script>
import VSection from "@/components/vSection";
import VWallet from "@/components/vWallet";
export default {
  name: "AppWalletSection",
  components: { VWallet, VSection },
};
</script>

<style scoped></style>
