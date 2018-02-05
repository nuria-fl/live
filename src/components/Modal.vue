<template lang="html">
  <div v-if="visible">
    <div>
      <header>
        <slot name="header"></slot>
      </header>
      <section>
        <slot name="body"></slot>
      </section>
      <footer>
        <button v-if="isCloseable" type="button" @click="close()">
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
      default: false
    },
    closeText: {
      type: String,
      default: 'Ok'
    }
  },
  methods: {
    open(){
      this.visible = true
      if (!this.isCloseable) {
        setTimeout(this.close, 3000)
      }
    },
    close(){
      this.visible = false
    }
  }
}
</script>
