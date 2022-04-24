<template>
  <v-modal
    :show="activeModal"
    :img="message.img"
    :title="message.title"
    :description="message.description"
    :closing-on-overlay="false"
    @close="closeModal(message.id)"
  ></v-modal>
</template>

<script>
import { computed } from "vue";
import VModal from "@/components/vModal";
import { useStore } from "vuex";

export default {
  name: "AppMessage",
  components: { VModal },
  setup() {
    const store = useStore();
    const message = computed(() => store.getters["messages/one"]);
    const activeModal = computed(() => !!message.value);
    const closeModal = (id) => store.dispatch("messages/remove", id);

    return {
      activeModal,
      closeModal,
      message,
    };
  },
};
</script>

<style scoped></style>
