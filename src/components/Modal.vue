<template>
  <div v-if="visible" class="Modal">
    <div class="Modal__content">
      <header>
        <slot name="header" />
      </header>
      <section>
        <slot name="body" />
      </section>
      <footer>
        <button v-if="isCloseable" class="Btn" @click="close()">
          {{ closeText }}
        </button>
        <slot name="actions" />
      </footer>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    visible: {
      type: Boolean,
      required: true
    },
    isCloseable: {
      type: Boolean,
      default: false
    },
    closeText: {
      type: String,
      default: 'Ok'
    }
  },
  methods: {
    open() {
      this.$emit('update:visible', true)
    },
    close() {
      this.$emit('update:visible', false)
    }
  }
})
</script>

<style lang="scss">
.Modal {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 9;
  &:before {
    content: '';
    display: block;
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    background: rgba(0, 0, 0, 0.6);
  }
  &__content {
    width: 40em;
    max-width: 95%;
    padding: 1em;
    position: absolute;
    top: 40%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: #fff;
    text-align: center;
  }
}
</style>
