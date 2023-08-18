<template>
  <modal
    :is-closeable="true"
    :visible.sync="visible"
    @update:visible="closeModal"
  >
    <template v-slot:body>
      <p>
        {{ text }}
      </p>
    </template>
  </modal>
</template>

<script>
import Modal from '@/components/Modal.vue'
import { eventBus } from '@/utils/eventBus'

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
