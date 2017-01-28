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
  computed: {
    ...mapState(['stats', 'gameOver'])
  },
  methods: {
    countdown() {
      const minute = 60 * 1000
      if(this.$store.state.gameOver === false){
        setInterval(() => {
          this.$store.commit('decrease', { stat: 'water', amount: 3 })
          this.$store.commit('decrease', { stat: 'food', amount: 2 })
          this.$store.commit('decrease', { stat: 'sleep', amount: 1 })
        }, minute)
      }
    }
  },
  mounted(){
    this.countdown()
  }
}
</script>
