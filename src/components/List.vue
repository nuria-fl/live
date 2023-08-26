<template>
  <ul class="List">
    <li v-for="item in list" :key="item.id">
      <Item :item="item" />
    </li>
  </ul>
</template>

<script>
import Item from '@/components/Item.vue'

export default {
  name: 'List',
  components: {
    Item
  },
  props: {
    list: {
      type: Array,
      required: true
    }
  }
}
</script>
