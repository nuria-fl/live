<template>
  <ul>
    <li v-for="(stat, key) in stats">
      {{ key }} : {{stat}}
    </li>
  </ul>
</template>

<script>
import { mapState } from 'vuex'

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
    countdown() {
      const minute = 10 * 1000
      if(this.$store.state.gameOver === false){
        this.loop = setInterval(() => {
          this.$store.commit('decrease', { stat: 'water', amount: 3 })
          this.$store.commit('decrease', { stat: 'food', amount: 2 })
          this.$store.commit('decrease', { stat: 'sleep', amount: 1 })
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
