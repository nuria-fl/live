<template>
  <section>
    <h2>Drinks</h2>
    <list :list="inventoryDrinks"></list>

    <h2>Food</h2>
    <list :list="inventoryFood"></list>

    <h2>Other</h2>

  </section>
</template>

<script>
import list from './List'

export default {
  name: 'inventory',
  data (){
    return {
    }
  },
  computed: {
    inventoryDrinks(){
      return this.$store.state.inventory.filter( item => item.type === 'drink')
    },
    inventoryFood(){
      return this.$store.state.inventory.filter( item => item.type === 'food')
    }
  },
  components: {
    list
  }
}
</script>
