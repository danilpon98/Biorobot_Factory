<template>
  <v-section :number="1" scroll class="overflow-hidden">
    <div class="row gy-4 align-items-center">
      <div class="col-sm-6 col-md-7">
        <h1 class="mb-0 h1">Фабрика по производству биороботов</h1>
        <p class="h3 text-grey mb-0 mt-4 d-none d-sm-block">
          класса «монитор-кресло»
        </p>
      </div>
      <div class="col-sm-6 col-md-5 order-first order-sm-last">
        <img
          class="img-responsive"
          src="img/main-image.png"
          alt="Фабрика по производству биороботов"
        />
      </div>
    </div>
  </v-section>
</template>

<script>
import VSection from "@/components/vSection";
export default {
  name: "AppMainSection",
  components: { VSection },
};
</script>

<style scoped></style>
