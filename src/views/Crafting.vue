<template lang="html">
  <div>
    <camp-upgrades />
    <h2 class="SectionTitle">Food and water</h2>
    <ul>
      <craftable-item
        v-for="item in consumables"
        :key="item.id"
        :item="item"
        @craft="craft"
      />
      <craftable-item
        v-for="item in medicine"
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
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'

import items from '@/data/items'

import CraftableItem from '@/components/CraftableItem'
import CampUpgrades from '@/components/CampUpgrades'

export default {
  components: {
    CraftableItem,
    CampUpgrades
  },
  computed: {
    ...mapState(['hasFire', 'disabled']),
    ...mapGetters(['recipes']),
    consumables () {
      return this.recipes.filter(recipe => recipe.category === 'consumable')
    },
    medicine () {
      return this.recipes.filter(recipe => recipe.category === 'medicine')
    },
    tools () {
      return this.recipes.filter(recipe => recipe.category === 'tool')
    },
    weapons () {
      return this.recipes.filter(recipe => recipe.category === 'weapon')
    }
  },
  methods: {
    ...mapMutations(['addInventory', 'enableFire']),
    ...mapActions(['removeItemsById']),
    craft (recipe) {
      this.removeItemsById(recipe.itemsNeeded)
      const itemsToCraft = recipe.result.map(itemId => {
        return items.find(item => item.id === itemId)
      })

      itemsToCraft.forEach(item => {
        this.addInventory({...item})
      })
    }
  }
}
</script>
