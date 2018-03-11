<template>
  <div>
    <h2 class="SectionTitle">Camp upgrades</h2>
    <ul>
      <li v-for="item in items">
        <fire
           v-if="item.id === 'fire'"
           :item="item">
        </fire>
        <water-collector
          v-if="item.id === 'water-collector'"
          :item="item">
        </water-collector>
      </li>
    </ul>
  </div>
  
</template>

<script>
import { mapGetters } from 'vuex'
import Fire from '@/components/Fire'
import WaterCollector from '@/components/WaterCollector'

export default {
  components: {
    Fire,
    WaterCollector
  },
  computed: {
    ...mapGetters([ 'craftableItems' ]),
    items() {
      return this.craftableItems.filter(item => item.type === 'camp')
    }
  }
}
</script>
