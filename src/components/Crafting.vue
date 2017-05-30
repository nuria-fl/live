<template lang="html">
  <ul>
    <li v-for="item in craftedItems">
      {{item.name}}
      <div>
        Items needed:
        {{item.items.join(', ')}}
      </div>
      <button
        type="button"
        class="o-btn o-btn--default"
        @click="craft(item)" :disabled="!item.isCraftable">
        Craft
      </button>
    </li>
  </ul>
</template>

<script>
import craftedItems from '../data/craftedItems'
import cookedItems from '../data/cookedItems'
export default {
  name: 'crafting',
  computed: {
    craftedItems(){
      cookedItems.forEach(item => {
        item.condition = 'fire'
      })

      const crafted = [...craftedItems, ...cookedItems]

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
          if(item.condition === 'fire' && !this.$store.state.fire){
            item.isCraftable = false
          }
        }

      })

      return crafted
    }
  },
  methods: {
    craft(item){
      item.items.forEach(item => {
        this.$store.commit('removeInventory', {item: item.id})
      })
      this.$store.commit('addInventory', {item})
    }
  }
}
</script>
