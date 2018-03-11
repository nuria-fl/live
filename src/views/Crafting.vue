<template lang="html">
  <div>
    <camp-upgrades />
    <h2 class="SectionTitle">Food and water</h2>
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

    <h2 class="SectionTitle">Tools</h2>
    <ul>
      <craftable-item
        v-for="item in tools"
        :key="item.id"
        :item="item"
        @craft="craft"
      />
    </ul>

    <h2 class="SectionTitle">Weapons</h2>
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
import { mapState, mapGetters, mapMutations } from 'vuex'

import CraftableItem from '@/components/CraftableItem'
import CampUpgrades from '@/components/CampUpgrades'

export default {
  components: {
    CraftableItem,
    CampUpgrades
  },
  computed: {
    ...mapState(['hasFire', 'disabled']),
    ...mapGetters(['craftableItems']),
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
    }
  }
}
</script>
