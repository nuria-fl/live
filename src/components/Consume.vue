<template>
  <section>
    {{item.name}}
    <ul>
      <li v-for="action in actions" class="action">
        <button @click="doAction(action)" :disabled="disabled">{{ action }}</button>
      </li>
    </ul>
  </section>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import utils from '../utils'

export default {
  props: ['item'],
  computed: {
    ...mapState(['disabled']),
    actions() {
      const actions = ['discard']
      if(this.item.type === 'food' || this.item.type === 'drink' ){
        actions.unshift('consume')
      }
      return actions
    }
  },
  methods: {
    ...mapMutations(['removeInventory', 'increase', 'getSick', 'getCured']),
    discard(item){
      this.removeInventory({item: item.id})
    },
    doAction(action){
      if (action === 'consume'){
        let stat = this.item.type === 'food' ? 'food' : 'water'

        const infected = this.calculateRisk(this.item.risk)

        if (infected) {
          alert('you got sick!')
          this.getSick()
        } else if (this.item.id === 'medicinal-tea') {
          alert('you got cured!')
          this.getCured()
        }

        this.increase({
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
  }
}
</script>

<style lang="scss">
  .action {
    margin: 0;
  }
</style>
