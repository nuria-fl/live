<template>
  <div>
    <h2 class="SectionTitle">Camp upgrades</h2>
    <ul>
      <li v-for="upgrade in upgrades">
        <fire
           v-if="upgrade.id === 'fire'"
           :item="upgrade">
        </fire>
        <water-collector
          v-if="upgrade.id === 'water-collector'"
          :item="upgrade">
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
    ...mapGetters([ 'upgrades' ])
  }
}
</script>
