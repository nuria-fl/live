<template>
  <section>
    <h2>Inventory</h2>
    <list :list="orderedList"></list>
  </section>
</template>

<script>
import _ from 'lodash'
import list from '../components/List'

export default {
  name: 'inventory',
  data(){
    return {
      order: 'asc',
      key: 'dateAdded'
    }
  },
  computed: {
    orderedList(){
      return _.orderBy(this.$store.state.inventory, this.key, this.order)
    }
  },
  components: {
    list
  }
}
</script>
