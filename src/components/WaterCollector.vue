<template>
  <article class="Item">
    <h4>Water collector</h4>
    <template v-if="!hasWaterCollector">
      <p>
        Items needed:
        {{ itemsNeeded }}
        <br />
        Build a water collector to get rain water
      </p>
      <div class="Item__actions">
        <button
          :disabled="!item.isCraftable || disabled"
          type="button"
          class="Btn"
          @click="buildWaterCollector()"
        >
          Craft
        </button>
      </div>
    </template>
    <template v-else-if="isCollecting">
      Uses remaining: {{ usesRemaining - 1 }}<br />
      <span class="progress">
        Collecting water
      </span>
    </template>
    <template v-else>
      Uses remaining: {{ usesRemaining - 1 }}<br />
      <button :disabled="disabled" class="Btn" @click="drinkWater">
        Drink
      </button>
      <button :disabled="disabled" class="Btn" @click="collectWater">
        Collect
      </button>
    </template>
  </article>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex'
import eventBus from '@/utils/eventBus'
import items from '@/utils/items'

export default {
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      hasWaterCollector: false,
      isCollecting: false,
      isReady: false,
      usesRemaining: 3,
      currentTime: 0,
      waterTimeout: null
    }
  },
  computed: {
    ...mapState(['disabled', 'inventory', 'existingItems']),
    itemsNeeded() {
      return this.item.itemsNeeded.map(items.getName).join(', ')
    }
  },
  mounted() {
    eventBus.$on('gameStatusChange', this.handleGameStatusChange)
  },
  methods: {
    ...mapMutations(['increase', 'addInventory']),
    ...mapActions(['removeItemsById']),
    buildWaterCollector() {
      this.removeItemsById(this.item.itemsNeeded)
      this.usesRemaining = 3
      this.hasWaterCollector = true
      this.startCollecting()
    },
    startCollecting() {
      this.isCollecting = true
      this.startCollectingLoop()
    },
    startCollectingLoop() {
      this.waterTimeout = setTimeout(() => {
        this.currentTime++
        if (this.currentTime === 60) {
          this.isCollecting = false
          this.currentTime = 0
        } else {
          this.startCollectingLoop()
        }
      }, 1000)
    },
    drinkWater() {
      this.increase({
        stat: 'water',
        amount: 20
      })
      this.finishUse()
    },
    collectWater() {
      const hasBottle = this.inventory.find((item) => item.id === 'bottle')
      if (hasBottle) {
        const water = this.existingItems.find(
          (item) => item.id === 'water-clean'
        )
        this.removeItemsById(['bottle'])
        this.addInventory(water)
        this.finishUse()
      } else {
        eventBus.$emit('showModal', {
          body: 'You need an empty bottle to collect water'
        })
      }
    },
    finishUse() {
      this.usesRemaining--

      if (this.usesRemaining === 0) {
        this.hasWaterCollector = false
        eventBus.$emit('showNotification', {
          text: 'Water collector has broken'
        })
      } else {
        this.startCollecting()
      }
    },
    pauseWaterCollector() {
      clearTimeout(this.waterTimeout)
    },
    handleGameStatusChange(isPaused) {
      if (this.hasWaterCollector) {
        if (isPaused) {
          this.pauseWaterCollector()
        } else {
          this.startCollectingLoop()
        }
      }
    }
  }
}
</script>
