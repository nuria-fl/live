<template>
  <article class="Item">
    <h4>
      {{ item.name }} {{ item.amount > 1 ? `x${item.amount}` : ''}}
      <span
        v-if="isConsumable"
         class="Item__stats">
        +{{ item.value }} {{ typeName }}
      </span>
    </h4>
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
    isConsumable() {
      return this.item.type === 'food' || this.item.type === 'drink'
    },
    typeName() {
      if (this.item.type === 'food') {
        return 'food'
      }
      if (this.item.type === 'drink') {
        return 'water'
      }
    },
    actions() {
      const actions = ['discard']
      if(this.isConsumable){
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

        const infected = utils.calculateProbability(this.item.risk)

        if (infected && !this.isSick) {
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
      margin: .2em 0;
    }
    &__stats {
      color: #666;
      font-weight: 400;
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
