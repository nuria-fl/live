<template>
  <section>
    <h2>Inventory {{ length }}/{{ maxLength }}</h2>
    <list :list="orderedList"></list>
  </section>
</template>

<script>
import { mapState } from 'vuex'
import _ from 'lodash'
import { MAXINVENTORY } from '@/data/constants'
import list from '@/components/List'

export default {
  name: 'inventory',
  data(){
    return {
      order: 'asc',
      key: 'dateAdded'
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
    orderedList(){
      return _.orderBy(this.inventory, this.key, this.order)
    }
  },
  components: {
    list
  }
}
</script>
