<template>
  <section>
    Days survived: {{ daysSurvived }}
    <ul>
      <li v-for="(stat, key) in stats">
        {{ key }}:
        <strong :class="{
          warning: stat < 50,
          danger: stat < 20
        }">
          {{stat}}
        </strong>
      </li>
    </ul>
  </section>
</template>

<script>
import { mapState, mapMutations } from 'vuex'

export default {
  name: 'stats',
  data() {
    return {
      decreaseLoop: null,
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
    ...mapState(['stats', 'gameOver', 'isSick', 'daysSurvived']),
    isActive() {
      return this.gameOver === false
    },
  },
  methods: {
    ...mapMutations(['decrease', 'increaseDayCount']),
    startGameLoop() {
      this.startDayTimer()
      this.decreaseStats()
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
    decreaseStats() {
      const decreaseInterval = 12 * 1000
      this.loop = setTimeout(() => {
        if (this.isActive) {
        
          this.decrease({ stat: 'water', amount: 3 })
          this.decrease({ stat: 'food', amount: 1 })
          this.decrease({ stat: 'sleep', amount: 2 })
          if (this.isSick) {
            this.decrease({ stat: 'health', amount: 2 })
          }

          this.decreaseStats()
        }
      }, decreaseInterval)
    },
    resetGameLoop(){
      clearTimeout(this.decreaseLoop)
      clearTimeout(this.daysLoop)
      this.daysLoop = null
      this.decreaseLoop = null
    }
  }
}
</script>

<style lang="scss">
  .warning {
    color: #fa0;
  }
  .danger {
    color: #c00;
  }
</style>