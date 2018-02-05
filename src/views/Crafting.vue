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
          @click="craft(item)" :disabled="!item.isCraftable">
          Craft
        </button>
      </li>
    </ul>

    <h2>FIRE</h2>
    <ul>
      <li v-if="!hasFire">
        Start a fire to cook items
        <div>
          Items needed:
          {{fire.items.join(', ')}}
        </div>
        <button
          type="button"
          @click="startFire()" :disabled="!fire.isCraftable">
          Craft
        </button>
      </li>
      <li v-else>
        Fire is burning
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
          @click="craft(item)" :disabled="!item.isCraftable">
          Craft
        </button>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import craftableItems from '../data/craftableItems'
import cookableItems from '../data/cookableItems'

export default {
  name: 'crafting',
  computed: {
    ...mapState(['inventory', 'hasFire']),
    craftableItems(){
      cookableItems.forEach(item => {
        item.condition = 'fire'
      })

      const craftable = [...craftableItems, ...cookableItems]

      craftable.forEach(item => {
        const currentItems = []

        //create temporary inventory to see if we have enough items
        const inventory = this.inventory.map(item => item.id)

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
          if(item.condition === 'fire' && !this.hasFire){
            item.isCraftable = false
          }
        }

      })

      return craftable
    },
    fire() {
      return this.craftableItems.find(item => item.type === 'fire')
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
    ...mapMutations(['removeInventory', 'addInventory', 'enableFire']),
    craft(item){
      item.items.forEach(item => {
        this.removeInventory({item})
      })
      this.addInventory({item})
    },
    startFire() {
      this.fire.items.forEach(item => {
        this.removeInventory({item})
      })
      this.enableFire()
    }
  }
}
</script>
