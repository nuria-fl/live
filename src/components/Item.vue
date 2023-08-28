<template>
  <article class="Item">
    <h4>
      {{ item.name }} {{ item.amount > 1 ? `x${item.amount}` : '' }}
      <span v-if="isConsumable" class="Item__stats">
        <template v-for="(stat, key) in stats">
          <span v-if="stat > 0" :key="key"> +{{ stat }} {{ key }} </span>
        </template>
      </span>
    </h4>
    <p>{{ item.description }}</p>
    <span v-if="isBreakable">
      Uses until breakdown: {{ item.usesUntilBreakdown }}
    </span>
    <div class="Item__actions Item__actions--multi">
      <button
        v-for="action in actions"
        :key="action"
        :disabled="disabled"
        class="Btn"
        @click="doAction(action)"
      >
        {{ action }}
      </button>
    </div>
  </article>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { mapState, mapMutations } from 'vuex'
import utils from '@/utils'
import { eventBus } from '@/utils/eventBus'

export default defineComponent({
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  computed: {
    ...mapState(['disabled', 'isSick']),
    isConsumable() {
      return this.item.consumable
    },
    isBreakable() {
      return this.item.usesUntilBreakdown > 0
    },
    actions() {
      const actions = ['discard']
      if (this.isConsumable) {
        actions.push('consume')
      }
      return actions
    },
    stats() {
      if (this.isConsumable) {
        return this.item.value
      }
      return false
    }
  },
  methods: {
    ...mapMutations(['removeInventory', 'increase', 'getSick', 'getCured']),
    discard(item) {
      this.removeInventory(item.uid)
    },
    doAction(action) {
      if (action === 'consume') {
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

        Object.keys(this.stats).forEach((stat) => {
          this.increase({
            stat: stat,
            amount: this.stats[stat]
          })
        })
      }

      this.discard(this.item)
    }
  }
})
</script>

<style lang="scss">
.Item {
  margin: 0;
  padding: 0 0 0.5em;
  border-bottom: 0.05em solid #333;
  p {
    margin: 0.2em 0;
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
