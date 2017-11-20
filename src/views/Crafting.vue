<template lang="html">
  <div>
    <h2>WEAPONS</h2>
    <ul>
      <li v-for="item in weapons">
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

    <h2>FOOD</h2>
    <ul>
      <li v-for="item in foodItems">
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

    <h2>TOOLS</h2>
    <ul>
      <li v-for="item in tools">
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
  </div>
</template>

<script>
import craftableItems from '../data/craftableItems'
import cookableItems from '../data/cookableItems'

export default {
  name: 'crafting',
  computed: {
    craftableItems(){
      cookableItems.forEach(item => {
        item.condition = 'fire'
      })

      const craftable = [...craftableItems, ...cookableItems]

      craftable.forEach(item => {
        const currentItems = []

        //create temporary inventory to see if we have enough items
        const inventory = this.$store.state.inventory.map(item => item.id)

        item.items.forEach(itemNeeded => {
          const idx = inventory.indexOf(itemNeeded)

          if ( idx !== -1){
            // if we find the item we remove it from the temp inventory
            inventory.splice(idx, 1)
            currentItems.push(itemNeeded)
          } else {
            item.isCraftable = false
          }
        })

        // if we have all the items we can craft the item
        // TODO: is length enough? deepEqual?

        if(currentItems.length === item.items.length){
          item.isCraftable = true
          if(item.condition === 'fire' && !this.$store.state.fire){
            item.isCraftable = false
          }
        }

      })

      return craftable
    },
    foodItems() {
      return this.craftableItems.filter(item => item.type === 'food')
    },
    tools() {
      return this.craftableItems.filter(item => item.type === 'tool')
    },
    weapons() {
      return this.craftableItems.filter(item => item.type === 'weapon')
    }
  },
  methods: {
    craft(item){
      item.items.forEach(item => {
        this.$store.commit('removeInventory', {item})
      })
      this.$store.commit('addInventory', {item})
    }
  }
}
</script>
