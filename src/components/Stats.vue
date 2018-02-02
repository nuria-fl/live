<template>
  <ul>
    <li v-for="(stat, key) in stats">
      {{ key }} : {{stat}}
    </li>
  </ul>
</template>

<script>
import { mapState, mapMutations } from 'vuex'

export default {
  name: 'stats',
  data() {
    return {
      loop: null
    }
  },
  computed: {
    ...mapState(['stats', 'gameOver'])
  },
  methods: {
    ...mapMutations(['decrease']),
    countdown() {
      const minute = 10 * 1000
      if(this.gameOver === false){
        this.loop = setInterval(() => {
          this.decrease({ stat: 'water', amount: 3 })
          this.decrease({ stat: 'food', amount: 2 })
          this.decrease({ stat: 'sleep', amount: 1 })
        }, minute)
      }
    },
    resetCountdown(){
      clearInterval(this.loop)
      this.loop = null
    }
  },
  mounted(){
    this.countdown()
  },
  beforeDestroy(){
    this.resetCountdown()
  }
}
</script>
