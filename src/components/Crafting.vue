<template lang="html">
  <ul>
    <li v-for="item in craftedItems">
      {{item.name}}
      Items needed: {{item.items}}
      <button type="button" @click="craft(item)" :disabled="!item.isCraftable">
        Craft
      </button>
    </li>
  </ul>
</template>

<script>
import craftedItems from '../data/craftedItems'
export default {
  name: 'crafting',
  computed: {
    craftedItems(){
      const crafted = craftedItems

      crafted.forEach(item => {
        const currentItems = []

        //create temporary inventory to see if we have enough items
        const inventory = this.$store.state.inventory.map(item => item.id)

        item.items.forEach(itemNeeded => {
          const idx = inventory.indexOf(itemNeeded)

          if ( idx > -1){
            // if we find the item we remove it from the temp inventory
            inventory.splice(idx, 1)
            currentItems.push(itemNeeded)
          } else {
            item.isCraftable = false
          }
        })

        // if we have all the items we can craft the item
        // TO-DO: is length enough? deepEqual?
        if(currentItems.length === item.items.length){
          item.isCraftable = true
        }
      })

      return crafted
    }
  },
  methods: {
    craft(itemId){

    }
  }
}
</script>
