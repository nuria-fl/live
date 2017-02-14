<template>
  <ul>
    <li v-for="action in actions">
      <button type="button" v-if="action === 'Consume'" @click="consume(item)" :disabled="disabled">
        {{ action }}
      </button>
      <button type="button" v-else @click="discard(item)" :disabled="disabled">
        {{ action }}
      </button>
    </li>
  </ul>

</template>

<script>
import { mapState } from 'vuex'
import utils from '../utils'

export default {
  name: 'consume',
  props: ['item'],
  computed: {
    actions() {
      const actions = ['discard']
      if(this.item.type === 'food' || this.item.type === 'drink' ){
        actions.unshift('Consume')
      }
      return actions
    },
    ...mapState(['disabled'])
  },
  methods: {
    discard(item){
      this.$store.commit('removeInventory', {
        item
      })
    },
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
      this.discard(item)
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

      const idx = utils.randomizeWithinRange(pool.length)

      return pool[idx]
    }
  }
}
</script>
