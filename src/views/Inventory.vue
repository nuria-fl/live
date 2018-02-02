<template>
  <section>
    <h2>Inventory</h2>
    <list :list="orderedList"></list>
  </section>
</template>

<script>
import { mapState } from 'vuex'
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
    ...mapState(['inventory']),
    orderedList(){
      return _.orderBy(this.inventory, this.key, this.order)
    }
  },
  components: {
    list
  }
}
</script>
