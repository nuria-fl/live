<template>
  <article class="Item">
    <h4>Water collector</h4>
    <template v-if="!hasWaterCollector">
      <p>
        Items needed:
        {{ itemsNeeded }}
        <br>
        Build a water collector to get rain water
      </p>
      <div class="Item__actions">
        <button
          type="button"
          class="Btn"
          @click="buildWaterCollector()" :disabled="!item.isCraftable || disabled">
          Craft
        </button>
      </div>
    </template>
    <template v-else-if="isCollecting">
      Uses remaining: {{ usesRemaining - 1 }}<br>
      <span class="progress">
        Collecting water
      </span>
    </template>
    <template v-else>
      Uses remaining: {{ usesRemaining - 1 }}<br>
      <button
        class="Btn"
        @click="drinkWater"
        :disabled="disabled">
        Drink water
      </button>
    </template>
  </article>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex'
import eventBus from '@/utils/eventBus'
import items from '@/utils/items'

export default {
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
  props: {
    item: {
      type: Object
    }
  },
  mounted() {
    eventBus.$on('gameStatusChange', this.handleGameStatusChange)
  },
  computed: {
    ...mapState(['disabled']),
    itemsNeeded() {
      return this.item.itemsNeeded.map(items.getName).join(', ')
    }
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
      this.usesRemaining--

      if(this.usesRemaining === 0) {
        this.hasWaterCollector = false
      } else {
        this.startCollecting()
      }
    },
    pauseWaterCollector() {
      clearTimeout(this.waterTimeout)
    },
    handleGameStatusChange (isPaused) {
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
