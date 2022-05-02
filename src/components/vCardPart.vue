<template>
  <div class="card-part">
    <div class="card-part__frame" v-if="iconName">
      <div class="card-part__img">
        <svg-icon :icon-name="iconName" class="card-part__svg-icon"></svg-icon>
      </div>
    </div>
    <div class="card-part__content">
      <h3 class="text-info">{{ name }}</h3>
      <p class="card-part__desc text-grey mb-0">
        Стоимость:
        <strong
          >{{ price }}
          {{ plural(price, ["монета", "монеты", "монет"]) }}</strong
        >
      </p>
      <p class="text-info mb-0 mt-3" v-if="availability !== undefined">
        {{ availability }} шт
      </p>
    </div>
    <div class="card-part__buttons" v-if="$slots.button">
      <slot name="button" />
    </div>
  </div>
</template>

<script>
import { plural } from "@/utils/plural";
import SvgIcon from "@/components/svgIcon";
export default {
  name: "vCardPart",
  components: { SvgIcon },
  props: {
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    availability: {
      type: Number,
      required: false,
    },
    iconName: {
      type: String,
      required: false,
    },
  },
  setup() {
    return {
      plural,
    };
  },
};
</script>

<style lang="scss" scoped>
.card-part {
  text-align: center;
  &__frame {
    max-width: 180px;
    padding: 40px;
    margin: auto;
    background: radial-gradient(
      circle,
      rgba($accent, 0.05) 38%,
      rgba($accent, 0) 72%
    );
  }
  &__img {
    position: relative;
    width: 100%;
    margin: auto;
    height: 0;
    padding-top: 100%;
  }
  &__svg-icon {
    position: absolute;
    top: -50%;
    left: -50%;
    right: -50%;
    bottom: -50%;
    margin: auto;
    z-index: 1;
    width: 100%;
    height: 100%;
    object-position: center;
    object-fit: contain;
    fill: $accent;
  }
  &__desc {
    font-weight: 500;
  }
  &__buttons {
    margin-top: 24px;
    max-width: 200px;
    margin-left: auto;
    margin-right: auto;
  }
}
</style>
