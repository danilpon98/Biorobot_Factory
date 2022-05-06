<template>
  <v-section :number="5" title="Производство" class="production">
    <div class="row gy-3 gx-5 justify-content-between">
      <div class="col-sm-6 col-lg-8">
        <div
          class="row gy-5 gx-3 gx-md-5 justify-content-center justify-content-sm-start"
        >
          <div class="col-auto">
            <div class="production__controls">
              <p class="text-medium">Тип биоробота:</p>
              <div class="d-flex justify-content-between mb-5">
                <v-radio
                  class="production__radio"
                  name="type"
                  value="front"
                  v-model="type"
                  >FrontEnd
                </v-radio>
                <v-radio
                  class="production__radio"
                  name="type"
                  value="design"
                  v-model="type"
                  >Design
                </v-radio>
              </div>
              <p class="text-medium">Cтабилизатор:</p>
              <div class="d-flex justify-content-between">
                <v-radio
                  class="production__radio"
                  name="gender"
                  value="male"
                  v-model="gender"
                  >Male
                </v-radio>
                <v-radio
                  class="production__radio"
                  name="gender"
                  value="famale"
                  v-model="gender"
                  >Famale
                </v-radio>
              </div>
            </div>
          </div>
          <div class="col-auto">
            <div class="row gy-3 production__parts-grid">
              <div
                class="col-12"
                v-for="(count, part_id) in robot.requirements"
                :key="part_id"
              >
                <div class="row gy-2 gx-2">
                  <div
                    class="col-auto"
                    v-for="idx in count"
                    :key="part_id + idx"
                  >
                    <v-part
                      :value="idx.toString()"
                      v-model="selectedParts[part_id]"
                      :disabled="
                        !isInAvailability(part_id, idx) || isManufactured
                      "
                    >
                      <template #icon>
                        <svg-icon :icon-name="part_id" />
                      </template>
                    </v-part>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="row gy-3 gx-3 gx-md-5 production__footer">
          <div class="col-auto">
            <div class="production__controls">
              <v-button
                type="accent-border"
                responsive
                class="production__button"
                :disabled="!canCreate"
                @click="makeRobot"
                >{{ buttonText }}
              </v-button>
            </div>
          </div>
          <div class="col-auto order-first order-lg-last">
            <div class="production__requirements">
              <p
                class="small mb-0"
                v-if="missingPartsString && !isManufactured"
              >
                Для производства биоробота не хватает {{ missingPartsString }}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div class="col-sm-6 col-lg-4 order-first order-sm-last">
        <div class="production__sprite">
          <v-sprite :name="spriteName" />
        </div>
      </div>
    </div>
  </v-section>
</template>

<script>
import { ref, reactive, computed, watch } from "vue";
import { useStore } from "vuex";
import { plural } from "@/utils/plural";
import { cloneDeep } from "lodash";
import VSection from "@/components/vSection";
import VPart from "@/components/vPart";
import SvgIcon from "@/components/svgIcon";
import VRadio from "@/components/vRadio";
import VButton from "@/components/vButton";
import VSprite from "@/components/vSprite";

