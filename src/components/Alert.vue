<template>
  <modal
    :is-closeable="true"
    :visible.sync="visible"
    @update:visible="closeModal"
  >
    <p slot="body">
      {{ text }}
    </p>
  </modal>
</template>

<script>
import Modal from '@/components/Modal'
import eventBus from '@/utils/eventBus'

export default {
  components: {
    Modal
  },
  data() {
    return {
      visible: false,
      text: ''
    }
  },
  mounted() {
    eventBus.$on('showModal', this.showModal)
  },
  methods: {
    showModal(data) {
      this.visible = true
      this.text = data.body
    },
    closeModal() {
      this.text = ''
    }
  }
}
</script>

<style lang="css"></style>
