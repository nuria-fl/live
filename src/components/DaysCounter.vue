<template>
  <section>Days survived: {{ daysSurvived }}</section>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import gameLoop from '@/mixins/gameLoop'

export default {
  mixins: [gameLoop],
  computed: {
    ...mapState(['gameOver', 'daysSurvived']),
    isActive() {
      return this.gameOver === false
    }
  },
  methods: {
    ...mapMutations(['increaseDayCount']),
    startGameLoop() {
      this.startDayTimer()
    },
    startDayTimer() {
      const day = 1000 * 60
      this.loop = setTimeout(() => {
        if (this.isActive) {
          this.increaseDayCount()
          this.startDayTimer()
        }
      }, day)
    }
  }
}
</script>
