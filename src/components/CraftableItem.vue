<template>
  <li>
    <article class="Item">
      <h4>{{ item.name }}</h4>
      <p>
        Items needed:
        {{ itemsNeeded }}
      </p>
      <p v-if="toolsNeeded">
        Tools needed:
        {{ toolsNeeded }}
      </p>
      <button
        :disabled="!item.isCraftable || disabled"
        type="button"
        class="Btn"
        @click="craft"
      >
        Craft
      </button>
      <span v-show="showFireTip">
        (You need fire to craft this item)
      </span>
    </article>
  </li>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { mapState } from 'vuex'
import items from '@/utils/items'

export default defineComponent({
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  computed: {
    ...mapState(['hasFire', 'disabled']),
    showFireTip() {
      return this.item.condition === 'fire' && !this.hasFire
    },
    itemsNeeded() {
      return this.item.itemsNeeded.map(items.getName).join(', ')
    },
    toolsNeeded() {
      if (this.item.toolsNeeded) {
        return this.item.toolsNeeded.map(items.getName).join(', ')
      }
      return false
    }
  },
  methods: {
    craft() {
      this.$emit('craft', this.item)
    }
  }
})
</script>
