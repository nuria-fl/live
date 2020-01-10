<template lang="html">
  <div>
    <h2 class="SectionTitle">
      Actions
    </h2>

    <modal :visible.sync="showResults" :is-closeable="true">
      <p slot="body">You got {{ lastActionResult }}</p>
    </modal>

    <modal :visible.sync="inProgress">
      <p slot="body" class="progress">
        {{ currentAction }}
      </p>
    </modal>

    <button
      v-for="action in actions"
      :key="action.name"
      :disabled="disabled"
      type="button"
      class="Btn Action"
      @click="action.method"
    >
      <h3 class="Action__title">
        {{ action.name }}
      </h3>
      <p class="Action__stats">
        {{ action.stats }}
      </p>
      <p class="Action__desc">
        {{ action.description }}
      </p>
    </button>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'
import modal from '@/components/Modal'
import eventBus from '@/utils/eventBus'

export default {
  components: {
    modal
  },
  data() {
    return {
      lastActionResult: '',
      currentAction: null,
      inProgress: false,
      showResults: false,
      actions: [
        {
          name: 'Sleep',
          description: 'Rest to replenish your energy',
          stats: '+35 energy',
          method: this.energy
        },
        {
          name: 'Hunt',
          description: 'Hunt for food and fur to craft equipment',
          stats: '-10 energy, -10 water, -6 food',
          method: this.goHunt
        },
        {
          name: 'Scavenge',
          description: 'Find useful items to survive',
          stats: '-5 energy, -5 water, -3 food',
          method: this.goScavenge
        }
      ]
    }
  },
  computed: {
    ...mapState(['disabled', 'gameOver', 'inventory']),
    ...mapGetters(['isInventoryFull', 'slotsInInventoryLeft'])
  },
  methods: {
    ...mapActions(['increaseAsync', 'hunt', 'scavenge']),
    handleFullInventory() {
      eventBus.$emit('showModal', {
        body: 'Your inventory is full. Remove at least one item to proceed.'
      })
    },
    energy() {
      this.startProgress('Sleeping')

      this.increaseAsync({
        stat: 'energy',
        amount: 35,
        time: 5000
      }).then(() => {
        this.handleResult()
      })
    },
    goHunt() {
      if (this.isInventoryFull) {
        this.handleFullInventory()
        return
      }

      const weapons = ['bow']

      const availableWeapons = this.inventory.filter(
        (item) => weapons.indexOf(item.id) > -1
      )
      const hasWeapon = availableWeapons.length > 0

      if (hasWeapon) {
        // for now there is only one weapon, later user will choose
        const weapon = availableWeapons[0]
        this.startProgress('Hunting')
        this.lastActionResult = ''

        this.hunt({ time: 8000, weapon }).then((items) => {
          this.handleResult(items)
          if (items === false) {
            eventBus.$emit('showModal', {
              body:
                'You were unable to track down any animal. Better luck next time.'
            })
          }
        })
      } else {
        eventBus.$emit('showModal', {
          body: 'You need to craft a weapon first'
        })
      }
    },
    goScavenge() {
      if (this.isInventoryFull) {
        this.handleFullInventory()
        return
      }

      this.startProgress('Scavenging')
      this.lastActionResult = ''

      this.scavenge({ time: 3000 }).then((items) => {
        this.handleResult(items)
      })
    },
    handleResult(items) {
      this.endProgress()

      if (items) {
        const itemsAcquired = items.reduce((accumulator, current) => {
          const item = { ...current }
          const alreadyExistingItem = accumulator.find(
            (accItem) => accItem.name === item.name
          )

          if (alreadyExistingItem) {
            alreadyExistingItem.amount++
            alreadyExistingItem.displayName = `${alreadyExistingItem.name} x${alreadyExistingItem.amount}`
          } else {
            item.amount = 1
            item.displayName = item.name
            accumulator.push(item)
          }

          return accumulator
        }, [])

        this.showResults = true
        this.lastActionResult = itemsAcquired
          .map((item) => item.displayName)
          .join(', ')
      }
    },
    startProgress(action) {
      this.currentAction = action
      this.inProgress = true
    },
    endProgress() {
      this.currentAction = null
      this.inProgress = false
    }
  }
}
</script>

<style lang="scss">
.Action {
  display: block;
  width: 100%;
  margin: 1em 0;
  padding: 0.7em;
  border: none;
  text-align: left;

  &__title {
    margin: 0;
    font-size: 1.4em;
  }
  &__stats {
    margin: 0.2em 0;
    color: #666;
  }
  &__desc {
    margin: 0;
  }
  &:disabled &__stats {
    color: #bbb;
  }
}
.progress {
  &:after {
    content: '...';
    animation: progress 1.5s linear infinite;
    display: inline;
  }
  .paused & {
    &:after {
      display: none;
    }
  }
}

@keyframes progress {
  0% {
    content: '.';
  }
  33.333% {
    content: '..';
  }
  66.666% {
    content: '...';
  }
}
</style>
