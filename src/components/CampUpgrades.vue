<template>
  <div>
    <h2 class="SectionTitle">
      Camp upgrades
    </h2>
    <ul>
      <li v-for="upgrade in upgrades" :key="upgrade.id">
        <fire v-if="upgrade.id === 'fire'" :item="upgrade" />
        <water-collector
          v-if="upgrade.id === 'water-collector'"
          :item="upgrade"
        />
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { mapGetters } from 'vuex'
import Fire from '@/components/Fire.vue'
import WaterCollector from '@/components/WaterCollector.vue'

export default defineComponent({
  components: {
    Fire,
    WaterCollector
  },
  computed: {
    ...mapGetters(['upgrades'])
  }
})
</script>
