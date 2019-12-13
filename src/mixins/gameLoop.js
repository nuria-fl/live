import eventBus from '@/utils/eventBus'

export default {
  data() {
    return {
      loop: null
    }
  },
  mounted() {
    eventBus.$on('gameStatusChange', this.handleGameStatusChange)
    this.startGameLoop()
  },
  beforeDestroy() {
    this.resetGameLoop()
  },
  methods: {
    startGameLoop() {
      // to be overwritten by component
    },
    resetGameLoop() {
      clearTimeout(this.loop)
      this.loop = null
    },
    handleGameStatusChange(isPaused) {
      if (isPaused) {
        this.resetGameLoop()
      } else {
        this.startGameLoop()
      }
    }
  }
}
