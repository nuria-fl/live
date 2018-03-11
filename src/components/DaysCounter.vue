<template>
  <section>
    Days survived: {{ daysSurvived }}
  </section>
</template>

<script>
import { mapState, mapMutations } from 'vuex'

export default {
  data() {
    return {
      daysLoop: null
    }
  },
  mounted(){
    this.startGameLoop()
  },
  beforeDestroy(){
    this.resetGameLoop()
  },
  computed: {
    ...mapState(['gameOver', 'daysSurvived']),
    isActive() {
      return this.gameOver === false
    },
  },
  methods: {
    ...mapMutations(['increaseDayCount']),
    startGameLoop() {
      this.startDayTimer()
    },
    startDayTimer() {
      const day = 1000 * 60
      this.daysLoop = setTimeout(() => {
        if (this.isActive) {
          this.increaseDayCount()
          this.startDayTimer()
        }
      }, day)
    },
    resetGameLoop(){
      clearTimeout(this.daysLoop)
      this.daysLoop = null
    }
  }
}
</script>