export default {
  name: "AppProductionSection",
  components: { VSprite, VButton, VRadio, SvgIcon, VPart, VSection },
  setup() {
    const store = useStore();
    const type = ref("front");
    const gender = ref("male");
    const selectedParts = reactive({});

    const robot = computed(() =>
      store.getters["robots/one"]({ type: type.value, gender: gender.value })
    );
    const isManufactured = computed(() => {
      return store.getters["robots/isManufactured"](robot.value.id);
    });
    const parts = computed(() => store.getters["parts/allAssoc"]);
    const coins = computed(() => store.getters["coins/all"]);

    const getPartCount = (parts) => {
      return parts === undefined ? 0 : parts.length;
    };

    const isInAvailability = (partId, index) => {
      const partCount = parts.value[partId].availability;
      const partCountSelect = getPartCount(selectedParts[partId]);
      return index <= partCount + partCountSelect;
    };

    const enoughCoins = computed(() => robot.value.price <= coins.value);

    watch(
      () => cloneDeep(selectedParts),
      (newVal, oldVal) => {
        if (isManufactured.value) return;
        Object.keys(newVal).forEach((partId) => {
          const diffCount =
            getPartCount(oldVal[partId]) - getPartCount(newVal[partId]);

          if (diffCount === 0) return;
          const newAvailability = parts.value[partId].availability + diffCount;
          store.dispatch("parts/setAvailability", {
            id: partId,
            availability: newAvailability,
          });
        });
      }
    );

    watch(robot, (newRobot) => {
      Object.keys(selectedParts).forEach((partId) => {
        let diffCount =
          newRobot.requirements[partId] - getPartCount(selectedParts[partId]);
        if (diffCount >= 0) return;
        selectedParts[partId].sort((a, b) => parseInt(a) - parseInt(b));
        selectedParts[partId].splice(diffCount, -diffCount);
      });
    });

    const missingPartsString = computed(() => {
      let missing = missingParts.value.reduce((accum, part, count) => {
        const isLast = count === missingParts.value.length - 1;
        if (isLast && enoughCoins.value && missingParts.value.length > 1) {
          accum += " и ";
        } else if (count !== 0) {
          accum += ", ";
        }

        accum += `${part.missing} ${plural(
          part.missing,
          parts.value[part.id].plural.split(",")
        )}`;
        return accum;
      }, "");

      if (!enoughCoins.value) {
        if (missing) missing += " и ";
        const enoughCoinsCount = robot.value.price - coins.value;
        missing += enoughCoinsCount + " ";
        missing += plural(enoughCoinsCount, ["монеты", "монеты", "монет"]);
      }

      return missing;
    });

    const missingParts = computed(() => {
      return Object.keys(robot.value.requirements).reduce((accum, partId) => {
        const partCount = robot.value.requirements[partId];
        const partCountSelect = getPartCount(selectedParts[partId]);
        const diffCount = partCount - partCountSelect;
        if (diffCount <= 0) return accum;
        accum.push({ id: partId, missing: diffCount });
        return accum;
      }, []);
    });

    const canCreate = computed(() => {
      return missingParts.value.length === 0 && enoughCoins.value;
    });

    const spriteProdPrefix = computed(() => {
      let prefix = "disabled";
      if (canCreate.value) prefix = "may";
      if (isManufactured.value) prefix = "";
      return prefix;
    });

    const spriteName = computed(() => {
      let nameArr = [type.value, gender.value];
      if (spriteProdPrefix.value) nameArr.push(spriteProdPrefix.value);
      return nameArr.join("_");
    });

    const clearSelectedParts = () => {
      Object.keys(selectedParts).forEach((partId) => {
        selectedParts[partId] = [];
      });
    };

    const makeRobot = () => {
      store.dispatch("robots/make", robot.value.id);
      clearSelectedParts();
    };

    const buttonText = computed(() => {
      let text = `Произвести за ${robot.value.price} ${plural(
        robot.value.price,
        ["монету", "монеты", "монет"]
      )}`;
      if (isManufactured.value) text = "Биоробот уже произведен";
      return text;
    });

    return {
      type,
      gender,
      robot,
      spriteName,
      selectedParts,
      parts,
      canCreate,
      missingPartsString,
      isManufactured,
      buttonText,
      isInAvailability,
      makeRobot,
      plural,
    };
  },
};
</script>

<style lang="scss" scoped>
.production {
  overflow: hidden;

  &__parts-grid {
    width: 240px;
  }

  &__requirements {
    width: 218px;
  }

  &__controls {
    width: 280px;
    @include media-breakpoint-down(lg) {
      width: 218px;
    }
  }

  &__radio {
    font-size: 14px;
  }

  &__sprite {
    @include media-breakpoint-down(sm) {
      max-width: 280px;
      margin: 0 auto;
    }
  }

  &__footer {
    margin-top: 40px;
    @include media-breakpoint-down(lg) {
      margin-top: 20px;
    }
    @include media-breakpoint-down(sm) {
      text-align: center;
      justify-content: center;
    }
  }

  &__button {
    font-size: 14px;
  }
}
</style>
