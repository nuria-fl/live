<template>
    <ul class="stats">
      <li
        v-for="(stat, key) in stats"
        class="stats__item">
        {{ key }}:
        <strong :class="{
          warning: stat < 50,
          danger: stat < 20
        }">
          {{stat}}
        </strong>
      </li>
    </ul>
</template>

<script>
import { mapState, mapMutations } from 'vuex'

export default {
  data() {
    return {
      decreaseLoop: null
    }
  },
  mounted(){
    this.startGameLoop()
  },
  beforeDestroy(){
    this.resetGameLoop()
  },
  computed: {
    ...mapState(['stats', 'gameOver', 'isSick']),
    isActive() {
      return this.gameOver === false
    },
  },
  methods: {
    ...mapMutations(['decrease']),
    startGameLoop() {
      this.decreaseStats()
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
      this.decreaseLoop = null
    }
  }
}
</script>

<style lang="scss">
  .stats {
    display: flex;
    margin: 0;
    padding: 0;
    list-style: none;
    &__item {
      padding: 0 1em;
    }
  }
  .warning {
    color: #fa0;
  }
  .danger {
    color: #c00;
  }
</style>