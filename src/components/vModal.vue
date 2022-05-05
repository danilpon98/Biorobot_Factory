<template>
  <transition name="modal-animation">
    <div
      v-if="show"
      class="modal"
      @click="closingOnOverlay ? $emit('close') : false"
    >
      <transition name="modal-animation-inner">
        <div v-show="show" class="modal__inner" @click.stop>
          <div class="modal__cross" @click="$emit('close')"></div>
          <div class="modal__left">
            <img v-if="img" :src="img" class="modal__img" alt="" />
          </div>
          <div class="modal__right">
            <div class="modal__title">{{ title }}</div>
            <div class="modal__description" v-if="description">
              {{ description }}
            </div>
          </div>
        </div>
      </transition>
    </div>
  </transition>
</template>

<script>
import { watch, toRef, onMounted } from "vue";
export default {
  name: "vModal",
  props: {
    show: {
      type: Boolean,
      required: true,
    },
    img: {
      type: String,
      required: false,
    },
    title: {
      type: String,
      required: false,
    },
    description: {
      type: String,
      required: false,
    },
    closingOnOverlay: {
      type: Boolean,
      required: false,
      default: true,
    },
  },
  setup(props) {
    const showModal = toRef(props, "show");

    const getScrollbarWidth = () => {
      return window.innerWidth - document.documentElement.clientWidth;
    };

    const lockedDocument = () => {
      if (showModal.value) {
        document.body.style.paddingRight = `${getScrollbarWidth()}px`;
        document.documentElement.classList.add("modal_is-locked");
      } else {
        document.body.style.paddingRight = "0";
        document.documentElement.classList.remove("modal_is-locked");
      }
    };

    onMounted(lockedDocument);
    watch(showModal, lockedDocument);
  },
};
</script>

<style lang="scss" scoped>
:global(html.modal_is-locked) {
  overflow: hidden;
  touch-action: none;
}
.modal {
  color: $text-black;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
  position: fixed;
  z-index: 10000;
  top: 0;
  left: 0;
  background-color: rgba($body-bg, 0.7);
  backface-visibility: hidden;
  padding: 20px;
  overflow: auto;
  -webkit-overflow-scrolling: touch;
  &__inner {
    background-color: #fff;
    border-radius: 10px;
    overflow: hidden;
    width: 100%;
    max-width: 500px;
    display: flex;
    padding: 35px 23px;
    position: relative;
    font-size: 16px;
    @include media-breakpoint-down(sm) {
      flex-direction: column;
      align-items: center;
      text-align: center;
    }
  }

  &__cross {
    display: block;
    width: 30px;
    height: 30px;
    position: absolute;
    right: 5px;
    top: 5px;
    cursor: pointer;
    &::before,
    &::after {
      content: "";
      display: block;
      background-color: $accent;
      height: 2px;
      width: 16px;
      position: absolute;
      left: 50%;
      top: 50%;
    }
    &::before {
      transform: translate(-50%, -50%) rotate(-45deg);
    }
    &::after {
      transform: translate(-50%, -50%) rotate(45deg);
    }
  }
  &__left {
    width: 72px;
    flex-shrink: 0;
    padding: 0 12px;
  }
  &__right {
    flex-grow: 1;
    padding: 0 15px;
  }
  &__title {
    font-size: 32px;
    line-height: 40px;
    font-weight: 600;
    margin-bottom: 23px;
    @include media-breakpoint-down(sm) {
      font-size: 18px;
      line-height: 24px;
      margin-bottom: 10px;
    }
  }
  &__description {
    color: $text-black-light;
    font-weight: 600;
    font-size: 20px;
    line-height: 32px;
    @include media-breakpoint-down(sm) {
      font-size: 14px;
      line-height: 20px;
    }
  }
  &__img {
    display: block;
    max-width: 100%;
    height: auto;
    margin: 0 auto 15px auto;
  }
}

.modal-animation {
  &-enter-active,
  &-leave-active {
    transition: opacity 0.25s cubic-bezier(0.52, 0.02, 0.19, 1.02);
  }
  &-enter-from,
  &-leave-to {
    opacity: 0;
  }
}
.modal-animation-inner {
  &-enter-active {
    transition: all 0.2s cubic-bezier(0.52, 0.02, 0.19, 1.02) 0.15s;
  }
  &-leave-active {
    transition: all 0.2s cubic-bezier(0.52, 0.02, 0.19, 1.02);
  }
  &-enter-from {
    opacity: 0;
    transform: scale(0.8);
  }
  &-leave-to {
    transform: scale(0.8);
  }
}
</style>
