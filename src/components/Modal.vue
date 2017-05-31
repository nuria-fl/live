<template lang="html">
  <div class="c-modal" v-if="visible">
    <div class="c-modal__backdrop" @click="close()"></div>
    <div class="c-modal__main">
      <header class="c-modal__hd">
        <slot name="header"></slot>
        <button v-if="isCloseable" type="button" @click="close()" class="c-modal__close">&times;</button>
      </header>
      <section class="c-modal__bd">
        <slot name="body"></slot>
      </section>
      <footer class="c-modal__ft">
        <button v-if="isCloseable" type="button" class="o-btn o-btn--default" @click="close()">
          {{ closeText }}
        </button>
        <slot name="actions"></slot>
      </footer>
    </div>
  </div>

</template>

<script>
export default {
  name: 'modal',
  data(){
    return {
      visible: false
    }
  },
  props: {
    isCloseable: {
      type: Boolean,
      default: true
    },
    closeText: {
      type: String,
      default: 'Close'
    }
  },
  methods: {
    open(){
      this.visible = true
    },
    close(){
      this.visible = false
    }
  }
}
</script>
