<template>
  <li>
    <article class="Item">
      <h4>{{item.name}}</h4>
      <p>
        Items needed:
        {{ itemsNeeded }}
      </p>
      <button
        type="button"
        class="Btn"
        @click="craft" :disabled="!item.isCraftable || disabled">
        Craft
      </button>
      <span v-show="showFireTip">
        (You need fire to craft this item)
      </span>
    </article>
  </li>
</template>

<script>
import { mapState } from 'vuex'
import items from '@/utils/items'
export default {
  name: 'consume',
  props: ['item'],
  computed: {
    ...mapState(['hasFire', 'disabled']),
    showFireTip() {
      return this.item.condition === 'fire' && !this.hasFire
    },
    itemsNeeded() {
      return this.item.items.map(items.getName).join(', ')
    }
  },
  methods: {
    craft() {
      this.$emit('craft', this.item)
    }
  }
}
</script>
