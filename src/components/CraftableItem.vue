<template>
  <li>
    {{item.name}}
    <div>
      Items needed:
      {{item.items.join(', ')}}
    </div>
    <button
      type="button"
      @click="craft" :disabled="!item.isCraftable || disabled">
      Craft
    </button>
    <span v-show="showFireTip">
      (You need fire to craft this item)
    </span>
  </li>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'consume',
  props: ['item'],
  computed: {
    ...mapState(['hasFire']),
    showFireTip() {
      return this.item.condition === 'fire' && !this.hasFire
    }
  },
  methods: {
    craft() {
      this.$emit('craft', this.item)
    }
  }
}
</script>

