<template>
  <article class="Item">
    <h4>{{ item.name }}</h4>
    <p>{{ item.description }}</p>
    <div class="Item__actions">
      <button
        v-for="action in actions"
        class="Btn"
        @click="doAction(action)"
        :disabled="disabled">
        {{ action }}
      </button>
    </div>
  </article>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import utils from '../utils'

export default {
  props: ['item'],
  computed: {
    ...mapState(['disabled', 'isSick']),
    actions() {
      const actions = ['discard']
      if(this.item.type === 'food' || this.item.type === 'drink' ){
        actions.push('consume')
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
          if (this.isSick) {
            alert('you got cured!')
          }
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
  .Item {
    margin: 0;
    &__actions {
      width: 100%;
      display: flex;
      justify-content: space-between;
      flex-direction: row-reverse;
    }
  }
</style>
