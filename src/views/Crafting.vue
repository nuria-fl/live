<template lang="html">
  <div>
    <h2>CAMP UPGRADES</h2>
    <ul>
      <li v-for="item in camp">
        <template v-if="item.id === 'fire'">
          <template v-if="!hasFire">
            Start a fire to cook items
            <div>
              Items needed:
              {{item.items.join(', ')}}
            </div>
            <button
              type="button"
              @click="startFire(item)" :disabled="!item.isCraftable || disabled">
              Craft
            </button>
          </template>
          <template v-else>
            Fire is burning
          </template>
        </template>
        <water-collector
          v-if="item.id === 'water-collector'"
          :item="item"
          :disabled="disabled">
        </water-collector>
      </li>
    </ul>

    <h2>FOOD AND WATER</h2>
    <ul>
      <craftable-item
        v-for="item in foodItems"
        :key="item.id"
        :item="item"
        @craft="craft"
      />
      <craftable-item
        v-for="item in drinkItems"
        :key="item.id"
        :item="item"
        @craft="craft"
      />
    </ul>

    <h2>TOOLS</h2>
    <ul>
      <craftable-item
        v-for="item in tools"
        :key="item.id"
        :item="item"
        @craft="craft"
      />
    </ul>

    <h2>WEAPONS</h2>
    <ul>
      <craftable-item
        v-for="item in weapons"
        :key="item.id"
        :item="item"
        @craft="craft"
      />
    </ul>

  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import craftableItems from '@/data/craftableItems'
import cookableItems from '@/data/cookableItems'
import CraftableItem from '@/components/CraftableItem'
import WaterCollector from '@/components/WaterCollector'

export default {
  name: 'crafting',
  components: {
    CraftableItem,
    WaterCollector
  },
  computed: {
    ...mapState(['inventory', 'hasFire', 'disabled']),
    craftableItems(){
      cookableItems.forEach(item => {
        item.condition = 'fire'
      })

      const craftable = [...craftableItems, ...cookableItems]

      return craftable.map(item => {
        const newItem = {...item}
        const currentItems = []

        //create temporary inventory to see if we have enough items
        const inventory = this.inventory.map(item => item.id)

        newItem.items.forEach(itemNeeded => {
          const idx = inventory.indexOf(itemNeeded)

          if ( idx !== -1){
            // if we find the item we remove it from the temp inventory
            inventory.splice(idx, 1)
            currentItems.push(itemNeeded)
          } else {
            newItem.isCraftable = false
          }
        })

        // if we have all the items we can craft the item
        // TODO: is length enough? deepEqual?

        if(currentItems.length === newItem.items.length){
          newItem.isCraftable = true
          if(newItem.condition === 'fire' && !this.hasFire){
            newItem.isCraftable = false
          }
        }

        return newItem
      })
    },
    camp() {
      return this.craftableItems.filter(item => item.type === 'camp')
    },
    foodItems() {
      return this.craftableItems.filter(item => item.type === 'food')
    },
    drinkItems() {
      return this.craftableItems.filter(item => item.type === 'drink')
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
    startFire(item) {
      item.items.forEach(item => {
        this.removeInventory({item})
      })
      this.enableFire()
    }
  }
}
</script>
