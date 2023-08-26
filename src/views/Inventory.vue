<template>
  <section>
    <h2 class="SectionTitle">Backpack {{ length }}/{{ maxLength }}</h2>
    <list :list="orderedList" />
  </section>
</template>

<script>
import { mapState } from 'vuex'
import _ from 'lodash'
import { MAXINVENTORY } from '@/data/constants'
import list from '@/components/List.vue'

export default {
  components: {
    list
  },
  data() {
    return {
      order: 'asc',
      key: 'id'
    }
  },
  computed: {
    ...mapState(['inventory']),
    length() {
      return this.inventory.length
    },
    maxLength() {
      return MAXINVENTORY
    },
    orderedList() {
      const aggregatedInventory = this.inventory.reduce(
        (accumulator, current) => {
          const item = { ...current }
          const alreadyExistingItem = accumulator.find(
            (accItem) => accItem.id === item.id
          )

          if (alreadyExistingItem) {
            alreadyExistingItem.amount++
          } else {
            item.amount = 1
            accumulator.push(item)
          }

          return accumulator
        },
        []
      )

      return _.orderBy(aggregatedInventory, this.key, this.order)
    }
  }
}
</script>
