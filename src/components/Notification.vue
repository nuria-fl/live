<template>
  <transition name="notification">
    <section v-show="visible" class="Notification">
      {{ text }}
    </section>
  </transition>
</template>

<script>
import { eventBus } from '@/utils/eventBus'

export default {
  data() {
    return {
      visible: false,
      text: '',
      timeout: null
    }
  },
  mounted() {
    eventBus.$on('showNotification', this.showNotification)
  },
  methods: {
    showNotification({ text }) {
      clearTimeout(this.timeout)
      this.text = text
      this.visible = true
      this.startHideNotificationTimeout()
    },
    hideNotification() {
      this.visible = false
    },
    startHideNotificationTimeout() {
      this.timeout = setTimeout(this.hideNotification, 3000)
    }
  }
}
</script>

<style lang="scss">
.Notification {
  padding: 0.7em 1em;
  position: fixed;
  top: 1em;
  right: 1em;
  z-index: 99;
  background: #fff;
  box-shadow: 0 0 0.5em rgba(0, 0, 0, 0.7);
}

// transition
.notification-enter-active,
.notification-leave-active {
  transition: all 0.5s;
}
.notification-enter, .notification-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
  transform: translate(100%, 0);
}
</style>
