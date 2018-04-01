<template>
  <article class="Item">
    <h4>{{ item.name }}</h4>
    <p>{{ item.description }}</p>
    <div class="Item__actions Item__actions--multi">
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
import utils from '@/utils'
import eventBus from '@/utils/eventBus'

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
      this.removeInventory(item.uid)
    },
    doAction(action){
      if (action === 'consume'){
        let stat = this.item.type === 'food' ? 'food' : 'water'

        const infected = this.calculateRisk(this.item.risk)

        if (infected) {
          console.log('get sick');
          eventBus.$emit('showModal', {
            body: 'You got sick!'
          })
          this.getSick()
        } else if (this.item.id === 'medicinal-tea') {
          if (this.isSick) {
            eventBus.$emit('showModal', {
              body: 'You got cured!'
            })
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
    padding: 0 0 .5em;
    border-bottom: .05em solid #333;
    p {
      margin: .5em 0;
    }
    &__actions {
      width: 100%;
      display: flex;
      justify-content: space-between;
      &--multi {
        flex-direction: row-reverse;
      }
    }
  }
</style>
