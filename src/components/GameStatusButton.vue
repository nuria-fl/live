<template>
  <button class="GameStatusButton" @click="toggleStatus">
    <img :src="`./static/${iconName}.svg`" :alt="iconName" />
  </button>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import eventBus from '@/utils/eventBus'

export default {
  computed: {
    ...mapState(['paused']),
    iconName() {
      return this.paused ? 'play' : 'pause'
    }
  },
  mounted() {
    document.addEventListener('visibilitychange', this.handleVisibilityChange)
  },
  beforeDestroy() {
    document.removeEventListener(
      'visibilitychange',
      this.handleVisibilityChange
    )
  },
  methods: {
    ...mapMutations(['pauseGame', 'playGame']),
    notifyApp() {
      eventBus.$emit('gameStatusChange', this.paused)
    },
    toggleStatus() {
      if (this.paused) {
        this.playGame()
      } else {
        this.pauseGame()
      }
      this.notifyApp()
    },
    handleVisibilityChange() {
      if (document.visibilityState === 'hidden') {
        this.pauseGame()
      } else if (document.visibilityState === 'visible') {
        this.playGame()
      }
      this.notifyApp()
    }
  }
}
</script>

<style lang="scss">
.GameStatusButton {
  margin: 0;
  padding: 0.2em;
  background: #eaeaea;
  border: none;
  vertical-align: middle;
  line-height: 0;
  cursor: pointer;
}
</style>
