<template>
  <button type="button" name="button" @click="consume(item)" :disabled="disabled">{{ action }}</button>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'consume',
  props: ['item'],
  computed: {
    action() {
      return this.item.type === 'food' ? 'Eat' : 'Drink'
    },
    ...mapState(['disabled'])
  },
  methods: {
    consume(item){
      let stat = item.type === 'food' ? 'food' : 'water'

      const infected = this.calculateRisk(item.risk)

      if(infected){
        alert('you got sick!')
      }

      this.$store.commit('increase', {
        stat: stat,
        amount: item.value
      })
    },
    calculateRisk(risk) {
      const pool = []

      for(let i = 0; i < 10; i++){
        if(i < risk) {
          pool.push(true)
        } else {
          pool.push(false)
        }
      }

      const idx = Math.floor(Math.random() * pool.length)
      return pool[idx]
    }
  }
}
</script>
