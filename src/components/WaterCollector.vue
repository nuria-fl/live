<template>
  <article class="Item">
    <h4>Water collector</h4>
    <template v-if="!hasWaterCollector">
      <p>
        Items needed:
        {{item.items.join(', ')}}
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
      Uses remaining: {{ usesRemaining }}<br>
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
import { mapState, mapMutations } from 'vuex'

export default {
  data() {
    return {
      hasWaterCollector: false,
      isCollecting: false,
      isReady: false,
      usesRemaining: 3
    }
  },
  props: {
    item: {
      type: Object
    }
  },
  computed: {
    ...mapState(['disabled'])
  },
  methods: {
    ...mapMutations(['increase', 'removeInventory', 'addInventory']),
    buildWaterCollector() {
      this.item.items.forEach(item => {
        this.removeInventory({item})
      })
      this.usesRemaining = 3
      this.hasWaterCollector = true
      this.startCollecting()
    },
    startCollecting() {
      this.isCollecting = true
      setTimeout(() => {
        this.isCollecting = false
      }, 1000 * 60)
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
    }
  }
}
</script>
