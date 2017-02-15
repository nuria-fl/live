<template>
  <popover :list="actions" @clicked="doAction">
    {{item.name}}
  </popover>
</template>

<script>
import { mapState } from 'vuex'
import utils from '../utils'
import popover from './Popover'

export default {
  name: 'consume',
  props: ['item'],
  computed: {
    actions() {
      const actions = ['discard']
      if(this.item.type === 'food' || this.item.type === 'drink' ){
        actions.unshift('consume')
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
    doAction(action){
      if (action === 'consume'){
        let stat = this.item.type === 'food' ? 'food' : 'water'

        const infected = this.calculateRisk(this.item.risk)

        if(infected){
          alert('you got sick!')
        }

        this.$store.commit('increase', {
          stat: stat,
          amount: this.item.value
        })
      }

      this.discard(this.item)
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
  },
  components: {
    popover
  }
}
</script>
